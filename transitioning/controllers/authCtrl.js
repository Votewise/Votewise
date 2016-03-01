app.controller('AuthCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    console.log("inside AuthCtrl");
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        console.log("doLogin clicked with email: " + $scope.login.email + " and password: " + $scope.login.password);
        // Data.post('login', {
        //     customer: customer
        // }).then(function (results) {
        //     Data.toast(results);
        //     if (results.status == "success") {
        //         $location.path('dashboard');
        //     }
        // });
    };
    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (customer) {
        console.log("Signup clicked with parameters: " + JSON.stringify($scope.signup));
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    }

    $scope.setAccountType = function(type){
        console.log("$scope.setAccountType activated");
        console.log(type);
        if (Number(type) == 1){
            $scope.signup.type = 'voter';
            console.log($scope.signup.type);
        } else if (Number(type) == 2){
            $scope.signup.type = 'politician';
            console.log($scope.signup.type);
        } else if (Number(type) == 3){
            $scope.signup.type = "interestGroup"
            console.log($scope.signup.type);
        } else if (Number(type) == 4){
            $scope.signup.type = "media";
            console.log($scope.signup.type);
        }
    }
});