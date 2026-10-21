import { Star } from "lucide-react";
import { ratingAverage, reviews } from "@/data/shop";
import { SectionHeading } from "@/components/shop/SectionHeading";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= rating ? "fill-primary text-primary" : "text-muted-foreground/30"
          }`}
        />
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="bg-secondary px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          center
          badge={
            <>
              <Star className="h-3.5 w-3.5" /> গ্রাহকের মতামত
            </>
          }
          title="আমাদের সেবা নিয়ে"
          highlight="গ্রাহকরা যা বলেন"
          sub="হারবাং বাজার ও আশপাশের এলাকার গ্রাহকদের অভিজ্ঞতা।"
        />

        <div className="mt-8 flex w-fit items-center gap-4 border-l-2 border-primary pl-5">
          <span className="font-display text-4xl font-extrabold text-primary">
            {ratingAverage.toFixed(1)}
          </span>
          <span>
            <Stars rating={Math.round(ratingAverage)} />
            <span className="mt-1 block text-xs text-muted-foreground">
              {reviews.length} জন গ্রাহকের রেটিং
            </span>
          </span>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="rounded-lg border border-border bg-card p-6 shadow-elegant"
            >
              <Stars rating={r.rating} />
              <p className="mt-4 text-sm text-ink">“{r.comment}”</p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="font-display text-sm font-bold text-ink">{r.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {r.service} · {r.date}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
