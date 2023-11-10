CREATE TABLE public.products(
    id bigint GENERATED BY DEFAULT AS IDENTITY,
    slug text NOT NULL,
    name text NULL,
    short_description text NULL,
    long_description text NULL,
    tags text[] NULL,
    price bigint NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT products_slug_key UNIQUE (slug)
)
TABLESPACE pg_default;
