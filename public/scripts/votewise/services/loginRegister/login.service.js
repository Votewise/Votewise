'use strict';
var servicename = 'Login';

module.exports = function(app) {

    var dependencies = ['$resource', 'URLS'];

    function service($resource, URLS) {

        console.log("URLS", URLS);
        return $resource(URLS.BASE_API + "login");

    }

    service.$inject = dependencies;

    app.factory(app.name + '.' + servicename, service);
};