import Link from "next/link";
import { CONTACT } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-edge bg-void">
      <div className="page flex flex-col gap-10 py-14 md:flex-row md:items-end">
        <div>
          <p className="text-[15px] font-semibold text-bright">Lucas Guilhot</p>
          <p className="mt-1 text-[14px] text-faint">Développeur full-stack — Toulouse, France</p>
          <p className="mt-4 text-[13.5px] text-muted">
            Ouvert aux opportunités · Disponible pour des missions sélectionnées
          </p>
        </div>

        <nav className="flex flex-wrap gap-7 text-[14px] md:ml-auto" aria-label="Liens de contact">
          <a href={CONTACT.github} target="_blank" rel="noreferrer noopener" className="text-muted transition-colors hover:text-bright">
            GitHub
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer noopener" className="text-muted transition-colors hover:text-bright">
            LinkedIn
          </a>
          <a href={`mailto:${CONTACT.email}`} className="text-muted transition-colors hover:text-bright">
            Email
          </a>
          <Link href="/mentions-legales" className="text-muted transition-colors hover:text-bright">
            Mentions légales
          </Link>
        </nav>
      </div>
      <div className="page pb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">© 2026 Lucas Guilhot</p>
      </div>
    </footer>
  );
}
