"use client";

import { useState } from "react";
import { projectBySlug } from "@/data/projects";
import { Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

/**
 * « Derrière le produit » : les couches réelles d'un système que j'ai construit.
 * On clique une couche, elle s'explique. Lisible par un recruteur non technique,
 * crédible pour un développeur — parce que ce sont les vraies couches, pas un schéma générique.
 */
export function BehindTheProduct() {
  const project = projectBySlug("rushplay");
  const [active, setActive] = useState(0);

  if (!project) return null;
  const layers = project.architecture;

  return (
    <section id="architecture" className="border-y border-edge bg-deep py-24 md:py-36">
      <div className="page">
        <Reveal>
          <Eyebrow>Derrière le produit</Eyebrow>
          <h2 className="display-l max-w-[18ch]">Un écran, cinq couches.</h2>
          <p className="lede mt-5">
            Ce que voit l’utilisateur de RushPlay tient en une page. Ce qu’il faut pour la produire tient
            en cinq étages — cliquez pour les ouvrir.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal className="space-y-2">
            {layers.map((layer, i) => {
              const on = i === active;
              return (
                <button
                  key={layer.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`flex w-full items-center gap-5 rounded-xl border px-6 py-5 text-left transition-all duration-300 ${
                    on ? "border-bright bg-card" : "border-edge bg-void hover:border-faint"
                  }`}
                >
                  <span className={`font-mono text-[11px] tracking-[0.2em] ${on ? "text-accent" : "text-faint"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-[17px] font-medium ${on ? "text-bright" : "text-muted"}`}>{layer.name}</span>
                  <span
                    aria-hidden
                    className={`ml-auto transition-transform duration-300 ${on ? "translate-x-0 text-bright" : "-translate-x-1 text-faint"}`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-center rounded-2xl border border-edge bg-card p-8 md:p-10">
              <div key={active} className="rise">
                <p className="eyebrow">
                  Couche {String(active + 1).padStart(2, "0")} — {layers[active].name}
                </p>
                <p className="mt-5 text-[19px] leading-relaxed text-bright">{layers[active].detail}</p>
              </div>

              <div className="mt-10 hairline pt-6">
                <p className="text-[14px] text-faint">
                  Chaque couche est remplaçable sans toucher aux autres : c’est ce qui a permis de retirer
                  le modèle de prédiction sans réécrire le produit.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
