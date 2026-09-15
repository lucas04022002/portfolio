# Portfolio — Lucas Guilhot

Un site, deux parcours : **recruteur** et **porteur de projet**. Le choix vit
dans le navigateur, se pose sur `<html data-mode>` avant la première peinture,
et change le discours — jamais les faits.

```bash
npm run dev     # développement, http://127.0.0.1:3000
npm run build   # construction de production
npm run lint    # ESLint
npx tsc --noEmit
```

## Ce qu'il faut savoir avant de toucher au code

**Aucune métrique inventée.** Chaque chiffre affiché est reproductible : un
compte de tests réellement exécutés, une mesure de backtest, ou un calcul exact.
Si une mesure n'existe pas, on parle de la complexité du problème — on ne la
remplace pas par un nombre flatteur.

**Un projet = un objet.** Tout est déclaratif dans `data/projects.ts`. Ajouter
un projet, c'est ajouter un objet et déposer ses captures dans
`public/projects/`. Les pages d'étude de cas, le plan du site et les données
structurées suivent tout seuls.

**Deux récits, une source.** Chaque projet porte `recruiterDescription` et
`freelanceDescription`. Le contenu factuel est commun ; seul l'angle change.

## Architecture

```
app/
  layout.tsx              en-tête, pied de page, données structurées Person
  page.tsx                accueil (composée par components/home/HomeShell)
  projets/[slug]/         études de cas, générées statiquement
  mentions-legales/
  opengraph-image.tsx     aperçu de partage
  sitemap.ts robots.ts
components/
  layout/                 navigation, pied de page
  home/                   ouverture, porte d'entrée, sections
  projects/               carte projet, étude de cas
  ui/                     primitives et apparition au défilement
data/
  projects.ts  expertise.ts  site.ts
lib/
  mode.tsx                le double parcours (magasin externe + contexte)
```

## À compléter

- `data/site.ts` : renseigner `LEGAL.siren` dès que la micro-entreprise est
  immatriculée. La page des mentions légales bascule alors d'elle-même de la
  forme « personne physique » à la forme professionnelle.

## Variables d'environnement

Le formulaire de demande de projet envoie les messages par l'API Resend. Sans
ces variables, la route `/api/projet` répond 503 et le formulaire affiche un
lien d'écriture directe plutôt qu'un faux « message envoyé ».

| Variable | Rôle |
| --- | --- |
| `RESEND_API_KEY` | Clé d'API Resend. À saisir dans Coolify, jamais dans le dépôt. |
| `CONTACT_FROM` | Adresse d'expédition, sur un domaine vérifié chez Resend (par exemple `site@lucasguilhot.fr`). |
| `CONTACT_TO` | Destinataire. Par défaut, l'adresse de `CONTACT.email`. |

Ces trois variables sont lues à l'exécution, pas à la construction : elles
n'ont pas besoin d'être disponibles au moment du build.

## Déploiement

Pages pré-rendues, plus une route serveur pour le formulaire : `npm run build`
puis `npm run start`. Un VPS avec Coolify convient ; un hébergement purement
statique ne conviendrait plus, la route `/api/projet` ayant besoin d'un serveur.
