update public.portfolio_projects
set
  primary_category = 'Software Development'
where primary_category = 'Web Development';

update public.portfolio_projects
set
  tag = 'Software Development'
where tag = 'Web Development';

update public.portfolio_project_categories
set
  category = 'Software Development',
  pill_label = 'Software Development'
where category = 'Web Development';

update public.portfolio_projects
set
  kind = 'uiux',
  tag = 'Product Design',
  description = 'Product design system for a school organization management platform covering events, communication, records, and coordination.',
  role = 'UI/UX Designer',
  tools = array['Figma', 'FigJam', 'Miro', 'Notion']::text[],
  overview = 'UMunity is a product design concept focused on school organization management — dashboards, events, records, announcements, and communication flows shaped for both student members and organization officers.',
  outcome = 'UMunity now reads as a complete product design case study, showing the Figma system, user flows, reusable components, and prototype direction for a student organization management platform.'
where slug = 'umunity';

delete from public.portfolio_project_categories
where category = 'Software Development'
  and project_id in (
    select id
    from public.portfolio_projects
    where slug in ('pietyl-management-system', 'umunity')
  );

insert into public.portfolio_projects (
  slug,
  title,
  directory_title,
  primary_category,
  kind,
  tag,
  description,
  role,
  tools,
  year,
  client,
  overview,
  outcome,
  sort_order
)
values (
  'pietyl-digilpg-web',
  'Pietyl DigiLPG',
  'Pietyl DigiLPG',
  'Software Development',
  'frontend',
  'Software Development',
  'Full-stack implementation of Pietyl DigiLPG''s landing page and management system, built with Laravel, React, and MySQL.',
  'Full-Stack Developer',
  array['PHP 8.2', 'Laravel 12', 'React 18', 'Inertia.js', 'Tailwind CSS 4', 'Vite 7', 'MySQL', 'Pest']::text[],
  '2025',
  'Pietyl DigiLPG',
  'Pietyl DigiLPG, a long-standing LPG business operating since the 90s, needed a stronger digital presence. This full-stack project delivered two key pieces: a clean landing page for store publicity and a functional management system to streamline internal operations.',
  'Pietyl DigiLPG now has a professional landing page for customer-facing publicity and a streamlined management system to support daily operations.',
  7
)
on conflict (slug) do update
set
  title = excluded.title,
  directory_title = excluded.directory_title,
  primary_category = excluded.primary_category,
  kind = excluded.kind,
  tag = excluded.tag,
  description = excluded.description,
  role = excluded.role,
  tools = excluded.tools,
  year = excluded.year,
  client = excluded.client,
  overview = excluded.overview,
  outcome = excluded.outcome,
  sort_order = excluded.sort_order;

delete from public.portfolio_project_categories
where project_id = (
  select id
  from public.portfolio_projects
  where slug = 'pietyl-digilpg-web'
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
)
values (
  (
    select id
    from public.portfolio_projects
    where slug = 'pietyl-digilpg-web'
  ),
  'Software Development',
  'Software Development',
  null,
  4
);

insert into public.portfolio_projects (
  slug,
  title,
  directory_title,
  primary_category,
  kind,
  tag,
  description,
  role,
  tools,
  year,
  client,
  overview,
  outcome,
  sort_order
)
values (
  'umunity-web',
  'UMunity',
  'UMunity',
  'Software Development',
  'frontend',
  'Software Development',
  'Responsive web implementation of the UMunity school organization management system with dashboard, modules, and reusable screen patterns.',
  'Web Developer',
  array['React', 'Tailwind CSS', 'TypeScript']::text[],
  '2025',
  'UMunity',
  'The UMunity web build translates the product design system into a responsive front-end implementation using React, Tailwind CSS, and TypeScript — covering the dashboard, event modules, records, announcements, and navigation structure.',
  'UMunity now has a responsive software implementation of the product design system.',
  11
)
on conflict (slug) do update
set
  title = excluded.title,
  directory_title = excluded.directory_title,
  primary_category = excluded.primary_category,
  kind = excluded.kind,
  tag = excluded.tag,
  description = excluded.description,
  role = excluded.role,
  tools = excluded.tools,
  year = excluded.year,
  client = excluded.client,
  overview = excluded.overview,
  outcome = excluded.outcome,
  sort_order = excluded.sort_order;

delete from public.portfolio_project_categories
where project_id = (
  select id
  from public.portfolio_projects
  where slug = 'umunity-web'
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
)
values (
  (
    select id
    from public.portfolio_projects
    where slug = 'umunity-web'
  ),
  'Software Development',
  'Software Development',
  null,
  4
);

insert into public.portfolio_projects (
  slug,
  title,
  directory_title,
  primary_category,
  kind,
  tag,
  description,
  role,
  tools,
  year,
  client,
  overview,
  outcome,
  sort_order
)
values (
  'sakuragi-tailoring-shop-management-system',
  'Sakuragi Tailoring Shop Management System',
  'Sakuragi Tailoring Shop Management System',
  'Software Development',
  'frontend',
  'Software Development',
  'Management system for tailoring shop operations, customer records, job orders, and production tracking.',
  'Software Developer',
  array['Java', 'JavaFX', 'MySQL', 'Scene Builder', 'XAMPP']::text[],
  '2025',
  'Sakuragi Tailoring Shop',
  'Sakuragi Tailoring Shop Management System centralizes customer records, measurements, job orders, fitting schedules, and production tracking for day-to-day tailoring operations.',
  'Sakuragi Tailoring Shop now has a more structured software workflow for managing customer records, tailoring jobs, and production status in one system.',
  29
)
on conflict (slug) do update
set
  title = excluded.title,
  directory_title = excluded.directory_title,
  primary_category = excluded.primary_category,
  kind = excluded.kind,
  tag = excluded.tag,
  description = excluded.description,
  role = excluded.role,
  tools = excluded.tools,
  year = excluded.year,
  client = excluded.client,
  overview = excluded.overview,
  outcome = excluded.outcome,
  sort_order = excluded.sort_order;

delete from public.portfolio_project_categories
where project_id = (
  select id
  from public.portfolio_projects
  where slug = 'sakuragi-tailoring-shop-management-system'
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
)
values (
  (
    select id
    from public.portfolio_projects
    where slug = 'sakuragi-tailoring-shop-management-system'
  ),
  'Software Development',
  'Software Development',
  null,
  4
);
