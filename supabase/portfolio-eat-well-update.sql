begin;

update public.portfolio_projects
set
  title = 'Eat Well, Live Well: Your Complete Food & Nutrition Guide',
  directory_title = 'Eat Well, Live Well: Your Complete Food & Nutrition Guide',
  tag = 'Nutrition Guide',
  description = 'A practical nutrition and healthy lifestyle guide for sustainable eating habits without restrictive dieting.',
  client = 'Nutrition eBook Project',
  overview = 'Eat Well, Live Well: Your Complete Food & Nutrition Guide is a practical nutrition and healthy lifestyle guide designed to help readers develop sustainable eating habits without relying on restrictive diets, calorie obsession, or unrealistic wellness trends. The book combines nutritional science, meal planning, recipes, and behavior change strategies into an easy-to-follow roadmap for building a healthier relationship with food.',
  outcome = 'The final eBook became a beginner-friendly nutrition education and wellness guide that teaches informed food choices, practical meal planning, healthy recipes, behavior change, and sustainable lifestyle habits. Its central message is that lasting health is built through consistent, informed food choices made one meal at a time.'
where slug = 'eat-well-live-well-nutrition-ebook';

update public.portfolio_project_categories
set title_override = 'Eat Well, Live Well: Your Complete Food & Nutrition Guide'
where project_id = (
  select id
  from public.portfolio_projects
  where slug = 'eat-well-live-well-nutrition-ebook'
)
and category = 'Writing / VA';

delete from public.portfolio_gallery_items
where project_id = (
  select id
  from public.portfolio_projects
  where slug = 'eat-well-live-well-nutrition-ebook'
)
and label in ('Cover Design', 'Chapter Layout', 'Content Sample')
and note like 'Placeholder%';

commit;
