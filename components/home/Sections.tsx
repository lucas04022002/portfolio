"use client";

import Link from "next/link";
import { useMode } from "@/lib/mode";
import { projects, featuredProjects } from "@/data/projects";
import { expertise, services, process, faq } from "@/data/expertise";
import { CONTACT } from "@/data/site";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink, Button, Eyebrow, MetricBlock, Section } from "@/components/ui/primitives";

/* ---------------------------------------------------------------- projets */

export function SelectedWork() {
  const { mode } = useMode();
  const others = projects.filter((p) => !p.featured);

  return (
    <Section id="projets">
      <Reveal>
        <Eyebrow>Réalisations</Eyebrow>
        <h2 className="display-l max-w-[20ch]">
          {mode === "recruiter" ? "Cinq produits, et leurs chiffres." : "Des produits livrés, pas des maquettes."}
        </h2>
        <p className="lede mt-5">
          {mode === "recruiter"
            ? "Conçus, développés et déployés seul — de la base de données à la mise en production."
            : "Chacun part d'un problème concret et finit en produit utilisable. Les chiffres affichés sont mesurés, jamais estimés."}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-x-10 gap-y-20 lg:grid-cols-2">
        {featuredProjects.map((p, i) => (
          <Reveal
            key={p.slug}
            delay={0.06 * i}
            className={i === 0 ? "lg:col-span-2" : ""}
          >
            <ProjectCard project={p} priority={i === 0} />
          </Reveal>
        ))}
      </div>

      {others.length > 0 && (
        <Reveal className="mt-20">
          <div className="hairline pt-8">
            <p className="eyebrow">Également</p>
            <ul className="mt-6 space-y-4">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projets/${p.slug}`} className="group flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="text-[19px] font-medium text-bright">{p.title}</span>
                    {p.team && <span className="eyebrow mb-0">{p.team}</span>}
                    <span className="text-[15px] text-muted">{p.tagline}</span>
                    <span aria-hidden className="ml-auto text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-bright">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
    </Section>
  );
}

/* ------------------------------------------------------- expertise (recruteur) */

export function Expertise() {
  return (
    <Section id="expertise" tone="deep">
      <Reveal>
        <Eyebrow>Expertise</Eyebrow>
        <h2 className="display-l max-w-[20ch]">Ce que j&apos;apporte à une équipe.</h2>
        <p className="lede mt-5">
          Les technologies ne valent rien sans l&apos;endroit où elles ont servi. Chaque domaine ci-dessous
          renvoie à un projet où il a été mis en œuvre.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2">
        {expertise.map((group, i) => (
          <Reveal key={group.area} delay={0.05 * i}>
            <h3 className="text-[21px] font-medium text-bright">{group.area}</h3>
            <ul className="mt-5 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-[15.5px] text-muted">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-l-2 border-accent pl-4 text-[14px] leading-relaxed text-faint">{group.proof}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------------------------------- services (freelance) */

export function Services() {
  return (
    <Section id="services" tone="deep">
      <Reveal>
        <Eyebrow>Services</Eyebrow>
        <h2 className="display-l max-w-[20ch]">Ce que je peux construire.</h2>
        <p className="lede mt-5">
          Vous n&apos;avez pas besoin de savoir ce qu&apos;est un framework. Vous avez besoin de savoir
          ce que ça donne une fois livré.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={0.05 * i}>
            <h3 className="text-[21px] font-medium text-bright">{s.title}</h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted">{s.body}</p>
            <p className="mt-4 text-[14px] leading-relaxed text-faint">{s.examples}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <p className="font-mono text-[12px] tracking-[0.08em] text-faint">
          Construit avec Next.js · React · TypeScript · Node · Python · FastAPI · PostgreSQL · Docker
        </p>
      </Reveal>
    </Section>
  );
}

export function Process() {
  return (
    <Section id="process">
      <Reveal>
        <Eyebrow>Déroulé d&apos;une mission</Eyebrow>
        <h2 className="display-l max-w-[18ch]">De l&apos;idée au produit.</h2>
        <p className="lede mt-5">
          Cinq étapes, un prix ferme avant de commencer, et une version à regarder à chaque palier.
        </p>
      </Reveal>

      <ol className="mt-16 space-y-0">
        {process.map((p, i) => (
          <Reveal key={p.step} delay={0.04 * i} as="li">
            <div className="hairline grid gap-3 py-8 md:grid-cols-[auto_minmax(0,16ch)_minmax(0,1fr)] md:items-baseline md:gap-10">
              <span className="font-mono text-[12px] tracking-[0.2em] text-accent">{p.step}</span>
              <h3 className="text-[21px] font-medium text-bright">{p.title}</h3>
              <p className="max-w-[62ch] text-[15.5px] leading-relaxed text-muted">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function Faq() {
  return (
    <Section tone="deep">
      <Reveal>
        <Eyebrow>Questions fréquentes</Eyebrow>
        <h2 className="display-l max-w-[16ch]">Ce qu&apos;on me demande avant de commencer.</h2>
      </Reveal>

      <div className="mt-14 space-y-0">
        {faq.map((item, i) => (
          <Reveal key={item.q} delay={0.04 * i}>
            <details className="group hairline py-7">
              <summary className="flex cursor-pointer list-none items-center gap-6 text-[18px] font-medium text-bright">
                {item.q}
                <span
                  aria-hidden
                  className="ml-auto text-faint transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-[70ch] text-[15.5px] leading-relaxed text-muted">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ à propos */

export function About() {
  const { mode } = useMode();

  return (
    <Section id="a-propos">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal>
          <Eyebrow>À propos</Eyebrow>
          <h2 className="display-l">J&apos;aime construire ce qui n&apos;existait pas hier.</h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-5 text-[17px] leading-relaxed text-muted">
            <p>
              Je suis développeur full-stack, avec une préférence marquée pour les produits techniques :
              ceux qui traitent de la donnée, qui automatisent quelque chose, ou dont la règle métier
              est plus difficile que l&apos;interface.
            </p>
            <p>
              J&apos;aime partir d&apos;un problème, comprendre comment il fonctionne vraiment, puis construire
              la solution entière — interface, backend, base de données, intégrations, mise en production.
            </p>
            <p className="text-bright">
              {mode === "recruiter"
                ? "Ce que je cherche : une équipe où l'on mesure avant d'affirmer, et où l'on met en ligne ce qu'on écrit."
                : "Ce que vous obtenez : un interlocuteur unique, du premier échange à la mise en ligne, et un produit que vous gardez."}
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <MetricBlock value="5" label="produits construits" source="dont quatre seul, de bout en bout" />
            <MetricBlock value="1 128" label="tests automatisés" source="comptés dans les cinq dépôts" />
            <MetricBlock value="1" label="modèle supprimé" source="après un test hors échantillon défavorable" accent />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------- contact */

export function Contact() {
  const { mode } = useMode();

  return (
    <Section id="contact" tone="deep">
      <Reveal>
        <Eyebrow>Contact</Eyebrow>
        <h2 className="display-xl max-w-[14ch]">
          {mode === "recruiter" ? "Parlons de la suite." : "Une idée à construire ?"}
        </h2>
        <p className="lede mt-7">
          {mode === "recruiter"
            ? "Vous cherchez un développeur capable de prendre un produit de la base de données jusqu'à la production ? Écrivez-moi, je réponds."
            : "Dites-moi ce que vous voulez construire, le problème que vous cherchez à régler, et où en est le projet. Je reviens vers vous avec une façon de le faire."}
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mt-12">
        <div className="flex flex-wrap items-center gap-3">
          <Button href={`mailto:${CONTACT.email}`}>
            {mode === "recruiter" ? "M'écrire" : "Décrire mon projet"}
          </Button>
          {mode === "recruiter" && (
            <Button href={CONTACT.cv} variant="outline">
              Télécharger mon CV
            </Button>
          )}
        </div>

        <div className="mt-14 hairline grid gap-8 pt-10 sm:grid-cols-3">
          <div>
            <p className="eyebrow">Email</p>
            <ArrowLink href={`mailto:${CONTACT.email}`}>{CONTACT.email}</ArrowLink>
          </div>
          <div>
            <p className="eyebrow">Code</p>
            <ArrowLink href={CONTACT.github} external>
              GitHub
            </ArrowLink>
          </div>
          <div>
            <p className="eyebrow">Réseau</p>
            <ArrowLink href={CONTACT.linkedin} external>
              LinkedIn
            </ArrowLink>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
