-- Make cta_type and cta_label optional in free_faq and vip_faq tables
-- This allows FAQ items without support buttons

-- Update free_faq table
alter table public.free_faq
  alter column cta_type drop not null,
  alter column cta_label drop not null;

-- Update vip_faq table
alter table public.vip_faq
  alter column cta_type drop not null,
  alter column cta_label drop not null;

-- Update check constraints to allow NULL values
alter table public.free_faq drop constraint if exists check_free_faq_cta_type;
alter table public.free_faq
  add constraint check_free_faq_cta_type
  check (cta_type is null or cta_type in ('write_support'));

alter table public.vip_faq drop constraint if exists check_vip_faq_cta_type;
alter table public.vip_faq
  add constraint check_vip_faq_cta_type
  check (cta_type is null or cta_type in ('write_support'));
