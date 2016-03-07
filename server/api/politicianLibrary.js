var models = require('../models');
var Districts = models.districts;
var PoliticianDistricts = models.politicianDistricts;
var Politicians = models.politicians;
var _ = require('lodash');

function getPoliticianLibrary(req,res){

    var whereParam = {};
    whereParam[req.params.whereprop] = req.params.whereval;
    var response = {};

    Districts.findAll({
        where: {
            city: 'Philadelphia'
        },
        include: {
            model: Politicians,
            as: 'Politicians'
        }
    }).then(function(result){
        response.city = result;
        res.send(response)
        //console.log(result);
    });
}

module.exports = {
    getPoliticianLibrary: getPoliticianLibrary
};