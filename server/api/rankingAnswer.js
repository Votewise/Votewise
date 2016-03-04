var models = require('../models');
var RankingAnswerItems = models.rankingAnswerItems;
var Answers = models.answers;
var Users = models.users;
var Politicians = models.politicians;
var Promise = require('bluebird');
var _ = require('lodash');

function postRankingAnswer(req, res){

    Users.findOne({
        where: {
            id: req.body.user
        },
        include: Politicians
    }).then(function(user){
        console.log(user);
        return [user.increment('answerCount', {by:1}), user.Politician.increment('answerCount', {by:1})]
    });

    Answers.create({
        question: req.body.question,
        type: req.body.type,
        background: req.body.background,
        user: req.body.user,
        importance: req.body.importance,
        comment: req.body.comment
    }).then(function(result){

        var answerItems = _.map(req.body.items, function(key){
            var object = {};
            object.answer = result.dataValues.id;
            object.background = req.body.background;
            object.user = req.body.user;
            object.question = req.body.question;
            object.itemId = key.itemId;
            object.item = key.item;
            object.rank = key.rank;
            return object;

        });
        return RankingAnswerItems.bulkCreate(answerItems)

    }).then(function(result){
        var response = {};
        response.result = result;
        res.send(response);
    });

};

function putRankingAnswer(req, res){

    Answers.upsert({
        id: req.body.id,
        type: req.body.type,
        background: req.body.background,
        question: req.body.question,
        user: req.body.user,
        importance: req.body.importance,
        comment: req.body.comment
    }).then(function(result){

        console.log(result);

        var updateItemPromises = _.map(req.body.items, function(key){

            //var object = {};
            //object.answer = req.body.id;
            //object.background = req.body.background;
            //object.settings = req.body.settings;
            //object.question = req.body.question;
            //object.itemId = key.itemId;
            //object.item = key.item;
            //object.rank = key.rank;
            //object.id = key.id;
            //return object
            console.log("KEY", key);

            return RankingAnswerItems.upsert({
                answer: req.body.id,
                id: key.id,
                rank: key.rank,
                item: key.item,
                itemId: key.itemId,
                user: req.body.user,
                question: req.body.question,
                background: req.body.background,
            })

        });
        return Promise.all(updateItemPromises)

    }).then(function(result){
        res.send(result);
    });


};

module.exports = {
    postRankingAnswer: postRankingAnswer,
    putRankingAnswer: putRankingAnswer
}