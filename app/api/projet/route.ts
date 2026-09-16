import { NextResponse } from "next/server";
import { CONTACT } from "@/data/site";
import { valider, type DemandeProjet } from "@/lib/projet";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Réception d'une demande de projet.
 *
 * Le message part par courrier électronique, et rien n'est conservé sur le
 * serveur : une demande n'a de valeur que lue, et une base de données qu'on
 * ne regarde jamais est une façon coûteuse de perdre des clients. En
 * contrepartie, si l'envoi échoue, le visiteur doit l'apprendre tout de
 * suite — d'où les réponses d'erreur explicites plus bas, jamais un faux
 * « message envoyé ».
 */

/** Cinq demandes par heure et par adresse : au-delà, c'est un robot. */
const PLAFOND = 5;
const FENETRE = 60 * 60 * 1000;
const passages = new Map<string, number[]>();

function tropDeDemandes(ip: string): boolean {
  const maintenant = Date.now();
  const recentes = (passages.get(ip) ?? []).filter((t) => maintenant - t < FENETRE);
  recentes.push(maintenant);
  passages.set(ip, recentes);

  // Ménage : sans cela, la table grossit indéfiniment sur un serveur qui tourne des mois.
  if (passages.size > 5000) {
    for (const [cle, dates] of passages) {
      if (dates.every((t) => maintenant - t >= FENETRE)) passages.delete(cle);
    }
  }

  return recentes.length > PLAFOND;
}

function adresse(req: Request): string {
  const transmis = req.headers.get("x-forwarded-for");
  return transmis ? transmis.split(",")[0].trim() : "inconnue";
}

function texte(d: DemandeProjet): string {
  return [
    `Nom         : ${d.nom.trim()}`,
    `Email       : ${d.email.trim()}`,
    `Entreprise  : ${d.entreprise.trim() || "—"}`,
    `Type        : ${d.type}`,
    `Budget      : ${d.budget || "non précisé"}`,
    `Délai       : ${d.delai || "non précisé"}`,
    "",
    "Description :",
    d.description.trim(),
    "",
    "—",
    "Envoyé depuis le formulaire de lucasguilhot.fr",
  ].join("\n");
}

export async function POST(req: Request) {
  let brut: unknown;
  try {
    brut = await req.json();
  } catch {
    return NextResponse.json({ erreur: "Requête illisible." }, { status: 400 });
  }

  const corps = (brut ?? {}) as Record<string, unknown>;

  // Champ leurre : invisible pour un humain, rempli par la plupart des robots.
  // On répond « reçu » sans rien envoyer, pour ne pas leur apprendre la règle.
  if (typeof corps.site === "string" && corps.site.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const demande: DemandeProjet = {
    nom: String(corps.nom ?? ""),
    email: String(corps.email ?? ""),
    entreprise: String(corps.entreprise ?? ""),
    type: String(corps.type ?? ""),
    budget: String(corps.budget ?? ""),
    delai: String(corps.delai ?? ""),
    description: String(corps.description ?? ""),
  };

  const erreurs = valider(demande);
  if (Object.keys(erreurs).length > 0) {
    return NextResponse.json({ erreurs }, { status: 422 });
  }

  if (tropDeDemandes(adresse(req))) {
    return NextResponse.json(
      { erreur: "Trop de demandes envoyées depuis cette connexion. Réessayez dans une heure." },
      { status: 429 },
    );
  }

  const cle = process.env.RESEND_API_KEY;
  const expediteur = process.env.CONTACT_FROM;
  const destinataire = process.env.CONTACT_TO ?? CONTACT.email;

  if (!cle || !expediteur) {
    console.error("Formulaire : RESEND_API_KEY ou CONTACT_FROM absent, message non envoyé.");
    return NextResponse.json({ erreur: "envoi_indisponible" }, { status: 503 });
  }

  try {
    const reponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${cle}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: expediteur,
        to: [destinataire],
        reply_to: demande.email.trim(),
        subject: `Projet — ${demande.nom.trim()} (${demande.type})`,
        text: texte(demande),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!reponse.ok) {
      console.error("Formulaire : Resend a répondu", reponse.status, await reponse.text());
      return NextResponse.json({ erreur: "envoi_indisponible" }, { status: 502 });
    }
  } catch (e) {
    console.error("Formulaire : envoi impossible", e);
    return NextResponse.json({ erreur: "envoi_indisponible" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
