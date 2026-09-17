import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { DashboardShell, ModulePlaceholder } from "@/components/dashboard/DashboardShell";
import { supabase } from "@/integrations/supabase/client";
import { useRole } from "@/hooks/useRole";
import { roleLabel } from "@/data/dashboard";

const title = "ক্লায়েন্ট ম্যানেজমেন্ট | ড্যাশবোর্ড";
const description = "ক্লায়েন্ট প্রোফাইল, সেশন ও কাজের ইতিহাস এখানে দেখা যাবে।";

export const Route = createFileRoute("/_authenticated/dashboard/clients")({
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
  component: Page,
});

function MyProfile() {
  const { role } = useRole();
  const { data, isPending, error } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return null;
      const { data: profile, error: err } = await supabase
        .from("profiles")
        .select("full_name, phone, created_at")
        .eq("id", user.id)
        .maybeSingle();
      if (err) throw err;
      return { email: user.email ?? "", ...profile };
    },
  });

  if (isPending) {
    return (
      <div className="flex items-center gap-2 text-sm text-white/60">
        <Loader2 className="h-4 w-4 animate-spin" /> লোড হচ্ছে…
      </div>
    );
  }

  if (error || !data) {
    return <ModulePlaceholder note="প্রোফাইল তথ্য পাওয়া যায়নি।" />;
  }

  const rows: Array<[string, string]> = [
    ["নাম", data.full_name || "—"],
    ["ইমেইল", data.email || "—"],
    ["মোবাইল", data.phone || "—"],
    ["রোল", role ? roleLabel[role] : "—"],
    [
      "যুক্ত হয়েছেন",
      data.created_at ? new Date(data.created_at).toLocaleDateString("bn-BD") : "—",
    ],
  ];

  return (
    <div className="max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="font-display text-base font-bold text-white">আমার প্রোফাইল</h2>
      <dl className="mt-4 space-y-3">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 border-b border-white/8 pb-2">
            <dt className="text-sm text-white/55">{label}</dt>
            <dd className="text-sm font-semibold text-white">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-white/40">
        তথ্য পরিবর্তন করতে চাইলে দোকানের সাথে যোগাযোগ করুন।
      </p>
    </div>
  );
}

function Page() {
  const { role } = useRole();
  const isClient = role === "client";

  return (
    <DashboardShell
      title={isClient ? "আমার প্রোফাইল" : "ক্লায়েন্ট ম্যানেজমেন্ট"}
      subtitle={isClient ? "My Profile" : "Client Management"}
      moduleId="clients"
    >
      {isClient ? (
        <MyProfile />
      ) : (
        <ModulePlaceholder note={"ক্লায়েন্ট প্রোফাইল, সেশন ও কাজের ইতিহাস এখানে দেখা যাবে।"} />
      )}
    </DashboardShell>
  );
}
