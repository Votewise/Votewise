'use strict';
var controllername = 'topics';
var _ = require('lodash');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [
        '$scope',
        '$state',
        'main.votewise.QuestionSet',
        'main.votewise.TopicTree'
        ];

    function controller($scope, $state, QuestionSet, TopicTree) {
        var vm = this;
        vm.controllername = fullname;
        $scope.name = fullname;
        console.log("inside ", fullname);

        var activate = function() {

        };
        activate();

        $scope.moveToTopic = function(topic){

            $scope.store.topic = topic;

            TopicTree.get({ topic: topic }, function(result){
                console.log(result.topicCascade[0]);
                $scope.store.topicCascade = result.topicCascade[0];
                $state.go('main.topic');
            });

        };

        $scope.moveToQuestionSet = function(backgroundId, userId){

            QuestionSet.get({ backgroundId: backgroundId, userId: userId }, function(result){

                var sortThese = _.map(result.Questions, function(question){
                    _.forEach(result.Answers, function(answer){
                        if (question.id === answer.question){
                            question.answer = answer;
                            return false;
                        } else {
                            question.answer = {};
                        }
                    });
                    return question;
                });

                $scope.store.questionSet = _.orderBy(sortThese, 'viewOrder', 'asc');

                $scope.store.backgroundDescription = result.shortdescription;
                $scope.store.background = result.description;
                $state.go('main.questionSection.questionSet');

            });
        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
