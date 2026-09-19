import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Loader2, Pencil, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatBdPhone } from "@/lib/phone";
import { roleLabel, type AppRole } from "@/data/dashboard";
import { useRole } from "@/hooks/useRole";
import { OrdersTable, money, statusLabel } from "./OrdersTable";

const card = "rounded-2xl border border-white/10 bg-white/5 p-6";
const input =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-brand-accent focus:outline-none";
const btn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 font-display text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60";
const ghost =
  "inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/8 disabled:opacity-60";

export function AdminClients() {
  const { role } = useRole();
  const isAdmin = role === "admin";
  const queryClient = useQueryClient();
  const [openId, setOpenId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  const profiles = useQuery({
    queryKey: ["all-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, phone, email, address, client_code, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const roles = useQuery({
    queryKey: ["all-roles"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("user_id, role");
      if (error) throw error;
      return data ?? [];
    },
  });

  const orders = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
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

  const roleFor = (userId: string): AppRole | null => {
    const found = (roles.data ?? []).filter((r) => r.user_id === userId).map((r) => r.role as AppRole);
    return (["admin", "executive", "staff", "client"] as AppRole[]).find((r) => found.includes(r)) ?? null;
  };

  const toggleRole = useMutation({
    mutationFn: async ({ userId, next }: { userId: string; next: AppRole }) => {
      const { error: delErr } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .in("role", ["client", "executive"]);
      if (delErr) throw delErr;
      const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: next });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["all-roles"] }),
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
      setEditId(null);
      queryClient.invalidateQueries({ queryKey: ["all-profiles"] });
    },
  });

  const reviewRequest = useMutation({
    mutationFn: async ({ id, approve }: { id: string; approve: boolean }) => {
      const req = (requests.data ?? []).find((r) => r.id === id);
      if (!req) throw new Error("not found");
      const { data: userData } = await supabase.auth.getUser();
      if (approve) {
        const patch: Record<string, string> = {};
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["all-orders"] }),
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

  const pendingFor = (userId: string) => (requests.data ?? []).filter((r) => r.user_id === userId);
  const ordersFor = (userId: string) => (orders.data ?? []).filter((o) => o.client_id === userId);

  return (
    <div className="space-y-6">
      <div className={card}>
        <h2 className="font-display text-base font-bold text-white">
          সকল ক্লায়েন্ট <span className="text-white/45">({profiles.data.length})</span>
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-xs text-white/50">
              <tr className="border-b border-white/10">
                <th className="py-2 pr-3">নাম</th>
                <th className="py-2 pr-3">আইডি</th>
                <th className="py-2 pr-3">মোবাইল</th>
                <th className="py-2 pr-3">রোল</th>
                <th className="py-2 pr-3">অবস্থা</th>
                <th className="py-2">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {profiles.data.map((p) => {
                const r = roleFor(p.id);
                const pend = pendingFor(p.id).length;
                return (
                  <tr key={p.id} className="border-b border-white/6 align-top text-white/85">
                    <td className="py-2.5 pr-3">
                      <span className="font-semibold text-white">{p.full_name || "নাম নেই"}</span>
                      <p className="text-xs text-white/45">{p.email || "—"}</p>
                    </td>
                    <td className="py-2.5 pr-3 whitespace-nowrap text-brand-accent">{p.client_code || "—"}</td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">{formatBdPhone(p.phone)}</td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">{r ? roleLabel[r] : "—"}</td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">
                      {pend > 0 ? (
                        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs text-amber-200">
                          {pend} অনুরোধ
                        </span>
                      ) : (
                        <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs">সক্রিয়</span>
                      )}
                    </td>
                    <td className="py-2.5">
                      <div className="flex flex-wrap gap-2">
                        <button className={ghost} onClick={() => setOpenId(openId === p.id ? null : p.id)}>
                          বিস্তারিত
                        </button>
                        <button className={ghost} onClick={() => setEditId(editId === p.id ? null : p.id)}>
                          <Pencil className="h-3.5 w-3.5" /> এডিট
                        </button>
                        {isAdmin && (r === "client" || r === "executive") ? (
                          <button
                            className={ghost}
                            disabled={toggleRole.isPending}
                            onClick={() =>
                              toggleRole.mutate({
                                userId: p.id,
                                next: r === "client" ? "executive" : "client",
                              })
                            }
                          >
                            {r === "client" ? "এক্সিকিউটিভ করুন" : "ক্লায়েন্ট করুন"}
                          </button>
                        ) : null}
                      </div>

                      {editId === p.id ? (
                        <form
                          className="mt-3 grid max-w-md gap-2"
                          onSubmit={(e) => {
                            e.preventDefault();
                            saveProfile.mutate({ id: p.id, form: e.currentTarget });
                          }}
                        >
                          <input name="full_name" defaultValue={p.full_name ?? ""} placeholder="নাম" className={input} />
                          <input name="phone" defaultValue={p.phone ?? ""} placeholder="মোবাইল" className={input} />
                          <input name="email" defaultValue={p.email ?? ""} placeholder="ইমেইল" className={input} />
                          <input name="address" defaultValue={p.address ?? ""} placeholder="ঠিকানা" className={input} />
                          <button type="submit" disabled={saveProfile.isPending} className={btn}>
                            সংরক্ষণ করুন
                          </button>
                        </form>
                      ) : null}

                      {openId === p.id ? (
                        <div className="mt-3 space-y-4 rounded-xl border border-white/10 bg-white/5 p-4">
                          <p className="text-xs text-white/55">ঠিকানা: {p.address || "—"}</p>

                          {pendingFor(p.id).map((req) => (
                            <div key={req.id} className="rounded-lg border border-amber-400/25 bg-amber-400/5 p-3">
                              <p className="text-xs font-semibold text-amber-200">পরিবর্তনের অনুরোধ</p>
                              <ul className="mt-1 space-y-0.5 text-xs text-white/70">
                                {req.full_name ? <li>নাম: {req.full_name}</li> : null}
                                {req.phone ? <li>মোবাইল: {req.phone}</li> : null}
                                {req.email ? <li>ইমেইল: {req.email}</li> : null}
                                {req.address ? <li>ঠিকানা: {req.address}</li> : null}
                                {req.avatar_url ? <li>নতুন প্রোফাইল ছবি</li> : null}
                              </ul>
                              <div className="mt-2 flex gap-2">
                                <button
                                  className={ghost}
                                  disabled={reviewRequest.isPending}
                                  onClick={() => reviewRequest.mutate({ id: req.id, approve: true })}
                                >
                                  <Check className="h-3.5 w-3.5" /> অনুমোদন
                                </button>
                                <button
                                  className={ghost}
                                  disabled={reviewRequest.isPending}
                                  onClick={() => reviewRequest.mutate({ id: req.id, approve: false })}
                                >
                                  <X className="h-3.5 w-3.5" /> বাতিল
                                </button>
                              </div>
                            </div>
                          ))}

                          <div>
                            <p className="text-xs font-semibold text-white/60">অর্ডার</p>
                            {ordersFor(p.id).length === 0 ? (
                              <p className="mt-1 text-xs text-white/45">কোনো অর্ডার নেই।</p>
                            ) : (
                              <div className="mt-2 space-y-3">
                                {ordersFor(p.id).map((o) => (
                                  <form
                                    key={o.id}
                                    className="grid gap-2 rounded-lg border border-white/10 p-3 sm:grid-cols-5"
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      saveOrder.mutate({ id: o.id, form: e.currentTarget });
                                    }}
                                  >
                                    <div className="sm:col-span-5">
                                      <p className="text-sm font-semibold text-white">{o.service_title}</p>
                                      {o.details ? <p className="text-xs text-white/50">{o.details}</p> : null}
                                      <p className="text-xs text-amber-200">বাকি: {money(o.due_amount)}</p>
                                    </div>
                                    <input name="total_amount" type="number" min={0} defaultValue={Number(o.total_amount)} placeholder="মোট" className={input} />
                                    <input name="advance_amount" type="number" min={0} defaultValue={Number(o.advance_amount)} placeholder="অগ্রিম" className={input} />
                                    <input name="progress" type="number" min={0} max={100} defaultValue={o.progress} placeholder="অগ্রগতি %" className={input} />
                                    <select name="status" defaultValue={o.status} className={input}>
                                      {Object.entries(statusLabel).map(([value, label]) => (
                                        <option key={value} value={value} className="bg-ink">
                                          {label}
                                        </option>
                                      ))}
                                    </select>
                                    <button type="submit" disabled={saveOrder.isPending} className={btn}>
                                      আপডেট
                                    </button>
                                    <input name="admin_note" defaultValue={o.admin_note ?? ""} placeholder="নোট" className={`${input} sm:col-span-5`} />
                                  </form>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={card}>
        <h2 className="font-display text-base font-bold text-white">সাম্প্রতিক সকল অর্ডার</h2>
        <div className="mt-4">
          {orders.isPending ? (
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Loader2 className="h-4 w-4 animate-spin" /> লোড হচ্ছে…
            </div>
          ) : (orders.data?.length ?? 0) === 0 ? (
            <p className="text-sm text-white/55">এখনো কোনো অর্ডার নেই।</p>
          ) : (
            <OrdersTable orders={(orders.data ?? []).slice(0, 15)} />
          )}
        </div>
      </div>
    </div>
  );
}
