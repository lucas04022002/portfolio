import type { Metadata } from "next";
import { CONTACT, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Éditeur, hébergeur et traitement des données du site de Lucas Guilhot.",
  robots: { index: false, follow: true },
};

/**
 * Les champs entre crochets sont à compléter avant la mise en ligne : ils
 * dépendent du statut de Lucas (auto-entrepreneur ou particulier) et de
 * l'hébergeur retenu.
 */
export default function Page() {
  return (
    <div className="page pt-36 pb-28 md:pt-44">
      <h1 className="display-l">Mentions légales</h1>

      <div className="mt-14 max-w-[68ch] space-y-10 text-[16px] leading-relaxed text-muted">
        <section>
          <h2 className="text-[19px] font-medium text-bright">Éditeur du site</h2>
          <p className="mt-3">
            {SITE.name} — {SITE.location}. Contact : {CONTACT.email}.
            <br />
            <span className="text-faint">[Statut juridique, numéro SIREN et adresse à compléter si activité déclarée.]</span>
          </p>
        </section>

        <section>
          <h2 className="text-[19px] font-medium text-bright">Hébergement</h2>
          <p className="mt-3 text-faint">[Nom, raison sociale et adresse de l&apos;hébergeur à compléter.]</p>
        </section>

        <section>
          <h2 className="text-[19px] font-medium text-bright">Données personnelles</h2>
          <p className="mt-3">
            Ce site ne dépose aucun cookie de mesure d&apos;audience et ne collecte aucune donnée personnelle :
            il n&apos;y a pas de formulaire, le contact se fait par courrier électronique. Le seul élément
            conservé est votre choix d&apos;affichage (recruteur ou porteur de projet), enregistré dans votre
            navigateur et jamais transmis.
          </p>
        </section>

        <section>
          <h2 className="text-[19px] font-medium text-bright">Propriété intellectuelle</h2>
          <p className="mt-3">
            Les textes, captures d&apos;écran et schémas présentés sont l&apos;œuvre de {SITE.name}, sauf mention
            contraire. Les projets menés en équipe sont signalés comme tels.
          </p>
        </section>
      </div>
    </div>
  );
}
