create table "public"."orders" (
    "created_at" timestamp with time zone not null default now(),
    "id" uuid not null,
    "order_id" text not null,
    "order_amount" integer,
    "line_items" jsonb,
    "shipping_method" text,
    "shipping_cost" integer,
    "payment_method" text,
    "payment_status" text not null default 'unpaid'::text,
    "user_id" uuid not null,
    "state" jsonb,
    "ordered_date" timestamp with time zone,
    "shipping_details" jsonb
);


CREATE UNIQUE INDEX orders_pkey ON public.orders USING btree (id);

alter table "public"."orders" add constraint "orders_pkey" PRIMARY KEY using index "orders_pkey";



