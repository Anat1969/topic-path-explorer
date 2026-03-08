
-- Drop all existing restrictive policies
DROP POLICY IF EXISTS "Profiles viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

DROP POLICY IF EXISTS "Submissions viewable by everyone" ON public.student_submissions;
DROP POLICY IF EXISTS "Users can insert own submissions" ON public.student_submissions;
DROP POLICY IF EXISTS "Users can delete own submissions" ON public.student_submissions;

-- Recreate as explicitly PERMISSIVE
CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT TO public USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Submissions viewable by everyone" ON public.student_submissions FOR SELECT TO public USING (true);
CREATE POLICY "Users can insert own submissions" ON public.student_submissions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own submissions" ON public.student_submissions FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Recreate the trigger for auto-creating profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Storage policies for submissions bucket
DROP POLICY IF EXISTS "Anyone can view submissions" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload submissions" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own submission files" ON storage.objects;

CREATE POLICY "Anyone can view submissions" ON storage.objects FOR SELECT TO public USING (bucket_id = 'submissions');
CREATE POLICY "Authenticated users can upload submissions" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'submissions');
CREATE POLICY "Users can delete own submission files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'submissions' AND (storage.foldername(name))[1] = auth.uid()::text);
