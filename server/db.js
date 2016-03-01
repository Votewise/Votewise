var models = require('./models');
var Answers = models.Answers;
var Backgrounds = models.Backgrounds;
var Districts = models.Districts;
var PoliticianDistricts = models.PoliticianDistricts;
var PoliticianLists = models.PoliticianLists;
var Politicians = models.Politicians;
var Questions = models.Questions;
var RankingAnswerItems = models.RankingAnswerItems;
var RankingQuestionItems = models.RankingQuestionItems;
var Topics = models.Topics;
var Users = models.Users;
var Voters = models.Voters;
var Groups = models.Groups;
var UserGroups = models.UserGroups;
var Parties = models.Parties;
var UserParties = models.UserParties;
var util = require('util');
var generateName = require('sillyname');
var _ = require('lodash');

// POLITICIAN fixtures
//
//for (var i = 0; i < 2; i++){
//    var rando = generateName();
//
//    Politicians.create({
//        name: rando,
//        type: "politician",
//        party: "Chess",
//        office: "Superintendent",
//        incumbent: true,
//        resume: 'Flying ghost pizza',
//        endorsements: "thing",
//        statement: 'not enough mozzerella',
//        performanceReview: 'Extreme',
//        website: 'pepperoni.com',
//        answerCount: 0
//
//    }).then(function(result){
//        console.log(result);
//    });
//
//};


//// //Randos outside for loops
//var rando1 = generateName();
//var rando2 = generateName();
//var rando3 = generateName();
////
// DISTRICT fixtures
//for (var i = 0; i < 3; i++){
//
//    var rando1 = generateName();
//    var rando2 = generateName();
//    var rando3 = generateName();
//
//    Districts.create({
//        name: rando1,
//        state: "PA",
//        city: "Philadelphia",
//        county: rando3
//    }).then(function(result){
//        console.log(result);
//    });
//
//}
////
//// POLITICIAN DISTRICT RELATION fixtures
//
//PoliticianDistricts.bulkCreate([
//
//    { politician: 1, district: 1 },
//    { politician: 2, district: 1 },
//    { politician: 3, district: 1 },
//    { politician: 4, district: 1 },
//    { politician: 5, district: 1 },
//    { politician: 6, district: 1 },
//    { politician: 7, district: 1 },
//    { politician: 8, district: 1 },
//    { politician: 9, district: 1 },
//    { politician: 10, district: 1 },
//    { politician: 11, district: 1 },
//    { politician: 12, district: 1 },
//    { politician: 13, district: 1 },
//    { politician: 14, district: 1 },
//    { politician: 15, district: 1 },
//    { politician: 16, district: 1 },
//    { politician: 17, district: 1 },
//    { politician: 18, district: 1 },
//
//
//]).then(function(result){
//    console.log(result);
//})
//////
////
//
//
////
//Topics.findOne({
//    where: { background: 55 },
//    include: [
//        {
//            model: Backgrounds,
//            required: false
//            //where: { id: 55 },
//            //attributes: ['description'],
//        }
//    ]
//});

//Backgrounds.findOne({
//    where: { id : 55 },
//    include: [
//        {
//            model: Topics,
//            required: false
//        }
//    ]
//}).then(function(result){
//    console.log(result);
//})
//
//
//for (var i = 2; i < 5; i++){
//    Answers.create({
//        background: 37,
//        type: 'concurrence',
//        question: 168 + i,
//        settings: 6789,
//        concurrence: 6,
//        importance: 4
//    }).then(function(result){
//        console.log(result);
//    })
//
//}

// //RANKING QUESTION fixtures
//for (var i = 0; i < 3; i++){
//    Questions.create({
//        type: 'ranking',
//        background: 37,
//        description: 'test' + i,
//        viewOrder: 10 + i
//    })
//};

//
// CONCURRENCE ANSWER fixtures
//for (var i = 0; i < 5; i++){
//    Answers.create({
//        type: 'concurrence',
//        question: 167 + i,
//        settings: 1,
//        background: 37,
//        importance: i,
//        concurrence: 7 - i,
//        comment: "yes"
//    })
//};

//
// RANKING ANSWER fixtures
//for (var i = 0; i < 3; i++) {
//    Answers.create({
//        type: 'ranking',
//        settings: 1,
//        importance: i,
//        comment: 'yes',
//        question: 953+i,
//        background: 37
//    })
//}
//
// RANKING ITEM FIXTURES question & answer.
//for (var i = 0; i < 3; i++){
//
//    var rando3 = generateName();
//    var rando1 = generateName();
//    var rando2 = generateName();

    //var QuestionItems = [
    //    { question: 953 + i, item: rando1 },
    //    { question: 953 + i, item: rando2 },
    //    { question: 953 + i, item: rando3 }
    //];
//
//    var AnswerItems = [
//        { question: 953 + i, item: rando1, answer: 6 + i, settings: 1, itemId: 55+(i*i), item: rando1, rank: 1, background:37 },
//        { question: 953 + i, item: rando2, answer: 6 + i, settings: 1, itemId: 23232+(i*i), item: rando2, rank: 2, background: 37 },
//        { question: 953 + i, item: rando3, answer: 6 + i, settings: 1, itemId: 234+(i*i), item: rando3, rank: 3, background:37 }
//    ];
//
//    RankingQuestionItems.bulkCreate(QuestionItems).then(function(result){
//        console.log(result);
//    });
//    RankingAnswerItems.bulkCreate(AnswerItems).then(function(result){
//        console.log(result);
//    })
}

////
//Backgrounds.find({
//    where: {id: 37 },
//    include: {
//        model: Answers
//    }
//}).then(function(result){
//    console.log(result);
//});
////

//
//Users.find({
//    where: {id: 1},
//    include: {
//        model: Districts, as: 'Counties'
//    }
//}).then(function(result){
//    console.log(result);
//});
//
//

//groups fixtures
//
//var randomcategory1 = generateName();
//var randomcategory2 = generateName();
//
//for (var i = 0; i < 10; i++) {
//
//    var random = generateName(),
//        random2 = generateName(),
//        category;
//    if (i %2 === 0){
//        category = randomcategory1;
//    } else{
//        category = randomcategory2;
//    }
//
//    Groups.create({
//        name: random,
//        description: random2,
//        category: category
//    }).then(function(result){
//        console.log(result);
//    })
//
//}
//
// User to group fixture
//UserGroups.bulkCreate([
//
//    { user: 19, group: 1 },
//    { user: 19, group: 2 },
//    { user: 19, group: 3 },
//    { user: 19, group: 4 }
//
//]).then(function(result){
//    console.log(result);
//})
//
//

// Parties fixture
//for (var i = 0; i < 5; i++) {
//
//    var random = generateName();
//
//    Parties.create({
//        name: random,
//    }).then(function(result){
//        console.log(result);
//    })
//
//};
//


// User to group fixture
//UserParties.bulkCreate([
//
//    { settings: 19, party: 1 },
//    { settings: 19, party: 2 },
//
//]).then(function(result){
//    console.log(result);
//});

//
//Users.find({
//    where: { id: 19 },
//    include: { model: Parties, as: 'Parties' }
//}).then(function(result){
//    console.log(result);
//});

//var createTheseGroups = [{ user: 19, group: 1},{ user: 19, group: 2},{ user: 19, group: 3},{ user: 19, group: 4},{ user: 19, group: 6}];
//
//_.map(req.body.createGroups, function(key){
//return { user: req.params.userId, group: key };
//});
//UserGroups.bulkCreate(createTheseGroups).then(function(result){
//    console.log(result);
//})
//

