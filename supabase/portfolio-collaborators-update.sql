alter table public.portfolio_projects
add column if not exists collaborators text[] not null default '{}';

update public.portfolio_projects
set collaborators = array[
  'Joevan Capote | Project Leader / QA Engineer | /placeholders/collaborators/collab-01.svg',
  'Fe Anne Malasarte | UI/UX Designer | /placeholders/collaborators/collab-02.png',
  'Jaymark Burlado | Project Member | /placeholders/collaborators/collab-03.svg'
]::text[]
where slug = 'umunity';

update public.portfolio_projects
set collaborators = array[
  'Joevan Capote | Quality Assurance Engineer | /placeholders/collaborators/collab-01.svg',
  'Fe Anne Malasarte | Full Stack Developer | /placeholders/collaborators/collab-02.png',
  'Jaymark Burlado | Project Member | /placeholders/collaborators/collab-03.svg'
]::text[]
where slug = 'umunity-web';
