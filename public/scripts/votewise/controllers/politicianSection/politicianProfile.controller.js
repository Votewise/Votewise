'use strict';
var controllername = 'politicianProfile';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope'];

    function controller($scope) {
        $scope.store = $scope.store || {};
        var vm = this;
        vm.controllername = fullname;

        var activate = function() {

        };
        activate();
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
