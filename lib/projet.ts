/**
 * La forme d'une demande de projet, partagée par le formulaire et la route qui
 * la reçoit. Valider deux fois la même chose à deux endroits finit toujours par
 * produire deux règles différentes : il n'y en a qu'une, ici.
 */

export const TYPES_PROJET = [
  "Application web",
  "SaaS complet",
  "Automatisation",
  "Données & modèles",
  "Reprise d’un projet existant",
  "Je ne sais pas encore",
] as const;

export const BUDGETS = [
  "Moins de 2 000 €",
  "2 000 € à 5 000 €",
  "5 000 € à 10 000 €",
  "Plus de 10 000 €",
  "À définir ensemble",
] as const;

export const DELAIS = [
  "Dès que possible",
  "Dans 1 à 2 mois",
  "Dans 3 mois ou plus",
  "Pas encore défini",
] as const;

export type DemandeProjet = {
  nom: string;
  email: string;
  entreprise: string;
  type: string;
  budget: string;
  delai: string;
  description: string;
};

export const CHAMPS_VIDES: DemandeProjet = {
  nom: "",
  email: "",
  entreprise: "",
  type: "",
  budget: "",
  delai: "",
  description: "",
};

/** Limites hautes : elles protègent la boîte mail autant que le serveur. */
const MAX = { nom: 120, email: 200, entreprise: 160, type: 60, budget: 40, delai: 40, description: 4000 };

/**
 * Une adresse est valide si elle a une partie locale, une arobase, un domaine
 * et une extension. On ne cherche pas à faire mieux : seule la livraison du
 * message prouve vraiment qu'une adresse existe.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type Erreurs = Partial<Record<keyof DemandeProjet, string>>;

export function valider(d: DemandeProjet): Erreurs {
  const e: Erreurs = {};

  const nom = d.nom.trim();
  if (nom.length < 2) e.nom = "Indiquez votre nom.";
  else if (nom.length > MAX.nom) e.nom = "Ce nom est trop long.";

  const email = d.email.trim();
  if (!email) e.email = "Indiquez une adresse email.";
  else if (email.length > MAX.email || !EMAIL.test(email))
    e.email = "Cette adresse ne semble pas valide.";

  if (d.entreprise.trim().length > MAX.entreprise) e.entreprise = "Ce nom est trop long.";

  if (!d.type.trim()) e.type = "Choisissez un type de projet.";
  else if (!TYPES_PROJET.includes(d.type as (typeof TYPES_PROJET)[number]))
    e.type = "Choisissez un type de projet dans la liste.";

  if (d.budget.trim() && !BUDGETS.includes(d.budget as (typeof BUDGETS)[number]))
    e.budget = "Choisissez un budget dans la liste.";

  if (d.delai.trim() && !DELAIS.includes(d.delai as (typeof DELAIS)[number]))
    e.delai = "Choisissez un délai dans la liste.";

  const description = d.description.trim();
  if (description.length < 20)
    e.description = "Décrivez votre projet en quelques phrases (20 caractères minimum).";
  else if (description.length > MAX.description) e.description = "Cette description est trop longue.";

  return e;
}
