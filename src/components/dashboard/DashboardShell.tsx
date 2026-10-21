import { Button } from "@/components/ui/button";
import { useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, Loader2, LogOut, Menu, ShieldAlert, X } from "lucide-react";
import logo from "@/assets/shop-logo.jpg.asset.json";
import { supabase } from "@/integrations/supabase/client";
import { canAccess, modulesForRole, roleLabel } from "@/data/dashboard";
import { useRole } from "@/hooks/useRole";
import { ModuleIcon } from "./ModuleIcon";
import { shop } from "@/data/shop";

export function DashboardShell({
  title,
  subtitle,
  moduleId,
  children,
}: {
  title: string;
  subtitle?: string;
  moduleId?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { role, loading } = useRole();
  const visibleModules = modulesForRole(role);
  const isClient = role === "client";
  const denied = !loading && moduleId ? !canAccess(role, moduleId) : false;

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  }


  const nav = (
    <nav className="space-y-1">
      {isClient ? null : (
        <Link
          to="/dashboard"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
            pathname === "/dashboard"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          <LayoutDashboard className="h-4 w-4" /> ড্যাশবোর্ড
        </Link>
      )}
      {visibleModules.map((m) => (
        <Link
          key={m.id}
          to={m.to}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
            pathname === m.to
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          <ModuleIcon name={m.icon} className="h-4 w-4 shrink-0" />
          <span className="truncate">{m.titleBn}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-[1200px]">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-border p-5 lg:flex">
          <Link to="/" className="mb-7 flex items-center gap-3">
            <img
              src={logo.url}
              alt={`${shop.nameEn} লোগো`}
              className="h-10 w-10 rounded-lg object-cover"
              width={40}
              height={40}
            />
            <span className="font-display text-sm font-bold text-foreground">{shop.nameBn}</span>
          </Link>
          {nav}
          <Button
            onClick={handleSignOut}
            className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> লগআউট
          </Button>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 lg:px-8">
            <div className="min-w-0">
              <h1 className="truncate font-display text-xl font-extrabold text-foreground">{title}</h1>
              {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
            </div>
            {role ? (
              <span className="hidden shrink-0 rounded border border-border bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground sm:inline">
                {roleLabel[role]}
              </span>
            ) : null}
            <Button
              className="rounded-lg border border-border p-2 text-foreground lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="মেনু"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </header>

          {open ? (
            <div className="border-b border-border p-4 lg:hidden">
              {nav}
              <Button
                onClick={handleSignOut}
                className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" /> লগআউট
              </Button>
            </div>
          ) : null}

          <main className="px-4 py-7 lg:px-8">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> লোড হচ্ছে…
              </div>
            ) : denied ? (
              <div className="rounded-lg border border-destructive/25 bg-error-tint p-8 text-center">
                <ShieldAlert className="mx-auto h-8 w-8 text-destructive" />
                <p className="mt-3 font-display text-base font-bold text-foreground">
                  এই সেকশনে আপনার প্রবেশাধিকার নেই
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  প্রয়োজন হলে অ্যাডমিনের সাথে যোগাযোগ করুন।
                </p>
              </div>
            ) : (
              children
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export function ModulePlaceholder({ note }: { note: string }) {
  return (
    <div className="rounded-lg border border-dashed border-border bg-secondary p-8 text-center">
      <p className="text-sm text-muted-foreground">{note}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        এই মডিউলের বিস্তারিত কার্যকারিতা পরবর্তী ধাপে যুক্ত হবে।
      </p>
    </div>
  );
}
