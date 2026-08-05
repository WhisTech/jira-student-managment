-- Student Management System
-- Run this in the Supabase SQL Editor, or via: python backend/create_tables.py

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  roll_number text unique,
  department text,
  year integer,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.students enable row level security;

-- Authenticated users can read all students
create policy "students_select" on public.students
  for select to authenticated
  using (true);

-- Authenticated users can insert students
create policy "students_insert" on public.students
  for insert to authenticated
  with check (true);

-- Authenticated users can update students
create policy "students_update" on public.students
  for update to authenticated
  using (true);

-- Authenticated users can delete students
create policy "students_delete" on public.students
  for delete to authenticated
  using (true);

-- Keep updated_at in sync
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists students_set_updated_at on public.students;
create trigger students_set_updated_at
  before update on public.students
  for each row execute function public.set_updated_at();
