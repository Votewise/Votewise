'use strict';
var servicename = 'AllAnswers';

module.exports = function(app) {

    var dependencies = ['$resource', 'URLS'];

    function service($resource, URLS) {

        return $resource(URLS.BASE_API + 'allAnswers');

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};