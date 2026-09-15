/** Les constantes du site : une seule source, pour ne jamais avoir deux adresses différentes. */
export const SITE = {
  name: "Lucas Guilhot",
  role: "Développeur full-stack",
  location: "Toulouse, France",
  url: "https://lucasguilhot.fr",
  description:
    "Développeur full-stack à Toulouse. Je conçois et construis des produits complets : applications web, SaaS, automatisation et traitement de données.",
} as const;

export const CONTACT = {
  email: "lucasguilhot7@gmail.com",
  github: "https://github.com/lucas04022002",
  linkedin: "https://www.linkedin.com/in/guilhot-lucas",
  cv: "/cv.pdf",
} as const;

export const STACK_LINE = "Next.js · React · TypeScript · Node · Python · FastAPI · PostgreSQL · Docker";

/**
 * Le parcours réel, tel qu'il figure sur le CV. Un recruteur veut savoir d'où vient
 * quelqu'un avant de regarder ce qu'il a construit — surtout en reconversion.
 */
export const PARCOURS: { period: string; title: string; place: string; detail: string }[] = [
  {
    period: "2026",
    title: "Développeur web — Bac+2, RNCP niveau 5",
    place: "Wild Code School",
    detail:
      "Applications web, intégration d’interfaces, API Node et FastAPI, bases de données. Projet de fin de formation en équipe, en méthode agile.",
  },
  {
    period: "2023 — 2025",
    title: "Coordinateur logistique, dispatcher, manager — CDI",
    place: "TR Express · UTS",
    detail:
      "Organisation et suivi de livraisons nationales et internationales, coordination des tournées, management d’équipe. Deux ans à tenir un flux qui ne s’arrête pas.",
  },
  {
    period: "2019 — aujourd’hui",
    title: "Informatique en autodidacte",
    place: "",
    detail:
      "Commencé par assembler et réparer des machines, continué par le code. Les cinq produits de ce site sont nés de cette habitude : comprendre en démontant.",
  },
];
