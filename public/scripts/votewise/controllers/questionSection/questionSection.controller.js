'use strict';
var controllername = 'questionSection';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope'];

    function controller($scope) {
        var vm = this;
        vm.controllername = fullname;
        $scope.store.name = fullname;
        //console.log(fullname, $scope.$parent);

        var activate = function() {

        };
        activate();
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
