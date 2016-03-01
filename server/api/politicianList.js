var models = require('../models');
var PoliticianLists = models.PoliticianLists;
var Politicians = models.Politicians;
var PoliticianDistricts = models.PoliticianDistricts;
var Districts = models.Districts;

var _ = require('lodash');


function postPoliticianList(req,res){

    PoliticianLists.bulkCreate(req.body.list).then(function(result){
        res.send(result);
    });

};

function putPoliticianList(req,res){

    _.forEach(req.body.list, function(key){
        PoliticianLists.upsert(key);
    });

};

function getPoliticianList(req,res){

    PoliticianLists.findAll({
        where:{
            user: req.params.userId
        },
        include: {
            model: Politicians,
            include: {
                model: Districts,
                as: 'politiciansAndDistricts'
            }
        }
    }).then(function(result){
        res.send(result);
    });

};

module.exports = {
    postPoliticianList: postPoliticianList,
    putPoliticianList: putPoliticianList,
    getPoliticianList: getPoliticianList
};