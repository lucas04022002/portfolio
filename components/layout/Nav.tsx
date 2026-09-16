"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { useMode } from "@/lib/mode";
import { CONTACT } from "@/data/site";

/**
 * Navigation collante. Deux choses seulement changent avec le mode : le CTA
 * de droite, et l'interrupteur Recruteur / Freelance. Le reste est stable —
 * un visiteur ne doit jamais avoir l'impression d'avoir changé de site.
 */
export function Nav() {
  const { mode, chosen, setMode } = useMode();
  const [scrolled, setScrolled] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const idMenu = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Échap referme le menu : sur mobile il couvre la page, il faut pouvoir en sortir
  // autrement qu'en visant le bouton.
  useEffect(() => {
    if (!ouvert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ouvert]);

  const links = [
    { href: "/#projets", label: "Projets" },
    { href: mode === "recruiter" ? "/#expertise" : "/#services", label: mode === "recruiter" ? "Expertise" : "Services" },
    { href: "/#a-propos", label: "À propos" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-edge bg-void/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="page flex h-16 items-center gap-7" aria-label="Navigation principale">
        <Link href="/" className="text-[15px] font-semibold tracking-[-0.01em] text-bright">
          Lucas Guilhot
        </Link>

        <ul className="ml-6 hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-[14px] text-muted transition-colors hover:text-bright">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3">
          <div
            role="group"
            aria-label="Vous êtes"
            className="flex items-center rounded-full border border-edge p-1"
          >
            {(["recruiter", "freelance"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={chosen && mode === m}
                className={`rounded-full px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] transition-colors sm:px-3.5 sm:text-[11px] ${
                  chosen && mode === m ? "bg-bright text-void" : "text-faint hover:text-bright"
                }`}
              >
                {m === "recruiter" ? "Recruteur" : "Freelance"}
              </button>
            ))}
          </div>

          <Link
            href={mode === "recruiter" ? CONTACT.cv : "/#contact"}
            className="hidden rounded-full bg-bright px-5 py-2 text-[13.5px] font-medium text-void transition-colors hover:bg-accent hover:text-white sm:inline-flex"
          >
            {mode === "recruiter" ? "Mon CV" : "Discuter d'un projet"}
          </Link>

          <button
            type="button"
            onClick={() => setOuvert((o) => !o)}
            aria-expanded={ouvert}
            aria-controls={idMenu}
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-bright transition-colors hover:bg-card md:hidden"
          >
            <span aria-hidden className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                  ouvert ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-px w-full bg-current transition-opacity duration-200 ${
                  ouvert ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                  ouvert ? "top-1/2 -rotate-45" : "top-full"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Le menu des petits écrans. Rendu seulement à l'ouverture : il n'a rien
          à faire dans l'ordre de tabulation d'une page dont il est absent. */}
      {ouvert && (
        <div
          id={idMenu}
          className="border-t border-edge bg-void/95 backdrop-blur-xl md:hidden"
        >
          <ul className="page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOuvert(false)}
                  className="block py-3 text-[17px] text-muted transition-colors hover:text-bright"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="hairline mt-2 pt-4">
              <Link
                href={mode === "recruiter" ? CONTACT.cv : "/#contact"}
                onClick={() => setOuvert(false)}
                className="inline-flex rounded-full bg-bright px-5 py-2.5 text-[15px] font-medium text-void"
              >
                {mode === "recruiter" ? "Télécharger mon CV" : "Discuter d'un projet"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
