import Link from "next/link";
import type { ReactNode } from "react";

/** Une section de page : le rythme vertical du site tient dans cette seule classe. */
export function Section({
  id,
  children,
  className = "",
  tone = "void",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "void" | "deep";
}) {
  const bg = tone === "deep" ? "bg-deep" : "bg-void";
  return (
    <section id={id} className={`${bg} py-24 md:py-36 ${className}`}>
      <div className="page">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow mb-5">{children}</p>;
}

/** Le lien « flèche » du site : la flèche avance légèrement au survol. */
export function ArrowLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const content = (
    <span className="group inline-flex items-center gap-2">
      <span className="border-b border-edge pb-0.5 transition-colors group-hover:border-bright">{children}</span>
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        {external ? "↗" : "→"}
      </span>
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={`text-bright ${className}`}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={`text-bright ${className}`}>
      {content}
    </Link>
  );
}

export function Button({
  href,
  children,
  variant = "solid",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[15px] font-medium transition-all duration-300";
  const look =
    variant === "solid"
      ? "bg-bright text-void hover:bg-accent hover:text-white"
      : "border border-edge text-bright hover:border-bright";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={`${base} ${look}`}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${look}`}>
      {children}
    </Link>
  );
}

/** Une mesure : la valeur, ce qu'elle mesure, et d'où elle vient. */
export function MetricBlock({
  value,
  label,
  source,
  accent = false,
}: {
  value: string;
  label: string;
  source: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className={`tabular text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-none tracking-[-0.04em] ${accent ? "text-accent" : "text-bright"}`}>
        {value}
      </p>
      <p className="mt-3 text-[15px] text-bright">{label}</p>
      <p className="mt-1 max-w-[30ch] text-[13.5px] leading-snug text-faint">{source}</p>
    </div>
  );
}
