drop table if exists rankingQuestionItems;
drop table if exists answers;
drop table if exists rankingAnswerItems;
drop table if exists shortInputAnswers;
drop table if exists backgrounds;
drop table if exists topics;
drop table if exists admins;
drop table if exists politicians;
drop table if exists politicianDistricts;
drop table if exists districts;
drop table if exists questions;
drop table if exists voters;
drop table if exists users;
drop table if exists politicianLists;


create table questions(

    id integer primary key auto_increment,
    type varchar(20) not null,
    background integer not null references backgrounds(id),
    description text not null,
    viewOrder integer not null,

    createdAt datetime default current_timestamp,
    createdBy integer references users(id),
    updatedAt datetime on update current_timestamp,
    updatedBy integer references users(id),

    unique index(id,type)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Answers
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table answers (
  id integer primary key auto_increment,
  type varchar(20) not null,
  question integer not null references questions(id),
  user integer not null references users(id),
  background integer not null references background(id),
  importance integer,
  comment text,

  answer text,

  concurrence integer,

  lawSpirit boolean,
  lawPrecedent boolean,
  lawLetter boolean,
  lawSocialNeed boolean,


  previousComment text,
  previousConcurrence integer,
  previousAnswer text,
  previousImportance integer,
  changeReason text,

  createdAt datetime default current_timestamp,
  createdBy integer references users(id),
  updatedAt datetime on update current_timestamp,
  updatedBy integer references users(id),

  unique (question, user)

);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Concurrence Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



create table concurrenceAnswers (
    id          integer primary key auto_increment,
    question    integer not null references questions(id),
    user        integer not null references users(id),
    background  integer not null references background(id),
    concurrence integer not null,
    importance  integer not null,
    comment     text,
    previousComment text,
    previousConcurrence integer,
    previousImportance integer,
    changeReason text,

    createdAt datetime default current_timestamp,
    createdBy integer references users(id),
    updatedAt datetime on update current_timestamp,
    updatedBy integer references users(id),

    unique (question, user)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Ranking Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



create table rankingQuestionItems (
    id            integer primary key auto_increment,
    question      integer not null references questions(id),
    item          text not null,
    createdAt     datetime default current_timestamp,
    updatedAt     datetime on update current_timestamp

);

create table rankingAnswerItems (
    id            integer primary key auto_increment,
    answer        integer not null references answer(id),
    user          integer not null references users(id),
    question      integer not null references questions(id),
    background    integer not null references backgrounds(id),
    itemId        integer not null references rankingQuestionItems(id),
    item          varchar(300) not null,
    rank          integer,
    previousRank  integer,
    changeReason  text,
    createdAt     datetime default current_timestamp,
    updatedAt     datetime on update current_timestamp,

    unique (user, itemId)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Judge Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table judgeAnswers (

    id                    integer primary key auto_increment,
    user                  integer not null references users(id),
    question              integer not null references questions(id),
    concurrence           integer not null,
    importance            integer not null,
    lawSpirit             boolean,
    lawLetter             boolean,
    lawPrecedent          boolean,
    lawSocialNeed         boolean,
    comment               text,
    previousImportance    integer,
    previousConcurrence   integer,
    previousComment       text,
    changeReason          text,

    createdAt datetime default current_timestamp,
    createdBy integer references users(id),
    updatedAt datetime on update current_timestamp,
    updatedBy integer references users(id)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Short Answer Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


create table shortInputAnswers (

    id                integer primary key auto_increment,
    question          integer not null references questions(id),
    answer            text not null,
    comment           text,
    importance        integer,
    previousAnswer    text not null,
    changeReason      text,
    previousComment   text,
    previousImportance    integer,

    createdAt datetime default current_timestamp,
    createdBy integer references users(id),
    updatedAt datetime on update current_timestamp,
    updatedBy integer references users(id)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Backgrounds
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table backgrounds (
    id                integer primary key auto_increment,
    shortDescription  text not null,
    description       text not null,

    createdAt datetime default current_timestamp,
    createdBy integer references users(id),
    updatedAt datetime on update current_timestamp,
    updatedBy integer references users(id)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Topics
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table topics(
    id            integer primary key auto_increment,
    background    integer not null references backgrounds(id),
    parent        integer null references topics(id),
    viewOrder     integer not null,
    description   text not null,

    createdAt datetime default current_timestamp,
    createdBy integer references users(id),
    updatedAt datetime on update current_timestamp,
    updatedBy integer references users(id)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Users
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table users (
    id            integer primary key not null auto_increment,
    userName      text not null,
    passwordHash  varchar(20) not null,
    passwordSalt  varchar(20) not null,
    email         varchar(75) not null,
    phone         varchar(20),
    address       varchar(75),
    firstName     varchar(25),
    lastName      varchar(50),
    type          varchar(20) not null,
    userLevel     char(3),
    active        tinyint(1),

    createdAt datetime default current_timestamp,
    createdBy integer references users(id),
    updatedAt datetime on update current_timestamp,
    updatedBy integer references users(id),
    unique index(id, type)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Voters
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table voters (
    id            integer primary key not null auto_increment,
    userId        integer not null,
    type          varchar(20) not null,
    politicianList integer not null references politicianLists(user),

    createdAt datetime default current_timestamp,
    createdBy integer references users(id),
    updatedAt datetime on update current_timestamp,
    updatedBy integer references users(id),
    foreign key(userId, type) references users(id, type)
);

create table politicianLists (
    id integer primary key not null auto_increment,
    user integer not null,
    politician integer not null references politicians(id),

    createdAt datetime default current_timestamp,
    createdBy integer references users(id),
    updatedAt datetime on update current_timestamp,
    updatedBy integer references users(id)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Admin
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table admins (
    id            integer primary key not null,
    type          varchar(20) not null,
    foreign key(id, type) references users(id, type),

    createdAt datetime default current_timestamp,
    createdBy integer references users(id),
    updatedAt datetime on update current_timestamp,
    updatedBy integer references users(id)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Politicians
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table politicians (
    id integer not null primary key auto_increment,
    name varchar(30) not null,
    userId integer,
    type varchar(20) not null,
    party text not null,
    office text not null,
    incumbent boolean not null,
    bio text not null,
    endorsements text not null,
    essay text,

    createdAt datetime default current_timestamp,
    createdBy integer references users(id),
    updatedAt datetime on update current_timestamp,
    updatedBy integer references users(id),
    foreign key(userId, type) references users(id, type)
);

create table politicianDistricts (
    id         integer not null primary key auto_increment,
    politician integer not null references politicians(id),
    district   integer not null references districts(id),

    createdAt datetime default current_timestamp,
    createdBy integer references users(id),
    updatedAt datetime on update current_timestamp,
    updatedBy integer references users(id)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Districts
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table districts (
    id integer primary key auto_increment,
    name text not null,
    state varChar(2) not null,
    city varChar(30) not null,
    county varChar(30) not null,

    createdAt datetime default current_timestamp,
    createdBy integer references users(id),
    updatedAt datetime on update current_timestamp,
    updatedBy integer references users(id)
);
