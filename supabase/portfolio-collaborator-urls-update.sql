-- Updates collaborator entries with portfolio URLs for projects
-- that have collaborators with external portfolio links.
-- Safe to rerun: idempotent via slug-based updates.

update public.portfolio_projects
set collaborators = array[
  'Fe Anne Malasarte | Front End Developer | /assets/collaborators/fe-anne-malasarte.webp',
  'Jorge Macabenta | Backend Developer | | https://portfolio-school-fawn.vercel.app/#projects'
]::text[]
where slug = 'pietyl-digilpg-web';

update public.portfolio_projects
set collaborators = array[
  'Fe Anne Malasarte | UI/UX Designer | /assets/collaborators/fe-anne-malasarte.webp',
  'Jay Lao III | Backend Developer | /assets/collaborators/jay-lao-iii.webp | https://blackhole-jay.vercel.app'
]::text[]
where slug = 'adoptify';

update public.portfolio_projects
set collaborators = array[
  'Jay Lao III | Backend Developer | /assets/collaborators/jay-lao-iii.webp | https://blackhole-jay.vercel.app'
]::text[]
where slug = 'sakuragi-tailoring-shop-management-system';
