'use strict';
var controllername = 'questionSet';
var _ = require('lodash');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [
        '$scope',
        '$state',
        'main.votewise.ConcurrenceAnswer',
        'main.votewise.RankingAnswer'
        ];

    function controller($scope, $state, ConcurrenceAnswer, RankingAnswer) {
        var vm = this;
        vm.controllername = fullname;
        $scope.name = fullname;
        $scope.store = $scope.store || {};
        console.log(fullname);
        $scope.counter = 0;
        $scope.totalQuestions = $scope.store.questionSet.length;
        $scope.showBackground = true;
        $scope.sliderOptions = {
            from: 1,
            to: 5,
            scale: [1,2,3,4,5],
            css: {
                background: {"background-color": "silver"},
                before: {"background-color": "purple"},// zone before default value
                default: {"background-color": "white"}, // default value: 1px
                after: {"background-color": "green"},  // zone after default value
                pointer: {"background-color": "red"},   // circle pointer
                range: {"background-color": "red"} // use it if double value
            }
        };

        $scope.$on('$destroy', function(){
            delete $scope.store.question;
            delete $scope.store.questionSet;
            delete $scope.store.background;
            delete $scope.store.backgroundDescription;
            delete $scope.store.answer;
            delete $scope.store.items;
        });

        var activate = function() {
            $scope.counter = 0;
            if (!$scope.store.questionSet[$scope.counter].answer) { $scope.store.questionSet[$scope.counter].answer = {} }
            $scope.store.question = $scope.store.questionSet[$scope.counter];
            $scope.store.answer = $scope.store.question.answer || {};
            var sortThese = $scope.store.answer.RankingAnswerItems || $scope.store.question.RankingQuestionItems || {};
            $scope.store.items = _.orderBy(sortThese, 'rank', 'asc');
        };
        activate();

        $scope.startQuestions = function(){
            $scope.counter = 0;
            $scope.store.question = $scope.store.questionSet[$scope.counter];
            $scope.store.answer = $scope.store.question.answer || {};
            $scope.showBackground = false;
            var sortThese = $scope.store.answer.RankingAnswerItems || $scope.store.question.RankingQuestionItems || {};
            $scope.store.items = _.orderBy(sortThese, 'rank', 'asc');
        };

        $scope.toggleBackground = function(){
            $scope.showBackground = !$scope.showBackground;
            console.log($scope.showBackground);
        };

        $scope.setConcurrence = function(concurrence){
            $scope.store.answer.concurrence = concurrence;
        };

        $scope.moveThroughQuestions = function(bool) {


            if ($scope.store.question.type === 'concurrence' && $scope.store.answer.id && bool) {

                var concurrenceAnswer = new ConcurrenceAnswer();

                concurrenceAnswer.user = $scope.store.user;
                concurrenceAnswer.question = $scope.store.question.id;
                concurrenceAnswer.background = $scope.store.question.background;
                concurrenceAnswer.importance = $scope.store.answer.importance;
                concurrenceAnswer.concurrence = $scope.store.answer.concurrence;
                concurrenceAnswer.comment = $scope.store.answer.comment;
                concurrenceAnswer.type = $scope.store.question.type;
                concurrenceAnswer.id = $scope.store.answer.id;

                console.log("put update answer");

                ConcurrenceAnswer.update(concurrenceAnswer, function (result) {

                    console.log(result);
                });

            } else if ($scope.store.question.type === 'concurrence' && bool) {

                console.log('post new answer');

                var concurrenceAnswer = new ConcurrenceAnswer();
                concurrenceAnswer.user = $scope.store.user;
                concurrenceAnswer.question = $scope.store.question.id;
                concurrenceAnswer.background = $scope.store.question.background;
                concurrenceAnswer.importance = $scope.store.answer.importance;
                concurrenceAnswer.concurrence = $scope.store.answer.concurrence;
                concurrenceAnswer.comment = $scope.store.answer.comment;
                concurrenceAnswer.type = 'concurrence';

                ConcurrenceAnswer.save(concurrenceAnswer, function (result) {

                    console.log(result);
                });

            } else if ($scope.store.question.type === 'ranking' && $scope.store.answer.id && bool) {

                var rankingAnswer = new RankingAnswer();
                rankingAnswer.id = $scope.store.answer.id;
                rankingAnswer.type = 'ranking';
                rankingAnswer.comment = $scope.store.answer.comment;
                rankingAnswer.user = $scope.store.user;
                rankingAnswer.question = $scope.store.question.id;
                rankingAnswer.background = $scope.store.question.background;
                rankingAnswer.importance = $scope.store.answer.importance;
                var rankedItems = _.map($scope.store.items, function (key, index) {
                    key.answer = $scope.store.answer.id;
                    key.rank = index + 1;
                    key.background = $scope.store.question.background;
                    key.question = $scope.store.question.id;
                    key.user = $scope.store.user;
                    return key
                });

                rankingAnswer.items = rankedItems;

                RankingAnswer.update(rankingAnswer, function (result) {
                    console.log("result from ranking answer save:", result);
                });

            } else if ($scope.store.question.type === 'ranking' && bool) {

                var rankingAnswer = new RankingAnswer();
                rankingAnswer.type = 'ranking';
                rankingAnswer.comment = $scope.store.answer.comment;
                rankingAnswer.user = $scope.store.user;
                rankingAnswer.question = $scope.store.question.id;
                rankingAnswer.background = $scope.store.question.background;
                rankingAnswer.importance = $scope.store.answer.importance;
                var rankedItems = _.map($scope.store.items, function (key, index) {
                    key.answer = $scope.store.answer.id;
                    key.rank = index + 1;
                    key.itemId = key.id;
                    key.background = $scope.store.question.background;
                    key.question = $scope.store.question.id;
                    key.user = $scope.store.user;
                    return key
                });

                rankingAnswer.items = rankedItems;

                RankingAnswer.save(rankingAnswer, function (result) {
                    console.log("result from ranking answer save:", result);
                });


            }

            if (bool) {
                $scope.counter += 1;
                if (!$scope.store.questionSet[$scope.counter].answer) { $scope.store.questionSet[$scope.counter].answer = {} }
                $scope.store.question = $scope.store.questionSet[$scope.counter];

                if ($scope.store.question) {
                    $scope.store.answer = $scope.store.question.answer || {};

                    var sortThese = $scope.store.answer.RankingAnswerItems || $scope.store.question.RankingQuestionItems || {};
                    $scope.store.items = _.orderBy(sortThese, 'rank', 'asc');

                } else {

                    delete $scope.store.question;
                    delete $scope.store.questionSet;
                    delete $scope.store.background;
                    delete $scope.store.backgroundDescription;
                    delete $scope.store.answer;
                    delete $scope.store.items;

                    $state.go('main.topic');

                };


            } else {
                $scope.counter -= 1;
                if (!$scope.store.questionSet[$scope.counter].answer) { $scope.store.questionSet[$scope.counter].answer = {} }
                $scope.store.question = $scope.store.questionSet[$scope.counter];
                $scope.store.answer = $scope.store.question.answer || {};
                var sortThese = $scope.store.answer.RankingAnswerItems || $scope.store.question.RankingQuestionItems || {};
            };

        };


        //manages the reordering of ranking question items
        $scope.onDropComplete = function (index, obj, evt) {
            var otherObj = $scope.store.items[index];
            var otherIndex = $scope.store.items.indexOf(obj);
            $scope.store.items[index] = obj;
            $scope.store.items[otherIndex] = otherObj;
        };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};