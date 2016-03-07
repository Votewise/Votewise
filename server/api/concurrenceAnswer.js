var models = require('../models');
var Answers = models.answers;
var Users = models.users;
var Politicians = models.politicians;
var _ = require('lodash');

function postConcurrenceAnswer(req, res){

    Users.findOne({
        where: {
            id: req.body.userId
        },
        include: Politicians
    }).then(function(user){
        console.log(user);
        if (user.dataValues.type === 'voter'){
            return user.increment('answerCount', {by:1})
        } else if (user.dataValues.type === 'politician'){
            return [user.increment('answerCount', {by:1}), user.politician.increment('answerCount', {by:1})]
        }
    });

    Answers.create(req.body).then(function(results){
        res.send(results);
    });

};

function putConcurrenceAnswer(req, res){

    console.log("PUT CONCURRENCE ANSWER", req.body);

    Answers.upsert(req.body).then(function(results){
        res.send(results);
    });

}

module.exports = {
    postConcurrenceAnswer: postConcurrenceAnswer,
    putConcurrenceAnswer: putConcurrenceAnswer,
};