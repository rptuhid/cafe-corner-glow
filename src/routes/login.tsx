import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Lock, Mail, User } from "lucide-react";
import logo from "@/assets/shop-logo.jpg.asset.json";
import { shop } from "@/data/shop";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

const title = "লগইন | ডিজিটাল কম্পিউটার ও সাইবার ক্যাফে";
const description = "ড্যাশবোর্ডে প্রবেশের জন্য লগইন — Digital Computer & Cyber Cafe, হারবাং বাজার।";

export const Route = createFileRoute("/login")({
  ssr: false,
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
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) navigate({ to: "/dashboard", replace: true });
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);

    if (mode === "signin") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (err) {
        setError("ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
        return;
      }
      navigate({ to: "/dashboard", replace: true });
      return;
    }

    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: { full_name: fullName },
      },
    });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    if (data.session) {
      navigate({ to: "/dashboard", replace: true });
      return;
    }
    setMessage("আপনার ইমেইলে একটি নিশ্চিতকরণ লিংক পাঠানো হয়েছে। লিংকে ক্লিক করে লগইন করুন।");
  }

  async function handleGoogle() {
    setError(null);
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(false);
      setError("Google দিয়ে লগইন করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/dashboard", replace: true });
  }

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
            <h1 className="mt-5 font-display text-2xl font-extrabold text-white">
              {mode === "signin" ? "লগইন করুন" : "নতুন অ্যাকাউন্ট"}
            </h1>
            <p className="mt-2 text-sm text-white/60">{shop.nameBn} ও সাইবার ক্যাফে</p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2 rounded-xl bg-white/8 p-1">
            {(
              [
                ["signin", "লগইন"],
                ["signup", "রেজিস্টার"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setMode(key);
                  setError(null);
                  setMessage(null);
                }}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  mode === key ? "bg-primary text-primary-foreground" : "text-white/70"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" ? (
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-white/70">পূর্ণ নাম</span>
                <span className="relative block">
                  <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                    placeholder="আপনার নাম"
                    className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pr-3 pl-10 text-sm text-white placeholder:text-white/35 focus:border-brand-accent focus:outline-none"
                  />
                </span>
              </label>
            ) : null}

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-white/70">ইমেইল</span>
              <span className="relative block">
                <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="you@example.com"
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
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pr-3 pl-10 text-sm text-white placeholder:text-white/35 focus:border-brand-accent focus:outline-none"
                />
              </span>
            </label>

            {error ? <p className="text-sm text-red-300">{error}</p> : null}
            {message ? <p className="text-sm text-emerald-300">{message}</p> : null}

            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 font-display font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {mode === "signin" ? "ড্যাশবোর্ডে প্রবেশ" : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-white/35">
            <span className="h-px flex-1 bg-white/10" /> অথবা <span className="h-px flex-1 bg-white/10" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-60"
          >
            Google দিয়ে চালিয়ে যান
          </button>
        </div>
      </div>
    </div>
  );
}
