var models = require('../models');
var Parties = models.Parties;
var _ = require('lodash');


function getParties(req, res){

    Parties.findAll().then(function(results){
        res.send(results);
    })

};
module.exports = {
    getParties: getParties
};