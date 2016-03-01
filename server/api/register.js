var models = require('../models');
var Users = models.Users;
var _ = require('lodash');
var jwt = require('jsonwebtoken');

function register(req,res){

    Users.create({
        passwordHash: req.body.password,
        userName: req.body.userName,
        email: req.body.email,
        type: req.body.type,
        answerCount: req.body.answerCount
    }).then(function(result){

        var token = jwt.sign({ foo: 'bar' }, require('../config').jwtSecret);
        var jsonResponse = {
            token: token,
            userId: result.dataValues.id,
            userInfo: result.dataValues
        };
        res.status(200).json(jsonResponse);
    })

};

module.exports = {
    register: register
};