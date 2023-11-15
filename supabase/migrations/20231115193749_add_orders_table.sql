create table "public"."orders" (
    "id" bigint generated by default as identity not null,
    "user_id" uuid default auth.uid(),
    "order_id" text,
    "status" text,
    "shipping_id" bigint,
    "state" jsonb,
    "created_at" timestamp without time zone not null default now(),
    "updated_at" timestamp without time zone
);


alter table "public"."orders" enable row level security;

CREATE UNIQUE INDEX orders_order_id_key ON public.orders USING btree (order_id);

CREATE UNIQUE INDEX orders_pkey ON public.orders USING btree (id);

alter table "public"."orders" add constraint "orders_pkey" PRIMARY KEY using index "orders_pkey";

alter table "public"."orders" add constraint "orders_order_id_key" UNIQUE using index "orders_order_id_key";

alter table "public"."orders" add constraint "orders_shipping_id_fkey" FOREIGN KEY (shipping_id) REFERENCES shipping(id) not valid;

alter table "public"."orders" validate constraint "orders_shipping_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_order()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  update public.orders 
  set order_id = concat( 'DSS-' || upper(substr(md5(random()::text), 0, 5)) ) 
  where id = new.id;
  return new;
end;
$function$
;

create policy "Enable all for users based on user_id"
on "public"."orders"
as permissive
for all
to public
using ((auth.uid() = user_id));


CREATE TRIGGER on_order_created AFTER INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION handle_new_order();



