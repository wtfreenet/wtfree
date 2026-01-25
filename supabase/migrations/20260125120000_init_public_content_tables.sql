-- Initial public schema for wtf-linkss content tables.
-- Safe to re-run: uses IF NOT EXISTS + drops/recreates policies/constraints.

-- Required for gen_random_uuid()
create extension if not exists "pgcrypto" with schema extensions;

-- Create configs table
create table if not exists public.configs (
  key text primary key,
  value text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Create free_items table
create table if not exists public.free_items (
  id uuid primary key default gen_random_uuid(),
  link text not null,
  label text not null,
  description text not null,
  cover_url text not null,
  "order" integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Create vip_items table
create table if not exists public.vip_items (
  id uuid primary key default gen_random_uuid(),
  link text not null,
  label text not null,
  description text not null,
  cover_url text not null,
  "order" integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Create free_faq table
create table if not exists public.free_faq (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  description text not null,
  cta_type text not null default 'write_support',
  cta_label text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Create vip_faq table
create table if not exists public.vip_faq (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  description text not null,
  cta_type text not null default 'write_support',
  cta_label text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Insert initial config keys (kept blank by default; seeds will override locally)
insert into public.configs (key, value)
values
  ('free_faq_label', ''),
  ('free_items_label', ''),
  ('vip_faq_label', ''),
  ('vip_items_label', ''),
  ('telegram_free_support_url', ''),
  ('telegram_vip_support_url', ''),
  ('free_banner_url', ''),
  ('vip_banner_url', ''),
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

-- Indexes for ordering
create index if not exists idx_free_items_order on public.free_items ("order");
create index if not exists idx_vip_items_order on public.vip_items ("order");

-- Enforce CTA type values
alter table public.free_faq drop constraint if exists check_free_faq_cta_type;
alter table public.free_faq
  add constraint check_free_faq_cta_type
  check (cta_type in ('write_support'));

alter table public.vip_faq drop constraint if exists check_vip_faq_cta_type;
alter table public.vip_faq
  add constraint check_vip_faq_cta_type
  check (cta_type in ('write_support'));

-- Enable RLS
alter table public.configs enable row level security;
alter table public.free_items enable row level security;
alter table public.vip_items enable row level security;
alter table public.free_faq enable row level security;
alter table public.vip_faq enable row level security;

-- Public read policies (adjust later if you add auth/admin writes)
drop policy if exists "Allow public read access" on public.configs;
create policy "Allow public read access"
  on public.configs
  for select
  using (true);

drop policy if exists "Allow public read access" on public.free_items;
create policy "Allow public read access"
  on public.free_items
  for select
  using (true);

drop policy if exists "Allow public read access" on public.vip_items;
create policy "Allow public read access"
  on public.vip_items
  for select
  using (true);

drop policy if exists "Allow public read access" on public.free_faq;
create policy "Allow public read access"
  on public.free_faq
  for select
  using (true);

drop policy if exists "Allow public read access" on public.vip_faq;
create policy "Allow public read access"
  on public.vip_faq
  for select
  using (true);

