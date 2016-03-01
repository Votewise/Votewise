'use strict';
var servicename = 'PoliticianLibrary';

module.exports = function(app) {

    var dependencies = ['$resource', 'URLS'];

    function service($resource, URLS) {

        return $resource(URLS.BASE_API + "politicianLibrary"

            //{ whereProp: '@whereProp', whereVal: '@whereVal' }

        );

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};