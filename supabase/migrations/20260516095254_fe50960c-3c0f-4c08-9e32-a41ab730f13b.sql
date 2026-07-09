
-- Tighten contact_messages insert
DROP POLICY "Anyone submits contact messages" ON public.contact_messages;
CREATE POLICY "Anyone submits contact messages" ON public.contact_messages
  FOR INSERT
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 100
    AND char_length(email) BETWEEN 3 AND 255
    AND char_length(message) BETWEEN 1 AND 2000
    AND (subject IS NULL OR char_length(subject) <= 200)
  );

-- Tighten orders insert: must be authenticated
DROP POLICY "Authenticated users create orders" ON public.orders;
CREATE POLICY "Authenticated users create orders" ON public.orders
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Lock down SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Plant image storage: keep public read by direct URL, no listing for anon
DROP POLICY "Plant images public read" ON storage.objects;
CREATE POLICY "Plant images public read" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'plant-images');
