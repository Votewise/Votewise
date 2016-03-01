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


create table `Questions`(

    `id` integer primary key auto_increment,
    `type` varchar(20) not null,
    `background` integer not null references Backgrounds(background),
    `description` text not null,
    `viewOrder` integer not null,

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references Users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references Users(id),

    unique index(id,type)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Answers
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `Answers` (
  `id` integer primary key auto_increment,
  `type` varchar(20) not null,
  `question` integer not null references Questions(id),
  `user` integer not null references Users(id),
  `background` integer not null references Background(background),
  `importance` integer,
  `comment` text,

  `answer` text,

  `concurrence` integer,

  `lawSpirit` boolean,
  `lawPrecedent` boolean,
  `lawLetter` boolean,
  `lawSocialNeed` boolean,


  `previousComment` text,
  `previousConcurrence` integer,
  `previousAnswer` text,
  `previousImportance` integer,
  `changeReason` text,

  `createdAt` datetime default current_timestamp,
  `createdBy` integer references Users(id),
  `updatedAt` datetime on update current_timestamp,
  `updatedBy` integer references Users(id),

  unique (question, user)

);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Concurrence Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



create table `ConcurrenceAnswers` (
    `id`          integer primary key auto_increment,
    `question`    integer not null references Questions(id),
    `user`        integer not null references Users(id),
    `background`  integer not null references Background(background),
    `concurrence` integer not null,
    `importance`  integer not null,
    `comment`     text,
    `previousComment` text,
    `previousConcurrence` integer,
    `previousImportance` integer,
    `changeReason` text,

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references Users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references Users(id),

    unique (question, user)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Ranking Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



create table `RankingQuestionItems` (
    `id`            integer primary key auto_increment,
    `question`      integer not null references Questions(id),
    `item`          text not null,
    `createdAt`     datetime default current_timestamp,
    `updatedAt`     datetime on update current_timestamp

);

create table `RankingAnswerItems` (
    `id`            integer primary key auto_increment,
    `answer`        integer not null references Answer(id),
    `user`          integer not null references Users(id),
    `question`      integer not null references Questions(id),
    `background`    integer not null references Backgrounds(background),
    `itemId`        integer not null references RankingQuestionItems(id),
    `item`          varchar(300) not null,
    `rank`          integer,
    `previousRank`  integer,
    `changeReason`  text,
    `createdAt`     datetime default current_timestamp,
    `updatedAt`     datetime on update current_timestamp,

    unique (user, itemId)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Judge Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `JudgeAnswers` (

    `id`                    integer primary key auto_increment,
    `user`                  integer not null references users(id),
    `question`              integer not null references questions(id),
    `concurrence`           integer not null,
    `importance`            integer not null,
    `lawSpirit`             boolean,
    `lawLetter`             boolean,
    `lawPrecedent`          boolean,
    `lawSocialNeed`         boolean,
    `comment`               text,
    `previousImportance`    integer,
    `previousConcurrence`   integer,
    `previousComment`       text,
    `changeReason`          text,

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references users(id)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Short Answer Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


create table `ShortInputAnswers` (

    `id`                integer primary key auto_increment,
    `question`          integer not null references questions(id),
    `answer`            text not null,
    `comment`           text,
    `importance`        integer,
    `previousAnswer`    text not null,
    `changeReason`      text,
    `previousComment`   text,
    `previousImportance`    integer,

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references users(id)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Backgrounds
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `Backgrounds` (
    `id`                integer primary key auto_increment,
    `background`        integer not null,
    `shortDescription`  text not null,
    `description`       text not null,

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references Users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references Users(id)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Topics
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `Topics`(
    `id`            integer primary key auto_increment,
    `background`    integer not null references Backgrounds(background),
    `parent`        integer null references Topics(id),
    `viewOrder`     integer not null,
    `description`   text not null,

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references Users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references Users(id)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Users
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `Users` (
    `id`            integer primary key not null auto_increment,
    `userName`      text not null,
    `passwordHash`  varchar(70) not null,
    `email`         varchar(75) not null,
    `phone`         varchar(20),
    `address`       varchar(75),
    `city`          varchar(75),
    `county`        varchar(75),
    `district`      varchar(75),
    `state`         varchar(2),
    `firstName`     varchar(25),
    `lastName`      varchar(50),
    `type`          varchar(20) not null,
    `userLevel`     varchar(10),
    `active`        tinyint(1),
    `answerCount`   integer,
    `age`           integer,
    `income`        integer,
    `owner`         tinyint(1),
    `votingPossibility`   integer,

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references Users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references Users(id),
    unique index(id, type)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Voters
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `Voters` (
    `id`            integer primary key not null auto_increment,
    `userId`        integer not null,
    `type`          varchar(20) not null,
    `politicianList` integer not null references PoliticianLists(user),

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references Users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references Users(id),
    foreign key(userId, type) references Users(id, type)
);

create table `PoliticianLists` (
    `id` integer primary key not null auto_increment,
    `user` integer not null,
    `politician` integer not null references Politicians(id),

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references Users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references Users(id)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Admin
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `admins` (
    `id`            integer primary key not null,
    `type`          varchar(20) not null,
    foreign key(id, type) references Users(id, type),

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references Users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references Users(id)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Politicians
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `Politicians` (
    `id`                integer not null primary key auto_increment,
    `name`              varchar(30) not null,
    `user`              integer,
    `type`              varchar(20) not null,
    `party`             integer references Parties(id),
    `office`            text not null,
    `incumbent`         boolean not null,
    `website`           VARCHAR(2083),
    `endorsements`      text,
    `resume`            text,
    `statement`         text,
    `performanceReview` text,
    `answerCount`       integer,

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references Users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references Users(id),
    foreign key(user, type) references Users(id, type)
);

create table `PoliticianDistricts` (
    `id`         integer not null primary key auto_increment,
    `politician` integer not null references Politicians(id),
    `district`   integer not null references Districts(id),

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references Users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references Users(id)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Districts
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `Districts` (
    `id` integer primary key auto_increment,
    `name` text not null,
    `state` varChar(2) not null,
    `city` varChar(30) not null,
    `county` varChar(30) not null,

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references Users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references Users(id)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Groups
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `Groups` (
    `id` integer primary key auto_increment,
    `name` text not null,
    `description` text not null,
    `category` text not null,

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references Users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references Users(id)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Users Groups
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `UserGroups` (
    `id` integer primary key auto_increment,
    `group` integer not null references Groups(id),
    `user` integer not null references Users(id),

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references Users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references Users(id)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Parties
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `Parties` (
    `id` integer primary key auto_increment,
    `name` text not null,

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references Users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references Users(id)
);


-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Users Parties
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `UserParties` (
    `id` integer primary key auto_increment,
    `party` integer not null references Parties(id),
    `user` integer not null references Users(id),

    `createdAt` datetime default current_timestamp,
    `createdBy` integer references Users(id),
    `updatedAt` datetime on update current_timestamp,
    `updatedBy` integer references Users(id)
);

