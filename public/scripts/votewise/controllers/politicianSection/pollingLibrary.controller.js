'use strict';
var controllername = 'pollingLibrary';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [
        '$scope',
        'main.votewise.TopicTree',
        'main.votewise.Groups'
        ];

    function controller($scope, TopicTree, Groups) {
        var vm = this;
        vm.controllername = fullname;
        var activate = function() {

        };
        activate();

        $scope.maritalStatusOptions = [ "Married", "Divorced", "Separated", "Engaged", "Single" ];
        $scope.sexOptions = [ "Male", "Female", "Other" ];
        $scope.ownershipOptions = [ "Rents", "Owns Home", "Owns Many Homes", "Owns Property" ];
        $scope.householdIncomeOptions = [ "between this and this", "between this and that", "between that and this" ];
        $scope.answerImportanceOptions = [ 1, 2, 3, 4, 5, 6];

        $scope.religionOptions = [];
        $scope.populateReligionSelect = function(){
            Groups.get({ category: "Religion" }, function(result){

            })
        }


        $scope.topicSelectOptions = [];
        $scope.selectTopic = function(topic){
            $scope.queryStager = {};
            TopicTree.get({ topic: topic }, function(result){
                console.log(result);
                if (result.topicCascade[0].background !== 0){
                    $scope.topicSelectOptions.push({ background: result.topicCascade[0].background, name: result.topicCascade[0].description})
                }
                for (var i = 0; i < result.topicCascade[0].Subtopics.length; i++){
                    console.log(result.topicCascade[0].Subtopics[i]);
                    $scope.topicSelectOptions.push(
                        {
                            background: result.topicCascade[0].Subtopics[i].background,
                            name: result.topicCascade[0].Subtopics[i].description
                        }
                    );
                    if (result.topicCascade[0].Subtopics[i].Subtopics.length > 0){
                        for (var j = 0; j < result.topicCascade[0].Subtopics[i].Subtopics.length; i++){
                            console.log(result.topicCascade[0].Subtopics[i]);
                            $scope.topicSelectOptions.push(
                                {
                                    background: result.topicCascade[0].Subtopics[i].Subtopics[j].background,
                                    name: result.topicCascade[0].Subtopics[i].Subtopics[j].description
                                }
                            );
                        }
                    }
                }
                console.log("$scope.topicSelectOptions", $scope.topicSelectOptions);
            });

        };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
