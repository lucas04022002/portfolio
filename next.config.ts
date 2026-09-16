import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Sortie autonome.
   *
   * Next trace ce que le serveur importe réellement et n'emporte que cela :
   * l'image finale n'a plus besoin du dépôt ni des dépendances de
   * construction. Sans elle, Coolify passait par Nixpacks, qui empaquette
   * toute la chaîne de compilation — 1,9 Go par déploiement, et neuf
   * déploiements ont suffi à remplir le disque du serveur.
   */
  output: "standalone",
};

export default nextConfig;
