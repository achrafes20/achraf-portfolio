-- Sécurisation de la table des messages de contact.
--
-- Avant : le navigateur insérait directement dans la table avec la clé publique.
-- Après : seule la fonction Edge « send-contact-email » (clé service) écrit dans la table,
-- après validation, captcha et limite de fréquence. Le public n'a plus aucun droit dessus.
--
-- Script idempotent : il peut être rejoué sans erreur.

create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  source text,
  created_at timestamptz not null default now()
);

alter table public.contact_messages
  add column if not exists lang text,
  add column if not exists ip_hash text,
  add column if not exists email_status text not null default 'pending';

-- La date est fixée par la base, plus par le navigateur (non falsifiable).
alter table public.contact_messages alter column created_at set default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'contact_messages_email_status_check'
  ) then
    alter table public.contact_messages
      add constraint contact_messages_email_status_check
      check (email_status in ('pending', 'sent', 'failed'));
  end if;
end $$;

-- Index utilisés par la limite de fréquence.
create index if not exists contact_messages_ip_hash_created_at_idx
  on public.contact_messages (ip_hash, created_at desc);
create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

-- RLS activée sans aucune policy + droits retirés : aucun accès via les clés publiques.
-- La clé service utilisée par la fonction Edge contourne RLS.
alter table public.contact_messages enable row level security;
revoke all on table public.contact_messages from anon, authenticated;

-- Supprime les anciennes policies qui autorisaient l'insertion publique.
do $$
declare
  policy_record record;
begin
  for policy_record in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'contact_messages'
  loop
    execute format('drop policy %I on public.contact_messages', policy_record.policyname);
  end loop;
end $$;
