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
            $scope.presentedQuestion = $scope.presentedSet.answers[$scope.elementForQuestions];
            $scope.userAnswer = $scope.presentedSet.userAnswers[$scope.elementForQuestions];
            console.log("user answer", $scope.presentedSet.userAnswers[$scope.elementForQuestions]);
        };
        activate();

        $scope.startSet = function(){
            $scope.presentedSet = $scope.store.comparisonSet[$scope.elementForBackgrounds];
            $scope.presentedQuestion = $scope.presentedSet.answers[$scope.elementForQuestions];
            $scope.userAnswer = $scope.presentedSet.userAnswers[$scope.elementForQuestions];

        };

        $scope.traverseSetByQuestion = function(bool){

            if (bool) {

                $scope.elementForQuestions += 1;
                console.log($scope.elementForQuestions);
                //$scope.presentedQuestion = $scope.presentedSet.Answers[$scope.elementForQuestions];
                if ($scope.presentedSet.answers[$scope.elementForQuestions]){
                    $scope.presentedQuestion = $scope.presentedSet.answers[$scope.elementForQuestions];
                    $scope.userAnswer = $scope.presentedSet.userAnswers[$scope.elementForQuestions];
                } else {
                    $scope.elementForQuestions -= 1;
                }

            } else {

                $scope.elementForQuestions -= 1;
                if ($scope.presentedSet.answers[$scope.elementForQuestions]){
                    $scope.presentedQuestion = $scope.presentedSet.answers[$scope.elementForQuestions];
                    $scope.userAnswer = $scope.presentedSet.userAnswers[$scope.elementForQuestions];

                } else {
                    $scope.elementForQuestions +=1;
                }

            }
        };

        $scope.goToBackground = function(element) {
            $scope.elementForQuestions = 0;
            $scope.presentedSet = $scope.$parent.store.comparisonSet[element.index];
            $scope.presentedQuestion = $scope.presentedSet.answers[$scope.elementForQuestions];
            $scope.userAnswer = $scope.presentedSet.userAnswers[$scope.elementForQuestions];
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
            $scope.presentedQuestion = $scope.presentedSet.answers[$scope.elementForQuestions];
        };

        $scope.goToPoliticianLibrary = function() {
            $state.go('main.politicianLibrary');
        };


    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
