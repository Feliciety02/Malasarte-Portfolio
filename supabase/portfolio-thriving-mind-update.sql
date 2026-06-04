begin;

update public.portfolio_projects
set
  title = 'Thriving Minds: Understanding Your Mental Health Journey',
  directory_title = 'Thriving Minds: Understanding Your Mental Health Journey',
  tag = 'Mental Wellness Guide',
  description = 'A beginner-friendly mental wellness guide about awareness, coping skills, self-management, and personal growth.',
  client = 'Mental Wellness eBook Project',
  overview = 'Thriving Minds: Understanding Your Mental Health Journey is a comprehensive mental wellness guide designed to educate readers about mental health from awareness to self-management and personal growth. The book follows a structured progression that helps readers understand mental health challenges, develop practical coping skills, and build a sustainable wellness plan.',
  outcome = 'The final eBook became a beginner-friendly mental health education and self-help resource that combines psychological awareness, scientific understanding, and practical wellness strategies. Its central message is that mental health is an ongoing journey of self-awareness, self-care, resilience, and growth.'
where slug = 'thriving-mind-mental-wellness-ebook';

update public.portfolio_project_categories
set title_override = 'Thriving Minds: Understanding Your Mental Health Journey'
where project_id = (
  select id
  from public.portfolio_projects
  where slug = 'thriving-mind-mental-wellness-ebook'
)
and category = 'Writing / VA';

delete from public.portfolio_gallery_items
where project_id = (
  select id
  from public.portfolio_projects
  where slug = 'thriving-mind-mental-wellness-ebook'
)
and label in ('Cover Design', 'Interior Structure', 'Writing Sample')
and note like 'Placeholder%';

commit;
