"use client";

import { useMode, type Mode } from "@/lib/mode";
import { Reveal } from "@/components/ui/Reveal";

/**
 * La porte d'entrée. Tant que le visiteur n'a rien choisi, on lui pose une seule
 * question et on lui donne deux réponses. Une fois le choix fait, le bloc se
 * réduit à une ligne discrète : il ne doit plus jamais barrer le chemin.
 */
const doors: { mode: Mode; title: string; detail: string; cta: string }[] = [
  {
    mode: "recruiter",
    title: "Je recrute",
    detail: "CDI · CDD · Équipe technique · Mission longue",
    cta: "Découvrir mon profil",
  },
  {
    mode: "freelance",
    title: "J'ai un projet",
    detail: "Application · SaaS · Automatisation · Données",
    cta: "Construisons votre projet",
  },
];

export function Gateway() {
  const { mode, chosen, setMode } = useMode();

  if (chosen) {
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
              {mode === "recruiter" ? "J’ai plutôt un projet à faire construire" : "Je recrute un développeur"}
            </span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <section aria-labelledby="porte" className="border-y border-edge bg-deep py-20 md:py-28">
      <div className="page">
        <Reveal>
          <h2 id="porte" className="display-m">
            Que puis-je faire pour vous&nbsp;?
          </h2>
          <p className="lede mt-4">
            Le site s’adapte à votre réponse. Vous pourrez changer à tout moment depuis la navigation.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {doors.map((d, i) => (
            <Reveal key={d.mode} delay={0.08 * i}>
              <button
                type="button"
                onClick={() => setMode(d.mode)}
                className="group h-full w-full rounded-2xl border border-edge bg-card p-8 text-left transition-all duration-300 hover:border-bright md:p-10"
              >
                <p className="eyebrow">{d.detail}</p>
                <p className="display-m mt-6">{d.title}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[15px] text-bright">
                  {d.cta}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
