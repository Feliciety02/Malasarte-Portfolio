begin;

update public.portfolio_projects
set
  title = 'Pietyl DigiLPG',
  directory_title = 'Pietyl DigiLPG',
  description = 'Brand identity for the Pietyl DigiLPG business.',
  client = 'Pietyl DigiLPG',
  overview = 'Pietyl DigiLPG needed a stronger visual identity that could feel dependable, recognizable, and easier to apply across signage, uniforms, and business materials.',
  outcome = 'Pietyl DigiLPG gained a more coherent and more visible brand identity suited to both business credibility and practical use.'
where slug = 'pietyl-lpg';

delete from public.portfolio_projects
where slug = 'pietyl-management-system-logo';

commit;
