require('angular-ui-router');
require('angular-resource');
require('ngStorage');
require('angularjs-slider');
require('ng-draggable');
require('angular-ui-bootstrap'); // corresponds to 'ui.bootstrap' in angular.module dependencies
require('d3');
//require('angular-xeditable');
//require('font-awesome');

var modulename = 'votewise';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router',
        'ngResource',
        'ngStorage',
        'ui.bootstrap',
        'ngDraggable',
        'rzModule',
        'main.d3',
        'xeditable',
            ]);

    // inject:folders start
require('./controllers')(app);
require('./directives')(app);
require('./services')(app);
    // inject:folders end

    // Specifically including auth interceptor service here so it can be pushed onto the $httpProvider below.
    var AuthInterceptor = require('./services/http/authInterceptor.service.js');

    app.constant('URLS', { BASE_API: 'http://localhost:3000/' });
    app.service('AuthInterceptor', AuthInterceptor);

    app.directive('match', function($parse) {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                scope.$watch(function() {
                    return $parse(attrs.match)(scope) === ctrl.$modelValue;
                }, function(currentValue) {
                    ctrl.$setValidity('mismatch', currentValue);
                });
            }
        };
    });


    var configRoutesDeps = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
    var configRoutes = function($stateProvider, $urlRouterProvider, $httpProvider) {


        $httpProvider.interceptors.push('AuthInterceptor');

        $urlRouterProvider.otherwise('main/splash');
        $stateProvider

        .state('splash', {
            url: '/splash',
            parent: 'main',
            template: require('./views/partials/loginRegisterSplash/splash.html'),
            controller: 'main.votewise.userAuth'
        })

        .state('main.login', {
            url: '/login',
            parent: 'main',
            template: require('./views/partials/loginRegisterSplash/login.html'),
            controller: 'main.votewise.userAuth'
        })

        .state('main.register', {
            url: '/register',
            parent: 'main',
            template: require('./views/partials/loginRegisterSplash/register.html'),
            controller: 'main.votewise.userAuth'
        })

        .state('main', {
            url: '/main',
            template: require('./views/main.html'),
            controller: 'main.votewise.main'
        })

        .state('main.topic', {
            url: '/topic',
            parent: 'main',
            template: require('./views/partials/topicNavigation/topic.html'),
            controller: 'main.votewise.topics'
        })

        .state('main.topics', {
            url: '/topics',
            parent: 'main',
            template: require('./views/partials/topicNavigation/topics.html'),
            controller: 'main.votewise.topics'
        })

        .state('main.questionSection', {

            url: '/questionSection',
            parent: 'main',
            abstract: true,
            template: require('./views/partials/questionSection/questionSection.html'),
            controller: 'main.votewise.questionSection'
        })

        .state('main.questionSection.questionSet', {
            url: '/question',
            parent: 'main',
            template: require('./views/partials/questionSection/questionSet.html'),
            controller: 'main.votewise.questionSet'
        })

        .state('main.pollingLibrary', {
            url: '/polling',
            parent: 'main',
            template: require('./views/partials/politicianSection/pollingLibrary.html'),
            controller: 'main.votewise.pollingLibrary'
        })

        .state('main.politicianLibrary', {
            url: '/library',
            parent: 'main',
            template: require('./views/partials/politicianSection/politicianLibrary.html'),
            controller: 'main.votewise.politicianLibrary'
        })

        .state('main.politicianProfile', {
            url: '/profile',
            parent: 'main',
            template: require('./views/partials/politicianSection/politicianProfile.html'),
            controller: 'main.votewise.politicianProfile'
        })

        .state('main.politicianList', {
            url: '/list',
            parent: 'main',
            template: require('./views/partials/politicianSection/politicianList.html'),
            controller: 'main.votewise.politicianList'
        })

        .state('main.politicianComparison', {
            url: '/comparison',
            parent: 'main',
            template: require('./views/partials/politicianSection/politicianComparison.html'),
            controller: 'main.votewise.politicianComparison'
        })

        .state('main.settings', {
            url: '/settings',
            parent: 'main',
            template: require('./views/partials/settings/settings.html'),
            controller: 'main.votewise.settings'
        })

    };

    var runDeps = ['$rootScope', 'editableOptions'];
    var run = function($rootScope, editableOptions){

        editableOptions.theme = 'bs3';
        $rootScope.upcomingElection = true;

    };
    run.$inject = runDeps;
    configRoutes.$inject = configRoutesDeps;
    app.config(configRoutes).run(run);

    return app;
};