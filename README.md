# dogswagshop

## Database

### Orders

```sql
create or replace function public.new_order_id() returns text
    language sql
    return concat( 'DSS-' || upper(substr(md5(random()::text), 0, 5)) );
```

```sql
drop trigger if exists on_order_created on public.orders;
drop function if exists public.handle_new_order;

create function public.handle_new_order()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update public.orders
  set order_id = concat( 'DSS-' || upper(substr(md5(random()::text), 0, 5)) )
  and status = 'CREATED'
  where id = new.id;
  return new;
end;
$$;

create trigger on_order_created
  after insert on public.orders
  for each row execute procedure public.handle_new_order();
```
