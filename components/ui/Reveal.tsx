"use client";

/**
 * Apparition au défilement : un fondu court avec une translation de quelques
 * pixels. Trois garde-fous, parce qu'une section ne doit jamais rester invisible :
 *
 *  · l'état masqué est posé par le JavaScript, donc sans JavaScript tout s'affiche ;
 *  · la révélation passe par un IntersectionObserver, fiable même quand l'onglet
 *    est en arrière-plan (une animation pilotée par requestAnimationFrame, elle,
 *    peut rester figée) ;
 *  · un filet de sécurité révèle le contenu au bout d'une seconde et demie,
 *    quoi qu'il arrive.
 */
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    el.style.transitionDelay = `${delay}s`;
    el.classList.add("reveal");

    const montrer = () => el.classList.add("reveal-on");
    const filet = window.setTimeout(montrer, 1500);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            montrer();
            io.disconnect();
          }
        }
      },
      { rootMargin: "-60px 0px" },
    );
    io.observe(el);

    return () => {
      window.clearTimeout(filet);
      io.disconnect();
    };
  }, [delay]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
