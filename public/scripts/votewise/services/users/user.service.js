'use strict';
var servicename = 'User';

module.exports = function(app) {

    var dependencies = ['$resource', 'URLS'];

    function service($resource, URLS) {

        return $resource(URLS.BASE_API + "settings/:userId",
            {userId: '@userId'},
            {'update': { method: 'PUT', params: {userId:'@userId'} } }
        );

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};