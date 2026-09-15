"use client";

/**
 * Le portefeuille a deux visages : recruteur et client. Le choix vit dans
 * `localStorage` et sur l'attribut `data-mode` de <html>, posé par un script
 * joué avant la première peinture — donc aucun clignotement au chargement.
 *
 * Le stockage est un système extérieur à React : on le lit avec
 * `useSyncExternalStore`, qui sait rendre une valeur par défaut côté serveur
 * puis rattraper la vraie valeur à l'hydratation, sans cascade de rendus.
 */
import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

export type Mode = "recruiter" | "freelance";

export const MODE_KEY = "lg-mode";
export const MODE_ATTR = "data-mode";

/** Joué en <head>. Volontairement sans sucre syntaxique : il part tel quel dans le HTML. */
export const MODE_SCRIPT =
  `(function(){try{var m=localStorage.getItem(${JSON.stringify(MODE_KEY)});` +
  `if(m==="recruiter"||m==="freelance")document.documentElement.setAttribute(${JSON.stringify(MODE_ATTR)},m);` +
  `}catch(e){}})()`;

type Etat = { mode: Mode; chosen: boolean };

const DEFAUT: Etat = { mode: "recruiter", chosen: false };

/* --------------------------------------------------------- magasin externe */

const abonnes = new Set<() => void>();
let cache: Etat = DEFAUT;

function lire(): Etat {
  try {
    const v = window.localStorage.getItem(MODE_KEY);
    if (v === "recruiter" || v === "freelance") return { mode: v, chosen: true };
  } catch {
    /* stockage bloqué : on reste sur la version recruteur, sans erreur */
  }
  return DEFAUT;
}

/** L'instantané doit garder la même identité tant que rien ne change. */
function instantane(): Etat {
  const frais = lire();
  if (frais.mode !== cache.mode || frais.chosen !== cache.chosen) cache = frais;
  return cache;
}

function instantaneServeur(): Etat {
  return DEFAUT;
}

function abonner(onChange: () => void): () => void {
  abonnes.add(onChange);
  // Un autre onglet qui bascule doit se voir ici aussi.
  window.addEventListener("storage", onChange);
  return () => {
    abonnes.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function ecrire(m: Mode) {
  try {
    window.localStorage.setItem(MODE_KEY, m);
  } catch {
    /* le choix ne survivra pas au rechargement, tant pis */
  }
  document.documentElement.setAttribute(MODE_ATTR, m);
  cache = { mode: m, chosen: true };
  for (const notifier of abonnes) notifier();
}

/* ------------------------------------------------------------------ contexte */

type Ctx = Etat & { setMode: (m: Mode) => void };

const ModeContext = createContext<Ctx | null>(null);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const etat = useSyncExternalStore(abonner, instantane, instantaneServeur);
  const setMode = useCallback((m: Mode) => ecrire(m), []);
  const value = useMemo(() => ({ ...etat, setMode }), [etat, setMode]);
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode(): Ctx {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode doit être utilisé dans <ModeProvider>");
  return ctx;
}

export const modeLabel: Record<Mode, string> = {
  recruiter: "Je recrute",
  freelance: "J'ai un projet",
};
