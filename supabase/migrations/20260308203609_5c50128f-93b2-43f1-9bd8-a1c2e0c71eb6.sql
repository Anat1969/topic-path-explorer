
-- Drop restrictive policies and recreate as permissive
DROP POLICY IF EXISTS "Profiles viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Submissions viewable by everyone" ON public.student_submissions;
DROP POLICY IF EXISTS "Users can insert own submissions" ON public.student_submissions;
DROP POLICY IF EXISTS "Users can delete own submissions" ON public.student_submissions;

CREATE POLICY "Submissions viewable by everyone" ON public.student_submissions FOR SELECT USING (true);
CREATE POLICY "Users can insert own submissions" ON public.student_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own submissions" ON public.student_submissions FOR DELETE USING (auth.uid() = user_id);
