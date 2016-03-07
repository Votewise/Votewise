var models = require('../models');
var Backgrounds = models.backgrounds;
var Answers = models.answers;
var RankingAnswerItems = models.rankingAnswerItems;
var Questions = models.questions;
var _ = require('lodash');

function getAllAnswers(req,res){

    var lineup = req.query.lineup.split(",");
    console.log("ALL ANSWERS IS CALLED WITH LINEUP PARAM: ", lineup);
    //var response = {};
    Backgrounds.findAll({
        include: [
            {   model: Answers,
                where: { userId: { $in: lineup } },
                include: [{ model: RankingAnswerItems }, { model: Questions, attributes: [ 'description' ] }],
                attributes: [ 'type', 'id', 'questionId', 'userId', 'concurrence', 'comment', 'importance'  ]
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