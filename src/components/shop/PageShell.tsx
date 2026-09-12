import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { FloatingContact } from "./FloatingContact";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-17">{children}</main>
      <SiteFooter />
      <FloatingContact />
    </div>
  );
}

export function PageHero({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-16 sm:py-20">
      <div className="absolute inset-0 grid-lines opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
        <p className="mt-4 text-white/65">{sub}</p>
      </div>
    </section>
  );
}
