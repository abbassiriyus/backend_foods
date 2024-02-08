
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
"place" text not null,
"super_admin"  boolean default false not null,
"povar"  boolean default false not null,
"active"  boolean default true not null,
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
)
create table category(
"id" serial primary key,
"title" text not null,
"time_create" timestamp default current_timestamp not null,
"time_update" timestamp default current_timestamp not null
)
create table povar_category(
"id" serial primary key,
"user_povar_id" integer not null,
"category_id" integer not null,
"time_create" timestamp default current_timestamp not null,
"time_update" timestamp default current_timestamp not null
)
create table my_kitchen(
"id" serial primary key,
"user_povar_id" integer not null,
"image" text not null,
"time_create" timestamp default current_timestamp not null,
"time_update" timestamp default current_timestamp not null
)
create table document(
"id" serial primary key,
"user_povar_id" integer not null,
"file" text not null,
"time_create" timestamp default current_timestamp not null,
"time_update" timestamp default current_timestamp not null
)
create table diploma(
"id" serial primary key,
"user_povar_id" integer not null,
"file" text not null,
"time_create" timestamp default current_timestamp not null,
"time_update" timestamp default current_timestamp not null
)
create table food(
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
"image" integer not null,
"time_create" timestamp default current_timestamp not null,
"time_update" timestamp default current_timestamp not null 
)
create table advantages(
"id" serial primary key,
"titile" text not null,
"time_create" timestamp default current_timestamp not null,
"time_update" timestamp default current_timestamp not null 
)
create table food_advantages(
   "id" serial primary key,
"food_id" integer not null,
"advantages_id" integer not null,
"time_create" timestamp default current_timestamp not null,
"time_update" timestamp default current_timestamp not null 
)
create table necessary(
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
)
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
)

create table room(
   "id" serial primary key,
   "room_sender" integer not null,

    "time_create" timestamp default current_timestamp not null,
"time_update" timestamp default current_timestamp not null 
)
CREATE TABLE messages (
  "id" SERIAL PRIMARY KEY,
  "message" TEXT NOT NULL,
  "time_create" timestamp default current_timestamp not null,
"time_update" timestamp default current_timestamp not null 
);