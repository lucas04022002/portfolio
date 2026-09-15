"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink, MetricBlock } from "@/components/ui/primitives";

type View = "product" | "engineering";

/**
 * Une étude de cas se lit de deux façons. Le responsable produit veut le problème
 * et le résultat ; le développeur veut l'architecture et les arbitrages. Le
 * contenu source est le même — c'est l'ordre et le niveau de détail qui changent.
 */
export function CaseStudy({ project }: { project: Project }) {
  const [view, setView] = useState<View>("product");

  const chapters =
    view === "product"
      ? ["Le produit", "Le problème", "La solution", "En images", "Le résultat", "Ce que j'en retiens"]
      : ["Le produit", "L'architecture", "Les difficultés", "Les arbitrages", "Les mesures", "Ce que j'en retiens"];

  return (
    <article className="pb-24">
      {/* ---------------------------------------------------------- en-tête */}
      <header className="border-b border-edge bg-deep pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="page">
          <Link href="/#projets" className="group inline-flex items-center gap-2 text-[14px] text-muted">
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Tous les projets
          </Link>

          <div className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <h1 className="display-xl">{project.title}</h1>
            <p className="eyebrow mb-0">
              {project.category} · {project.year}
            </p>
          </div>

          <p className="lede mt-7 max-w-[52ch] text-[clamp(1.15rem,2vw,1.5rem)] text-bright">{project.tagline}</p>

          {project.team && <p className="mt-4 text-[14.5px] text-faint">{project.team}</p>}

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            {project.live && <ArrowLink href={project.live} external>Voir le site</ArrowLink>}
            {project.github && <ArrowLink href={project.github} external>Voir le code</ArrowLink>}
            {!project.live && (
              <span className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-faint">
                Mise en ligne en préparation
              </span>
            )}
          </div>

          {/* le double regard : produit ou ingénierie */}
          <div className="mt-12 inline-flex items-center rounded-full border border-edge p-1">
            {(["product", "engineering"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={`rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  view === v ? "bg-bright text-void" : "text-faint hover:text-bright"
                }`}
              >
                {v === "product" ? "Vue produit" : "Vue ingénierie"}
              </button>
            ))}
          </div>

          <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {chapters.map((c, i) => (
              <li key={c} className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> {c}
              </li>
            ))}
          </ol>
        </div>
      </header>

      {/* `key` recrée le bloc à chaque bascule : l'animation CSS rejoue toute seule,
          sans dépendre d'une bibliothèque ni risquer une divergence d'hydratation. */}
      <div key={view} className="rise">
        {/* ------------------------------------------------------ 01 produit */}
        <Chapter n="01" title="Le produit">
          <p className="max-w-[62ch] text-[19px] leading-relaxed text-bright">{project.summary}</p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            <Meta label="Mon rôle" values={project.role} />
            <Meta label="Stack" values={project.stack} />
          </div>
        </Chapter>

        {view === "product" ? (
          <>
            <Chapter n="02" title="Le problème" tone="deep">
              <p className="max-w-[62ch] text-[19px] leading-relaxed text-bright">{project.problem}</p>
            </Chapter>

            <Chapter n="03" title="La solution">
              <p className="max-w-[62ch] text-[19px] leading-relaxed text-bright">{project.solution}</p>
              <p className="mt-8 max-w-[62ch] text-[16px] leading-relaxed text-muted">
                {project.freelanceDescription}
              </p>
            </Chapter>

            {project.images.length > 0 && (
              <Chapter n="04" title="En images" tone="deep">
                <div className="space-y-10">
                  {project.images.map((img, i) => (
                    <Reveal key={img.src} delay={0.05 * i}>
                      <figure>
                        <div className="overflow-hidden rounded-2xl border border-edge bg-card shot-shadow">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={1440}
                            height={900}
                            sizes="(max-width: 1240px) 100vw, 1160px"
                            className="h-auto w-full object-cover object-top"
                          />
                        </div>
                        <figcaption className="mt-4 text-[14px] text-faint">{img.alt}</figcaption>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              </Chapter>
            )}

            <Chapter n="05" title="Le résultat">
              <Metrics project={project} />
            </Chapter>
          </>
        ) : (
          <>
            <Chapter n="02" title="L'architecture" tone="deep">
              <p className="max-w-[62ch] text-[17px] leading-relaxed text-muted">{project.recruiterDescription}</p>
              <ol className="mt-12 space-y-0">
                {project.architecture.map((layer, i) => (
                  <Reveal key={layer.name} delay={0.04 * i} as="li">
                    <div className="hairline grid gap-2 py-6 md:grid-cols-[3rem_minmax(0,14ch)_minmax(0,1fr)] md:items-baseline md:gap-8">
                      <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-[19px] font-medium text-bright">{layer.name}</h3>
                      <p className="max-w-[62ch] text-[15.5px] leading-relaxed text-muted">{layer.detail}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </Chapter>

            <Chapter n="03" title="Les difficultés">
              <div className="space-y-14">
                {project.challenges.map((c, i) => (
                  <Reveal key={c.title} delay={0.05 * i}>
                    <h3 className="text-[23px] font-medium text-bright">{c.title}</h3>
                    <div className="mt-5 grid gap-8 md:grid-cols-2">
                      <div>
                        <p className="eyebrow">Le problème</p>
                        <p className="text-[15.5px] leading-relaxed text-muted">{c.problem}</p>
                      </div>
                      <div>
                        <p className="eyebrow">Ce que j&apos;ai fait</p>
                        <p className="text-[15.5px] leading-relaxed text-muted">{c.solution}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Chapter>

            <Chapter n="04" title="Les arbitrages" tone="deep">
              <div className="space-y-10">
                {project.decisions.map((d, i) => (
                  <Reveal key={d.question} delay={0.05 * i}>
                    <h3 className="max-w-[48ch] text-[19px] font-medium text-bright">{d.question}</h3>
                    <p className="mt-3 max-w-[64ch] text-[15.5px] leading-relaxed text-muted">{d.answer}</p>
                  </Reveal>
                ))}
              </div>
            </Chapter>

            <Chapter n="05" title="Les mesures">
              <Metrics project={project} />
            </Chapter>
          </>
        )}

        <Chapter n="06" title="Ce que j'en retiens" tone="deep">
          <ul className="space-y-6">
            {project.lessons.map((l, i) => (
              <Reveal key={l} delay={0.04 * i} as="li">
                <p className="max-w-[66ch] text-[17px] leading-relaxed text-muted">— {l}</p>
              </Reveal>
            ))}
          </ul>

          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3">
            {project.github && <ArrowLink href={project.github} external>Voir le code sur GitHub</ArrowLink>}
            <ArrowLink href="/#contact">En parler avec moi</ArrowLink>
          </div>
        </Chapter>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ pièces */

function Chapter({
  n,
  title,
  children,
  tone = "void",
}: {
  n: string;
  title: string;
  children: React.ReactNode;
  tone?: "void" | "deep";
}) {
  return (
    <section className={`${tone === "deep" ? "bg-deep" : "bg-void"} py-20 md:py-28`}>
      <div className="page">
        <Reveal>
          <div className="mb-10 flex items-baseline gap-5">
            <span className="font-mono text-[12px] tracking-[0.2em] text-accent">{n}</span>
            <h2 className="display-m">{title}</h2>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function Meta({ label, values }: { label: string; values: string[] }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1">
        {values.map((v) => (
          <li key={v} className="text-[15px] text-muted">
            {v}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Metrics({ project }: { project: Project }) {
  return (
    <>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {project.metrics.map((m, i) => (
          <Reveal key={m.label} delay={0.05 * i}>
            <MetricBlock value={m.value} label={m.label} source={m.source} accent={m.key} />
          </Reveal>
        ))}
      </div>
      <p className="mt-12 max-w-[60ch] text-[14px] leading-relaxed text-faint">
        Chaque chiffre est reproductible : compte de tests exécutés, mesure de backtest, ou calcul exact.
        Aucun n&apos;est estimé.
      </p>
    </>
  );
}
