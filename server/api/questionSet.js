var models = require('../models');
var Backgrounds = models.backgrounds;
var Questions = models.questions;
var Answers = models.answers;
var RankingAnswerItems = models.rankingAnswerItems;
var RankingQuestionItems = models.rankingQuestionItems;

var _ = require('lodash');

function getQuestionSet(req, res) {

    var response = {};
    console.log("CALLING QUESTION SET");

    Backgrounds.findOne({

        where: { id: req.params.background },
        attributes: ['shortdescription', 'description'],
        include: [

            { model: Questions, include: RankingQuestionItems },
            { model: Answers,
                where: { userId: req.params.user },
                include: { model: RankingAnswerItems, order: ['rank', 'ASC'] },
                required: false }

        ]

    }).then(function(result){

        console.log(result)

        res.send(result);

    });


};


module.exports = {
    getQuestionSet: getQuestionSet
};