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

-- Portfolio seed data generated from src/data/projects.ts.
-- Safe to rerun: this only resets the three portfolio_* tables.
begin;

truncate table
  public.portfolio_gallery_items,
  public.portfolio_project_categories,
  public.portfolio_projects
restart identity cascade;

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
) values (
  'odara-management-group',
  'Odara Management Group',
  'Odara Management Group',
  'Logo & Branding',
  'branding',
  'Brand Identity',
  'Corporate identity system for a management group.',
  'Brand Designer',
  array['Illustrator', 'Figma', 'Photoshop']::text[],
  '2025',
  'Odara Management Group',
  'Odara Management Group required a more polished and trustworthy identity system that could support presentations, digital communications, and formal business collateral.',
  'The final identity gives Odara Management Group a clearer and more professional visual foundation that can scale across core business touchpoints.',
  0
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
) values (
  'lian-monley',
  'Lian Monley',
  'Lian Monley',
  'Logo & Branding',
  'branding',
  'Personal Brand',
  'Personal branding system with a polished editorial feel.',
  'Brand Designer',
  array['Illustrator', 'Figma']::text[],
  '2025',
  'Lian Monley',
  'Lian Monley needed a more refined personal identity that could support social presence, presentation materials, and professional self-branding across digital touchpoints.',
  'The final system gives Lian Monley a cleaner and more intentional personal brand that can scale across public-facing materials.',
  1
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
) values (
  'pietyl-lpg',
  'Pietyl LPG',
  'Pietyl LPG',
  'Logo & Branding',
  'branding',
  'Business Branding',
  'Brand identity for an LPG business.',
  'Brand Designer',
  array['Illustrator', 'Photoshop']::text[],
  '2024',
  'Pietyl LPG',
  'Pietyl LPG needed a stronger visual identity that could feel dependable, recognizable, and easier to apply across signage, uniforms, and business materials.',
  'Pietyl LPG gained a more coherent and more visible brand identity suited to both business credibility and practical use.',
  2
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
) values (
  'blue-collar-builders',
  'Blue Collar Builders',
  'Blue Collar Builders',
  'Logo & Branding',
  'branding',
  'Construction Identity',
  'Brand identity for a builders and construction business.',
  'Brand Designer',
  array['Illustrator', 'Figma']::text[],
  '2024',
  'Blue Collar Builders',
  'Blue Collar Builders needed a visual identity that looked durable, professional, and trustworthy across contracts, uniforms, and construction-site branding.',
  'The identity now feels more established and durable, with clearer real-world applications across construction-related touchpoints.',
  3
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
) values (
  'trichomend-plus',
  'Trichomend+',
  'Trichomend+',
  'Logo & Branding',
  'branding',
  'Product Identity',
  'Brand identity direction for a treatment-focused product.',
  'Brand Designer',
  array['Illustrator', 'Figma', 'Photoshop']::text[],
  '2025',
  'Trichomend+',
  'Trichomend+ needed a cleaner and more credible product-facing identity that could feel science-led, professional, and consumer-friendly at the same time.',
  'Trichomend+ now has a more polished product identity direction that can scale into packaging and campaign assets.',
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
) values (
  'adoptify',
  'Adoptify',
  'Concept Project',
  'UI/UX Design',
  'uiux',
  'App Design',
  'UI/UX concept for an adoption-focused digital platform.',
  'UI/UX Designer',
  array['Figma', 'FigJam', 'Notion']::text[],
  '2025',
  'Concept Project',
  'Adoptify is a product design concept centered on making adoption journeys clearer, friendlier, and easier to trust across mobile and web touchpoints.',
  'Adoptify demonstrates a more compassionate and more organized product direction for adoption-centered digital experiences.',
  5
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
) values (
  'pietyl-management-system',
  'Pietyl DigiLPG',
  'Pietyl DigiLPG',
  'UI/UX Design',
  'uiux',
  'Management System',
  'System design for a business management platform.',
  'Product Designer',
  array['Figma', 'FigJam']::text[],
  '2025',
  'Pietyl DigiLPG',
  'Pietyl Management System is a structured interface system designed to support internal operations, records, workflow management, and monitoring inside a business environment.',
  'The resulting concept gives Pietyl a more scalable management-system direction built around clarity and long-term usability.',
  6
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
) values (
  'dost-laon',
  'DOST Laon',
  'DOST Laon',
  'UI/UX Design',
  'uiux',
  'Platform Design',
  'UI/UX work for a DOST-centered digital platform concept.',
  'UI/UX Designer',
  array['Figma', 'FigJam', 'Miro']::text[],
  '2025',
  'DOST Laon',
  'DOST Laon focuses on building a more structured and accessible digital experience around information, programs, or public-facing services tied to the DOST context.',
  'DOST Laon shows a more accessible and more structured direction for an information-heavy digital platform.',
  7
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
) values (
  'cosmic-remedies-by-sia',
  'Cosmic Remedies by Sia',
  'Cosmic Remedies by Sia',
  'UI/UX Design',
  'frontend',
  'UI + Front End',
  'A digital product and web experience for Cosmic Remedies by Sia.',
  'UI/UX Designer and Web Developer',
  array['Figma', 'React', 'Tailwind CSS']::text[],
  '2025',
  'Cosmic Remedies by Sia',
  'Cosmic Remedies by Sia combines interface direction and web implementation for a more immersive digital experience rooted in storytelling, product presentation, and responsive build quality.',
  'Cosmic Remedies by Sia stands as both a UI/UX project and a web implementation case, showing continuity from concept to working experience.',
  8
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
) values (
  'umunity',
  'UMunity',
  'UMunity',
  'UI/UX Design',
  'frontend',
  'UI/UX + Web System',
  'A school organization management system shaped in Figma and translated into a responsive web build.',
  'UI/UX Designer and Web Developer',
  array['Figma', 'React', 'Tailwind CSS', 'TypeScript', 'Miro', 'Notion']::text[],
  '2025',
  'UMunity',
  'UMunity is a school organization management system focused on events, communication, records, and coordination. This merged case study covers both the Figma product design and the responsive web implementation for student members and organization officers.',
  'UMunity now reads as one complete design-to-build case study, showing both the Figma system and the web implementation layer for a student organization management platform.',
  9
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
) values (
  'umsdc-publication-materials-and-assets',
  'UMSDC',
  'UMSDC',
  'Social Media Graphics',
  'gallery',
  'Social Media Asset System',
  'Social media graphics and creative assets for UMSDC.',
  'Social Media Graphic Designer',
  array['Figma', 'Photoshop', 'Canva']::text[],
  '2024',
  'UMSDC',
  'UMSDC Social Media Graphics and Creative Assets gathers social posts, organization graphics, event visuals, and campaign-ready assets under one reusable visual system.',
  'UMSDC now has a cleaner, more reusable social media graphics system for organization materials and digital assets.',
  10
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
) values (
  'eat-well-live-well-nutrition-ebook',
  'Eat Well, Live Well Nutrition eBook Writing and Cover Design',
  'Nutrition eBook Project',
  'Writing / VA',
  'writing',
  'eBook Writing',
  'Writing and cover design for a nutrition-focused eBook.',
  'Content Writer and Layout Designer',
  array['Google Docs', 'Canva', 'Figma']::text[],
  '2024',
  'Nutrition eBook Project',
  'This project combined eBook writing and cover design for a wellness-focused digital publication centered on nutrition, healthier habits, and accessible educational content.',
  'The final output delivered a clearer educational eBook experience with both content and cover design working together cohesively.',
  11
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
) values (
  'thriving-mind-mental-wellness-ebook',
  'Thriving Minds: Understanding Your Mental Health Journey',
  'Thriving Minds: Understanding Your Mental Health Journey',
  'Writing / VA',
  'writing',
  'Mental Wellness Guide',
  'A beginner-friendly mental wellness guide about awareness, coping skills, self-management, and personal growth.',
  'Content Writer and Layout Designer',
  array['Google Docs', 'Canva', 'Figma']::text[],
  '2024',
  'Mental Wellness eBook Project',
  'Thriving Minds: Understanding Your Mental Health Journey is a comprehensive mental wellness guide designed to educate readers about mental health from awareness to self-management and personal growth. The book follows a structured progression that helps readers understand mental health challenges, develop practical coping skills, and build a sustainable wellness plan.',
  'The final eBook became a beginner-friendly mental health education and self-help resource that combines psychological awareness, scientific understanding, and practical wellness strategies. Its central message is that mental health is an ongoing journey of self-awareness, self-care, resilience, and growth.',
  12
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
) values (
  'sidlac-co-branding',
  'Sidlac Co.',
  'Sidlac Co.',
  'Logo & Branding',
  'branding',
  'Logo & Branding',
  'Logo and brand identity direction for Sidlac Co.',
  'Brand Designer',
  array['Illustrator', 'Figma']::text[],
  '2025',
  'Sidlac Co.',
  'Logo and brand identity direction for Sidlac Co.',
  'Sidlac Co. now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  13
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
) values (
  'adoptify-logo',
  'Adoptify',
  'Adoptify',
  'Logo & Branding',
  'branding',
  'Logo',
  'Logo direction for the Adoptify product concept.',
  'Logo Designer',
  array['Illustrator', 'Figma']::text[],
  '2025',
  'Adoptify',
  'Logo direction for the Adoptify product concept.',
  'Adoptify now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  14
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
) values (
  'pietyl-management-system-logo',
  'Pietyl Management System',
  'Pietyl Management System',
  'Logo & Branding',
  'branding',
  'Logo & Branding',
  'Logo and brand identity direction for the Pietyl management system.',
  'Brand Designer',
  array['Illustrator', 'Figma']::text[],
  '2025',
  'Pietyl Management System',
  'Logo and brand identity direction for the Pietyl management system.',
  'Pietyl Management System now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  15
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
) values (
  'dost-laon-logo',
  'DOST Laon',
  'DOST Laon',
  'Logo & Branding',
  'branding',
  'Logo',
  'Logo direction for the DOST Laon platform concept.',
  'Logo Designer',
  array['Illustrator', 'Figma']::text[],
  '2025',
  'DOST Laon',
  'Logo direction for the DOST Laon platform concept.',
  'DOST Laon now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  16
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
) values (
  'cosmic-remedies-by-sia-logo',
  'Cosmic Remedies by Sia',
  'Cosmic Remedies by Sia',
  'Logo & Branding',
  'branding',
  'Logo',
  'Logo direction for Cosmic Remedies by Sia.',
  'Logo Designer',
  array['Illustrator', 'Figma']::text[],
  '2025',
  'Cosmic Remedies by Sia',
  'Logo direction for Cosmic Remedies by Sia.',
  'Cosmic Remedies by Sia now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  17
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
) values (
  'umunity-logo',
  'UMunity',
  'UMunity',
  'Logo & Branding',
  'branding',
  'Logo',
  'Logo direction for the UMunity school organization management system.',
  'Logo Designer',
  array['Illustrator', 'Figma']::text[],
  '2025',
  'UMunity',
  'Logo direction for the UMunity school organization management system.',
  'UMunity now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  18
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
) values (
  'blockchain-campus-conference-2024',
  'Blockchain Campus Conference 2024',
  'Blockchain Campus Conference 2024',
  'Social Media Graphics',
  'gallery',
  'Event Graphics',
  'Social media graphics for Blockchain Campus Conference 2024.',
  'Social Media Graphic Designer',
  array['Figma', 'Canva']::text[],
  '2024',
  'Blockchain Campus Conference 2024',
  'Social media graphics for Blockchain Campus Conference 2024.',
  'Blockchain Campus Conference 2024 now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  19
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
) values (
  'sidlac-co-social-media',
  'Sidlac Co.',
  'Sidlac Co.',
  'Social Media Graphics',
  'gallery',
  'Social Media Graphics',
  'Social media graphics and campaign layouts for Sidlac Co.',
  'Social Media Graphic Designer',
  array['Figma', 'Canva']::text[],
  '2025',
  'Sidlac Co.',
  'Social media graphics and campaign layouts for Sidlac Co.',
  'Sidlac Co. now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  20
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
) values (
  'odara-management-group-social-media',
  'Odara Management Group',
  'Odara Management Group',
  'Social Media Graphics',
  'gallery',
  'Social Media Graphics',
  'Social media graphics and digital layouts for Odara Management Group.',
  'Social Media Graphic Designer',
  array['Figma', 'Canva']::text[],
  '2025',
  'Odara Management Group',
  'Social media graphics and digital layouts for Odara Management Group.',
  'Odara Management Group now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  21
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
) values (
  'wound-care',
  'Wound Care',
  'Wound Care',
  'Social Media Graphics',
  'gallery',
  'Health Graphics',
  'Social media graphics for a wound care content series.',
  'Social Media Graphic Designer',
  array['Figma', 'Canva']::text[],
  '2024',
  'Wound Care',
  'Social media graphics for a wound care content series.',
  'Wound Care now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  22
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
) values (
  'the-digital-income',
  'The Digital Income',
  'The Digital Income',
  'Social Media Graphics',
  'gallery',
  'Social Media Graphics',
  'Digital income themed social media graphics and layouts.',
  'Social Media Graphic Designer',
  array['Figma', 'Canva']::text[],
  '2024',
  'The Digital Income',
  'Digital income themed social media graphics and layouts.',
  'The Digital Income now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  23
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
) values (
  'tech-nexus-devcon-philippines',
  'Tech Nexus DevCon Philippines',
  'Tech Nexus DevCon Philippines',
  'Social Media Graphics',
  'gallery',
  'Event Graphics',
  'Event social media graphics for Tech Nexus DevCon Philippines.',
  'Social Media Graphic Designer',
  array['Figma', 'Canva']::text[],
  '2024',
  'Tech Nexus DevCon Philippines',
  'Event social media graphics for Tech Nexus DevCon Philippines.',
  'Tech Nexus DevCon Philippines now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  24
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
) values (
  'pyconf-mini-davao-2024',
  'PyConF Mini Davao 2024',
  'PyConF Mini Davao 2024',
  'Social Media Graphics',
  'gallery',
  'Event Graphics',
  'Conference graphics and social media layouts for PyConF Mini Davao 2024.',
  'Social Media Graphic Designer',
  array['Figma', 'Canva']::text[],
  '2024',
  'PyConF Mini Davao 2024',
  'Conference graphics and social media layouts for PyConF Mini Davao 2024.',
  'PyConF Mini Davao 2024 now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  25
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
) values (
  'enigma',
  'ENIGMA',
  'ENIGMA',
  'Social Media Graphics',
  'gallery',
  'Social Media Graphics',
  'Social media graphics and creative assets for ENIGMA.',
  'Creative Designer',
  array['Figma', 'Canva', 'Photoshop']::text[],
  '2024',
  'ENIGMA',
  'Social media graphics and creative assets for ENIGMA.',
  'ENIGMA now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  26
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
) values (
  'salin-salin',
  'Salin-Salin',
  'Salin-Salin',
  'Web Development',
  'frontend',
  'Web Development',
  'Responsive web development project for Salin-Salin.',
  'Web Developer',
  array['React', 'Tailwind CSS', 'TypeScript']::text[],
  '2025',
  'Salin-Salin',
  'Responsive web development project for Salin-Salin.',
  'Salin-Salin now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  27
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
) values (
  'handyman',
  'HandyMan',
  'HandyMan',
  'Web Development',
  'frontend',
  'Web Development',
  'Responsive web development project for HandyMan.',
  'Web Developer',
  array['React', 'Tailwind CSS', 'TypeScript']::text[],
  '2025',
  'HandyMan',
  'Responsive web development project for HandyMan.',
  'HandyMan now has a cleaner portfolio entry ready for a richer gallery or case study when final assets are added.',
  28
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'odara-management-group'),
  'Logo & Branding',
  'Logo & Branding',
  null,
  3
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'lian-monley'),
  'Logo & Branding',
  'Logo & Branding',
  null,
  3
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pietyl-lpg'),
  'Logo & Branding',
  'Logo & Branding',
  null,
  3
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'blue-collar-builders'),
  'Logo & Branding',
  'Logo & Branding',
  null,
  3
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'trichomend-plus'),
  'Logo & Branding',
  'Logo & Branding',
  null,
  3
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'adoptify'),
  'UI/UX Design',
  'UI/UX Design',
  null,
  0
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pietyl-management-system'),
  'UI/UX Design',
  'UI/UX Design',
  null,
  0
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pietyl-management-system'),
  'Web Development',
  'Web Development',
  null,
  4
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'dost-laon'),
  'UI/UX Design',
  'UI/UX Design',
  null,
  0
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'cosmic-remedies-by-sia'),
  'UI/UX Design',
  'UI/UX Design',
  null,
  0
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'cosmic-remedies-by-sia'),
  'Web Development',
  'Web Development',
  null,
  4
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'umunity'),
  'UI/UX Design',
  'UI/UX Design',
  null,
  0
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'umunity'),
  'Web Development',
  'Web Development',
  null,
  4
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'umsdc-publication-materials-and-assets'),
  'Social Media Graphics',
  'Social Media Graphics',
  null,
  1
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'umsdc-publication-materials-and-assets'),
  'Creative Assets',
  'Creative Assets',
  null,
  2
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'eat-well-live-well-nutrition-ebook'),
  'Writing / VA',
  'Writing / VA',
  null,
  5
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'thriving-mind-mental-wellness-ebook'),
  'Writing / VA',
  'Writing / VA',
  'Thriving Minds: Understanding Your Mental Health Journey',
  5
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'sidlac-co-branding'),
  'Logo & Branding',
  'Logo & Branding',
  null,
  3
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'adoptify-logo'),
  'Logo & Branding',
  'Logo',
  null,
  3
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pietyl-management-system-logo'),
  'Logo & Branding',
  'Logo & Branding',
  null,
  3
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'dost-laon-logo'),
  'Logo & Branding',
  'Logo',
  null,
  3
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'cosmic-remedies-by-sia-logo'),
  'Logo & Branding',
  'Logo',
  null,
  3
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'umunity-logo'),
  'Logo & Branding',
  'Logo',
  null,
  3
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'blockchain-campus-conference-2024'),
  'Social Media Graphics',
  'Social Media Graphics',
  null,
  1
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'sidlac-co-social-media'),
  'Social Media Graphics',
  'Social Media Graphics',
  null,
  1
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'odara-management-group-social-media'),
  'Social Media Graphics',
  'Social Media Graphics',
  null,
  1
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'wound-care'),
  'Social Media Graphics',
  'Social Media Graphics',
  null,
  1
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'the-digital-income'),
  'Social Media Graphics',
  'Social Media Graphics',
  null,
  1
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'tech-nexus-devcon-philippines'),
  'Social Media Graphics',
  'Social Media Graphics',
  null,
  1
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pyconf-mini-davao-2024'),
  'Social Media Graphics',
  'Social Media Graphics',
  null,
  1
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'enigma'),
  'Social Media Graphics',
  'Social Media Graphics',
  null,
  1
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'enigma'),
  'Creative Assets',
  'Creative Assets',
  null,
  2
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'salin-salin'),
  'Web Development',
  'Web Development',
  null,
  4
);

insert into public.portfolio_project_categories (
  project_id,
  category,
  pill_label,
  title_override,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'handyman'),
  'Web Development',
  'Web Development',
  null,
  4
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'odara-management-group'),
  'Primary Mark',
  'Placeholder for the final logo and alternate lockups.',
  null,
  'square',
  'from-fuchsia-500/50 to-violet-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'odara-management-group'),
  'Brand Board',
  'Placeholder for palette, typography, and visual rules.',
  null,
  'wide',
  'from-violet-500/40 to-indigo-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'odara-management-group'),
  'Stationery',
  'Placeholder for business card and document applications.',
  null,
  'tall',
  'from-pink-500/40 to-purple-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'lian-monley'),
  'Identity Mark',
  'Placeholder for primary logo and personal monogram.',
  null,
  'square',
  'from-rose-500/50 to-pink-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'lian-monley'),
  'Profile System',
  'Placeholder for social headers and branded profile assets.',
  null,
  'wide',
  'from-pink-500/40 to-fuchsia-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'lian-monley'),
  'Presentation Cover',
  'Placeholder for deck and personal introduction layouts.',
  null,
  'tall',
  'from-amber-300/30 to-rose-400/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pietyl-lpg'),
  'Primary Identity',
  'Placeholder for core logo and service lockups.',
  null,
  'square',
  'from-sky-500/50 to-blue-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pietyl-lpg'),
  'Vehicle Mockup',
  'Placeholder for transport and field-use branding.',
  null,
  'wide',
  'from-blue-500/40 to-cyan-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pietyl-lpg'),
  'Uniform Application',
  'Placeholder for apparel and service personnel mockups.',
  null,
  'tall',
  'from-cyan-400/40 to-sky-400/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'blue-collar-builders'),
  'Brand Mark',
  'Placeholder for primary builder identity and supporting lockups.',
  null,
  'square',
  'from-indigo-500/50 to-sky-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'blue-collar-builders'),
  'Equipment Branding',
  'Placeholder for on-site and vehicle branding.',
  null,
  'wide',
  'from-sky-500/40 to-slate-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'blue-collar-builders'),
  'Uniform System',
  'Placeholder for apparel and contractor-facing brand use.',
  null,
  'tall',
  'from-slate-400/40 to-indigo-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'trichomend-plus'),
  'Product Mark',
  'Placeholder for core product mark and supporting lockups.',
  null,
  'square',
  'from-emerald-500/50 to-teal-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'trichomend-plus'),
  'Packaging Concept',
  'Placeholder for bottle, box, or treatment packaging visuals.',
  null,
  'tall',
  'from-teal-500/40 to-cyan-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'trichomend-plus'),
  'Promo Layout',
  'Placeholder for digital campaign or product promo mockups.',
  null,
  'wide',
  'from-green-400/40 to-emerald-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'adoptify'),
  'Listing Flow',
  'Placeholder for browse, filter, and profile overview screens.',
  null,
  'wide',
  'from-violet-500/50 to-indigo-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'adoptify'),
  'Profile Detail',
  'Placeholder for animal or applicant profile layouts.',
  null,
  'square',
  'from-indigo-500/40 to-purple-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'adoptify'),
  'Inquiry Journey',
  'Placeholder for application and follow-up interface states.',
  null,
  'square',
  'from-purple-500/40 to-pink-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pietyl-management-system'),
  'Dashboard',
  'Placeholder for overview metrics and key actions.',
  null,
  'wide',
  'from-sky-500/50 to-indigo-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pietyl-management-system'),
  'Records Module',
  'Placeholder for lists, forms, and record-detail screens.',
  null,
  'square',
  'from-indigo-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pietyl-management-system'),
  'Workflow Tracking',
  'Placeholder for operational status and monitoring views.',
  null,
  'square',
  'from-cyan-500/40 to-sky-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'dost-laon'),
  'Landing View',
  'Placeholder for homepage and access-entry layout.',
  null,
  'wide',
  'from-blue-500/50 to-cyan-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'dost-laon'),
  'Service Pages',
  'Placeholder for service and program detail screens.',
  null,
  'square',
  'from-cyan-500/40 to-sky-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'dost-laon'),
  'Navigation System',
  'Placeholder for menus, page structure, and content modules.',
  null,
  'square',
  'from-indigo-500/40 to-cyan-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'cosmic-remedies-by-sia'),
  'Hero Section',
  'Placeholder for landing hero design and implementation state.',
  null,
  'wide',
  'from-violet-500/50 to-cyan-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'cosmic-remedies-by-sia'),
  'Product Layout',
  'Placeholder for product or content section screens.',
  null,
  'square',
  'from-cyan-500/40 to-indigo-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'cosmic-remedies-by-sia'),
  'Responsive Build',
  'Placeholder for mobile and desktop implementation comparisons.',
  null,
  'square',
  'from-indigo-500/40 to-purple-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'umunity'),
  'Figma Dashboard',
  'Main dashboard direction from the product design phase.',
  null,
  'wide',
  'from-cyan-500/50 to-blue-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'umunity'),
  'Module Screens',
  'Records, events, and announcement module screens for student workflows.',
  null,
  'square',
  'from-blue-500/40 to-indigo-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'umunity'),
  'Responsive Build',
  'Mobile and desktop implementation states from the web phase.',
  null,
  'square',
  'from-indigo-500/40 to-cyan-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'umunity'),
  'Component Set',
  'Reusable tables, cards, forms, and navigation patterns in code.',
  null,
  'wide',
  'from-cyan-500/40 to-sky-500/30',
  3
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'umsdc-publication-materials-and-assets'),
  'Announcement Asset',
  'Placeholder for social media post and key announcement layout.',
  null,
  'tall',
  'from-pink-500/50 to-orange-400/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'umsdc-publication-materials-and-assets'),
  'Campaign Set',
  'Placeholder for event or campaign visual system.',
  null,
  'wide',
  'from-rose-500/40 to-pink-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'umsdc-publication-materials-and-assets'),
  'Org Graphics',
  'Placeholder for recurring organization assets and social support materials.',
  null,
  'wide',
  'from-orange-400/40 to-amber-400/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'eat-well-live-well-nutrition-ebook'),
  'Cover Design',
  'Placeholder for the final eBook cover design.',
  null,
  'tall',
  'from-emerald-400/50 to-lime-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'eat-well-live-well-nutrition-ebook'),
  'Chapter Layout',
  'Placeholder for internal content and chapter structure.',
  null,
  'wide',
  'from-lime-400/40 to-green-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'eat-well-live-well-nutrition-ebook'),
  'Content Sample',
  'Placeholder for writing samples or page spreads.',
  null,
  'wide',
  'from-green-400/40 to-emerald-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'sidlac-co-branding'),
  'Primary Asset',
  'Showcase slot for Sidlac Co.''s main visual direction.',
  null,
  'wide',
  'from-amber-400/45 to-orange-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'sidlac-co-branding'),
  'Supporting Layout',
  'Showcase slot for additional Sidlac Co. layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'sidlac-co-branding'),
  'Application Preview',
  'Showcase slot for Sidlac Co. mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'adoptify-logo'),
  'Primary Asset',
  'Showcase slot for Adoptify''s main visual direction.',
  null,
  'wide',
  'from-violet-500/50 to-indigo-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'adoptify-logo'),
  'Supporting Layout',
  'Showcase slot for additional Adoptify layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'adoptify-logo'),
  'Application Preview',
  'Showcase slot for Adoptify mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pietyl-management-system-logo'),
  'Primary Asset',
  'Showcase slot for Pietyl Management System''s main visual direction.',
  null,
  'wide',
  'from-sky-500/50 to-indigo-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pietyl-management-system-logo'),
  'Supporting Layout',
  'Showcase slot for additional Pietyl Management System layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pietyl-management-system-logo'),
  'Application Preview',
  'Showcase slot for Pietyl Management System mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'dost-laon-logo'),
  'Primary Asset',
  'Showcase slot for DOST Laon''s main visual direction.',
  null,
  'wide',
  'from-blue-500/50 to-cyan-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'dost-laon-logo'),
  'Supporting Layout',
  'Showcase slot for additional DOST Laon layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'dost-laon-logo'),
  'Application Preview',
  'Showcase slot for DOST Laon mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'cosmic-remedies-by-sia-logo'),
  'Primary Asset',
  'Showcase slot for Cosmic Remedies by Sia''s main visual direction.',
  null,
  'wide',
  'from-violet-500/50 to-cyan-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'cosmic-remedies-by-sia-logo'),
  'Supporting Layout',
  'Showcase slot for additional Cosmic Remedies by Sia layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'cosmic-remedies-by-sia-logo'),
  'Application Preview',
  'Showcase slot for Cosmic Remedies by Sia mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'umunity-logo'),
  'Primary Asset',
  'Showcase slot for UMunity''s main visual direction.',
  null,
  'wide',
  'from-cyan-500/50 to-blue-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'umunity-logo'),
  'Supporting Layout',
  'Showcase slot for additional UMunity layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'umunity-logo'),
  'Application Preview',
  'Showcase slot for UMunity mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'blockchain-campus-conference-2024'),
  'Primary Asset',
  'Showcase slot for Blockchain Campus Conference 2024''s main visual direction.',
  null,
  'wide',
  'from-indigo-500/50 to-cyan-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'blockchain-campus-conference-2024'),
  'Supporting Layout',
  'Showcase slot for additional Blockchain Campus Conference 2024 layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'blockchain-campus-conference-2024'),
  'Application Preview',
  'Showcase slot for Blockchain Campus Conference 2024 mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'sidlac-co-social-media'),
  'Primary Asset',
  'Showcase slot for Sidlac Co.''s main visual direction.',
  null,
  'wide',
  'from-orange-400/45 to-rose-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'sidlac-co-social-media'),
  'Supporting Layout',
  'Showcase slot for additional Sidlac Co. layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'sidlac-co-social-media'),
  'Application Preview',
  'Showcase slot for Sidlac Co. mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'odara-management-group-social-media'),
  'Primary Asset',
  'Showcase slot for Odara Management Group''s main visual direction.',
  null,
  'wide',
  'from-fuchsia-500/50 to-violet-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'odara-management-group-social-media'),
  'Supporting Layout',
  'Showcase slot for additional Odara Management Group layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'odara-management-group-social-media'),
  'Application Preview',
  'Showcase slot for Odara Management Group mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'wound-care'),
  'Primary Asset',
  'Showcase slot for Wound Care''s main visual direction.',
  null,
  'wide',
  'from-emerald-500/45 to-cyan-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'wound-care'),
  'Supporting Layout',
  'Showcase slot for additional Wound Care layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'wound-care'),
  'Application Preview',
  'Showcase slot for Wound Care mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'the-digital-income'),
  'Primary Asset',
  'Showcase slot for The Digital Income''s main visual direction.',
  null,
  'wide',
  'from-amber-400/45 to-green-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'the-digital-income'),
  'Supporting Layout',
  'Showcase slot for additional The Digital Income layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'the-digital-income'),
  'Application Preview',
  'Showcase slot for The Digital Income mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'tech-nexus-devcon-philippines'),
  'Primary Asset',
  'Showcase slot for Tech Nexus DevCon Philippines''s main visual direction.',
  null,
  'wide',
  'from-blue-500/50 to-violet-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'tech-nexus-devcon-philippines'),
  'Supporting Layout',
  'Showcase slot for additional Tech Nexus DevCon Philippines layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'tech-nexus-devcon-philippines'),
  'Application Preview',
  'Showcase slot for Tech Nexus DevCon Philippines mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pyconf-mini-davao-2024'),
  'Primary Asset',
  'Showcase slot for PyConF Mini Davao 2024''s main visual direction.',
  null,
  'wide',
  'from-yellow-400/40 to-blue-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pyconf-mini-davao-2024'),
  'Supporting Layout',
  'Showcase slot for additional PyConF Mini Davao 2024 layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'pyconf-mini-davao-2024'),
  'Application Preview',
  'Showcase slot for PyConF Mini Davao 2024 mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'enigma'),
  'Primary Asset',
  'Showcase slot for ENIGMA''s main visual direction.',
  null,
  'wide',
  'from-purple-500/50 to-pink-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'enigma'),
  'Supporting Layout',
  'Showcase slot for additional ENIGMA layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'enigma'),
  'Application Preview',
  'Showcase slot for ENIGMA mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'salin-salin'),
  'Primary Asset',
  'Showcase slot for Salin-Salin''s main visual direction.',
  null,
  'wide',
  'from-teal-500/45 to-blue-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'salin-salin'),
  'Supporting Layout',
  'Showcase slot for additional Salin-Salin layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'salin-salin'),
  'Application Preview',
  'Showcase slot for Salin-Salin mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'handyman'),
  'Primary Asset',
  'Showcase slot for HandyMan''s main visual direction.',
  null,
  'wide',
  'from-orange-400/45 to-cyan-500/30',
  0
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'handyman'),
  'Supporting Layout',
  'Showcase slot for additional HandyMan layouts and variations.',
  null,
  'square',
  'from-cyan-500/40 to-blue-500/30',
  1
);

insert into public.portfolio_gallery_items (
  project_id,
  label,
  note,
  image_url,
  ratio,
  color,
  sort_order
) values (
  (select id from public.portfolio_projects where slug = 'handyman'),
  'Application Preview',
  'Showcase slot for HandyMan mockups or campaign applications.',
  null,
  'square',
  'from-amber-400/40 to-rose-500/30',
  2
);

commit;
