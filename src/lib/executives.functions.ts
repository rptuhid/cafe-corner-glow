import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const schema = z.object({
  full_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional().default(""),
  password: z.string().min(6).max(72),
});

export const createExecutive = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => schema.parse(d))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleErr } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleErr || !isAdmin) throw new Error("শুধু অ্যাডমিন এক্সিকিউটিভ তৈরি করতে পারবেন।");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: { full_name: data.full_name, phone: data.phone, contact_email: data.email },
    });
    if (error || !created.user) throw new Error(error?.message ?? "অ্যাকাউন্ট তৈরি হয়নি");
    const uid = created.user.id;
    await supabaseAdmin.from("user_roles").delete().eq("user_id", uid);
    const { error: insErr } = await supabaseAdmin.from("user_roles").insert({ user_id: uid, role: "executive" });
    if (insErr) throw new Error(insErr.message);
    return { ok: true };
  });
