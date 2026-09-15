"use client";

import Image from "next/image";
import Link from "next/link";
import { useMode } from "@/lib/mode";
import type { Project } from "@/data/projects";

/**
 * Une carte projet se lit comme un produit : une grande image, un titre, une
 * phrase de valeur — et le récit change selon le visiteur, jamais les faits.
 */
export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const { mode } = useMode();
  const description = mode === "recruiter" ? project.recruiterDescription : project.freelanceDescription;
  const keyMetric = project.metrics.find((m) => m.key) ?? project.metrics[0];

  return (
    <article className="group">
      <Link href={`/projets/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-edge bg-card shot-shadow">
          <Image
            src={project.cover}
            alt={`${project.title} — ${project.tagline}`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="display-m">{project.title}</h3>
          <p className="eyebrow mb-0">{project.category}</p>
        </div>

        <p className="mt-3 text-[17px] text-bright">{project.tagline}</p>
        <p className="mt-3 max-w-[58ch] text-[15.5px] leading-relaxed text-muted">{description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="tabular text-[15px] text-bright">
            <span className="font-semibold text-accent">{keyMetric.value}</span>
            <span className="ml-2 text-muted">{keyMetric.label}</span>
          </p>
          <span className="ml-auto inline-flex items-center gap-2 text-[14.5px] text-bright">
            Explorer le projet
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </span>
        </div>

        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
          {project.stack.map((s) => (
            <li key={s} className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-faint">
              {s}
            </li>
          ))}
        </ul>
      </Link>
    </article>
  );
}
