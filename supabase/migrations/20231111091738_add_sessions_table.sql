create table "public"."sessions" (
    "id" uuid not null default auth.uid(),
    "cart" jsonb
);


alter table "public"."sessions" enable row level security;

CREATE UNIQUE INDEX sessions_pkey ON public.sessions USING btree (id);

alter table "public"."sessions" add constraint "sessions_pkey" PRIMARY KEY using index "sessions_pkey";

create policy "Enable all for users based on user_id"
on "public"."sessions"
as permissive
for all
to public
using ((auth.uid() = id));
