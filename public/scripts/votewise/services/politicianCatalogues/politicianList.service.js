'use strict';
var servicename = 'PoliticianList';

module.exports = function(app) {

    var dependencies = ['$resource', 'URLS'];

    function service($resource, URLS) {

        return $resource(URLS.BASE_API + "politicianList", null,
            { 'update' : { method: 'PUT' } } );

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};