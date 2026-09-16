"use client";

import { useMode } from "@/lib/mode";

/**
 * Le rappel du mode de lecture, une fois le choix fait.
 *
 * La question elle-même est posée dans le premier écran, à l'intérieur du hero :
 * un visiteur venu faire construire un produit ne doit pas avoir à lire un
 * discours de candidature avant de pouvoir choisir. Ce bloc ne sert donc plus
 * qu'à dire où l'on est et à repartir dans l'autre sens.
 */
export function Gateway() {
  const { mode, chosen, setMode } = useMode();

  if (!chosen) return null;

  const other = mode === "recruiter" ? "freelance" : "recruiter";

  return (
    <div className="bg-deep">
      <div className="page flex flex-wrap items-center gap-x-4 gap-y-2 py-5 text-[13.5px]">
        <span className="text-faint">
          {mode === "recruiter"
            ? "Vous lisez la version destinée aux recruteurs."
            : "Vous lisez la version destinée aux porteurs de projet."}
        </span>
        <button
          type="button"
          onClick={() => setMode(other)}
          className="group inline-flex items-center gap-2 text-bright"
        >
          <span className="border-b border-edge pb-0.5 transition-colors group-hover:border-bright">
            {mode === "recruiter"
              ? "J’ai plutôt un projet à faire construire"
              : "Je recrute un développeur"}
          </span>
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </button>
      </div>
    </div>
  );
}
