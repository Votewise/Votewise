var models = require('../models');
var Backgrounds = models.Backgrounds;
var Answers = models.Answers;
var RankingAnswerItems = models.RankingAnswerItems;
var Questions = models.Questions;
var _ = require('lodash');

function getAllAnswers(req,res){

    var lineup = req.query.lineup.split(",");

    //var response = {};
    Backgrounds.findAll({
        include: [
            {   model: Answers,
                where: { user: { $in: lineup } },
                include: [{ model: RankingAnswerItems }, { model: Questions, attributes: [ 'description' ] }],
                attributes: [ 'type', 'id', 'question', 'user', 'concurrence', 'comment', 'importance'  ]
            }
        ]
    }).then(function(result){
        //response.backgrounds = result;
        res.send(result);
    });

};

module.exports = {
    getAllAnswers: getAllAnswers
};