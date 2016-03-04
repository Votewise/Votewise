var express = require('express');
var models = require('../models');
var Topics = models.topics;
var _ = require('lodash');


function getTopicTree(req, res){

    var response = {};

    Topics.findAll({
        where: {description: req.params.topic},
        include: [
            {
                model: Topics,
                as: 'subtopics',
                include: { model: Topics, as: 'subtopics' }
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