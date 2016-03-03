//'use strict';
//var servicename = 'authInterceptor';
//
//module.exports = function($rootScope, $localStorage) {
//    var service = this;
//
//    service.request = function(config) {
//
//        if ($localStorage.token){
//            config.headers.authorization = "Bearer " + $localStorage.token;
//        }
//
//        return config;
//    };
//
//    service.response = function(response){
//
//        console.log(response);
//
//        if (response.data.token){
//            $localStorage.token = response.data.token;
//        }
//        if (response.data.userId){
//            $rootScope.user = response.data.userId;
//        }
//        console.log($localStorage.token);
//
//        return response;
//    };
//
//    service.responseError = function(response) {
//        console.log(response);
//        return response;
//    };
//};