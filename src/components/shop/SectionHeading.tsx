import type { ReactNode } from "react";

export function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
      {children}
    </span>
  );
}

export function SectionHeading({
  badge,
  title,
  highlight,
  sub,
  center = false,
  dark = false,
}: {
  badge?: ReactNode;
  title: ReactNode;
  highlight?: string;
  sub?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : ""}>
      {badge ? <SectionBadge>{badge}</SectionBadge> : null}
      <h2
        className={`mt-5 text-3xl leading-tight font-extrabold sm:text-4xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
        {highlight ? (
          <>
            {" "}
            <span className={dark ? "text-brand-accent" : "text-primary"}>{highlight}</span>
          </>
        ) : null}
      </h2>
      <div
        className={`mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent ${
          center ? "mx-auto" : ""
        }`}
      />
      {sub ? (
        <p className={`mt-5 text-base ${dark ? "text-white/65" : "text-muted-foreground"}`}>{sub}</p>
      ) : null}
    </div>
  );
}
