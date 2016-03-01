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
        }

        queryLineupParam.push($scope.store.user);
        $scope.pushPolToLineup = function(pol, polIndex, officeIndex){


            if (_.includes($scope.polLineup, pol)){
                $scope.store.partitionedPols[officeIndex][polIndex].checked = false;
                _.remove($scope.polLineup, pol);
                _.pull(queryLineupParam, pol.user);
            } else {
                $scope.store.partitionedPols[officeIndex][polIndex].checked = true;
                $scope.polLineup.push(pol);
                queryLineupParam.push(pol.user);
            }
            console.log("queryLineupParam:", queryLineupParam);
            console.log("$scope.politicianLineup: ", $scope.polLineup);

        };

        $scope.moveToComparison = function(){

           AllAnswers.query( { lineup: queryLineupParam.toString() }, function(result){

               var comparisonSet = _.reduce(result, function(reduction, background){

                   background.pols = _.map($scope.polLineup, function(pol){

                       _.forEach(background.Answers, function(answer,index){
                           if (answer.user === pol.user){
                               answer.pol = {};
                               answer.pol.name = pol.name;
                               answer.pol.answerCount = pol.answerCount;
                           }
                       });
                       return pol
                   });

                   background.userAnswers = _.remove(background.Answers, function(answer){ return answer.user === $scope.store.user; });
                   background.Answers = _(background.Answers).groupBy('question').values().value();
                   background.Answers = _.orderBy(background.Answers, 'length', 'desc');

                   // This orderedUserAnswers functionality can be used if ever there are random distributions
                   // within the answer set. As it is currently, questions are only ever answered in
                   // ascending order.
                   //var orderedUserAnswers = [];
                   var score = [];
                   _.forEach(background.Answers, function(answer){
                       _.forEach(background.userAnswers, function(userAnswer){

                           if (!score[answer.length]){
                               score[answer.length] = answer.length;
                               if (answer[0].question === userAnswer.question){
                                   score[answer.length] += answer.length;
                                   //orderedUserAnswers.push(userAnswer)
                               }
                           } else if (answer.length !== 1){
                               score[answer.length] += 1;
                               if (answer[0].question === userAnswer.question){
                                   score[answer.length] += answer.length;
                                   //    orderedUserAnswers.push(userAnswer);
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

                   background.score = _.sum(score);

                   if (!_.isEmpty(background.Answers)){
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
