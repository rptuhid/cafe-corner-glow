import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Check, Loader2, Pencil, UserRound, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatBdPhone } from "@/lib/phone";
import { signedAvatarUrl } from "@/lib/avatar";
import { money, statusLabel } from "./OrdersTable";

const card = "rounded-2xl border border-white/10 bg-white/5 p-6";
const input =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-brand-accent focus:outline-none";
const btn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 font-display text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60";
const ghost =
  "inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/8 disabled:opacity-60";

function Avatar({ path, size = "h-10 w-10" }: { path?: string | null; size?: string }) {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    let on = true;
    signedAvatarUrl(path).then((u) => on && setSrc(u));
    return () => {
      on = false;
    };
  }, [path]);
  return src ? (
    <img src={src} alt="ছবি" className={`${size} rounded-xl object-cover`} />
  ) : (
    <div className={`${size} flex items-center justify-center rounded-xl bg-white/10`}>
      <UserRound className="h-1/2 w-1/2 text-white/45" />
    </div>
  );
}

export function AdminClients() {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editOrder, setEditOrder] = useState<string | null>(null);

  const profiles = useQuery({
    queryKey: ["all-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, phone, email, address, avatar_url, client_code, created_at")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const clientIds = useQuery({
    queryKey: ["client-role-ids"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("user_id").eq("role", "client");
      if (error) return null;
      return new Set((data ?? []).map((r) => r.user_id));
    },
  });

  const orders = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const requests = useQuery({
    queryKey: ["all-change-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profile_change_requests")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const saveProfile = useMutation({
    mutationFn: async ({ id, form }: { id: string; form: HTMLFormElement }) => {
      const fd = new FormData(form);
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: String(fd.get("full_name") || "") || null,
          phone: String(fd.get("phone") || "") || null,
          email: String(fd.get("email") || "") || null,
          address: String(fd.get("address") || "") || null,
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      setEditing(false);
      queryClient.invalidateQueries({ queryKey: ["all-profiles"] });
    },
  });

  const reviewRequest = useMutation({
    mutationFn: async ({ id, approve }: { id: string; approve: boolean }) => {
      const req = (requests.data ?? []).find((r) => r.id === id);
      if (!req) throw new Error("not found");
      const { data: userData } = await supabase.auth.getUser();
      if (approve) {
        const patch: { full_name?: string; phone?: string; email?: string; address?: string; avatar_url?: string } = {};
        if (req.full_name) patch.full_name = req.full_name;
        if (req.phone) patch.phone = req.phone;
        if (req.email) patch.email = req.email;
        if (req.address) patch.address = req.address;
        if (req.avatar_url) patch.avatar_url = req.avatar_url;
        if (Object.keys(patch).length) {
          const { error } = await supabase.from("profiles").update(patch).eq("id", req.user_id);
          if (error) throw error;
        }
      }
      const { error } = await supabase
        .from("profile_change_requests")
        .update({
          status: approve ? "approved" : "rejected",
          reviewed_by: userData.user?.id ?? null,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-change-requests"] });
      queryClient.invalidateQueries({ queryKey: ["all-profiles"] });
    },
  });

  const saveOrder = useMutation({
    mutationFn: async ({ id, form }: { id: string; form: HTMLFormElement }) => {
      const fd = new FormData(form);
      const { error } = await supabase
        .from("orders")
        .update({
          total_amount: Number(fd.get("total_amount") || 0),
          advance_amount: Number(fd.get("advance_amount") || 0),
          progress: Number(fd.get("progress") || 0),
          status: String(fd.get("status") || "pending"),
          admin_note: String(fd.get("admin_note") || "") || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      setEditOrder(null);
      queryClient.invalidateQueries({ queryKey: ["all-orders"] });
    },
  });

  if (profiles.isPending) {
    return (
      <div className="flex items-center gap-2 text-sm text-white/60">
        <Loader2 className="h-4 w-4 animate-spin" /> লোড হচ্ছে…
      </div>
    );
  }
  if (profiles.isError) {
    return (
      <div className={card}>
        <p className="text-sm text-red-300">ক্লায়েন্ট তালিকা আনা যায়নি।</p>
      </div>
    );
  }

  const byId = new Map(profiles.data.map((p) => [p.id, p]));
  const clients = clientIds.data ? profiles.data.filter((p) => clientIds.data!.has(p.id)) : profiles.data;

  // ---------- Client profile view (no orders, no role tools) ----------
  const selected = selectedId ? byId.get(selectedId) : null;
  if (selected) {
    const pend = (requests.data ?? []).filter((r) => r.user_id === selected.id);
    return (
      <div className="space-y-6">
        <button className={ghost} onClick={() => { setSelectedId(null); setEditing(false); }}>
          <ArrowLeft className="h-3.5 w-3.5" /> ক্লায়েন্ট তালিকায় ফিরুন
        </button>
        <div className={card}>
          <div className="flex flex-wrap items-center gap-4">
            <Avatar path={selected.avatar_url} size="h-20 w-20" />
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-xl font-bold text-white">{selected.full_name || "নাম নেই"}</h2>
              <p className="text-sm text-white/55">
                ক্লায়েন্ট আইডি: <span className="font-semibold text-brand-accent">{selected.client_code || "—"}</span>
              </p>
            </div>
            <button className={ghost} onClick={() => setEditing((v) => !v)}>
              <Pencil className="h-3.5 w-3.5" /> তথ্য এডিট
            </button>
          </div>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["মোবাইল", formatBdPhone(selected.phone)],
                ["ইমেইল", selected.email || "—"],
                ["ঠিকানা", selected.address || "—"],
                ["যুক্ত হয়েছেন", new Date(selected.created_at).toLocaleDateString("bn-BD")],
              ] as Array<[string, string]>
            ).map(([l, v]) => (
              <div key={l} className="flex justify-between gap-3 border-b border-white/8 pb-2">
                <dt className="text-sm text-white/55">{l}</dt>
                <dd className="truncate text-sm font-semibold text-white">{v}</dd>
              </div>
            ))}
          </dl>
          {editing ? (
            <form
              className="mt-5 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                saveProfile.mutate({ id: selected.id, form: e.currentTarget });
              }}
            >
              <input name="full_name" defaultValue={selected.full_name ?? ""} placeholder="নাম" className={input} />
              <input name="phone" defaultValue={selected.phone ?? ""} placeholder="মোবাইল" className={input} />
              <input name="email" defaultValue={selected.email ?? ""} placeholder="ইমেইল" className={input} />
              <input name="address" defaultValue={selected.address ?? ""} placeholder="ঠিকানা" className={input} />
              <div>
                <button type="submit" disabled={saveProfile.isPending} className={btn}>সংরক্ষণ করুন</button>
              </div>
            </form>
          ) : null}
        </div>

        {pend.length ? (
          <div className={card}>
            <h3 className="font-display text-sm font-bold text-amber-200">তথ্য পরিবর্তনের অনুরোধ</h3>
            <div className="mt-3 space-y-3">
              {pend.map((req) => (
                <div key={req.id} className="rounded-lg border border-amber-400/25 bg-amber-400/5 p-3">
                  <ul className="space-y-0.5 text-xs text-white/75">
                    {req.full_name ? <li>নাম: {req.full_name}</li> : null}
                    {req.phone ? <li>মোবাইল: {req.phone}</li> : null}
                    {req.email ? <li>ইমেইল: {req.email}</li> : null}
                    {req.address ? <li>ঠিকানা: {req.address}</li> : null}
                    {req.avatar_url ? <li>নতুন প্রোফাইল ছবি</li> : null}
                  </ul>
                  <div className="mt-2 flex gap-2">
                    <button className={ghost} disabled={reviewRequest.isPending} onClick={() => reviewRequest.mutate({ id: req.id, approve: true })}>
                      <Check className="h-3.5 w-3.5" /> অনুমোদন
                    </button>
                    <button className={ghost} disabled={reviewRequest.isPending} onClick={() => reviewRequest.mutate({ id: req.id, approve: false })}>
                      <X className="h-3.5 w-3.5" /> বাতিল
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  // ---------- Main view: orders on top, directory below ----------
  return (
    <div className="space-y-6">
      <div className={card}>
        <h2 className="font-display text-base font-bold text-white">
          অর্ডার ম্যানেজমেন্ট <span className="text-white/45">({orders.data?.length ?? 0})</span>
        </h2>
        <div className="mt-4 overflow-x-auto">
          {orders.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-white/60" />
          ) : (orders.data?.length ?? 0) === 0 ? (
            <p className="text-sm text-white/55">এখনো কোনো অর্ডার নেই।</p>
          ) : (
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="text-xs text-white/50">
                <tr className="border-b border-white/10">
                  <th className="py-2 pr-3">তারিখ</th>
                  <th className="py-2 pr-3">ক্লায়েন্ট</th>
                  <th className="py-2 pr-3">সেবা</th>
                  <th className="py-2 pr-3">মোট</th>
                  <th className="py-2 pr-3">অগ্রিম</th>
                  <th className="py-2 pr-3">বাকি</th>
                  <th className="py-2 pr-3">অগ্রগতি</th>
                  <th className="py-2 pr-3">অবস্থা</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {(orders.data ?? []).map((o) => {
                  const c = byId.get(o.client_id);
                  return (
                    <tr key={o.id} className="border-b border-white/6 align-top text-white/85">
                      <td className="py-2.5 pr-3 whitespace-nowrap">{new Date(o.created_at).toLocaleDateString("bn-BD")}</td>
                      <td className="py-2.5 pr-3">
                        <span className="font-semibold text-white">{c?.full_name || "—"}</span>
                        <p className="text-xs text-brand-accent">{c?.client_code || ""}</p>
                      </td>
                      <td className="py-2.5 pr-3">
                        <span className="font-semibold text-white">{o.service_title}</span>
                        {o.details ? <p className="text-xs text-white/50">{o.details}</p> : null}
                        {editOrder === o.id ? (
                          <form
                            className="mt-3 grid min-w-[420px] gap-2 sm:grid-cols-2"
                            onSubmit={(e) => {
                              e.preventDefault();
                              saveOrder.mutate({ id: o.id, form: e.currentTarget });
                            }}
                          >
                            <input name="total_amount" type="number" min={0} defaultValue={Number(o.total_amount)} placeholder="মোট" className={input} />
                            <input name="advance_amount" type="number" min={0} defaultValue={Number(o.advance_amount)} placeholder="অগ্রিম" className={input} />
                            <input name="progress" type="number" min={0} max={100} defaultValue={o.progress} placeholder="অগ্রগতি %" className={input} />
                            <select name="status" defaultValue={o.status} className={input}>
                              {Object.entries(statusLabel).map(([v, l]) => (
                                <option key={v} value={v} className="bg-ink">{l}</option>
                              ))}
                            </select>
                            <input name="admin_note" defaultValue={o.admin_note ?? ""} placeholder="নোট" className={`${input} sm:col-span-2`} />
                            <button type="submit" disabled={saveOrder.isPending} className={btn}>আপডেট</button>
                          </form>
                        ) : null}
                      </td>
                      <td className="py-2.5 pr-3">{money(o.total_amount)}</td>
                      <td className="py-2.5 pr-3">{money(o.advance_amount)}</td>
                      <td className="py-2.5 pr-3 font-semibold text-amber-200">{money(o.due_amount)}</td>
                      <td className="py-2.5 pr-3">{o.progress}%</td>
                      <td className="py-2.5 pr-3">
                        <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs whitespace-nowrap">
                          {statusLabel[o.status] ?? o.status}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <button className={ghost} onClick={() => setEditOrder(editOrder === o.id ? null : o.id)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className={card}>
        <h2 className="font-display text-base font-bold text-white">
          ক্লায়েন্ট ডিরেক্টরি <span className="text-white/45">({clients.length})</span>
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="text-xs text-white/50">
              <tr className="border-b border-white/10">
                <th className="py-2 pr-3">#</th>
                <th className="py-2 pr-3">ক্লায়েন্ট আইডি</th>
                <th className="py-2 pr-3">নাম</th>
                <th className="py-2 pr-3">মোবাইল</th>
                <th className="py-2 pr-3">ঠিকানা</th>
                <th className="py-2 text-right">ছবি</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((p, i) => {
                const pend = (requests.data ?? []).filter((r) => r.user_id === p.id).length;
                return (
                  <tr key={p.id} className="border-b border-white/6 align-middle text-white/85">
                    <td className="py-2.5 pr-3">{(i + 1).toLocaleString("bn-BD")}</td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">
                      <button className="font-semibold text-brand-accent hover:underline" onClick={() => setSelectedId(p.id)}>
                        {p.client_code || "—"}
                      </button>
                    </td>
                    <td className="py-2.5 pr-3">
                      <button className="font-semibold text-white hover:underline" onClick={() => setSelectedId(p.id)}>
                        {p.full_name || "নাম নেই"}
                      </button>
                      {pend ? <span className="ml-2 rounded-full bg-amber-400/15 px-2 py-0.5 text-[11px] text-amber-200">{pend} অনুরোধ</span> : null}
                    </td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">{formatBdPhone(p.phone)}</td>
                    <td className="py-2.5 pr-3">{p.address || "—"}</td>
                    <td className="py-2.5">
                      <div className="flex justify-end"><Avatar path={p.avatar_url} /></div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
