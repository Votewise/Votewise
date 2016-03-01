'use strict';
var servicename = 'Register';

module.exports = function(app) {

    var dependencies = ['$resource', 'URLS'];

    function service($resource, URLS) {

        return $resource(URLS.BASE_API + "register");

    }

    service.$inject = dependencies;

    app.factory(app.name + '.' + servicename, service);
};