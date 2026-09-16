"use client";

import { useMode } from "@/lib/mode";

/**
 * La banderole de disponibilité.
 *
 * Elle répond à un problème simple : la ligne « Disponible pour un CDI » se
 * perdait au bas du premier écran, en petit et en gris. C'est pourtant la
 * réponse à la première question d'un recruteur.
 *
 * Le message est écrit deux fois, et la seconde copie est cachée aux lecteurs
 * d'écran : une bande qui défile ne doit pas dicter deux fois la même phrase.
 * Le défilement s'arrête au survol et au focus clavier, et ne démarre pas du
 * tout si le visiteur a désactivé les animations — dans ce cas la bande reste
 * une ligne fixe, parfaitement lisible.
 */
/**
 * Un passage de la bande : le message, un point, le complément, un point, trois fois.
 * Défini hors du composant : imbriqué, il serait recréé à chaque rendu et React
 * démonterait puis remonterait la bande au lieu de la laisser défiler.
 */
function Passage({ message, complement, cache = false }: { message: string; complement: string; cache?: boolean }) {
  return (
    <span className="flex shrink-0 items-center" aria-hidden={cache || undefined}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 py-3 font-mono text-[12.5px] uppercase tracking-[0.14em] text-bright sm:text-[13px]">
            {message}
          </span>
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-bright/50" />
          <span className="px-6 py-3 font-mono text-[12.5px] uppercase tracking-[0.14em] text-bright/75 sm:text-[13px]">
            {complement}
          </span>
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-bright/50" />
        </span>
      ))}
    </span>
  );
}

export function Disponibilite() {
  const { mode, chosen } = useMode();

  const message =
    !chosen
      ? "Disponible pour un CDI, un CDD ou des missions freelance"
      : mode === "recruiter"
        ? "Disponible pour un CDI, un CDD ou une mission longue"
        : "Disponible pour de nouveaux projets";

  const complement = chosen && mode === "freelance" ? "Réponse sous deux jours ouvrés" : "Toulouse / Remote";

  return (
    <aside
      className="banderole overflow-hidden border-y border-accent-deep bg-accent-deep"
      aria-label="Disponibilité"
    >
      <div className="defile flex w-max">
        <Passage message={message} complement={complement} />
        <Passage message={message} complement={complement} cache />
      </div>
    </aside>
  );
}
