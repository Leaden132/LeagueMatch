# Supabase Setup

## Tables

Run in **SQL Editor**:

```sql
-- Search history
create table search_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  summoner_name text not null,
  created_at timestamptz default now() not null,
  unique(user_id, summoner_name)
);

-- Favorite champions
create table favorite_champions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  champ_name text not null,
  champ_id text not null,
  created_at timestamptz default now() not null
);
```

## Row Level Security (RLS)

```sql
-- Enable RLS
alter table search_history enable row level security;
alter table favorite_champions enable row level security;

-- Search history: users can only read/write their own rows
create policy "Users read own searches"
  on search_history for select
  using (auth.uid() = user_id);

create policy "Users insert own searches"
  on search_history for insert
  with check (auth.uid() = user_id);

create policy "Users delete own searches"
  on search_history for delete
  using (auth.uid() = user_id);

-- Favorite champions: users can only read/write their own rows
create policy "Users read own favorites"
  on favorite_champions for select
  using (auth.uid() = user_id);

create policy "Users insert own favorites"
  on favorite_champions for insert
  with check (auth.uid() = user_id);

create policy "Users delete own favorites"
  on favorite_champions for delete
  using (auth.uid() = user_id);
```
