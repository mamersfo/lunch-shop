INSERT INTO
    products (slug, name, price, tags, short_description)
VALUES
    ('_mQW59DjahQ', 'Shirt', 1995, ARRAY['shirt', 'organic'], 'Red and white shirt'),
    ('-_gMskl-uoc', 'Sheep', 2995, ARRAY['party', 'halloween'], 'Sheep’s clothing for your dog'),
    ('2rHw1I_IoT4', 'Jacket', 10995, ARRAY['sustainable'], 'Green varsity jacket for your doggo'),
    ('F1PDaeAyr1A', 'Sweater', 7995, ARRAY['fashion', 'party'], 'A sweater for your champion, by Champion'),
    ('jwB41-bQn_o', 'Hoodie', 39900, ARRAY['streetwear', 'hipster'], 'Dogwear for the streets'),
    ('lQ8WvR54MOU', 'Collar', 1995, ARRAY['walk', 'pink'], 'Who’s a good boy?'),
    ('n3c5pSoD2Fc', 'Antlers', 1095, ARRAY['christmas', 'party'], 'A prop for you Christmas party'),
    ('vuFec8Eyk7k', 'Pyjamas', 1699, ARRAY['nightwear', 'organic'], 'Blue and yellow pyjamas');

UPDATE products
SET
    long_description = 'I’m baby beard tumblr shaman, fanny pack narwhal bitters celiac cred mustache keytar mumblecore everyday carry tousled locavore typewriter. Raclette solarpunk cred cold-pressed, adaptogen woke shabby chic PBR&B. Biodiesel fixie thundercats bitters, edison bulb cold-pressed ugh synth tousled hella try-hard swag actually. Cardigan blog normcore bodega boys sartorial chillwave lumbersexual kombucha. Hoodie Brooklyn readymade, synth bespoke ramps trust fund keytar fit tousled health goth retro.'
WHERE
    slug = '_mQW59DjahQ';

UPDATE products
SET
    long_description = 'Blue bottle deep v trust fund helvetica fashion axe meditation hella distillery +1 XOXO disrupt. Asymmetrical fashion axe vegan, tote bag street art quinoa franzen post-ironic kombucha small batch before they sold out. Yes plz leggings seitan, franzen marxism jianbing bodega boys sustainable coloring book echo park kale chips irony helvetica. Glossier chia blue bottle VHS waistcoat tacos hashtag. Cloud bread irony cardigan messenger bag big mood hammock tattooed. Direct trade mixtape fashion axe, pabst neutral milk hotel retro hot chicken YOLO taiyaki.'
WHERE
    slug = '-_gMskl-uoc';

UPDATE products
SET
    long_description = 'Umami street art glossier letterpress. Coloring book chartreuse shabby chic, cold-pressed organic bespoke poutine blog. Messenger bag jianbing everyday carry fixie, solarpunk church-key blackbird spyplane stumptown. Praxis neutral milk hotel affogato vegan, hoodie gatekeep butcher retro drinking vinegar cornhole hella fam XOXO roof party. Kickstarter palo santo bitters, ramps vinyl fashion axe paleo iPhone VHS tofu viral photo booth drinking vinegar praxis cupping.'
WHERE
    slug = '2rHw1I_IoT4';

UPDATE products
SET
    long_description = 'Lomo blog craft beer literally 3 wolf moon tofu, typewriter tattooed gentrify mustache banjo post-ironic YOLO fashion axe selvage. Health goth sus grailed +1 tumeric fit solarpunk offal bespoke banjo. Organic franzen vibecession live-edge retro dreamcatcher lo-fi. Succulents heirloom big mood chia tbh paleo cloud bread. XOXO direct trade flexitarian gatekeep, swag chicharrones green juice vape. Bodega boys Brooklyn photo booth crucifix pug aesthetic.'
WHERE
    slug = 'F1PDaeAyr1A';

UPDATE products
SET
    long_description = 'Keffiyeh you probably haven’t heard of them lo-fi grailed glossier, franzen vexillologist tacos woke semiotics praxis migas jianbing echo park. Swag chambray VHS hot chicken. Taxidermy shaman poke succulents fingerstache biodiesel marxism air plant jianbing adaptogen YOLO viral. Pitchfork shabby chic schlitz, artisan PBR&B mumblecore praxis hella la croix direct trade flannel wayfarers mukbang affogato. Yes plz man bun forage DIY tilde kale chips.'
WHERE
    slug = 'jwB41-bQn_o';

UPDATE products
SET
    long_description = 'Brooklyn wayfarers chicharrones copper mug pok pok ascot kale chips stumptown selfies. Kogi tumblr plaid, kombucha bicycle rights taiyaki hot chicken meggings small batch marfa street art. Glossier live-edge ennui knausgaard fashion axe fam etsy tousled normcore. Etsy 90’s cred dreamcatcher bushwick vibecession neutral milk hotel, live-edge blog vegan keytar. Fixie DIY direct trade forage.'
WHERE
    slug = 'lQ8WvR54MOU';

UPDATE products
SET
    long_description = 'Cornhole pabst bitters, organic man bun vibecession lumbersexual. Art party health goth next level fit. Cupping yr leggings, pork belly normcore drinking vinegar neutral milk hotel listicle. Paleo ascot asymmetrical vibecession, pinterest jawn prism raw denim synth skateboard selfies. Umami cardigan dreamcatcher, flannel heirloom hella letterpress bitters vinyl try-hard. Readymade hell of pickled godard. Bruh tonx polaroid lomo.'
WHERE
    slug = 'n3c5pSoD2Fc';

UPDATE products
SET
    long_description = '8-bit jianbing authentic, hexagon blackbird spyplane vice you probably haven’t heard of them slow-carb food truck gentrify crucifix. Plaid pop-up activated charcoal, lumbersexual poke quinoa affogato. Cray pug ascot banh mi 3 wolf moon tilde vape, shabby chic hot chicken four dollar toast asymmetrical cardigan tumeric. Poutine bruh hammock, craft beer prism humblebrag post-ironic man braid stumptown.'
WHERE
    slug = 'vuFec8Eyk7k';

-- user: customer1@finalist.nl
INSERT INTO
    auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES
    ('00000000-0000-0000-0000-000000000000', '4dd5b7ec-6832-4f4c-acdf-39d6316dba5d', 'authenticated', 'authenticated', 'customer1@finalist.nl', '$2a$10$0YICnpzcehjHbi.6aLbNOu5iWzcgnVHzCTh/eQoKhQIXWlZcRjBRi', '2023-04-22 13:10:31.463703+00', NULL, '', NULL, '', '2023-04-22 13:10:03.275387+00', '', '', NULL, '2023-04-22 13:10:31.458239+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO
    auth.identities (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES
    ('4dd5b7ec-6832-4f4c-acdf-39d6316dba5d', '4dd5b7ec-6832-4f4c-acdf-39d6316dba5d'::uuid, '{"sub": "4dd5b7ec-6832-4f4c-acdf-39d6316dba5d", "email": "customer1@finalist.nl"}', 'email', '2023-04-22 13:10:31.458239+00', '2022-10-04 03:41:27.391146+00', '2023-04-22 13:10:31.463703+00');