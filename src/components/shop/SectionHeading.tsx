import type { ReactNode } from "react";
export function SectionBadge({ children }: { children: ReactNode }) {
 return <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">{children}</span>;
}
export function SectionHeading({badge,title,highlight,sub}: {badge?:ReactNode;title:ReactNode;highlight?:string;sub?:string;center?:boolean;dark?:boolean}) {
 return <div className="max-w-3xl">{badge ? <SectionBadge>{badge}</SectionBadge> : null}<h2 className="mt-3 text-xl font-semibold text-primary sm:text-2xl">{title}{highlight ? <> {highlight}</> : null}</h2>{sub ? <p className="mt-4 max-w-2xl text-muted-foreground">{sub}</p> : null}</div>;
}
