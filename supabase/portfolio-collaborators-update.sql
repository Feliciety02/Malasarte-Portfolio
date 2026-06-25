alter table public.portfolio_projects
add column if not exists collaborators text[] not null default '{}';

update public.portfolio_projects
set collaborators = array[
  'Fe Anne Malasarte | UI/UX Designer | /assets/collaborators/fe-anne-malasarte.webp'
]::text[]
where slug = 'umunity';

update public.portfolio_projects
set collaborators = array[
  'Fe Anne Malasarte | Full Stack Developer | /assets/collaborators/fe-anne-malasarte.webp'
]::text[]
where slug = 'umunity-web';
