var controllername = 'politicianComparison';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$scope', '$rootScope', '$state']; // $routeParams '$rootscope'

    function controller($scope, $rootScope, $state) {
        var vm = this;
        vm.controllername = fullname;
        $scope.name = fullname;
        $scope.elementForBackgrounds = 0;
        $scope.elementForQuestions = 0;
        $scope.backgroundDescs = _.map($scope.$parent.store.comparisonSet, function(key, index){
            console.log(key, index);
            var item = {};
            item.description = key.shortDescription;
            item.index = index;
            return item;
        });
        $scope.selectedBackground = {};
        console.log($scope.backgroundDescs);

        $scope.$on('$destroy', function(){
            delete $scope.store.comparisonSet;
        });

        var activate = function() {
            $scope.presentedSet = $scope.store.comparisonSet[$scope.elementForBackgrounds];
            $scope.presentedQuestion = $scope.presentedSet.Answers[$scope.elementForQuestions];
            $scope.userAnswer = $scope.presentedSet.userAnswers[$scope.elementForQuestions];
        };
        activate();

        $scope.startSet = function(){
            $scope.presentedSet = $scope.store.comparisonSet[$scope.elementForBackgrounds];
            $scope.presentedQuestion = $scope.presentedSet.Answers[$scope.elementForQuestions];
            $scope.userAnswer = $scope.presentedSet.userAnswers[$scope.elementForQuestions];

            console.log("presentedSet: ", $scope.presentedSet);
            console.log("presentedQuestion: ", $scope.presentedQuestion);
        };

        $scope.traverseSetByQuestion = function(bool){

            if (bool) {

                $scope.elementForQuestions += 1;
                //$scope.presentedQuestion = $scope.presentedSet.Answers[$scope.elementForQuestions];
                if ($scope.presentedSet.Answers[$scope.elementForQuestions]){
                    $scope.presentedQuestion = $scope.presentedSet.Answers[$scope.elementForQuestions];
                    $scope.userAnswer = $scope.presentedSet.userAnswers[$scope.elementForQuestions];

                } else {
                    $scope.elementForQuestions -= 1;
                }

            } else {

                $scope.elementForQuestions -= 1;
                if ($scope.presentedSet.Answers[$scope.elementForQuestions]){
                    $scope.presentedQuestion = $scope.presentedSet.Answers[$scope.elementForQuestions];
                    $scope.userAnswer = $scope.presentedSet.userAnswers[$scope.elementForQuestions];

                } else {
                    $scope.elementForQuestions +=1;
                }

            }
        };

        $scope.goToBackground = function(element) {
            $scope.elementForQuestions = 0;
            $scope.presentedSet = $scope.$parent.store.comparisonSet[element.index];
            $scope.presentedQuestion = $scope.presentedSet.Answers[$scope.elementForQuestions];
        };

        $scope.traverseSetByBackground = function(bool){

            if (bool) {
                $scope.elementForQuestions = 0;
                $scope.elementForBackgrounds += 1;
            }  else {
                $scope.elementForQuestions = 0;
                $scope.elementForBackgrounds -= 1;
                console.log($scope.elementForBackgrounds);
            }
            $scope.presentedSet = $scope.$parent.store.comparisonSet[$scope.elementForBackgrounds];
            $scope.presentedQuestion = $scope.presentedSet.Answers[$scope.elementForQuestions];
        };

// finds the polarity of politician answers in relation to the settings's answers.

        $scope.goToPoliticianLibrary = function() {
            $state.go('main.politicianLibrary');
        };

        $scope.findAnswerColorDiff = function(){
            var choice, differenceBetween, choice2;

            for (var key in $scope.profileCompare){
                if ($scope.profileCompare.hasOwnProperty(key)){
                    for (var i = 0; i < $scope.currentUser.You.questionAnswer.length; i++){
                        if ($scope.currentUser.You.questionAnswer[i] == true){
                            choice = i;
                            console.log(choice);
                        }
                    }
                    for (var i = 0 ; i < $scope.profileCompare[key].questionAnswer.length; i++){
                        if ($scope.profileCompare[key].questionAnswer[i] == true){
                            choice2 = i;
                            differenceBetween = 0;
                        }
                    }
                    if (choice2 == choice) {
                        $scope.profileCompare[key].difference = "_0pcnt";
                        console.log("Difference for " + key
                         + " is " + $scope.profileCompare[key].difference);
                    } else if (choice2 < choice) {
                        for (var i = 0; i < 6; i++){
                            choice2++
                            differenceBetween++
                            if(choice2==choice){
                                $scope.setColorDifference(differenceBetween, key) 
                                break 
                            }
                        }
                    } else if (choice < choice2) {
                        for (var i = 0; i < 6; i++){
                            choice++
                            differenceBetween++
                            if(choice2==choice){
                                $scope.setColorDifference(differenceBetween, key)
                                break 
                            }
                        }
                    }
                }
            }
        };

        $scope.setColorDifference = function(differenceBetween, key){
            var setter = (differenceBetween*2).toString()
            $scope.profileCompare[key].difference = "_" + setter + "0pcnt";
        };

        $scope.currentUser = {
            You: {
                questionAnswer: [true, false, false, false, false, false],
                questionImportance: "Unimportant",
            }
        };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
