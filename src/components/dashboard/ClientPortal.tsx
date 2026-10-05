import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, PackagePlus, Pencil, UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { signedAvatarUrl, uploadAvatar } from "@/lib/avatar";
import { formatBdPhone } from "@/lib/phone";
import { roleLabel } from "@/data/dashboard";
import { useRole } from "@/hooks/useRole";
import { OrdersTable, statusLabel } from "./OrdersTable";

const card = "rounded-2xl border border-white/10 bg-white/5 p-6";
const input =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-brand-accent focus:outline-none";
const btn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 font-display text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60";

export function ClientPortal() {
  const { role } = useRole();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const me = useQuery({
    queryKey: ["me-profile"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) throw new Error("no user");
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("id, full_name, phone, email, address, avatar_url, client_code, created_at")
        .eq("id", user.id)
        .maybeSingle();
      if (error) throw error;
      return { userId: user.id, profile };
    },
  });

  const orders = useQuery({
    queryKey: ["my-orders"],
    enabled: !!me.data?.userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const pending = useQuery({
    queryKey: ["my-change-requests"],
    enabled: !!me.data?.userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profile_change_requests")
        .select("id, status, created_at")
        .eq("status", "pending");
      if (error) throw error;
      return data ?? [];
    },
  });

  useEffect(() => {
    let active = true;
    signedAvatarUrl(me.data?.profile?.avatar_url).then((url) => {
      if (active) setAvatarSrc(url);
    });
    return () => {
      active = false;
    };
  }, [me.data?.profile?.avatar_url]);

  const requestChange = useMutation({
    mutationFn: async (form: HTMLFormElement) => {
      const userId = me.data?.userId;
      if (!userId) throw new Error("no user");
      const fd = new FormData(form);
      const file = fd.get("avatar") as File | null;
      let avatar_url: string | null = null;
      if (file && file.size > 0) avatar_url = await uploadAvatar(userId, file);
      const { error } = await supabase.from("profile_change_requests").insert({
        user_id: userId,
        full_name: String(fd.get("full_name") || "") || null,
        phone: String(fd.get("phone") || "") || null,
        email: String(fd.get("email") || "") || null,
        address: String(fd.get("address") || "") || null,
        avatar_url,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setEditing(false);
      setNotice("পরিবর্তনের অনুরোধ পাঠানো হয়েছে। অ্যাডমিন অনুমোদন দিলে প্রোফাইল আপডেট হবে।");
      queryClient.invalidateQueries({ queryKey: ["my-change-requests"] });
    },
  });

  const placeOrder = useMutation({
    mutationFn: async (form: HTMLFormElement) => {
      const userId = me.data?.userId;
      if (!userId) throw new Error("no user");
      const fd = new FormData(form);
      const { error } = await supabase.from("orders").insert({
        client_id: userId,
        service_title: String(fd.get("service_title") || ""),
        details: String(fd.get("details") || "") || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setOrdering(false);
      setNotice("অর্ডার জমা হয়েছে। অ্যাডমিন মূল্য ও অগ্রগতি যোগ করবেন।");
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });

  if (me.isPending) {
    return (
      <div className="flex items-center gap-2 text-sm text-white/60">
        <Loader2 className="h-4 w-4 animate-spin" /> লোড হচ্ছে…
      </div>
    );
  }

  const p = me.data?.profile;

  return (
    <div className="space-y-6">
      {notice ? (
        <p className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {notice}
        </p>
      ) : null}

      <div className={card}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-base font-bold text-white">আমার অর্ডার ও সেবা</h2>
          <button onClick={() => setOrdering((v) => !v)} className={btn}>
            <PackagePlus className="h-4 w-4" /> অর্ডার করুন
          </button>
        </div>

        {ordering ? (
          <form
            className="mt-4 grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
            onSubmit={(e) => {
              e.preventDefault();
              placeOrder.mutate(e.currentTarget);
            }}
          >
            <input name="service_title" required placeholder="কোন সেবা প্রয়োজন? (যেমন: ছবি প্রিন্ট)" className={input} />
            <textarea name="details" rows={3} placeholder="কাজের বিবরণ" className={input} />
            <div>
              <button type="submit" disabled={placeOrder.isPending} className={btn}>
                {placeOrder.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null} জমা দিন
              </button>
            </div>
            {placeOrder.isError ? <p className="text-sm text-red-300">অর্ডার জমা হয়নি।</p> : null}
          </form>
        ) : null}

        <div className="mt-4">
          {orders.isPending ? (
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Loader2 className="h-4 w-4 animate-spin" /> লোড হচ্ছে…
            </div>
          ) : (orders.data?.length ?? 0) === 0 ? (
            <p className="text-sm text-white/55">এখনো কোনো অর্ডার নেই।</p>
          ) : (
            <OrdersTable orders={orders.data ?? []} />
          )}
        </div>
      </div>

      <div className={card}>
        <div className="flex flex-wrap items-center gap-4">
          {avatarSrc ? (
            <img src={avatarSrc} alt="প্রোফাইল ছবি" className="h-16 w-16 rounded-2xl object-cover" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <UserRound className="h-7 w-7 text-white/50" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-bold text-white">{p?.full_name || "নাম নেই"}</h2>
            <p className="text-sm text-white/55">
              ক্লায়েন্ট আইডি: <span className="font-semibold text-brand-accent">{p?.client_code || "—"}</span>
              {role ? ` • ${roleLabel[role]}` : ""}
            </p>
          </div>
          <button onClick={() => setEditing((v) => !v)} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/8">
            <Pencil className="h-4 w-4" /> তথ্য পরিবর্তন
          </button>
        </div>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          {(
            [
              ["মোবাইল", formatBdPhone(p?.phone)],
              ["ইমেইল", p?.email || "—"],
              ["ঠিকানা", p?.address || "—"],
              [
                "যুক্ত হয়েছেন",
                p?.created_at ? new Date(p.created_at).toLocaleDateString("bn-BD") : "—",
              ],
            ] as Array<[string, string]>
          ).map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-3 border-b border-white/8 pb-2">
              <dt className="text-sm text-white/55">{label}</dt>
              <dd className="truncate text-sm font-semibold text-white">{value}</dd>
            </div>
          ))}
        </dl>

        {(pending.data?.length ?? 0) > 0 ? (
          <p className="mt-4 text-xs text-amber-200">
            একটি পরিবর্তনের অনুরোধ অ্যাডমিনের অনুমোদনের অপেক্ষায় আছে।
          </p>
        ) : null}

        {editing ? (
          <form
            className="mt-5 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              requestChange.mutate(e.currentTarget);
            }}
          >
            <input name="full_name" defaultValue={p?.full_name ?? ""} placeholder="পূর্ণ নাম" className={input} />
            <input name="phone" defaultValue={p?.phone ?? ""} placeholder="মোবাইল" className={input} />
            <input name="email" defaultValue={p?.email ?? ""} placeholder="ইমেইল" className={input} />
            <input name="address" defaultValue={p?.address ?? ""} placeholder="ঠিকানা" className={input} />
            <input name="avatar" type="file" accept="image/*" className={`${input} file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-white`} />
            <div className="flex items-center gap-3">
              <button type="submit" disabled={requestChange.isPending} className={btn}>
                {requestChange.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null} অনুরোধ পাঠান
              </button>
            </div>
            {requestChange.isError ? (
              <p className="text-sm text-red-300 sm:col-span-2">অনুরোধ পাঠানো যায়নি। আবার চেষ্টা করুন।</p>
            ) : null}
          </form>
        ) : null}
      </div>

      <p className="text-xs text-white/40">
        অর্ডারের অবস্থা: {Object.values(statusLabel).join(" • ")}
      </p>
    </div>
  );
}
