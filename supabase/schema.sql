-- =====================================================================
--  云端相册 · Supabase 初始化脚本
--  用法：Supabase 控制台 → SQL Editor → New query → 整段粘贴 → Run
--  先把下面这行的邮箱改成你的管理员邮箱（就是你要用来登录后台的邮箱）
-- =====================================================================

-- ① 管理员身份判定：只有这个邮箱能写，其他人一律只读
create or replace function public.is_owner()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = '__OWNER_EMAIL__';
$$;

-- ② 站点设置（只有一行）
create table if not exists public.site_settings (
  id            int primary key default 1 check (id = 1),
  brand         text default 'MANGO PUDDING',
  site_title    text default '送给你的云端相册',
  love_start_at timestamptz default '2024-01-01T00:00:00+08:00',
  gift_password text default '520',
  letter_title  text default '写给你',
  letter_sign   text default 'For You · Mango Pudding',
  updated_at    timestamptz default now()
);
insert into public.site_settings (id) values (1) on conflict (id) do nothing;

-- ③ 照片
create table if not exists public.photos (
  id          uuid primary key default gen_random_uuid(),
  url         text not null,
  storage_path text,
  title       text default '',
  caption     text default '',
  taken_on    date,
  sticker     text default '',
  position    int default 0,
  created_at  timestamptz default now()
);

-- ④ 时间轴
create table if not exists public.timeline_items (
  id          uuid primary key default gen_random_uuid(),
  date_label  text default '',
  title       text not null default '',
  body        text default '',
  position    int default 0
);

-- ⑤ 信的段落
create table if not exists public.letter_lines (
  id        uuid primary key default gen_random_uuid(),
  body      text not null default '',
  emphasis  boolean default false,
  position  int default 0
);

-- ⑥ 音乐
create table if not exists public.songs (
  id           uuid primary key default gen_random_uuid(),
  title        text not null default '',
  artist       text default '',
  url          text not null,
  storage_path text,
  lyrics       jsonb default '[]'::jsonb,
  active       boolean default true,
  position     int default 0
);

-- ⑦ 权限：所有人可读，只有管理员可写
alter table public.site_settings  enable row level security;
alter table public.photos         enable row level security;
alter table public.timeline_items enable row level security;
alter table public.letter_lines   enable row level security;
alter table public.songs          enable row level security;

drop policy if exists read_all on public.site_settings;
drop policy if exists owner_write on public.site_settings;
create policy read_all   on public.site_settings  for select using (true);
create policy owner_write on public.site_settings for all to authenticated using (public.is_owner()) with check (public.is_owner());

drop policy if exists read_all on public.photos;
drop policy if exists owner_write on public.photos;
create policy read_all   on public.photos  for select using (true);
create policy owner_write on public.photos for all to authenticated using (public.is_owner()) with check (public.is_owner());

drop policy if exists read_all on public.timeline_items;
drop policy if exists owner_write on public.timeline_items;
create policy read_all   on public.timeline_items  for select using (true);
create policy owner_write on public.timeline_items for all to authenticated using (public.is_owner()) with check (public.is_owner());

drop policy if exists read_all on public.letter_lines;
drop policy if exists owner_write on public.letter_lines;
create policy read_all   on public.letter_lines  for select using (true);
create policy owner_write on public.letter_lines for all to authenticated using (public.is_owner()) with check (public.is_owner());

drop policy if exists read_all on public.songs;
drop policy if exists owner_write on public.songs;
create policy read_all   on public.songs  for select using (true);
create policy owner_write on public.songs for all to authenticated using (public.is_owner()) with check (public.is_owner());

grant select on public.site_settings, public.photos, public.timeline_items, public.letter_lines, public.songs to anon, authenticated;
grant insert, update, delete on public.site_settings, public.photos, public.timeline_items, public.letter_lines, public.songs to authenticated;

-- ⑧ 存储桶：照片 + 音乐，公开可读、仅管理员可传
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('album', 'album', true, 26214400, array['image/jpeg','image/png','image/webp','audio/mpeg','audio/mp4','audio/wav'])
on conflict (id) do update set public = true, file_size_limit = 26214400;

drop policy if exists album_read   on storage.objects;
drop policy if exists album_write  on storage.objects;
drop policy if exists album_update on storage.objects;
drop policy if exists album_delete on storage.objects;

create policy album_read   on storage.objects for select using (bucket_id = 'album');
create policy album_write  on storage.objects for insert to authenticated with check (bucket_id = 'album' and public.is_owner());
create policy album_update on storage.objects for update to authenticated using (bucket_id = 'album' and public.is_owner());
create policy album_delete on storage.objects for delete to authenticated using (bucket_id = 'album' and public.is_owner());

-- ⑨ 完成。接下来去 Authentication → Users 手动建一个管理员账号
--    （邮箱必须和第 ① 行填的一致），并关掉 Allow new users to sign up。
