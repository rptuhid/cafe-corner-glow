import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { FloatingContact } from "./FloatingContact";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="">{children}</main>
      <SiteFooter />
      <FloatingContact />
    </div>
  );
}

export function PageHero({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-16 sm:py-16">
      <div className="relative mx-auto max-w-[1200px]">
        <h1 className="text-2xl font-bold text-primary sm:text-[32px]">{title}</h1>
        <p className="mt-4 text-muted-foreground">{sub}</p>
      </div>
    </section>
  );
}
