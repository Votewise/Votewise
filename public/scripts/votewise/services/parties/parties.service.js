'use strict';
var servicename = 'Parties';

module.exports = function(app) {

    var dependencies = ['$resource', 'URLS'];

    function service($resource, URLS) {
        return $resource(URLS.BASE_API + "parties/");
    }

    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};