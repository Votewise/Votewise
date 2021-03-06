var express = require('express');
var models = require('../models');
var Topics = models.Topics;
var _ = require('lodash');


function getTopicTree(req, res){

    var response = {};

    Topics.findAll({
        where: {description: req.params.topic},
        include: [
            {
                model: Topics,
                as: 'Subtopics',
                include: { model: Topics, as: 'Subtopics' }
            }
        ]
    }).then(function(result){

        console.log(result);

        var response = { topicCascade: result };

        res.send(response);

    });

}

module.exports = {
    getTopicTree: getTopicTree
};