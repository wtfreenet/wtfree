-- Create video_previews table with same structure as free_items and vip_items
create table if not exists public.video_previews (
  id uuid primary key default gen_random_uuid(),
  link text not null,
  label text not null,
  description text not null,
  cover_url text not null,
  "order" integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Index for ordering
create index if not exists idx_video_previews_order on public.video_previews ("order");

-- Enable RLS
alter table public.video_previews enable row level security;

-- Public read policy
drop policy if exists "Allow public read access" on public.video_previews;
create policy "Allow public read access"
  on public.video_previews
  for select
  using (true);
