# syntax=docker/dockerfile:1

# Portfolio — image de production (Next.js, sortie autonome).
#
# Trois étapes, et une seule arrive dans l'image finale. Les dépendances de
# construction — TypeScript, ESLint, Tailwind, la chaîne Next — servent à
# produire le site puis sont abandonnées avec leur étape.
#
# Le gain n'est pas cosmétique : la construction automatique de Coolify
# (Nixpacks) produisait 1,9 Go par déploiement, et Coolify conserve chaque
# image pour permettre un retour arrière. Neuf déploiements d'affilée ont
# rempli les 38 Go du serveur, cassé Redis et bloqué les autres déploiements.

# ---- deps : les dépendances, mises en cache tant que les verrous ne bougent pas ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- build : le site ----
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Aucune variable n'est nécessaire ici : le formulaire lit RESEND_API_KEY,
# CONTACT_FROM et CONTACT_TO à l'exécution, dans une route serveur. Rien de
# tout cela n'entre dans le bundle, et rien ne doit être fourni à cette étape.
RUN npm run build

# ---- runner : ce qui tourne réellement ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# La sortie autonome porte son propre node_modules, élagué à ce que le serveur
# importe vraiment. `static` et `public` restent à recopier : Next les sert
# depuis le disque, ils ne font pas partie du graphe de modules.
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# On vérifie que le serveur répond, pas seulement que le processus est vivant.
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["node", "server.js"]
