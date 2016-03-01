'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute', 'myApp.version'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider

    	  .when('/home', {
        templateUrl: 'issueViews/main.html',
        controller: 'NavigatorCtrl'
      })

      .when('/comparisons', {
        templateUrl: 'comparisonPages/comparison.html',
        controller: 'ComparisonCtrl'
      })

      .when('/login', {
        templateUrl: 'loginRegister/login.html',
        controller: 'AuthCtrl'
      })

      .when('/register', {
        templateUrl: 'loginRegister/register.html',
        controller: 'AuthCtrl'
      })

      .when('/civilLiberties', {
        templateUrl: 'issueViews/category.html',
        controller: 'CivilLibertiesCtrl'
      })

      .when('/crimeAndPunishment', {
        templateUrl: 'issueViews/category.html',
        controller: 'CrimeAndPunishmentCtrl'
      })

      .when('/education', {
        templateUrl: 'issueViews/category.html',
        controller: 'EducationCtrl'
      })

      .when('/energy', {
        templateUrl: 'issueViews/category.html',
        controller: 'EnergyCtrl'
      })

      .when('/environment', {
        templateUrl: 'issueViews/category.html',
        controller: 'EnvironmentCtrl'
      })

      .when('/gunControl', {
        templateUrl: 'issueViews/category.html',
        controller: 'GunControlCtrl'
      })

      .when('/healthSafety', {
        templateUrl: 'issueViews/category.html',
        controller: 'HealthSafetyCtrl'
      })

      .when('/immigration', {
        templateUrl: 'issueViews/category.html',
        controller: 'ImmigrationCtrl'
      })

      .when('/infrastructure', {
        templateUrl: 'issueViews/category.html',
        controller: 'InfrastructureCtrl'
      })

      .when('/internationalRelations', {
        templateUrl: 'issueViews/category.html',
        controller: 'InternationalRelationsCtrl'
      })

      .when('/jobsEconomy', {
        templateUrl: 'issueViews/category.html',
        controller: 'JobsEconomyCtrl'
      })

      .when('/qualityOfLife', {
        templateUrl: 'issueViews/category.html',
        controller: 'QualityOfLifeCtrl'
      })

      .when('/reproduction', {
        templateUrl: 'issueViews/category.html',
        controller: 'ReproductionCtrl'
      })

      .when('/taxes', {
        templateUrl: 'issueViews/category.html',
        controller: 'TaxesCtrl'
      })

      .when('/socialServices', {
        templateUrl: 'issueViews/category.html',
        controller: 'SocialServicesCtrl'
      })

      .when('/questions', {
        templateUrl: 'issueViews/questionSection.html',
        controller: 'QuestionsCtrl'
      });

  $routeProvider.otherwise({redirectTo: '/home'});
}])


app.run(function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Data.get('session').then(function (results) {
                if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login') {
 
                    } else {
                        $location.path("/login");
                    }
                }
            });
        });
    });