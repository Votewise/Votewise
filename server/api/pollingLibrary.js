var models = require("../models");
var Questions = models.questions;
var Answers = models.answers;

function pollByBackground(req, res){

    Backgrounds.findAll({
        where: { id: { $in: req.body.ids } },
        include: [
            {   model: Answers,
                include: [{ model: RankingAnswerItems },
                    { model: Questions, attributes: [ 'description' ] },
                    { model: Users, where: { type: 'voter' } }
                ],
                attributes: [ 'type', 'id', 'question', 'user', 'concurrence', 'comment', 'importance'  ]
            }
        ]
    }).then(function(result){
        //response.backgrounds = result;
        res.send(result);
    });

};

module.exports = {
    pollByBackground: pollByBackground
};