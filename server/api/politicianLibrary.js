var models = require('../models');
var Districts = models.Districts;
var PoliticianDistricts = models.PoliticianDistricts;
var Politicians = models.Politicians;
var _ = require('lodash');

function getPoliticianLibrary(req,res){
    var whereParam = {};

    whereParam[req.params.whereprop] = req.params.whereval;
    var response = {}

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

        return Districts.findAll({
            where: {
                county: 'Malachiteglass Foe',
            },
            include: {
                model: Politicians,
                as: 'Politicians'
            }
        })
    }).then(function(result){
        console.log("result: ", result);
        response.county = result;

        return Districts.findAll({
            where: {
                state: 'PA'
            },
            include: {
                model: Politicians,
                as: 'Politicians'
            }
        })
    }).then(function(result){
        response.state = result;
        res.send(response)
    });

}

module.exports = {
    getPoliticianLibrary: getPoliticianLibrary
};