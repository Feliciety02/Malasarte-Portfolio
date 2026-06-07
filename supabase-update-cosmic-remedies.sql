-- Schema:
--   portfolio_projects:         id (UUID PK), slug (text), primary_category (text), ...
--   portfolio_project_categories: id (UUID PK), project_id (UUID FK → portfolio_projects.id),
--                                 category (text), pill_label (text), title_override (text?),
--                                 sort_order (int)
--
-- Cosmic Remedies by Sia currently:
--   project id: 470a448e-4853-4b59-aba3-297bbb4ecae6
--   primary_category: 'UI/UX Design'
--   categories: UI/UX Design (sort 0), Web Development (sort 4)

UPDATE portfolio_projects
SET primary_category = 'Web Development'
WHERE slug = 'cosmic-remedies-by-sia'
  AND primary_category = 'UI/UX Design';

DELETE FROM portfolio_project_categories
WHERE project_id = (SELECT id FROM portfolio_projects WHERE slug = 'cosmic-remedies-by-sia')
  AND category = 'UI/UX Design';

-- Web Development row already exists (sort_order 4), so no insert needed.
