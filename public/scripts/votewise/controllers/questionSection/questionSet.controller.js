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

                concurrenceAnswer.userId = $scope.store.user;
                concurrenceAnswer.questionId = $scope.store.question.id;
                concurrenceAnswer.backgroundId = $scope.store.question.backgroundId;
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

                var concurrenceAnswer = new ConcurrenceAnswer();
                concurrenceAnswer.userId = $scope.store.user;
                concurrenceAnswer.questionId = $scope.store.question.id;
                concurrenceAnswer.backgroundId = $scope.store.question.backgroundId;
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
                rankingAnswer.userId = $scope.store.user;
                rankingAnswer.questionId = $scope.store.question.id;
                rankingAnswer.backgroundId = $scope.store.question.backgroundId;
                rankingAnswer.importance = $scope.store.answer.importance;
                var rankedItems = _.map($scope.store.items, function (key, index) {
                    key.answerId = $scope.store.answer.id;
                    key.rank = index + 1;
                    key.backgroundId = $scope.store.question.background;
                    key.questionId = $scope.store.question.id;
                    key.userId = $scope.store.user;
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
                rankingAnswer.userId = $scope.store.user;
                rankingAnswer.questionId = $scope.store.question.id;
                rankingAnswer.backgroundId = $scope.store.question.backgroundId;
                rankingAnswer.importance = $scope.store.answer.importance;
                var rankedItems = _.map($scope.store.items, function (key, index) {
                    key.answerId = $scope.store.answer.id;
                    key.rank = index + 1;
                    key.itemId = key.id;
                    key.backgroundId = $scope.store.question.background;
                    key.questionId = $scope.store.question.id;
                    key.userId = $scope.store.user;
                    return key
                });

                rankingAnswer.items = rankedItems;

                RankingAnswer.save(rankingAnswer, function (result) {
                    console.log("result from ranking answer save:", result);
                });
            }

            if (bool) {

                if ($scope.store.questionSet[$scope.counter+1]){
                    $scope.counter += 1;

                    if (!$scope.store.questionSet[$scope.counter].answer) { $scope.store.questionSet[$scope.counter].answer = {} }
                    $scope.store.question = $scope.store.questionSet[$scope.counter];
                    $scope.store.answer = $scope.store.question.answer || {};

                    var sortThese = $scope.store.answer.RankingAnswerItems || $scope.store.question.RankingQuestionItems || {};
                    $scope.store.items = _.orderBy(sortThese, 'rank', 'asc');

                } else {

                    var proceed = confirm("That was the last question. Hit okay to proceed to last subtopics page.");

                    if (proceed){
                        delete $scope.store.question;
                        delete $scope.store.questionSet;
                        delete $scope.store.backgroundId;
                        delete $scope.store.backgroundDescription;
                        delete $scope.store.answer;
                        delete $scope.store.items;
                        $state.go('main.topic');
                    }
                }

            } else {

                if ($scope.store.questionSet[$scope.counter-1]) {
                    $scope.counter -= 1;
                    if (!$scope.store.questionSet[$scope.counter].answer) { $scope.store.questionSet[$scope.counter].answer = {} }
                    $scope.store.question = $scope.store.questionSet[$scope.counter];
                    $scope.store.answer = $scope.store.question.answer || {};
                    var sortThese = $scope.store.answer.RankingAnswerItems || $scope.store.question.RankingQuestionItems || {};
                }
            }

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