-- Create a table for public user profiles
create table users (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  is_admin boolean default false
);
alter table users enable row level security;
create policy "Public profiles are viewable by everyone." on users for select using (true);
create policy "Users can insert their own profile." on users for insert with check (auth.uid() = id);
create policy "Users can update own profile." on users for update using (auth.uid() = id);

-- Set up Realtime!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table users;

-- Set up Storage!
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true);

create policy "Site images are publicly accessible." on storage.objects
  for select using (bucket_id = 'site-images');

create policy "Anyone can upload a site image." on storage.objects
  for insert with check (bucket_id = 'site-images');

create policy "Admins can update site images." on storage.objects
  for update using (auth.uid() in (select id from users where is_admin = true));
  
create policy "Admins can delete site images." on storage.objects
  for delete using (auth.uid() in (select id from users where is_admin = true));


-- PAGES Table
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- BLOCKS Table
CREATE TABLE blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE NOT NULL,
  order_index INT NOT NULL,
  title TEXT,
  content TEXT,
  image_url TEXT,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

-- Policies for PAGES
CREATE POLICY "Pages are viewable by everyone." ON pages
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage pages." ON pages
  FOR ALL USING (
    (SELECT is_admin FROM users WHERE id = auth.uid())
  );

-- Policies for BLOCKS
CREATE POLICY "Blocks are viewable by everyone." ON blocks
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage blocks." ON blocks
  FOR ALL USING (
    (SELECT is_admin FROM users WHERE id = auth.uid())
  ) WITH CHECK (
    (SELECT is_admin FROM users WHERE id = auth.uid())
  );

-- Automatically set updated_by and updated_at on block update
CREATE OR REPLACE FUNCTION public.handle_block_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_block_update
  BEFORE UPDATE ON public.blocks
  FOR EACH ROW EXECUTE PROCEDURE public.handle_block_update();
