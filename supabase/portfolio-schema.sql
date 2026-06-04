create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  directory_title text,
  primary_category text not null,
  kind text not null default 'gallery',
  tag text,
  description text,
  role text,
  tools text[] not null default '{}',
  year text,
  client text,
  overview text,
  outcome text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_project_categories (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.portfolio_projects(id) on delete cascade,
  category text not null,
  pill_label text not null,
  title_override text,
  sort_order integer not null default 0,
  unique (project_id, category)
);

create table if not exists public.portfolio_gallery_items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.portfolio_projects(id) on delete cascade,
  label text not null,
  note text,
  image_url text,
  ratio text not null default 'square',
  color text,
  sort_order integer not null default 0
);

alter table public.portfolio_projects enable row level security;
alter table public.portfolio_project_categories enable row level security;
alter table public.portfolio_gallery_items enable row level security;

grant select on public.portfolio_projects to anon, authenticated;
grant select on public.portfolio_project_categories to anon, authenticated;
grant select on public.portfolio_gallery_items to anon, authenticated;

drop policy if exists "Public can read portfolio projects" on public.portfolio_projects;
drop policy if exists "Public can read portfolio project categories" on public.portfolio_project_categories;
drop policy if exists "Public can read portfolio gallery items" on public.portfolio_gallery_items;

create policy "Public can read portfolio projects"
on public.portfolio_projects
for select
to anon, authenticated
using (true);

create policy "Public can read portfolio project categories"
on public.portfolio_project_categories
for select
to anon, authenticated
using (true);

create policy "Public can read portfolio gallery items"
on public.portfolio_gallery_items
for select
to anon, authenticated
using (true);
