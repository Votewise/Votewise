var models = require('../models');
var Answers = models.Answers;
var Users = models.Users;
var Politicians = models.Politicians;
var _ = require('lodash');

function postConcurrenceAnswer(req, res){

    Users.findOne({
        where: {
            id: req.body.user
        },
        include: Politicians
    }).then(function(user){
        console.log(user);
        if (user.dataValues.type === 'voter'){
            return user.increment('answerCount', {by:1})
        } else if (user.dataValues.type === 'politician'){
            return [user.increment('answerCount', {by:1}), user.Politician.increment('answerCount', {by:1})]
        }
    });

    Answers.create(req.body).then(function(results){
        res.send(results);
    });

};

function putConcurrenceAnswer(req, res){

    Answers.upsert(req.body).then(function(results){
        res.send(results);
    });

}

module.exports = {
    postConcurrenceAnswer: postConcurrenceAnswer,
    putConcurrenceAnswer: putConcurrenceAnswer,
};