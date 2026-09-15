import type { Metadata } from "next";
import { CONTACT, LEGAL, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Éditeur, hébergeur et traitement des données du site de Lucas Guilhot.",
  robots: { index: false, follow: true },
};

/**
 * Obligations de l'article 6 III de la LCEN : identité de l'éditeur, identité
 * de l'hébergeur, et information sur les données collectées.
 */
export default function Page() {
  return (
    <div className="page pt-36 pb-28 md:pt-44">
      <h1 className="display-l">Mentions légales</h1>

      <div className="mt-14 max-w-[68ch] space-y-10 text-[16px] leading-relaxed text-muted">
        <section>
          <h2 className="text-[19px] font-medium text-bright">Éditeur du site</h2>
          <p className="mt-3">
            {LEGAL.denomination} — {LEGAL.departement}
            <br />
            Directeur de la publication : {SITE.name}
            <br />
            Contact : {CONTACT.email}
            {LEGAL.siren ? (
              <>
                <br />
                Entrepreneur individuel immatriculé sous le numéro SIREN {LEGAL.siren}
                <br />
                TVA non applicable, article 293 B du Code général des impôts
              </>
            ) : (
              <>
                <br />
                <span className="text-faint">
                  Site édité à titre personnel par une personne physique n’exerçant pas d’activité
                  commerciale déclarée. Conformément à l’article 6 III 2 de la loi du 21 juin 2004,
                  l’adresse postale n’est pas publiée ; elle est communiquée à l’hébergeur, qui la
                  tient à la disposition de l’autorité judiciaire.
                </span>
              </>
            )}
          </p>
        </section>

        <section>
          <h2 className="text-[19px] font-medium text-bright">Hébergement</h2>
          <p className="mt-3">
            OVH SAS — société par actions simplifiée au capital de 10 174 560 €
            <br />
            RCS Lille Métropole 424 761 419 00045
            <br />
            2 rue Kellermann, 59100 Roubaix, France
            <br />
            Téléphone : 1007
            <br />
            <span className="text-faint">
              Le site est hébergé sur un serveur privé virtuel loué à OVH, situé en France.
            </span>
          </p>
        </section>

        <section>
          <h2 className="text-[19px] font-medium text-bright">Données personnelles</h2>
          <p className="mt-3">
            Ce site ne dépose aucun cookie et n&apos;utilise aucune mesure d&apos;audience. Le seul
            élément conservé est votre choix d&apos;affichage (recruteur ou porteur de projet),
            enregistré dans votre navigateur et jamais transmis.
            <br />
            <br />
            Le formulaire de demande de projet transmet les informations que vous y saisissez —
            nom, adresse électronique, entreprise, type de projet, budget et description — par
            courrier électronique à l&apos;adresse {CONTACT.email}. Elles ne sont enregistrées ni
            dans une base de données, ni dans un fichier sur le serveur : elles servent uniquement
            à vous répondre, et sont conservées dans cette seule boîte aux lettres le temps de
            l&apos;échange. Vous pouvez à tout moment demander leur suppression en écrivant à cette
            même adresse.
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
