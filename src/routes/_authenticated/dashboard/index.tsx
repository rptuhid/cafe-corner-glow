import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ModuleIcon } from "@/components/dashboard/ModuleIcon";
import { modulesForRole, toneClass } from "@/data/dashboard";
import { useRole } from "@/hooks/useRole";

const title = "ড্যাশবোর্ড | ডিজিটাল কম্পিউটার ও সাইবার ক্যাফে";
const description = "কন্টেন্ট, ক্লায়েন্ট, হিসাব ও পে-রোল পরিচালনার কেন্দ্রীয় ড্যাশবোর্ড।";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardHome,
});

function DashboardHome() {
  return (
    <DashboardShell title="মূল ড্যাশবোর্ড" subtitle="যে মডিউলে কাজ করবেন সেটি নির্বাচন করুন">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((m) => (
          <Link
            key={m.id}
            to={m.to}
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:-translate-y-1 hover:border-white/25"
          >
            <div className="flex items-start justify-between">
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${toneClass[m.tone]}`}
              >
                <ModuleIcon name={m.icon} className="h-5 w-5" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-white/30 transition-colors group-hover:text-white" />
            </div>
            <h2 className="mt-4 font-display text-base font-bold text-white">{m.titleBn}</h2>
            <p className="text-xs font-semibold text-white/40">{m.titleEn}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{m.desc}</p>
            {m.soon ? (
              <span className="mt-3 inline-block rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/60">
                শীঘ্রই আসছে
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </DashboardShell>
  );
}
