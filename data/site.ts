/** Les constantes du site : une seule source, pour ne jamais avoir deux adresses différentes. */
export const SITE = {
  name: "Lucas Guilhot",
  role: "Développeur full-stack",
  location: "Toulouse, France",
  /** À remplacer par le domaine définitif avant la mise en ligne. */
  url: "https://lucasguilhot.fr",
  description:
    "Développeur full-stack à Toulouse. Je conçois et construis des produits complets : applications web, SaaS, automatisation et traitement de données.",
} as const;

export const CONTACT = {
  email: "lucasguilhot7@gmail.com",
  github: "https://github.com/lucas04022002",
  /** À compléter : profil LinkedIn. */
  linkedin: "https://www.linkedin.com/",
  cv: "/cv.pdf",
} as const;

export const STACK_LINE = "Next.js · React · TypeScript · Node · Python · FastAPI · PostgreSQL · Docker";
