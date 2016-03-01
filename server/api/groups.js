var models = require('../models');
var Groups = models.Groups;
var _ = require('lodash');


function getByCategory(req, res){

    if (req.params.category === 'categories'){

    }

    Groups.findAll({
        where: {
            category: req.params.category
        }
    }).then(function(result){
        res.send(result);
    })

}

module.exports = {
    getByCategory: getByCategory
};