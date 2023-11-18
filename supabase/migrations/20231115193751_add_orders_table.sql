create table
    "public"."line_items" ("order_id" bigint not null, "product_id" bigint not null, "price" bigint not null, "quantity" bigint not null, "user_id" uuid not null);

alter table "public"."line_items" enable row level security;

create table
    "public"."orders" ("id" bigint generated by default as identity not null, "user_id" uuid, "order_id" text, "status" text, "state" jsonb, "created_at" timestamp without time zone not null default now(), "updated_at" timestamp without time zone);

alter table "public"."orders" enable row level security;

CREATE UNIQUE INDEX line_items_pkey ON public.line_items USING btree (order_id, product_id);

CREATE UNIQUE INDEX orders_order_id_key ON public.orders USING btree (order_id);

CREATE UNIQUE INDEX orders_pkey ON public.orders USING btree (id);

alter table "public"."line_items"
add constraint "line_items_pkey" PRIMARY KEY using index "line_items_pkey";

alter table "public"."orders"
add constraint "orders_pkey" PRIMARY KEY using index "orders_pkey";

alter table "public"."line_items"
add constraint "line_items_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."line_items" validate constraint "line_items_order_id_fkey";

alter table "public"."line_items"
add constraint "line_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."line_items" validate constraint "line_items_product_id_fkey";

alter table "public"."line_items"
add constraint "line_items_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users (id) ON UPDATE CASCADE not valid;

alter table "public"."line_items" validate constraint "line_items_user_id_fkey";

alter table "public"."orders"
add constraint "orders_order_id_key" UNIQUE using index "orders_order_id_key";

alter table "public"."orders"
add constraint "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users (id) ON UPDATE CASCADE not valid;

alter table "public"."orders" validate constraint "orders_user_id_fkey";

set
    check_function_bodies = off;

CREATE
OR REPLACE FUNCTION public.new_order_id () RETURNS text LANGUAGE sql RETURN concat('DSS-' || date_part('year', now()) || '-' || upper(substr(md5(random()::text), 0, 5)));

create policy "Enable insert for authenticated users only" on "public"."line_items" as permissive for insert to authenticated
with
    check (true);

create policy "Enable select for users based on user_id" on "public"."line_items" as permissive for
select
    to public using ((auth.uid () = user_id));

create policy "Enable all for users based on user_id" on "public"."orders" as permissive for all to public using ((auth.uid () = user_id));