-- Add new config keys for page metadata and age restriction
-- Safe to re-run: uses ON CONFLICT DO NOTHING

insert into public.configs (key, value)
values
  ('age_restrict_image_url', ''),
  ('free_page_label', ''),
  ('free_page_description', ''),
  ('free_page_seo_title', ''),
  ('free_page_seo_description', ''),
  ('free_page_seo_open_graph', ''),
  ('vip_page_label', ''),
  ('vip_page_description', ''),
  ('vip_page_seo_title', ''),
  ('vip_page_seo_description', ''),
  ('vip_page_seo_open_graph', '')
on conflict (key) do nothing;
