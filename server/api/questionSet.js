var models = require('../models');
var Backgrounds = models.Backgrounds;
var Questions = models.Questions;
var Answers = models.Answers;
var RankingAnswerItems = models.RankingAnswerItems;
var RankingQuestionItems = models.RankingQuestionItems;

var _ = require('lodash');

function getQuestionSet(req, res) {

    var response = {};

    Backgrounds.findOne({

        where: { id: req.params.background },
        attributes: ['shortdescription', 'description'],
        include: [

            { model: Questions, include: RankingQuestionItems },
            { model: Answers,
                where: { user: req.params.user },
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