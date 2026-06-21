-- Updates collaborator entries with portfolio URLs for projects
-- that have collaborators with external portfolio links.
-- Safe to rerun: idempotent via slug-based updates.

update public.portfolio_projects
set collaborators = array[
  'Joevan Capote | Quality Assurance Engineer | /placeholders/collaborators/collab-01.svg',
  'Fe Anne Malasarte | Front End Developer | /placeholders/collaborators/collab-02.png',
  'Jorge Macabenta | Backend Developer | | https://portfolio-school-fawn.vercel.app/#projects'
]::text[]
where slug = 'pietyl-digilpg-web';

update public.portfolio_projects
set collaborators = array[
  'Jay Lao III | Backend Developer | | https://blackhole-jay.vercel.app'
]::text[]
where slug = 'adoptify';

update public.portfolio_projects
set collaborators = array[
  'Jay Lao III | Backend Developer | | https://blackhole-jay.vercel.app'
]::text[]
where slug = 'sakuragi-tailoring-shop-management-system';
