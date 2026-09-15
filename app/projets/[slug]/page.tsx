import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, projectBySlug } from "@/data/projects";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { SITE } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.tagline}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projets/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.summary,
      url: `${SITE.url}/projets/${project.slug}`,
      images: project.cover.endsWith(".svg") ? undefined : [{ url: project.cover }],
    },
    twitter: { card: "summary_large_image", title, description: project.summary },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.tagline,
    description: project.summary,
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
    dateCreated: project.year,
    keywords: project.stack.join(", "),
    url: `${SITE.url}/projets/${project.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseStudy project={project} />
    </>
  );
}
