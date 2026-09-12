import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Lock, ShieldCheck, User } from "lucide-react";
import logo from "@/assets/shop-logo.jpg.asset.json";
import { shop } from "@/data/shop";

const title = "লগইন | ডিজিটাল কম্পিউটার ও সাইবার ক্যাফে";
const description = "গ্রাহক ও অ্যাডমিন লগইন — Digital Computer & Cyber Cafe, হারবাং বাজার।";

export const Route = createFileRoute("/login")({
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
    links: [{ rel: "canonical", href: "/login" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [role, setRole] = useState<"customer" | "admin">("customer");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-4 py-14">
      <div className="absolute inset-0 grid-lines opacity-60" aria-hidden="true" />
      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-brand-accent"
        >
          <ArrowLeft className="h-4 w-4" /> হোমে ফিরে যান
        </Link>

        <div className="rounded-3xl border border-white/10 bg-white/6 p-8 backdrop-blur-xl">
          <div className="text-center">
            <img
              src={logo.url}
              alt={`${shop.nameEn} লোগো`}
              className="mx-auto h-16 w-16 rounded-2xl object-cover"
              width={64}
              height={64}
            />
            <h1 className="mt-5 font-display text-2xl font-extrabold text-white">লগইন করুন</h1>
            <p className="mt-2 text-sm text-white/60">{shop.nameBn} ও সাইবার ক্যাফে</p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2 rounded-xl bg-white/8 p-1">
            {(
              [
                ["customer", "গ্রাহক", User],
                ["admin", "অ্যাডমিন", ShieldCheck],
              ] as const
            ).map(([key, label, Icon]) => (
              <button
                key={key}
                type="button"
                onClick={() => setRole(key)}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  role === key ? "bg-primary text-primary-foreground" : "text-white/70"
                }`}
              >
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </div>

          <form
            className="mt-7 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-white/70">
                {role === "admin" ? "অ্যাডমিন ইউজারনেম" : "মোবাইল নম্বর বা ইমেইল"}
              </span>
              <span className="relative block">
                <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  autoComplete="username"
                  placeholder={role === "admin" ? "admin" : "01XXXXXXXXX"}
                  className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pr-3 pl-10 text-sm text-white placeholder:text-white/35 focus:border-brand-accent focus:outline-none"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-white/70">পাসওয়ার্ড</span>
              <span className="relative block">
                <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pr-3 pl-10 text-sm text-white placeholder:text-white/35 focus:border-brand-accent focus:outline-none"
                />
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 font-display font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              {role === "admin" ? "অ্যাডমিন প্যানেলে প্রবেশ" : "গ্রাহক লগইন"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-white/45">
            লগইন কার্যকারিতা পরবর্তী ধাপে (Phase 2) যুক্ত করা হবে।
          </p>
        </div>
      </div>
    </div>
  );
}
