"use client";

import { useId, useState } from "react";
import { CONTACT } from "@/data/site";
import {
  BUDGETS,
  CHAMPS_VIDES,
  TYPES_PROJET,
  valider,
  type DemandeProjet,
  type Erreurs,
} from "@/lib/projet";

type Etat = "repos" | "envoi" | "envoye" | "indisponible" | "erreur";

/**
 * Le formulaire de demande de projet, côté porteur de projet uniquement.
 *
 * Il fonctionne sans JavaScript au sens où rien n'y est caché : les champs et
 * le bouton sont du HTML natif, et l'adresse email reste affichée en dessous.
 * Si l'envoi automatique tombe, le visiteur repart avec son message plutôt
 * qu'avec une erreur — c'est tout l'objet de l'état « indisponible ».
 */
export function ProjectForm() {
  const base = useId();
  const [champs, setChamps] = useState<DemandeProjet>(CHAMPS_VIDES);
  const [leurre, setLeurre] = useState("");
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [etat, setEtat] = useState<Etat>("repos");

  const modifier = (cle: keyof DemandeProjet) => (valeur: string) => {
    setChamps((c) => ({ ...c, [cle]: valeur }));
    setErreurs((e) => (e[cle] ? { ...e, [cle]: undefined } : e));
  };

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();

    const trouvees = valider(champs);
    if (Object.keys(trouvees).length > 0) {
      setErreurs(trouvees);
      const premier = document.getElementById(`${base}-${Object.keys(trouvees)[0]}`);
      premier?.focus();
      return;
    }

    setEtat("envoi");
    try {
      const reponse = await fetch("/api/projet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...champs, site: leurre }),
      });

      if (reponse.ok) {
        setEtat("envoye");
        setChamps(CHAMPS_VIDES);
        return;
      }

      const donnees = await reponse.json().catch(() => ({}));
      if (donnees.erreurs) {
        setErreurs(donnees.erreurs);
        setEtat("repos");
        return;
      }
      setEtat(donnees.erreur === "envoi_indisponible" ? "indisponible" : "erreur");
    } catch {
      setEtat("indisponible");
    }
  }

  if (etat === "envoye") {
    return (
      <div role="status" className="rise rounded-2xl border border-edge bg-card p-8 md:p-10">
        <p className="eyebrow">Message reçu</p>
        <p className="mt-4 max-w-[52ch] text-[19px] leading-relaxed text-bright">
          Merci. Je lis votre demande et je reviens vers vous sous deux jours ouvrés, depuis{" "}
          {CONTACT.email}.
        </p>
        <button
          type="button"
          onClick={() => setEtat("repos")}
          className="mt-8 text-[15px] text-muted underline-offset-4 hover:text-bright hover:underline"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={envoyer} noValidate className="max-w-[46rem]">
      <div className="grid gap-6 sm:grid-cols-2">
        <Champ
          id={`${base}-nom`}
          label="Nom"
          value={champs.nom}
          onChange={modifier("nom")}
          erreur={erreurs.nom}
          autoComplete="name"
          required
        />
        <Champ
          id={`${base}-email`}
          label="Email"
          type="email"
          value={champs.email}
          onChange={modifier("email")}
          erreur={erreurs.email}
          autoComplete="email"
          required
        />
        <Champ
          id={`${base}-entreprise`}
          label="Entreprise"
          hint="facultatif"
          value={champs.entreprise}
          onChange={modifier("entreprise")}
          erreur={erreurs.entreprise}
          autoComplete="organization"
        />
        <Liste
          id={`${base}-type`}
          label="Type de projet"
          value={champs.type}
          onChange={modifier("type")}
          erreur={erreurs.type}
          options={TYPES_PROJET}
          vide="Choisissez…"
          required
        />
        <Liste
          id={`${base}-budget`}
          label="Budget"
          hint="facultatif"
          value={champs.budget}
          onChange={modifier("budget")}
          erreur={erreurs.budget}
          options={BUDGETS}
          vide="Non précisé"
          className="sm:col-span-2"
        />
        <Champ
          id={`${base}-description`}
          label="Votre projet"
          hint="ce que vous voulez construire, le problème à régler, où en est le projet"
          value={champs.description}
          onChange={modifier("description")}
          erreur={erreurs.description}
          zone
          required
          className="sm:col-span-2"
        />
      </div>

      {/* Champ leurre : hors écran, hors tabulation, invisible d'un lecteur d'écran. */}
      <div aria-hidden className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${base}-site`}>Site web</label>
        <input
          id={`${base}-site`}
          name="site"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={leurre}
          onChange={(e) => setLeurre(e.target.value)}
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={etat === "envoi"}
          className="inline-flex items-center justify-center rounded-full bg-bright px-7 py-3.5 text-[15px] font-medium text-void transition-all duration-300 hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {etat === "envoi" ? "Envoi…" : "Envoyer mon projet"}
        </button>
        <p className="text-[14px] text-faint">
          Ou directement :{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-muted underline-offset-4 hover:text-bright">
            {CONTACT.email}
          </a>
        </p>
      </div>

      {(etat === "indisponible" || etat === "erreur") && (
        <p role="alert" className="mt-6 max-w-[56ch] border-l-2 border-accent pl-4 text-[15px] leading-relaxed text-muted">
          {etat === "indisponible"
            ? "L’envoi automatique ne répond pas en ce moment. Votre texte est toujours dans le formulaire : "
            : "Quelque chose s’est mal passé de mon côté. Votre texte est toujours dans le formulaire : "}
          <a
            href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(
              `Projet — ${champs.nom.trim() || "demande"}`,
            )}&body=${encodeURIComponent(champs.description)}`}
            className="text-bright underline underline-offset-4"
          >
            envoyez-le-moi par email
          </a>
          , il arrivera au même endroit.
        </p>
      )}

      <p className="mt-8 max-w-[56ch] text-[13.5px] leading-relaxed text-faint">
        Les informations saisies servent uniquement à vous répondre. Elles me sont transmises par
        courrier électronique et ne sont ni conservées sur ce site, ni utilisées à d’autres fins.
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ pièces */

const champStyle =
  "w-full rounded-xl border bg-void px-4 py-3.5 text-[16px] text-bright transition-colors duration-200 placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-bright/30";

function Etiquette({ id, label, hint }: { id: string; label: string; hint?: string }) {
  return (
    <label htmlFor={id} className="eyebrow mb-0 block">
      {label}
      {hint && <span className="ml-2 normal-case tracking-normal text-faint/80">— {hint}</span>}
    </label>
  );
}

function Message({ id, erreur }: { id: string; erreur?: string }) {
  if (!erreur) return null;
  return (
    <p id={`${id}-erreur`} className="mt-2 text-[13.5px] text-accent">
      {erreur}
    </p>
  );
}

function Champ({
  id,
  label,
  hint,
  value,
  onChange,
  erreur,
  type = "text",
  zone = false,
  required = false,
  autoComplete,
  className = "",
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  erreur?: string;
  type?: string;
  zone?: boolean;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  const bord = erreur ? "border-accent" : "border-edge focus:border-bright";
  const commun = {
    id,
    value,
    required,
    autoComplete,
    "aria-invalid": erreur ? true : undefined,
    "aria-describedby": erreur ? `${id}-erreur` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    className: `${champStyle} ${bord}`,
  };

  return (
    <div className={`space-y-2.5 ${className}`}>
      <Etiquette id={id} label={label} hint={hint} />
      {zone ? <textarea {...commun} rows={6} className={`${commun.className} resize-y`} /> : <input {...commun} type={type} />}
      <Message id={id} erreur={erreur} />
    </div>
  );
}

function Liste({
  id,
  label,
  hint,
  value,
  onChange,
  erreur,
  options,
  vide,
  required = false,
  className = "",
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  erreur?: string;
  options: readonly string[];
  vide: string;
  required?: boolean;
  className?: string;
}) {
  const bord = erreur ? "border-accent" : "border-edge focus:border-bright";
  return (
    <div className={`space-y-2.5 ${className}`}>
      <Etiquette id={id} label={label} hint={hint} />
      <div className="relative">
        <select
          id={id}
          value={value}
          required={required}
          aria-invalid={erreur ? true : undefined}
          aria-describedby={erreur ? `${id}-erreur` : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={`${champStyle} ${bord} ${value ? "" : "text-muted"} appearance-none pr-11`}
        >
          <option value="">{vide}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-faint"
        >
          ▾
        </span>
      </div>
      <Message id={id} erreur={erreur} />
    </div>
  );
}
