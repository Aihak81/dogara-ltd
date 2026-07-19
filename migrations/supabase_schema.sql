-- ===========================================
-- Dogara Oil & Gas Ltd - Supabase Schema
-- ===========================================

-- Enable extensions
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  company_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Quotes table
create table if not exists public.quotes (
  id uuid default uuid_generate_v4() primary key,
  reference_number text unique not null default 'DOG-' || extract(epoch from now())::text,
  user_id uuid references auth.users on delete set null,
  company_name text not null,
  contact_person text not null,
  email text not null,
  phone text not null,
  product text not null,
  quantity numeric not null,
  location text not null,
  date_needed date,
  notes text,
  status text not null default 'Quote Submitted' check (status in (
    'Quote Submitted',
    'Under Review',
    'Awaiting Payment',
    'Payment Confirmed',
    'Dispatch Scheduled',
    'In Transit',
    'Delivered',
    'Cancelled'
  )),
  quoted_price numeric,
  admin_notes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Orders table
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  quote_id uuid references public.quotes on delete restrict not null,
  user_id uuid references auth.users on delete set null,
  reference_number text unique not null default 'ORD-' || extract(epoch from now())::text,
  status text not null default 'Quote Submitted' check (status in (
    'Quote Submitted',
    'Under Review',
    'Awaiting Payment',
    'Payment Confirmed',
    'Dispatch Scheduled',
    'In Transit',
    'Delivered',
    'Cancelled'
  )),
  total_amount numeric,
  currency text default 'NGN',
  delivery_address text,
  delivery_date date,
  tracking_number text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Tracking updates table
create table if not exists public.tracking_updates (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders on delete cascade not null,
  status text not null,
  location text,
  notes text,
  created_at timestamptz default now() not null,
  created_by uuid references auth.users on delete set null
);

-- Blog posts table
create table if not exists public.blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  featured_image text,
  category text,
  tags text[],
  author_id uuid references auth.users on delete set null,
  published boolean default false not null,
  published_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Contact submissions table
create table if not exists public.contacts (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text not null default 'New' check (status in ('New', 'Read', 'Replied', 'Closed')),
  created_at timestamptz default now() not null
);

-- Notifications table
create table if not exists public.notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  message text not null,
  type text not null default 'info' check (type in ('info', 'success', 'warning', 'error')),
  read boolean default false not null,
  link text,
  created_at timestamptz default now() not null
);

-- ===========================================
-- RLS Policies
-- ===========================================

alter table public.profiles enable row level security;
alter table public.quotes enable row level security;
alter table public.orders enable row level security;
alter table public.tracking_updates enable row level security;
alter table public.blog_posts enable row level security;
alter table public.contacts enable row level security;
alter table public.notifications enable row level security;

-- Profiles policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Admins can view all profiles" on public.profiles
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Quotes policies
create policy "Customers can view own quotes" on public.quotes
  for select using (
    auth.uid() = user_id or
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );
create policy "Customers can create quotes" on public.quotes
  for insert with check (true);
create policy "Admins can update quotes" on public.quotes
  for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Orders policies
create policy "Customers can view own orders" on public.orders
  for select using (
    auth.uid() = user_id or
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );
create policy "Admins can update orders" on public.orders
  for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Tracking policies
create policy "Anyone can view tracking by order" on public.tracking_updates
  for select using (
    exists (
      select 1 from public.orders
      where orders.id = tracking_updates.order_id
    ) and (
      auth.uid() = (select user_id from public.orders where id = tracking_updates.order_id) or
      exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
    )
  );
create policy "Admins can create tracking updates" on public.tracking_updates
  for insert with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Blog policies
create policy "Published posts are public" on public.blog_posts
  for select using (published = true);
create policy "Admins can manage all posts" on public.blog_posts
  for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Contacts policies
create policy "Admins can view contacts" on public.contacts
  for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );
create policy "Anyone can create contacts" on public.contacts
  for insert with check (true);
create policy "Admins can update contacts" on public.contacts
  for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Notifications policies
create policy "Users can view own notifications" on public.notifications
  for select using (auth.uid() = user_id);
create policy "Users can update own notifications" on public.notifications
  for update using (auth.uid() = user_id);
create policy "Admins can create notifications" on public.notifications
  for insert with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ===========================================
-- Functions & Triggers
-- ===========================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger update_quotes_updated_at before update on public.quotes
  for each row execute procedure public.update_updated_at();

create trigger update_orders_updated_at before update on public.orders
  for each row execute procedure public.update_updated_at();

create trigger update_blog_posts_updated_at before update on public.blog_posts
  for each row execute procedure public.update_updated_at();

create trigger update_profiles_updated_at before update on public.profiles
  for each row execute procedure public.update_updated_at();
