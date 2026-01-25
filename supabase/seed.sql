-- Seed data for local development.
-- This file is executed on `supabase db reset` (see `supabase/config.toml`).

-- Clear existing data so reseeding is always safe.
truncate table
  public.free_items,
  public.vip_items,
  public.free_faq,
  public.vip_faq,
  public.configs;

-- Seed data for configs
insert into public.configs (key, value) values
  ('free_faq_label', 'Часто задаваемые вопросы'),
  ('free_items_label', 'Бесплатные материалы'),
  ('vip_faq_label', 'VIP Поддержка'),
  ('vip_items_label', 'VIP Материалы'),
  ('telegram_free_support_url', 'https://t.me/support_free'),
  ('telegram_vip_support_url', 'https://t.me/support_vip'),
  ('free_banner_url', 'https://picsum.photos/1200/400?random=10'),
  ('vip_banner_url', 'https://picsum.photos/1200/400?random=11'),
  ('age_restrict_image_url', 'https://picsum.photos/400/300?random=12'),
  ('free_page_label', 'Бесплатные материалы'),
  ('free_page_description', 'Доступ к бесплатным материалам и ресурсам'),
  ('free_page_seo_title', 'Бесплатные материалы - WTF Links'),
  ('free_page_seo_description', 'Получите доступ к бесплатным материалам и ресурсам'),
  ('free_page_seo_open_graph', 'https://picsum.photos/1200/630?random=13'),
  ('vip_page_label', 'VIP Материалы'),
  ('vip_page_description', 'Эксклюзивный доступ к премиум материалам'),
  ('vip_page_seo_title', 'VIP Материалы - WTF Links'),
  ('vip_page_seo_description', 'Получите эксклюзивный доступ к премиум материалам'),
  ('vip_page_seo_open_graph', 'https://picsum.photos/1200/630?random=14');

-- Seed data for free_items
insert into public.free_items (link, label, description, cover_url, "order") values
  ('https://example.com/guide1', 'Начало работы', 'Базовое руководство для новичков', 'https://picsum.photos/400/300?random=1', 1),
  ('https://example.com/tutorial1', 'Первые шаги', 'Учимся основам с нуля', 'https://picsum.photos/400/300?random=2', 2),
  ('https://example.com/video1', 'Видео курс', 'Бесплатный видео-курс для начинающих', 'https://picsum.photos/400/300?random=3', 3),
  ('https://example.com/ebook1', 'Электронная книга', 'Полезные материалы в PDF формате', 'https://picsum.photos/400/300?random=4', 4);

-- Seed data for vip_items
insert into public.vip_items (link, label, description, cover_url, "order") values
  ('https://example.com/vip/course1', 'Продвинутый курс', 'Эксклюзивный курс для VIP участников', 'https://picsum.photos/400/300?random=5', 1),
  ('https://example.com/vip/webinar1', 'Закрытый вебинар', 'Доступ к премиум вебинарам', 'https://picsum.photos/400/300?random=6', 2),
  ('https://example.com/vip/templates', 'Шаблоны премиум', 'Готовые шаблоны для работы', 'https://picsum.photos/400/300?random=7', 3),
  ('https://example.com/vip/masterclass', 'Мастер-класс', 'Индивидуальный мастер-класс от экспертов', 'https://picsum.photos/400/300?random=8', 4),
  ('https://example.com/vip/tools', 'VIP инструменты', 'Эксклюзивные инструменты для профи', 'https://picsum.photos/400/300?random=9', 5);

-- Seed data for free_faq
insert into public.free_faq (label, description, cta_type, cta_label) values
  (
    'Как начать работу?',
    'Для начала работы зарегистрируйтесь на платформе и пройдите базовый курс. Все материалы доступны бесплатно в разделе "Бесплатные материалы".',
    'write_support',
    'Написать в поддержку'
  ),
  (
    'Где найти материалы?',
    'Все бесплатные материалы находятся в соответствующем разделе. Вы можете скачать их в любое время без ограничений.',
    null,
    null
  ),
  (
    'Как обновить профиль?',
    'Перейдите в настройки аккаунта и заполните необходимые поля. Все изменения сохраняются автоматически.',
    'write_support',
    'Нужна помощь?'
  ),
  (
    'Есть ли мобильное приложение?',
    'Да, мобильное приложение доступно для iOS и Android. Скачайте его в App Store или Google Play.',
    null,
    null
  );

-- Seed data for vip_faq
insert into public.vip_faq (label, description, cta_type, cta_label) values
  (
    'Как получить VIP доступ?',
    'VIP доступ можно оформить в личном кабинете. Выберите подходящий тариф и произведите оплату. Доступ активируется моментально.',
    'write_support',
    'Написать менеджеру'
  ),
  (
    'Что входит в VIP подписку?',
    'VIP подписка включает: доступ ко всем премиум материалам, персональную поддержку, эксклюзивные вебинары и приоритетное обслуживание.',
    null,
    null
  ),
  (
    'Можно ли отменить подписку?',
    'Да, вы можете отменить подписку в любой момент в настройках аккаунта. Доступ сохранится до конца оплаченного периода.',
    'write_support',
    'Связаться с VIP поддержкой'
  ),
  (
    'Как работает персональная поддержка?',
    'VIP участники получают приоритетную поддержку 24/7 через специальный Telegram канал и email. Время ответа - до 1 часа.',
    null,
    null
  ),
  (
    'Есть ли пробный период?',
    'Да, новым пользователям доступен 7-дневный пробный период VIP подписки. Отмените в любой момент без списания средств.',
    'write_support',
    'Активировать пробный период'
  );

