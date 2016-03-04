var models = require('../models');
var Answers = models.answers;
var Users = models.users;
var Politicians = models.politicians;
var _ = require('lodash');

function getPollingData(req,res){

    Answers.findAll({
        where: {

        },
        include: {
            model: Questions, attributes: [ 'description' ]
        }
    })

}

module.exports = {
    getPollingData: getPollingData
};