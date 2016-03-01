'use strict';
var servicename = 'Groups';

module.exports = function(app) {

    var dependencies = ['$resource', 'URLS'];

    function service($resource, URLS) {
        return $resource(URLS.BASE_API + "groups/:category", { category: '@category' });
    }

    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};