-- One free item for every account, paid or not.
--
-- The free offer is aimed at bikes: sign up without paying and register
-- your bike. It is not a plan of its own and has no status of its own.
-- Any account without an active membership may create items until it owns
-- FREE_ITEMS of them. Upgrading is the normal checkout to Privat.
--
-- Why not a 'free' status on subscriptions: create-checkout, the webhook
-- and mapStatus all write that column, and a free account that started a
-- checkout would turn into pending_activation and lose its free item
-- halfway through. Counting items keeps the rule in one place and leaves
-- the payment flow untouched.
--
-- MUST match FREE_ITEMS in lib/plans.ts.

/**
 * May the calling user create one more item?
 *
 * Active members: always (items beyond the included ones are billed by
 * report-usage). Everyone else: only while they own fewer than one item.
 *
 * Two inserts in the same instant can both see zero items and both pass.
 * That is accepted: the worst case is a second free item, and the offer is
 * deliberately loose — anyone can open another account anyway.
 */
create or replace function public.can_create_item()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select public.has_active_subscription()
    or (
      select count(*) < 1
      from public.items
      where user_id = (select auth.uid())
    );
$$;

revoke execute on function public.can_create_item() from public, anon;
grant  execute on function public.can_create_item() to authenticated;

drop policy if exists "items_insert_own" on public.items;

create policy "items_insert_own" on public.items
  for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and public.can_create_item()
  );

-- ---------------------------------------------------------------------
-- Nudge free accounts that never registered anything
-- ---------------------------------------------------------------------
--
-- nudge_users_without_items() only looks at active members. A free signup
-- has no subscriptions row at all, so it would never be reminded.
--
-- Only accounts with NO subscriptions row: a row means a checkout was
-- started, and those already get 'betaling_ikke_fuldfoert'. Two different
-- reminders to the same person would be spam.
--
-- Only accounts confirmed within the last 7 days. Without that lower bound
-- the first run would mail every dormant account since launch at once.

create or replace function public.nudge_free_users_without_items()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  sent_count integer := 0;
  target     record;
begin
  for target in
    select u.id as user_id
    from auth.users u
    where u.email_confirmed_at between now() - interval '7 days'
                                   and now() - interval '24 hours'
      and not exists (
        select 1 from public.subscriptions s where s.user_id = u.id
      )
      and not exists (
        select 1 from public.items i where i.user_id = u.id
      )
      and not exists (
        select 1 from public.email_log e
        where e.user_id = u.id
          and e.kind = 'gratis_ingen_ejendel'
      )
  loop
    perform net.http_post(
      url := 'https://ufpuznbsdxwzdkjbkgbu.supabase.co/functions/v1/send-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'X-Cron-Secret', (
          select decrypted_secret
          from vault.decrypted_secrets
          where name = 'cron_secret'
        )
      ),
      body := jsonb_build_object(
        'kind', 'gratis_ingen_ejendel',
        'user_id', target.user_id
      ),
      timeout_milliseconds := 10000
    );

    sent_count := sent_count + 1;
  end loop;

  return sent_count;
end;
$$;

revoke execute on function public.nudge_free_users_without_items() from public, anon, authenticated;

-- Hourly like the other nudges, in a minute of its own (:15 and :45 are
-- taken) so they do not all hit send-email at once.
select cron.schedule(
  'nudge-free-users-without-items',
  '30 * * * *',
  $job$ select public.nudge_free_users_without_items(); $job$
);
