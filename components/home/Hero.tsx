"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useMode } from "@/lib/mode";
import { Button } from "@/components/ui/primitives";
import { CONTACT, STACK_LINE } from "@/data/site";

/**
 * L'ouverture. Deux discours pour un seul écran : le recruteur veut savoir ce
 * que je sais construire, le client veut savoir ce que je peux faire pour lui.
 *
 * L'entrée est écrite en CSS (utilitaire `rise`) et non en JavaScript : une page
 * ne doit jamais dépendre d'une animation pour être lisible. La séquence dure
 * moins d'une seconde — c'est une entrée, pas un écran de chargement.
 */
const pas = (i: number): CSSProperties => ({ "--d": `${0.06 * i}s` } as CSSProperties);

export function Hero() {
  const { mode } = useMode();

  const lines =
    mode === "recruiter"
      ? ["Je transforme", "des idées", "en produits."]
      : ["Vous avez l’idée.", "Je construis", "le produit."];

  const lede =
    mode === "recruiter"
      ? "Développeur full-stack. Je conçois et développe des applications web, des APIs et des produits qui traitent de la donnée — de la base de données à la mise en production."
      : "Applications web, SaaS, automatisation et traitement de données. Je pars d’un problème métier et je livre un produit en ligne, testé et documenté.";

  const stack = mode === "recruiter" ? STACK_LINE : "Applications web · SaaS · Automatisation · Données & IA";

  return (
    <section className="relative overflow-hidden bg-void pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="page grid items-center gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-20">
        <div>
          <p className="eyebrow rise" style={pas(0)}>
            {mode === "recruiter" ? "Développeur full-stack · Toulouse" : "Freelance · Produits numériques"}
          </p>

          <h1 className="display-xl mt-7">
            {lines.map((line, i) => (
              <span key={line} className="rise block" style={pas(i + 1)}>
                {line}
              </span>
            ))}
          </h1>

          <p className="lede rise mt-9" style={pas(4)}>
            {lede}
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-3" style={pas(5)}>
            {mode === "recruiter" ? (
              <>
                <Button href="#projets">Voir mes projets</Button>
                <Button href={CONTACT.cv} variant="outline">
                  Télécharger mon CV
                </Button>
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="ml-1 text-[14px] text-muted transition-colors hover:text-bright"
                >
                  GitHub ↗
                </a>
              </>
            ) : (
              <>
                <Button href="#contact">Parler de mon projet</Button>
                <Button href="#projets" variant="outline">
                  Voir mes réalisations
                </Button>
              </>
            )}
          </div>

          <p className="rise mt-12 font-mono text-[12px] tracking-[0.08em] text-faint" style={pas(6)}>
            {stack}
          </p>

          <p className="rise mt-6 inline-flex items-center gap-2.5 text-[13.5px] text-muted" style={pas(7)}>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {mode === "recruiter"
              ? "Disponible pour un CDI, un CDD ou une mission longue"
              : "Disponible pour de nouveaux projets"}
          </p>
        </div>

        {/* La moitié droite n'est jamais vide : c'est là qu'est le produit. */}
        <figure className="rise m-0" style={pas(3)}>
          <div className="overflow-hidden rounded-2xl border border-edge bg-card shot-shadow">
            <Image
              src="/projects/rushplay-accueil.jpg"
              alt="RushPlay : la probabilité réelle du favori, une fois la marge du bookmaker retirée."
              width={1440}
              height={2893}
              priority
              sizes="(max-width: 1024px) 100vw, 620px"
              className="h-[clamp(320px,46vw,560px)] w-full object-cover object-top"
            />
          </div>
          <figcaption className="mt-4 text-[13.5px] text-faint">
            RushPlay — SaaS d’analyse du marché des paris sportifs.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
