var controllername = 'userAuth';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope',
        '$rootScope',
        '$state',
        '$uibModal',
        'main.votewise.Login',
        'main.votewise.Register',
        'main.votewise.PoliticianLibrary',
        'main.d3.D3'
    ];

    function controller($scope, $rootScope, $state, $uibModal, Login, Register, PoliticianLibrary, D3) {
        var vm = this;
        vm.controllername = fullname;
        $scope.store = $scope.store || {};
        $scope.name = fullname;
        $scope.loginCredentials = {
            userName: '',
            password: ''
        };
        $scope.registerCredentials = {
            userName: '',
            password: '',
            passwordMatch: '',
            email: '',
            emailMatch: ''
        };

        var activate = function() {
        };
        activate();

        $scope.moveToRegister = function(type) {
            $rootScope.type = type;
            $state.go('main.register');
        };

        $scope.register = function (registerCredentials) {

            var register = new Register();

            register.type = $rootScope.type;
            register.userName = registerCredentials.userName;
            register.password = registerCredentials.password;
            register.email = registerCredentials.email;
            register.userLevel = "basic";
            register.answerCount = 0;

            Register.save(register, function(result){

                $scope.store.hideMainHeader = $scope.store.hideMainHeader === true ? false : true;
                $rootScope.testUser = result.userId;
                $scope.store.user = result.userId;
                $scope.store.userInfo = result.userInfo;

                if($rootScope.type === 'voter'){
                    $scope.voterRegisterModal('lg');
                } else if ($rootScope.type === 'politician'){
                    $state.go('main.topics');
                }

            });

        };

        $scope.voterRegisterModal = function (size) {

            var modalInstance = $uibModal.open({
                animation: false,
                template: '<div>'+
                                '<div class="form-group" >'+
                                '<input class="form-control" ng-model="store.state" placeholder="State" >'+
                                '</div>'+
                                '<div class="form-group" >'+
                                '<input class="form-control" ng-model="store.city" placeholder="City" >'+
                                '</div>'+
                                '<div class="form-group" >'+
                                '<input class="form-control" ng-model="store.county" placeholder="County" >'+
                                '</div>'+
                                '<div class="form-group" >'+
                                '<input class="form-control" ng-model="store.district" placeholder="District" >'+
                                '</div>'+
                                '<div>'+
                                '<button class="btn btn-primary" ng-click="proceedToTopics(true);" >'+
                                'Submit Information'+
                                '</button>'+
                                '<button class="btn btn-primary" ng-click="proceedToTopics(false);" >'+
                                'skip'+
                                '</button>'+
                                '</div>'+
                            '</div>',
                controller: 'main.votewise.registerModal',
                size: size,
                scope: $scope,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.moveOnWithoutRegister = function(isElection){

            if (isElection){

                console.log($scope);
                PoliticianLibrary.get( { whereProp: 'city', whereVal: 'Philadelphia' }, function(result){

                    $scope.store.politicianLibrary = result;
                    $scope.store.city = $scope.address;
                    $scope.store.county = $scope.county;
                    $scope.store.state = $scope.state;


                    $scope.store.hideMainHeader = $scope.store.hideMainHeader === true ? false : true;
                    $state.go('main.politicianLibrary');

                });

            } else if (!isElection){
                console.log("move on to questions");
                $rootScope.user = "browseQuestions";
                $state.go('main.topics')

            }
        };

        $scope.toggleUpcomingElection = function(){
            console.log($rootScope.upcomingElection);

            $rootScope.upcomingElection = $rootScope.upcomingElection === true ? false : true;
            console.log($rootScope.upcomingElection);

        };

        $scope.moveToLogin = function() {

            $state.go('main.login');

        };

        $scope.login = function(loginCredentials) {

            var login = new Login();
            login.userName = loginCredentials.userName;
            login.password = loginCredentials.password;
            Login.save(login, function(result){

                $scope.store.userInfo = result.userInfo;
                $scope.store.hideMainHeader = $scope.store.hideMainHeader === true ? false : true;
                $rootScope.testUser = result.userId;
                $scope.store.user = result.userId;
                $state.go('main.topics');

            }, function(error){
                if (error.data === "Wrong Password"){
                    alert("Wrong password, try again.");
                } else if (error.data === "User Not Found"){
                    alert("User not found.");
                }
            });

        };

    }



    controller.$inject = deps;
    app.controller(fullname, controller);
};