import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { createExecutive } from "@/lib/executives.functions";
import { formatBdPhone } from "@/lib/phone";

const card = "rounded-2xl border border-white/10 bg-white/5 p-6";
const input =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-brand-accent focus:outline-none";
const btn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 font-display text-sm font-bold text-primary-foreground disabled:opacity-60";

export function ExecutiveManager() {
  const create = useServerFn(createExecutive);
  const qc = useQueryClient();
  const [msg, setMsg] = useState<string | null>(null);

  const execs = useQuery({
    queryKey: ["executives"],
    queryFn: async () => {
      const { data: roles, error } = await supabase.from("user_roles").select("user_id").eq("role", "executive");
      if (error) throw error;
      const ids = (roles ?? []).map((r) => r.user_id);
      if (!ids.length) return [];
      const { data, error: e2 } = await supabase.from("profiles").select("id, full_name, email, phone").in("id", ids);
      if (e2) throw e2;
      return data ?? [];
    },
  });

  const m = useMutation({
    mutationFn: async (form: HTMLFormElement) => {
      const fd = new FormData(form);
      await create({
        data: {
          full_name: String(fd.get("full_name") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          password: String(fd.get("password") || ""),
        },
      });
      form.reset();
    },
    onSuccess: () => {
      setMsg("এক্সিকিউটিভ অ্যাকাউন্ট তৈরি হয়েছে। ইমেইল ও পাসওয়ার্ড তাকে দিন।");
      qc.invalidateQueries({ queryKey: ["executives"] });
    },
    onError: (e) => setMsg(e instanceof Error ? e.message : "তৈরি করা যায়নি"),
  });

  return (
    <div className={card}>
      <h2 className="font-display text-base font-bold text-white">এক্সিকিউটিভ অ্যাকাউন্ট (শুধু অ্যাডমিন)</h2>
      <p className="mt-1 text-xs text-white/50">এখানে তৈরি করা ইমেইল ও পাসওয়ার্ড দিয়ে এক্সিকিউটিভ লগইন করবেন।</p>
      <form
        className="mt-4 grid gap-3 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          setMsg(null);
          m.mutate(e.currentTarget);
        }}
      >
        <input name="full_name" required placeholder="পূর্ণ নাম" className={input} />
        <input name="email" type="email" required placeholder="লগইন ইমেইল" className={input} />
        <input name="phone" placeholder="মোবাইল (ঐচ্ছিক)" className={input} />
        <input name="password" type="text" required minLength={6} placeholder="পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)" className={input} />
        <div>
          <button type="submit" disabled={m.isPending} className={btn}>
            {m.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />} তৈরি করুন
          </button>
        </div>
      </form>
      {msg ? <p className="mt-3 text-sm text-white/80">{msg}</p> : null}
      <div className="mt-5 space-y-2">
        {(execs.data ?? []).map((x) => (
          <div key={x.id} className="flex flex-wrap justify-between gap-2 border-b border-white/8 pb-2 text-sm text-white/80">
            <span className="font-semibold text-white">{x.full_name || "—"}</span>
            <span>{x.email || "—"} • {formatBdPhone(x.phone)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
