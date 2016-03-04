'use strict';
var servicename = 'QuestionSet';

module.exports = function(app) {

    var dependencies = ['$resource', 'URLS'];

    function service($resource, URLS) {
        return $resource(URLS.BASE_API + "questionSet/:backgroundId/:userId",
            { backgroundId: '@backgroundId', userId: '@userId' } );
    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};