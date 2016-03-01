'use strict';
var controllername = 'registerModal';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [
        '$scope',
        '$rootScope',
        '$state',
        '$uibModalInstance',
        'main.votewise.User'
    ];

    function controller($scope, $rootScope, $state, $uibModalInstance, User) {
        var vm = this;
        vm.controllername = fullname;
        $scope.name = fullname;
        $scope.store = $scope.store || {}; 

        console.log("hello from register modal ctrl");

        var activate = function() {

        };
        activate();

        $scope.proceedToTopics = function(bool){

            if (bool){

                var user = new User();

                if ($scope.store.city) { user.city = $scope.store.city }
                if ($scope.store.county) { user.county = $scope.store.county }
                if ($scope.store.state) { user.state = $scope.store.state }
                if ($scope.store.district) { user.district = $scope.store.district }
                user.id = $rootScope.user;
                user.type = $rootScope.type;
                user.userName = $scope.store.userInfo.userName;
                console.log($scope.store);

                User.update(user, function(result){
                    console.log(result);
                    $scope.store.userInfo = {};
                    //if (result.city) { $scope.store.userInfo[city] = result.city }
                    //if (result.county) { $scope.store.userInfo[county] = result.county }
                    //if (result.state) { $scope.store.userInfo[state] = result.state }
                    //if (result.district) { $scope.store.userInfo[district] = result.district }
                    $state.go('main.topics');
                    $uibModalInstance.close();
                })

            } else {

                $state.go('main.topics');
                $uibModalInstance.close();

            }
        }
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
