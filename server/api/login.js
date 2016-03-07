var models = require('../models');
var Users = models.users;
var Answers = models.answers;
var UserGroups = models.userGroups;
var Groups = models.groups;
var Parties = models.parties;
var UserParties = models.userParties;
var sequelize = models.sequelize;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

function login(req, res){

	console.log("REQ", req.body);

	Users.find({
		where: {
			userName: req.body.userName,
		},
		attributes: { exclude: [ 'createdBy', 'updatedBy', 'createdAt', 'updatedAt' ] },
		include: [
			{ model: Groups, as: 'Groups', attributes: [ 'id', 'name', 'description', 'category' ] },
			{ model: Parties, as: 'Parties', attributes: [ 'name' ]  }
		]

	}).then(function(result){

		if (result){

			if (result.verifyPassword(req.body.password)) {

				var token = jwt.sign({
					userName: req.body.userName,
					exp: 10800000,
				}, 'noTelling');
				var userInfo = result.dataValues;
				userInfo.Groups = _(userInfo.Groups).groupBy('category').values().value();

				var jsonResponse = {
					token: token,
					userId: result.dataValues.id,
					userInfo: userInfo
				};

				res.status(200).json(jsonResponse);

			} else {
				throw new Error("Wrong Password");
			}

		} else {
			throw new Error("User Not Found");
		}



	}).catch(function(error){

		if (error.message === "Wrong Password"){
			res.status(400).send(error.message);
		} else if (error.message === "User Not Found"){
			res.status(400).send(error.message);
		}

	})
}

module.exports = {
	login: login
};