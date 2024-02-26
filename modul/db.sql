
-- place joy
-- expertise-tajriba
-- portion-porsiya
-- weight-ogirlik
-- preparation_time-tayyorlash vaqti
-- storage_condition-saqlash sharti
-- calorie-calloriya
-- proteins-proteinlar
-- oils-yoglar
-- carbs-uglevodlar
-- packages-paketlar
-- food_advantages-avzalliklar
create table users(
 "id" serial primary key,
 "password" text not null,
 "email" text not null,
 "phone" text not null,
 "online" timestamp default current_timestamp not null,
 "name" text,
 "address" text,
 "city" text,
 "country" text,
 "postal_code" text,
 "about_me" text,
 "username" text,
 "lastname" text,
 UNIQUE(phone),
 "image" text,
 "super_admin"  boolean default false not null,
 "povar"  boolean default false not null,
 "active"  boolean default true not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);

create table ish_yonalishi(
  "id" serial primary key,
  "title" text not null,
  "time_create" timestamp default current_timestamp not null,
  "time_update" timestamp default current_timestamp not null
);

-- headerdagi cariuseli tabelisi
create table user_prog(
   "id" serial primary key,
   "user_id" integer not null,
   "food_id" integer not null,
   "image" text not null,
    "time_create" timestamp default current_timestamp not null,
  "time_update" timestamp default current_timestamp not null
);

create table user_povar(
 "id" serial primary key,
 "user_id" integer not null,
 "deskription" text not null,
 "expertise" text not null,
 "place" text not null,
  UNIQUE(user_id),
 "ish_yonalishi" text not null,
 "is_prepared" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);

create table category(
 "id" serial primary key,
 "title" text not null,
 "image" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);

create table user_category(
  "id" serial primary key,
  "user_id" integer not null,
  "category_id" integer not null,
  UNIQUE(user_id,category_id)
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);

create table my_kitchen(
 "id" serial primary key,
 "user_povar_id" integer not null,
 "image" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);
create table document(
 "id" serial primary key,
 "user_povar_id" integer not null,
 "file" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);
create table diploma(
 "id" serial primary key,
 "user_povar_id" integer not null,
 "file" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);
create table foods(
 "id" serial primary key,
 "user_povar_id" integer not null,
 "category_id" integer not null,
 "foods_name" text not null,
 "portion" text not null,
 "weight" text not null,
 "preparation_time" integer not null,
 "storage_condition" text not null,
 "calorie" text not null,
 "proteins" text not null, 
 "oils" text not null,
 "description" text not null,
 "dastafka_us" text not null,
 "carbs" text not null,
 "packages" text not null,
 "price" integer not null,
 "image" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);

create table advantages(
 "id" serial primary key,
 "title" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);

create table food_advantages(
   "id" serial primary key,
 "food_id" integer not null,
 "advantages_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);

create table food_mark(
 "id" serial primary key,
 "user_id" integer not null,
 "description" text not null,
 "mark" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);
create table  necessary(
 "id" serial primary key,
 "file" text not null,
 "title" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);
create table food_seller(
 "id" serial primary key,
 "creator" integer not null,
 "fullname" text not null,
 "phone" text not null,
 "to_my_friend" boolean default false,
 "deliver" boolean default false,
 "the_city" text not null,
 "village" text not null,
 "home" text not null,
 "ofice" text not null,
 "building" integer not null,
 "convex" integer not null,
 "date" date not null,
 "time" text not null,
 "food_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null  
);
create table company(
 "id" serial primary key,
 "image" text not null,
 "app_store" text not null,
 "playmarket" text not null,
 "telegram" text not null,
 "vkantakt" text not null,
 "okru" text not null,
 "whatsapp" text not null,
 "email" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);

create table room(
   "id" serial primary key,
   "user1" integer not null,
   "user2" integer not null,
   "time_create" timestamp default current_timestamp not null,
   "time_update" timestamp default current_timestamp not null 
);
CREATE TABLE messages (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer not null,
  "room_id" integer not null,
  "message" TEXT NOT NULL,
  "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);

create table carousel_forcooks(
  "id" SERIAL PRIMARY KEY,
  "name" text not null,
  "image" text not null,
  "kasb" text not null,
  "desk" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);
create table vopros_atvet(
 "id" SERIAL PRIMARY KEY,
 "title" text not null,
 "desk" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null  
);

create table siz_uchun(
   "id" SERIAL PRIMARY KEY,
 "food_ca_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);
create table oshpazdan_taom(
   "id" SERIAL PRIMARY KEY,
 "food_ca_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);
create table shirinliklar(
   "id" SERIAL PRIMARY KEY,
 "food_ca_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);
create table soglom(
   "id" SERIAL PRIMARY KEY,
 "food_ca_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);
create table gl_foods(
    "id" SERIAL PRIMARY KEY,
 "food_ca_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);
create table gl_desert(
    "id" SERIAL PRIMARY KEY,
 "food_ca_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);
create table gl_product(
 "id" SERIAL PRIMARY KEY,
 "food_ca_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);
create table gl_otzif(
 "id" SERIAL PRIMARY KEY,
 "image" text not null,
 "fullname" varchar(50) not null,
 "servis" varchar(50) not null,
 "deskription" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);
create table gl_users(
 "id" SERIAL PRIMARY KEY,
 "user_ca_id" integer not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);

create table karzinka(
  "id" SERIAL PRIMARY KEY,
 "user_ca_id" integer not null,
 "food_id" integer not null,
 "count" integer not null, 
 UNIQUE(user_ca_id,food_id),
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null  
);

INSERT INTO users (password, email, phone, name, address, city, country, postal_code, about_me, username, lastname, image)
VALUES ('12345678', '12345678', '12345678', 'abbas1', 'tashkent', 'yashnobod', 'uzbekistan', '1212', 'men juda kop vaqt dasturlash bil;an shugullandim ovqatlarni esa qizigi yoq', 'salimov', 'avazjon o`g`li', 'https://www.texnoman.uz/uploads/blogs/347bc522c3567494f296429c72c8c55a.jpg');
INSERT INTO foods (user_povar_id, category_id, foods_name, portion, weight, preparation_time, storage_condition, calorie, proteins, oils, carbs, packages, price, image,description,dastafka_us)
VALUES (1, 1, 'food_name_value', 'portion_value', 'weight_value', 24, 'storage_condition_value', 'calorie_value', 'proteins_value', 'oils_value', 'carbs_value', 'packages_value', 123, 'https://s3.timeweb.com/3c054d59-37319911-7058-4007-b6f4-e93899e36aed/af944830ed2445956672f8103d2f0a78e8b3b185/af944830ed2445956672f8103d2f0a78e8b3b185-wc800.png','Идея сервиса очень крутая! Я&nbsp;работаю шеф-поваром, и&nbsp;по&nbsp;роду деятельности часто сталкиваюсь с&nbsp;необычными продуктами и&nbsp;интересными блюдами! По&nbsp;сути, сервис даёт каждому возможность создать «ресторан у&nbsp;себя дома», не&nbsp;прибегая к&nbsp;дополнительным вложениям.','у&nbsp;себя дома», не&nbsp;прибегая к&nbsp;дополнительным вложениям.');
UPDATE foods
SET food_name = 'food_name_value',
    portion = 'portion_value',
    weight = 'weight_value',
    preparation_time = 'preparation_time_value',
    storage_condition = 'storage_condition_value',
    calorie = 'calorie_value',
    proteins = 'proteins_value',
    oils = 'oils_value',
    carbs = 'carbs_value',
    packages = 'packages_value',
    price = 321,
    image = 'https://s3.timeweb.com/3c054d59-37319911-7058-4007-b6f4-e93899e36aed/af944830ed2445956672f8103d2f0a78e8b3b185/af944830ed2445956672f8103d2f0a78e8b3b185-wc800.png',
    user_povar_id = 1 
WHERE  id = 1;
INSERT INTO foods (user_povar_id, category_id, foods_name, portion, weight, preparation_time, storage_condition, calorie, proteins, oils, description, dastafka_us, carbs, packages, price, image, time_create, time_update)
VALUES (5, 1, 'Pizza', '1 slice', '200g', '30 minutes', 'Refrigerated', '500 kcal', '10g', '15g', 'Delicious pizza', 'For delivery', '40g', 'Box', 10, 'https://altynachar.com/mtk44/586-thickbox_default/garysyk-pissa.jpg', current_timestamp, current_timestamp);