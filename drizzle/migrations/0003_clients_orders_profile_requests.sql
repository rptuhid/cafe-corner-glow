-- Client profile extensions
CREATE SEQUENCE IF NOT EXISTS public.client_code_seq START 1001;

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS client_code text DEFAULT ('DC-' || lpad(nextval('public.client_code_seq')::text, 4, '0'));

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_client_code_key') THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_client_code_key UNIQUE (client_code);
  END IF;
END $$;

-- Keep new signups populated with contact details
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, email, address)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NULLIF(NEW.raw_user_meta_data->>'phone', ''),
    NULLIF(COALESCE(NEW.raw_user_meta_data->>'contact_email', NEW.email), ''),
    NULLIF(NEW.raw_user_meta_data->>'address', '')
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'client')
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$function$;

-- Orders
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_title text NOT NULL,
  details text,
  total_amount numeric(12,2) NOT NULL DEFAULT 0,
  advance_amount numeric(12,2) NOT NULL DEFAULT 0,
  due_amount numeric(12,2) GENERATED ALWAYS AS (total_amount - advance_amount) STORED,
  status text NOT NULL DEFAULT 'pending',
  progress integer NOT NULL DEFAULT 0,
  admin_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients view own orders" ON public.orders
  FOR SELECT TO authenticated USING (auth.uid() = client_id);
CREATE POLICY "Staff view all orders" ON public.orders
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'executive'));
CREATE POLICY "Clients create own orders" ON public.orders
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = client_id);
CREATE POLICY "Staff update orders" ON public.orders
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'executive'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'executive'));
CREATE POLICY "Admins delete orders" ON public.orders
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE INDEX IF NOT EXISTS orders_client_id_idx ON public.orders(client_id);

-- Profile change requests (admin approval)
CREATE TABLE IF NOT EXISTS public.profile_change_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  phone text,
  email text,
  address text,
  avatar_url text,
  status text NOT NULL DEFAULT 'pending',
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profile_change_requests TO authenticated;
GRANT ALL ON public.profile_change_requests TO service_role;
ALTER TABLE public.profile_change_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own change requests" ON public.profile_change_requests
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users create own change requests" ON public.profile_change_requests
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins view change requests" ON public.profile_change_requests
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'executive'));
CREATE POLICY "Admins update change requests" ON public.profile_change_requests
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'executive'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'executive'));

-- Staff may update any profile (used when approving change requests)
CREATE POLICY "Staff update profiles" ON public.profiles
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'executive'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'executive'));
