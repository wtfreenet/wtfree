-- Add config key for video_previews label
-- Safe to re-run: uses ON CONFLICT DO NOTHING

insert into public.configs (key, value)
values
  ('video_previews_label', '')
on conflict (key) do nothing;
