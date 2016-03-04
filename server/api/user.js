var models = require('../models');
var Users = models.users;
var UserGroups = models.userGroups;
var UserParties = models.userParties;
var _ = require('lodash');

function updateUser(req, res){

    console.log(req.body, req.params);

    if (req.body.createGroups){
        var createThese = _.map(req.body.createGroups, function(key){
            return { user: req.params.userId, group: key };
        });
        UserGroups.bulkCreate(createThese).then(function(result){
            console.log(result);
        })
    }

    if (req.body.createParties){
        console.log("createParties");
        var createThese = _.map(req.body.createParties, function(key){
            return { user: req.params.userId, party: key };
        });
        UserParties.bulkCreate(createThese).then(function(result){
            console.log(result);
        });
    }

    if (req.body.deleteGroups){
        UserGroups.destroy({
            where: { id: req.body.deleteGroups }
        }).then(function(result){
            console.log(result);
        });
    }

    if (req.body.deleteParties){
        UserParties.destroy({
            where: { id: req.body.deleteParties }
        }).then(function(result){
            console.log(result);
        });
    }

    if (req.body.updateSettings){

        Users.update(req.body.updateSettings,
            {
                where: {
                    id: req.params.userId
                }
            }
        ).then(function(result){
            var response = { result: result};
            res.send(response);
        });

    }


};


function getUser(req, res){

    Users.find({
        where: {
            id: req.params.user
        }
    }).then(function(result){
        res.send(result);
    });

}


module.exports = {
    updateUser: updateUser,
    getUser: getUser
};