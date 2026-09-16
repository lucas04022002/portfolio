/**
 * Source unique des projets. Ajouter un projet = ajouter un objet ici,
 * déposer ses captures dans /public/projects, rien d'autre à toucher.
 *
 * Règle absolue : aucune métrique inventée. Chaque chiffre de `metrics`
 * doit être reproductible (compte de tests, mesure de backtest, calcul exact).
 */

export type Metric = {
  /** La valeur telle qu'on la lit : « 1,004 », « −5,6 % », « 267 ». */
  value: string;
  label: string;
  /** D'où vient ce chiffre — c'est ce qui le rend crédible. */
  source: string;
  /** Met la mesure en accent : à réserver à celle qui porte l'histoire. */
  key?: boolean;
};

export type Challenge = {
  title: string;
  /** Le problème réel, pas la techno. */
  problem: string;
  /** Ce qui a été fait, et pourquoi cette solution-là. */
  solution: string;
};

export type Layer = { name: string; detail: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  /** Une ligne de valeur, affichée sur la carte. */
  summary: string;
  /** Le même produit, deux récits. */
  recruiterDescription: string;
  freelanceDescription: string;
  problem: string;
  solution: string;
  role: string[];
  stack: string[];
  /** Les couches réelles du système, pour la vue ingénierie. */
  architecture: Layer[];
  challenges: Challenge[];
  decisions: { question: string; answer: string }[];
  metrics: Metric[];
  lessons: string[];
  category: string;
  year: string;
  team?: string;
  github?: string;
  live?: string;
  featured: boolean;
  cover: string;
  images: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "rushplay",
    title: "RushPlay",
    tagline: "Rendre lisible ce que le marché des paris dit vraiment.",
    summary:
      "SaaS d’analyse : relève six bookmakers, retire leur marge, et affiche la probabilité réelle de chaque issue.",
    category: "SaaS · Données",
    year: "2026",
    recruiterDescription:
      "Une application complète : collecteurs planifiés sur six sources, moteur de calcul en Python, API FastAPI, front Next.js en composants serveur, authentification maison et base PostgreSQL. Le modèle de prédiction que j’avais construit a été supprimé après un test hors échantillon défavorable — la décision d’architecture la plus importante du projet.",
    freelanceDescription:
      "Un produit qui transforme une donnée brute et illisible — des centaines de cotes qui bougent toute la journée — en une information qu’un utilisateur comprend en trois secondes. Collecte automatisée, traitement, interface, et mise en production : de l’idée au produit en ligne.",
    problem:
      "Un bookmaker n’affiche jamais une probabilité honnête : il ajoute sa marge aux cotes. Le parieur voit donc un chiffre qui ne correspond à aucune réalité, et n’a aucun moyen simple de comparer deux opérateurs.",
    solution:
      "Relever les cotes de six opérateurs plusieurs fois par jour, retirer la marge pour obtenir la probabilité implicite du marché, puis montrer trois choses : la probabilité réelle, l’écart entre opérateurs, et le mouvement depuis le premier relevé.",
    role: ["Conception produit", "Frontend", "Backend", "Données", "Mise en production"],
    stack: ["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Docker"],
    architecture: [
      { name: "Interface", detail: "Next.js en composants serveur, rendu statique quand la donnée le permet, thème clair et sombre" },
      { name: "API", detail: "FastAPI, réponses enveloppées, sessions par jeton signé, quotas par compte" },
      { name: "Moteur", detail: "Retrait de marge, probabilités implicites, score le plus probable déduit du marché" },
      { name: "Base", detail: "PostgreSQL — matchs, équipes, relevés de cotes horodatés, carnet de paris" },
      { name: "Collecteurs", detail: "Six sources, tâches planifiées, reprise après panne, sonde de santé qui signale une source muette" },
    ],
    challenges: [
      {
        title: "Le modèle qui perdait",
        problem:
          "Un modèle Elo + Poisson + XGBoost devait repérer les erreurs de cotation des bookmakers. Sur la première mesure il semblait gagner : +7,3 % de rendement.",
        solution:
          "Le protocole était faussé — découpage par ligue, donc données du futur dans l’entraînement. Rejoué proprement sur une saison jamais vue, le modèle faisait moins bien que le marché et perdait de l’argent. Je l’ai supprimé du produit.",
      },
      {
        title: "Des sources qui ne parlent pas la même langue",
        problem:
          "Six opérateurs, autant de noms d’équipes, de fuseaux horaires et de formats de lignes. Un même match arrivait en trois exemplaires.",
        solution:
          "Une table d’alias par équipe, un rapprochement par date et compétition, et une étape de déduplication quotidienne. Les cas non résolus partent en quarantaine plutôt que de polluer la base.",
      },
      {
        title: "Tenir dans le quota gratuit",
        problem:
          "L’API de cotes est facturée au crédit. Un relevé complet coûte 21 crédits, le plan gratuit en donne environ 500 par mois.",
        solution:
          "Cinq relevés par semaine plutôt que quotidiens, un repli gratuit pour le calendrier et les résultats, et un arrêt propre quand le quota est épuisé : le site continue de fonctionner, seules les cotes cessent de se rafraîchir.",
      },
    ],
    decisions: [
      {
        question: "Pourquoi Python côté serveur plutôt que tout en TypeScript ?",
        answer:
          "Le cœur du produit est du calcul sur des séries de cotes : pandas et l’écosystème scientifique font en dix lignes ce qui en demanderait cent ailleurs. Le front reste en TypeScript, les deux communiquent par une API typée.",
      },
      {
        question: "Pourquoi supprimer le modèle plutôt que l’améliorer ?",
        answer:
          "Parce que le marché des paris est un des plus efficients qui soit : des milliers d’acteurs corrigent les erreurs en continu. Battre ce consensus avec des données publiques gratuites n’est pas un problème d’ajustement, c’est un problème d’information. Le produit avait plus de valeur en expliquant le marché qu’en prétendant le battre.",
      },
      {
        question: "Pourquoi pas de « value bet » affiché ?",
        answer:
          "Réglementation et honnêteté. Le site ne recommande aucun pari, affiche un bandeau de prévention sur chaque page publique et exige d’avoir 18 ans à l’inscription.",
      },
    ],
    metrics: [
      { value: "1,004", label: "log-loss du modèle", source: "contre 0,978 pour le bookmaker, sur la saison test", key: true },
      { value: "−5,6 %", label: "rendement hors échantillon", source: "1 752 matchs jamais vus à l’entraînement", key: true },
      { value: "267", label: "tests automatisés", source: "174 côté Python, 93 côté front, joués à chaque envoi" },
      { value: "6", label: "sources de cotes", source: "relevées plusieurs fois par jour, avec reprise après panne" },
      { value: "100 / 100", label: "accessibilité Lighthouse", source: "mesuré en thème clair et en thème sombre" },
    ],
    lessons: [
      "Un backtest qui donne un résultat flatteur est d’abord un backtest à auditer. Le mien concaténait les ligues et laissait passer des données du futur.",
      "Retirer une fonctionnalité peut augmenter la valeur du produit : sans promesse de gain, le site devient un outil de lecture que je peux défendre ligne par ligne.",
      "Si je reprenais le projet aujourd’hui, j’écrirais le protocole de validation avant le modèle, pas après.",
    ],
    live: "https://rushplay.fr",
    github: "https://github.com/lucas04022002/Saas",
    cover: "/projects/rushplay-accueil.jpg",
    images: [
      { src: "/projects/rushplay-accueil.jpg", alt: "Accueil de RushPlay : la probabilité du favori en très grand, puis les matchs du jour." },
      { src: "/projects/rushplay-match.png", alt: "Fiche d’un match : probabilités des trois issues, score le plus probable, comparatif des bookmakers." },
      { src: "/projects/rushplay-track.png", alt: "Track record : la performance du marché mesurée match par match." },
    ],
    featured: true,
  },
  {
    slug: "vault-rush",
    title: "Vault Rush",
    tagline: "Sept jeux, un seul moteur, zéro argent réel.",
    summary:
      "Arcade en monnaie fictive dont les taux de retour ne sont pas décrétés : ils sont calculés ou mesurés.",
    category: "Produit · Moteur de jeu",
    year: "2026",
    recruiterDescription:
      "Un socle serveur qui porte toute la comptabilité — mise, transaction, gain plafonné, reprise de partie — et sept moteurs de jeu qui s’y enfichent derrière une interface commune. Tout le hasard est côté serveur, l’état secret ne quitte jamais l’API, et les montants sont des entiers de centimes.",
    freelanceDescription:
      "Un produit complet livré seul : comptes, sessions, parties, classement, règles, et une identité visuelle par jeu. C’est l’exemple type d’une mécanique métier délicate — de l’argent, des états, de la concurrence — rendue fiable par les tests plutôt que par l’espoir.",
    problem:
      "Faire cohabiter sept jeux différents sans réécrire sept fois la partie qui compte : celle qui touche au solde du joueur et qui doit rester juste même si le navigateur se ferme au mauvais moment.",
    solution:
      "Un contrat de moteur unique. Chaque jeu déclare ses modes, son état secret et la façon dont un coup fait avancer la partie ; le socle s’occupe du reste. Ajouter un jeu, c’est trois fichiers et trois lignes d’enregistrement.",
    role: ["Architecture", "Backend", "Frontend", "Design", "Calibrage des jeux"],
    stack: ["React", "TypeScript", "Express", "SQLite", "Vitest", "Docker"],
    architecture: [
      { name: "Interface", detail: "React et Vite, un écran par genre de jeu, plateau dédié à chaque univers" },
      { name: "API", detail: "Express, validation des corps de requête, cookie de session signé, garde anti-CSRF" },
      { name: "Socle", detail: "Mise, débit, une seule partie active, crédit plafonné, journal — écrit une fois" },
      { name: "Moteurs", detail: "Sept implémentations du même contrat : échelle, code, chute, cartes" },
      { name: "Base", detail: "SQLite en mode WAL, migrations versionnées, état de partie sérialisé" },
    ],
    challenges: [
      {
        title: "Calibrer sans deviner",
        problem:
          "Annoncer un taux de retour au joueur sans l’avoir vérifié revient à mentir — et un jeu accidentellement favorable au joueur est un défaut, pas une promotion.",
        solution:
          "Chaque jeu a sa méthode de preuve : formule binomiale exacte pour la bille, énumération des 5 040 codes possibles contre un solveur optimal pour le jeu de code, 40 000 mains simulées en stratégie de base pour le blackjack. Les tests rejouent ces mesures.",
      },
      {
        title: "Le secret ne doit jamais fuir",
        problem:
          "Le code du coffre, la carte cachée du croupier et le chemin de la bille vivent côté serveur. Une seule réponse trop bavarde et le jeu est cassé.",
        solution:
          "L’état secret est sérialisé en base, jamais renvoyé : l’API ne publie qu’une vue publique calculée par le moteur. Un test par jeu vérifie qu’aucune réponse ne contient le secret tant que la partie n’est pas finie.",
      },
      {
        title: "Un test vert qui ne protégeait rien",
        problem:
          "Après une fusion, quatre blocs de style étaient cassés. Les 203 tests restaient verts : l’environnement de test n’analyse pas le CSS.",
        solution:
          "Une garde qui vérifie l’équilibre des accolades de chaque fichier de style et l’absence de marqueur de conflit. Prouvée en cassant le code exprès avant de la considérer comme acquise.",
      },
    ],
    decisions: [
      {
        question: "Pourquoi SQLite plutôt que PostgreSQL ?",
        answer:
          "Un seul conteneur, un fichier sur un volume, aucune base à administrer. Le mode WAL et les transactions immédiates suffisent largement à la charge d’un jeu de ce type — et la procédure de sauvegarde est documentée et vérifiée.",
      },
      {
        question: "Pourquoi des entiers de centimes ?",
        answer:
          "Parce qu’un flottant finit toujours par perdre un centime quelque part. Tous les montants sont des entiers, du solde au multiplicateur arrondi vers le bas.",
      },
    ],
    metrics: [
      { value: "7", label: "jeux sur un seul moteur", source: "un jeu de plus = 3 fichiers neufs", key: true },
      { value: "391", label: "tests automatisés", source: "172 côté serveur, 219 côté client" },
      { value: "5 040", label: "combinaisons énumérées", source: "calibrage exact du jeu de code, sans simulation" },
      { value: "40 000", label: "mains simulées", source: "mesure du taux de retour du blackjack" },
    ],
    lessons: [
      "Un test qui passe quoi qu’il arrive est pire qu’une absence de test : il donne une confiance fausse.",
      "Le socle commun a coûté deux jours et fait gagner cinq jeux. Écrire l’abstraction après le deuxième cas, pas avant le premier.",
      "Une sauvegarde n’existe que si on l’a relue : copier le fichier de base sans son journal donnait zéro compte.",
    ],
    live: "https://vault-rush.lucasguilhot.fr",
    github: "https://github.com/lucas04022002/vault-rush",
    cover: "/projects/vaultrush-arcade.png",
    images: [
      { src: "/projects/vaultrush-arcade.png", alt: "L’arcade : les sept jeux rangés par genre." },
      { src: "/projects/vaultrush-portes.png", alt: "Plateau de Vault Rush : trois portes de coffre, dont l’une s’ouvre." },
      { src: "/projects/vaultrush-drop.png", alt: "Diamond Drop : la bille tombe entre les clous vers une case à multiplicateur." },
    ],
    featured: true,
  },
  {
    slug: "selv-skinmatch",
    title: "selv. & SkinMatch",
    tagline: "Une marque de soins, et le conseiller qui construit la routine.",
    summary:
      "Boutique Shopify en ligne, et un moteur de recommandation qui compose une routine selon la peau et le budget.",
    category: "E-commerce · Moteur de recommandation",
    year: "2026",
    recruiterDescription:
      "Deux briques : une boutique Shopify réellement en ligne (29 références, fiches et routines), et SkinMatch — un moteur de recommandation déterministe écrit en Python, exposé par une API FastAPI et embarqué dans la boutique par un widget JavaScript autonome. La couche LLM rédige et interprète, mais ne choisit jamais un produit.",
    freelanceDescription:
      "Un cas complet : construire la marque, mettre la boutique en ligne, puis y greffer un outil qui augmente le panier moyen en guidant le client au lieu de le laisser choisir seul parmi trente produits.",
    problem:
      "Devant trente références de soins, un client ne sait pas quoi prendre, dans quel ordre, ni ce qui se mélange mal. Un quiz classique recommande n’importe quoi : il ne connaît ni les incompatibilités d’actifs, ni le budget.",
    solution:
      "Un moteur à règles explicites : il construit une routine matin et soir à partir du catalogue, sans jamais dépasser le budget annoncé ni placer deux actifs incompatibles dans le même créneau, et il explique chaque produit retenu.",
    role: ["Marque et boutique", "Moteur de recommandation", "API", "Widget embarqué"],
    stack: ["Shopify", "Python", "FastAPI", "JavaScript", "Docker"],
    architecture: [
      { name: "Boutique", detail: "Shopify — 29 références, fiches produit, pages routines, paiement et livraison gérés par la plateforme" },
      { name: "Widget", detail: "JavaScript autonome injecté dans le thème : questionnaire, résultat, ajout au panier" },
      { name: "API", detail: "FastAPI — POST /diagnose, validation stricte des réponses, catalogue servi au widget" },
      { name: "Moteur", detail: "Règles, scoring, composition de routine — déterministe, donc rejouable et testable" },
      { name: "Couche LLM", detail: "Rédige la narration et traduit une demande en paramètres ; toute panne retombe sur les raisons structurées" },
    ],
    challenges: [
      {
        title: "L’IA n’a pas le droit de choisir",
        problem:
          "Un modèle génératif qui recommande des cosmétiques peut inventer un produit, contredire une contre-indication, ou dépasser le budget sans s’en apercevoir.",
        solution:
          "Le partage est net : le moteur décide, le modèle rédige. Une demande en langage naturel est traduite en paramètres, puis le moteur recalcule tout. Si le modèle tombe, l’utilisateur reçoit les raisons structurées sans voir la panne.",
      },
      {
        title: "Des contraintes dures, pas des préférences",
        problem:
          "Certaines associations d’actifs s’annulent ou irritent, et un budget annoncé ne doit jamais être dépassé — un moteur qui « fait au mieux » ne suffit pas.",
        solution:
          "Ces règles sont écrites comme des contraintes que la routine doit respecter, et vérifiées par des tests : budget jamais dépassé, actifs incompatibles jamais dans le même créneau.",
      },
    ],
    decisions: [
      {
        question: "Pourquoi un moteur à règles plutôt qu’un modèle appris ?",
        answer:
          "Il n’existe aucune donnée d’usage au lancement : un modèle n’aurait appris que du bruit. Des règles explicites se vérifient, s’expliquent au client, et se corrigent en une ligne quand le catalogue change.",
      },
      {
        question: "Pourquoi un widget autonome plutôt qu’une application Shopify ?",
        answer:
          "Un fichier JavaScript déposé dans le thème n’impose ni validation de la marketplace ni abonnement, et reste portable vers une autre boutique.",
      },
    ],
    metrics: [
      { value: "29", label: "références en ligne", source: "catalogue actif de la boutique selv., relevé sur Shopify" },
      { value: "61", label: "tests automatisés", source: "moteur, API et couche LLM" },
      { value: "0", label: "produit choisi par le modèle", source: "le LLM rédige, le moteur décide — vérifié par test", key: true },
    ],
    lessons: [
      "Séparer « qui décide » de « qui rédige » rend une fonctionnalité d’IA défendable devant un client, et réparable quand le fournisseur tombe.",
      "Une contrainte métier vaut mieux écrite comme une règle testée que confiée au bon sens d’un modèle.",
    ],
    live: "https://selv.shop",
    cover: "/projects/selv-boutique.png",
    images: [
      { src: "/projects/selv-boutique.png", alt: "La boutique selv. en ligne : la page d’accueil et ses soins." },
    ],
    featured: true,
  },
  {
    slug: "applybot",
    title: "ApplyBot",
    tagline: "Le suivi de candidatures des organismes de formation.",
    summary:
      "SaaS B2B : un organisme inscrit ses stagiaires, qui collectent des offres et suivent leurs candidatures.",
    category: "SaaS · B2B",
    year: "2026",
    recruiterDescription:
      "Application Next.js avec authentification maison, rôles — stagiaire, responsable d’organisme, administration — base PostgreSQL, collecteurs d’offres sur sept sources publiques, et purge RGPD testée. La génération de lettres est heuristique : plus aucune dépendance à un fournisseur d’IA.",
    freelanceDescription:
      "Un outil métier vendu à des organismes, pas un gadget : places par organisme, activation, suivi des stagiaires, export et suppression des données sur demande. Le genre de produit où la règle métier compte plus que la technologie.",
    problem:
      "Les organismes de formation doivent prouver que leurs stagiaires cherchent réellement un emploi. Le suivi se fait au tableur, se perd, et ne dit rien de l’avancement réel.",
    solution:
      "Un espace par organisme, un tableau de bord par stagiaire, un pipeline d’offres collectées automatiquement, et un suivi de statut par candidature.",
    role: ["Conception produit", "Frontend", "Backend", "Base de données", "RGPD"],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Node", "Docker"],
    architecture: [
      { name: "Interface", detail: "Next.js, espaces séparés pour le stagiaire, le responsable et l’administration" },
      { name: "Authentification", detail: "Sessions signées, limitation du nombre d’essais, rattachement par code d’organisme" },
      { name: "Collecte", detail: "Sept sources publiques d’offres, registre de collecteurs, déduplication par URL" },
      { name: "Génération", detail: "Modèles de lettres et de messages, score d’adéquation heuristique — aucun appel à une IA" },
      { name: "Base", detail: "PostgreSQL, migrations, export et purge des données personnelles" },
    ],
    challenges: [
      {
        title: "Retirer l’IA du produit",
        problem:
          "La première version faisait rédiger les candidatures par un modèle génératif : un coût par utilisateur, une dépendance à un fournisseur, et un texte que le stagiaire pouvait obtenir gratuitement ailleurs.",
        solution:
          "Remplacement par des modèles paramétrés et un score d’adéquation heuristique. Le produit a perdu son argument marketing et gagné sa marge : la valeur est dans le suivi, pas dans la rédaction.",
      },
      {
        title: "Le droit à l’effacement, pour de vrai",
        problem:
          "Un organisme manipule des données personnelles de demandeurs d’emploi. Une suppression incomplète est une faute, pas un défaut.",
        solution:
          "Export et purge écrits comme des opérations testées, avec des cas de test qui vérifient qu’aucune ligne rattachée ne survit à la suppression d’un compte.",
      },
    ],
    decisions: [
      {
        question: "Pourquoi une authentification maison plutôt qu’un service ?",
        answer:
          "Le produit vit chez des organismes qui n’ont pas de budget par utilisateur actif. Des sessions signées, un hachage moderne et une limitation d’essais couvrent le besoin sans facture mensuelle ni dépendance externe.",
      },
    ],
    metrics: [
      { value: "202", label: "tests automatisés", source: "de la base de données aux composants d’interface" },
      { value: "7", label: "sources d’offres", source: "collecteurs publics, dédupliqués par URL" },
      { value: "0 €", label: "coût par candidature", source: "après le retrait du fournisseur d’IA", key: true },
    ],
    lessons: [
      "Une fonctionnalité impressionnante qui coûte plus qu’elle ne rapporte doit sortir du produit.",
      "Les règles métier — places, activation, rôles — méritent autant de tests que le code technique.",
    ],
    live: "https://applybot.lucasguilhot.fr",
    cover: "/projects/applybot-accueil.png",
    images: [
      { src: "/projects/applybot-accueil.png", alt: "Accueil d’ApplyBot : les offres classées par correspondance avec le profil du stagiaire." },
      { src: "/projects/applybot-connexion.png", alt: "Écran de connexion d’ApplyBot." },
    ],
    featured: true,
  },
  {
    slug: "le-local",
    title: "Le Local",
    tagline: "La réservation d’un tiers-lieu, reprise et durcie.",
    summary:
      "Plateforme de réservation d’espaces et d’événements avec paiement Stripe — projet d’équipe, repris pour être déployable.",
    category: "Équipe · Plateforme",
    year: "2025",
    team: "Projet d’équipe (Wild Code School), puis repris seul",
    recruiterDescription:
      "Le projet collectif de ma formation, repris ensuite pour le rendre réellement déployable : sécurité des routes, migrations de base, cookie de session durci, concurrence sur les réservations, image Docker réduite de 113 Mo à 8,7 Mo, et une suite de tests là où il n’y en avait pas.",
    freelanceDescription:
      "Un cas typique de reprise d’existant : du code écrit vite, à plusieurs, qu’il faut sécuriser, tester et remettre en production sans tout réécrire. C’est exactement le type de mission que je prends.",
    problem:
      "Un projet d’école fonctionne sur la machine de ses auteurs et nulle part ailleurs : pas de migrations, des secrets en clair, aucune protection sur les routes d’administration, et deux réservations possibles sur le même créneau.",
    solution:
      "Reprise poste par poste : migrations versionnées, contrôle de rôle sur chaque route sensible, montant de paiement recalculé côté serveur, verrou sur la réservation concurrente, et une image de production sans outillage de développement.",
    role: ["Développement en équipe", "Reprise et sécurisation", "Tests", "Docker"],
    stack: ["React", "TypeScript", "Express", "MySQL", "Stripe", "Docker"],
    architecture: [
      { name: "Interface", detail: "React et React Router — espaces, événements, panier, factures" },
      { name: "API", detail: "Express, contrôle de rôle par route, gestion d’erreurs centralisée" },
      { name: "Paiement", detail: "Stripe — montant recalculé côté serveur, preuve de paiement rattachée à la réservation" },
      { name: "Base", detail: "MySQL, migrations versionnées, contrainte d’unicité sur le créneau" },
    ],
    challenges: [
      {
        title: "Deux clients, un seul créneau",
        problem:
          "Deux réservations simultanées sur le même espace passaient toutes les deux : la vérification de disponibilité et l’écriture n’étaient pas dans la même transaction.",
        solution:
          "Vérification et insertion dans une seule transaction, contrainte d’unicité en base comme dernier rempart, et un test de concurrence qui lance les deux requêtes en parallèle.",
      },
      {
        title: "Le montant venait du navigateur",
        problem: "Le total payé était envoyé par le client : n’importe qui pouvait payer un euro.",
        solution: "Recalcul intégral du panier côté serveur avant création du paiement, et un test qui tente la falsification.",
      },
    ],
    decisions: [
      {
        question: "Pourquoi reprendre plutôt que réécrire ?",
        answer:
          "Le produit fonctionnait et l’équipe avait fait le travail de conception. Réécrire aurait coûté des semaines pour le même résultat fonctionnel : la valeur était dans la fiabilité, pas dans le code neuf.",
      },
    ],
    metrics: [
      { value: "207", label: "tests automatisés", source: "ajoutés à la reprise, du panier au paiement" },
      { value: "113 → 8,7 Mo", label: "image Docker", source: "construction en plusieurs étapes, sans outillage de développement", key: true },
    ],
    lessons: [
      "Travailler à plusieurs oblige à écrire pour les autres : nommage, revue, messages de commit.",
      "Sur un existant, les tests se paient d’eux-mêmes dès la première correction.",
    ],
    live: "https://lelocal.lucasguilhot.fr",
    github: "https://github.com/lucas04022002/wildwalker",
    cover: "/projects/le-local-accueil.webp",
    images: [
      { src: "/projects/le-local-accueil.webp", alt: "Accueil du Local : le tiers-lieu, ses espaces et ses événements." },
      { src: "/projects/le-local-espaces.webp", alt: "La liste des espaces réservables, avec leurs créneaux." },
    ],
    featured: true,
  },
];

/**
 * L'ordre de lecture dépend de qui lit.
 *
 * Un recruteur doit voir d'abord l'étendue technique — architecture complète,
 * produit métier, reprise d'existant — avant l'arcade : deux produits liés au
 * pari et au casino en tête réduiraient le profil à ce seul terrain, alors
 * qu'il est bien plus large. Un client, lui, reconnaît d'abord un vrai
 * commerce en ligne qui tourne : c'est la preuve la plus parlante.
 */
const ORDRE: Record<"recruiter" | "freelance", string[]> = {
  recruiter: ["rushplay", "applybot", "le-local", "selv-skinmatch", "vault-rush"],
  freelance: ["selv-skinmatch", "rushplay", "applybot", "le-local", "vault-rush"],
};

export function featuredFor(mode: "recruiter" | "freelance"): Project[] {
  const rang = ORDRE[mode];
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => rang.indexOf(a.slug) - rang.indexOf(b.slug));
}


export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
