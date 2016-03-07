'use strict';
var controllername = 'politicianLibrary';
var _ = require('lodash');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [
        '$scope',
        '$state',
        'main.votewise.AllAnswers'
        ];

    function controller($scope, $state, AllAnswers) {
        var vm = this;
        vm.controllername = fullname;
        $scope.store = $scope.store || {};
        $scope.name = fullname;
        console.log(fullname);
        $scope.isCollapsed = true;

        $scope.store.partitionedPols = _($scope.store.politicianLibrary.city[0].Politicians).groupBy('office').values().value();

        var queryLineupParam = [];
        $scope.polLineup = [];

        $scope.checkClass = function(pol){
            console.log(pol);
        };

        $scope.transparentClass = function(count){
            console.log("COUNT",count);
            if (count === 0){
                return "transparent";
            };
        };

        queryLineupParam.push($scope.store.user);
        $scope.pushPolToLineup = function(pol, polIndex, officeIndex){

            console.log("pol", pol, "polLineup", $scope.polLineup);
            if (_.includes($scope.polLineup, pol)){
                $scope.store.partitionedPols[officeIndex][polIndex].checked = false;
                _.remove($scope.polLineup, pol);
                _.pull(queryLineupParam, pol.user);
            } else if (pol.answerCount !== 0) {
                $scope.store.partitionedPols[officeIndex][polIndex].checked = true;
                $scope.polLineup.push(pol);
                queryLineupParam.push(pol.userId);
            }
            console.log("queryLineupParam:", queryLineupParam);
            console.log("$scope.politicianLineup: ", $scope.polLineup);
        };

        $scope.moveToComparison = function(){

           AllAnswers.query( { lineup: queryLineupParam.toString() }, function(result){

               console.log("RESULT", result);
               //
               //
               var comparisonSet = _.reduce(result, function(reduction, background){
               //
                   background.pols = _.map($scope.polLineup, function(pol){

                       _.forEach(background.answers, function(answer,index){
                           if (answer.userId === pol.userId){
                               answer.pol = {};
                               answer.pol.name = pol.name;
                               answer.pol.answerCount = pol.answerCount;
                           }
                       });
                       return pol
                   });
               //
                   background.userAnswers = _.remove(background.answers, function(answer){ return answer.userId === $scope.store.user; });
                   background.answers = _(background.answers).groupBy('questionId').values().value();
                   background.answers = _.orderBy(background.answers, 'length', 'desc');
               //
                   // This orderedUserAnswers functionality can be used if ever there are random distribution
                   // within the answer set. As it is currently, questions are only ever answered in
                   // ascending order.
                   //var orderedUserAnswers = [];

                   var score = [];
                   _.forEach(background.answers, function(answer){
                       _.forEach(background.userAnswers, function(userAnswer){

                           if (!score[answer.length]){
                               score[answer.length] = answer.length;
                               if (answer[0].question === userAnswer.question){
                                   score[answer.length] += answer.length;
                               //    orderedUserAnswers.push(userAnswer)
                               }
                           } else if (answer.length !== 1){
                               score[answer.length] += 1;
                               if (answer[0].question === userAnswer.question){
                                   score[answer.length] += answer.length;
                                  //     orderedUserAnswers.push(userAnswer);
                               }
                           }
                           //else if (answer.length === 1){
                           //        if (answer[0].question === userAnswer.question) {
                           //            orderedUserAnswers.push(userAnswer);
                           //        }
                           //}
                       })

                   });
                   //background.userAnswers = orderedUserAnswers;
                   //
                   background.score = _.sum(score);

                   if (!_.isEmpty(background.answers)){
                       reduction.push(background);
                   }

                   return reduction;

                   //if (!_.isEmpty(background.Answers)){
                   //    comparisonSet.push(background);
                   //}

               }, []);

               comparisonSet = _.orderBy(comparisonSet, 'score', 'desc');
               $scope.store.comparisonSet = comparisonSet;
               $state.go('main.politicianComparison');

           });

        }


    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
