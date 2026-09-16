"use client";

import { useMode } from "@/lib/mode";
import { Hero } from "@/components/home/Hero";
import { Gateway } from "@/components/home/Gateway";
import { BehindTheProduct } from "@/components/home/BehindTheProduct";
import { About, Contact, Expertise, Faq, Livrables, Process, SelectedWork, Services } from "@/components/home/Sections";

/**
 * L'ordre des sections change avec le visiteur.
 *
 * Recruteur : ce que je sais faire → les preuves → comment c'est construit → qui je suis.
 * Client    : ce que je peux construire pour lui → les preuves → comment ça se passe → ce qu'il obtient.
 */
export function HomeShell() {
  const { mode } = useMode();

  return (
    <>
      <Hero />
      <Gateway />
      {mode === "recruiter" ? (
        <>
          <SelectedWork />
          <BehindTheProduct />
          <Expertise />
          <About />
          <Contact />
        </>
      ) : (
        <>
          <Services />
          <SelectedWork />
          <Process />
          <Livrables />
          <BehindTheProduct />
          <Faq />
          <About />
          <Contact />
        </>
      )}
    </>
  );
}
