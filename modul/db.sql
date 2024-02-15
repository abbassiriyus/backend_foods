
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
 "place" text,
"ish_yonalishi_id" integer not null,
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
)

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
 "is_prepared" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);
create table category(
 "id" serial primary key,
 "title" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null
);
create table povar_category(
 "id" serial primary key,
 "user_povar_id" integer not null,
 "category_id" integer not null,
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
 "food_name" text not null,
 "portion" text not null,
 "weight" text not null,
 "preparation_time" text not null,
 "storage_condition" text not null,
 "calorie" text not null,
 "proteins" text not null, 
 "oils" text not null,
 "carbs" text not null,
 "packages" text not null,
 "price" integer not null,
 "image" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
);
create table advantages(
 "id" serial primary key,
 "titile" text not null,
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
 "file" integer not null,
 "title" text not null,
 "time_create" timestamp default current_timestamp not null,
 "time_update" timestamp default current_timestamp not null 
)
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
   "room_sender" integer not null,
    "time_create" timestamp default current_timestamp not null,
   "time_update" timestamp default current_timestamp not null 
);
CREATE TABLE messages (
  "id" SERIAL PRIMARY KEY,
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
INSERT INTO users (password, email, phone, place, name, address, city, country, postal_code, about_me, username, lastname, image)
VALUES ('a', 'a', 'a', 'place_value', 'name_value', 'address_value', 'city_value', 'country_value', 'postal_code_value', 'about_me_value', 'username_value', 'lastname_value', 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png');
INSERT INTO foods (user_povar_id, category_id, food_name, portion, weight, preparation_time, storage_condition, calorie, proteins, oils, carbs, packages, price, image)
VALUES (1, 1, 'food_name_value', 'portion_value', 'weight_value', 'preparation_time_value', 'storage_condition_value', 'calorie_value', 'proteins_value', 'oils_value', 'carbs_value', 'packages_value', 123, "https://s3.timeweb.com/3c054d59-37319911-7058-4007-b6f4-e93899e36aed/af944830ed2445956672f8103d2f0a78e8b3b185/af944830ed2445956672f8103d2f0a78e8b3b185-wc800.png");