drop table if exists rankingAnswers;
drop table if exists concurrenceQuestions;
drop table if exists concurrenceAnswers;
drop table if exists rankingQuestions;
drop table if exists rankingQuestionItems;
drop table if exists rankingAnswers;

create table `politicians` (
    `id` integer primary key auto_increment,
    `party` text not null,
    `office` text not null,
    `incumbent` boolean not null,
    `bio` text not null
);

create table `politicianAccounts` (
    `username` text not null,
    `password_hash` text not null
);

create table `politicianDistricts` (
    `politician` integer not null references politicians(id),
    `district`   integer not null references districts(id)
);

-- This would probably constaint stuff like zip, state, etc.
create table `districts` (
    `id` integer primary key auto_increment,
    `name` text not null
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Concurrence Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `concurrenceQuestions` (
    `id` integer primary key auto_increment,
    `background` integer not null references backgrounds(id),
    `description` text not null,

    `createdOn` datetime default current_timestamp,
	`createdBy` integer references users(id),
	`updatedOn` datetime on update current_timestamp,
	`updatedBy` integer references users(id)
);

create table `concurrenceAnswers` (
    `id`          integer primary key auto_increment,
    `question`    integer not null references concurrenceQuestions(id),
    `user`        integer not null references users(id),
    `concurrence` integer not null,
    `importance`  integer not null,
    `comment`     text,
    `changedComment` text,
    `changedConcurrence` integer,
    `changedImportance` integer,
    `changeReason` text,

	`createdOn` datetime default current_timestamp,
	`createdBy` integer references users(id),
	`updatedOn` datetime on update current_timestamp,
	`updatedBy` integer references users(id),

    unique (question, user)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Ranking Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `rankingQuestions` (
    `id`          	integer primary key auto_increment,
    `background`  	integer not null references backgrounds(id),
    `description` 	text not null,

    `createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn` 	datetime on update current_timestamp,
	`updatedBy` 	integer references users(id)
);

create table `rankingQuestionItems` (
    `id`       		integer primary key auto_increment,
    `question` 		integer not null references rankingQuestions(id),
    `item`     		text not null,

    `createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn` 	datetime on update current_timestamp,
	`updatedBy` 	integer references users(id)
);

create table `rankingAnswerItems` (
    `id`   			integer primary key auto_increment,
    `user` 			integer not null references users(id),
    `item` 			integer not null references rankingQuestionItems(id),
    `rank` 			integer,
    `changedRank` 	integer,
    `changeReason`  text,

    `createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn`		datetime on update current_timestamp,
	`updatedBy` 	integer references users(id),

    unique (user, item)
);

create table `rankingAnswer` (
	`id` 				integer primary key auto_increment,
	`user` 				integer not null references users(id),
	`question` 			integer not null references rankingQuestion(id),
	`importance` 		integer not null,
	`comment` 			text,
	`changedImportance` integer,
	`changedComment` 	text,
	`changeReason` 		text,

	`createdOn` 		datetime default current_timestamp,
	`createdBy` 		integer references users(id),
	`updatedOn`			datetime on update current_timestamp,
	`updatedBy` 		integer references users(id)

)

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Judge Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `judgeQuestions` (
	`id` 			integer primary key auto_increment,
	`background` 	integer not null references backgrounds(id),
	`description` 	text not null,

	`createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn` 	datetime on update current_timestamp,
	`updatedBy` 	integer references users(id)
);

-- create table `judgeQuestionItems` (
-- 	`id` 		integer primary key auto_increment,
-- 	`question` 	integer not null references judgeQuestions(id),
-- 	`item` 		text not null,	

-- 	`createdOn` datetime default current_timestamp,
-- 	`createdBy` integer references users(id),
-- 	`updatedOn` datetime on update current_timestamp,
-- 	`updatedBy` integer references users(id)
-- );

-- create table `judgeAnswerItems` (
-- 	`id` 					integer primary key auto_increment,
-- 	`user` 					integer not null references users(id),
-- 	`item` 					integer not null references judgeQuestionItems(id),
-- 	`percentage` 			integer not null,
-- 	`changedPercentage` 	integer,
-- 	`changeReason`			text,

-- 	`createdOn` 			datetime default current_timestamp,
-- 	`createdBy` 			integer references users(id),
-- 	`updatedOn` 			datetime on update current_timestamp,
-- 	`updatedBy` 			integer references users(id),

-- 	unique (user, item)
-- );

create table `judgeAnswer` (
	`id` 					integer primary key auto_increment,
	`user` 					integer not null references users(id),
	`question` 				integer not null references rankingQuestion(id),
	`concurrence` 			integer not null,
	`importance` 			integer not null,
	`lawSpirit`				integer,
	`lawLetter`				integer,
	`lawPrecedent`			integer,
	`lawSocialNeed`			integer,
	`comment` 				text,
	`changedImportance` 	integer,
	`changedConcurrence`	integer,
	`changedComment` 		text,
	`changeReason`			text,

	`createdOn` 			datetime default current_timestamp,
	`createdBy`	 			integer references users(id),
	`updatedOn` 			datetime on update current_timestamp,
	`updatedBy` 			integer references users(id)
)

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Short Answer Questions
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `shortInputQuestions` (
	`id` 			integer primary key auto_increment,
	`background`	integer not null references backgrounds(id),
	`description` 	text not null,	

	`createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn` 	datetime on update current_timestamp,
	`updatedBy` 	integer references users(id)
);

create table `shortInputAnswers` (
	`id` 				integer primary key auto_increment,
	`question`			integer not null references shortInputQuestions,
	`answer` 			text not null,
	`comment`			text,
	`importance` 		integer,
	`changedAnswer` 	text not null,
	`changeReason` 		text,
	`changeComment` 	text,
	`changeImportance` 	integer,


	`createdOn` 		datetime default current_timestamp,
	`createdBy` 		integer references users(id),
	`updatedOn` 		datetime on update current_timestamp,
	`updatedBy` 		integer references users(id)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Backgrounds
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `backgrounds` (
    `id` 				integer primary key auto_increment,
    `shortDescription` 	text not null,
    `description` 		text not null

    `createdOn` 		datetime default current_timestamp,
    `createdBy` 		integer not null references users(id),
    `updatedOn` 		datetime on update current_timestamp,
    `updatedBy` 		integer references users(id)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Users
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `users` (
	`id`            integer primary key auto_increment,
	`userName` 		text not null,
	`passwordhash`	varchar(20) not null,
    `passwordSalt`  varchar(20) not null,
	`email` 		varchar(75) not null,
	`phone` 		varchar(20),
	`firstName` 	varchar(25),
	`lastName` 		varchar(50),
	`userType` 		char(1),
	`userLevel` 	char(3),
	`active` 		tinyint(1),
	`createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn` 	datetime on update current_timestamp,
	`updatedBy` 	integer references users(id)
);

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- Topics
-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

create table `topics`(
	`id` 			integer primary key auto_increment,
	`description` 	text not null,
    `background`    integer not null references backgrounds(id),
    `parent`        integer null references topics(id),

	`createdOn` 	datetime default current_timestamp,
	`createdBy` 	integer references users(id),
	`updatedOn` 	datetime on update current_timestamp,
	`updatedBy` 	integer references users(id)
);

