'use strict';
var servicename = 'RankingAnswer';

module.exports = function(app) {

    var dependencies = ['$resource', 'URLS'];

    function service($resource, URLS) {
        return $resource(URLS.BASE_API + "rankingAnswer", null,
            { 'update' : { method: 'PUT' } } );
    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};