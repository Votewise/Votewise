var models = require('../models');
var Answers = models.Answers;
var Users = models.Users;
var Politicians = models.Politicians;
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