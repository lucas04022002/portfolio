/** Ce que j'apporte à une équipe — vue recruteur. Pas de pourcentages : ils ne veulent rien dire. */
export const expertise: { area: string; items: string[]; proof: string }[] = [
  {
    area: "Frontend",
    items: ["React", "Next.js (App Router)", "TypeScript", "Tailwind", "Composants accessibles", "Thèmes clair/sombre"],
    proof: "RushPlay : accessibilité 100/100 mesurée dans les deux thèmes.",
  },
  {
    area: "Backend",
    items: ["Python · FastAPI", "Node · Express", "API REST", "Authentification et sessions", "Contrôle de rôle", "Validation des entrées"],
    proof: "ApplyBot : trois rôles, sessions signées, limitation d’essais.",
  },
  {
    area: "Données & IA",
    items: ["PostgreSQL, SQLite, MySQL", "Collecteurs planifiés", "pandas", "XGBoost, Poisson, Elo", "Validation hors échantillon", "Déduplication"],
    proof: "RushPlay : six sources, et un modèle rejeté par son propre test.",
  },
  {
    area: "Livraison",
    items: ["Docker", "GitHub Actions", "VPS et Coolify", "Migrations versionnées", "Sondes de santé", "Sauvegardes vérifiées"],
    proof: "Le Local : image de production ramenée de 113 Mo à 8,7 Mo.",
  },
];

/** Ce que je peux construire — vue client. Les solutions d'abord, les technologies ensuite. */
export const services: { title: string; body: string; examples: string }[] = [
  {
    title: "Application web",
    body: "Interfaces, tableaux de bord, plateformes métier et outils sur mesure — pensés pour l’usage réel, pas pour la démonstration.",
    examples: "Suivi de candidatures pour organismes de formation, réservation d’espaces avec paiement.",
  },
  {
    title: "SaaS complet",
    body: "Comptes, rôles, abonnements, quotas, tableau de bord et back-office. Le produit entier, pas seulement l’écran d’accueil.",
    examples: "RushPlay : collecte, traitement, interface et mise en ligne.",
  },
  {
    title: "Automatisation",
    body: "Les tâches répétitives qui coûtent des heures chaque semaine : relevés, collecte, exports, mise en forme et envoi.",
    examples: "Six sources de cotes relevées et fusionnées seules, tous les jours.",
  },
  {
    title: "Données & modèles",
    body: "Traitement, mesure et modèles prédictifs — avec une validation honnête avant toute promesse de résultat.",
    examples: "Un modèle construit, testé hors échantillon, puis retiré du produit.",
  },
  {
    title: "Reprise d’existant",
    body: "Un projet laissé en plan, sans tests ni documentation : audit, sécurisation, tests, remise en production.",
    examples: "Le Local : sécurité, migrations, concurrence, image de production.",
  },
];

/** Comment se déroule une mission — la section qui rassure. */
export const process: { step: string; title: string; body: string }[] = [
  { step: "01", title: "Comprendre", body: "Trente minutes pour cerner le problème, les utilisateurs et ce qui compte vraiment. Gratuit, sans engagement." },
  { step: "02", title: "Concevoir", body: "Architecture, fonctionnalités essentielles, parcours utilisateur. Un plan écrit et un prix ferme avant la première ligne de code." },
  { step: "03", title: "Construire", body: "Développement par tranches visibles, avec un point d’avancement régulier et une version à regarder à chaque étape." },
  { step: "04", title: "Tester", body: "Tests automatisés, comportement sur mobile, performance et cas d’erreur — avant la mise en ligne, pas après." },
  { step: "05", title: "Lancer", body: "Mise en production, documentation, accès transmis. Le code et la base vous appartiennent." },
];

export const faq: { q: string; a: string }[] = [
  {
    q: "Combien coûte un projet ?",
    a: "Au forfait, établi après le premier échange : vous connaissez le prix total avant de commencer. Une application simple se compte en jours, un SaaS complet en semaines.",
  },
  {
    q: "Qui possède le code à la fin ?",
    a: "Vous. Le dépôt, la documentation et les accès d’hébergement vous sont transmis à la livraison. Rien ne dépend de moi une fois le projet livré.",
  },
  {
    q: "Travaillez-vous sur un projet déjà commencé ?",
    a: "Oui, c’est même une de mes spécialités : reprendre un projet existant, le sécuriser, le tester et le remettre en production sans tout réécrire.",
  },
  {
    q: "Et pour l’hébergement et la maintenance ?",
    a: "Je mets en production sur votre hébergeur ou sur un serveur dédié, avec la procédure écrite. Un suivi mensuel est possible, il n’est jamais obligatoire.",
  },
  {
    q: "Utilisez-vous de l’IA dans les produits ?",
    a: "Quand elle apporte quelque chose. Sur un de mes produits, je l’ai retirée : elle coûtait un abonnement par utilisateur pour un résultat que le client obtenait gratuitement ailleurs.",
  },
];
