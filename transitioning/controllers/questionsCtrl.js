
app.controller('QuestionsCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside QuestionsCtrl");
    $scope.question = {};
    $scope.info = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum maximus metus urna. Vivamus sit amet mi eros. Cras fermentum enim eros, ac sodales lectus gravida ac. Nullam ex magna, luctus non massa id, aliquet blandit felis. Nulla dapibus non tellus ut finibus. Donec tristique tristique interdum.';
	$scope.privacy = "privacy";
	$scope.current = 1;
	$scope.total = 20;

    $scope.answerQuestion = function (){

    }

    $scope.importance = function (){
	
		console.log("$scope.question.importance: " + $scope.question.importance)
		console.log("question stance: " + $scope.question.stance);
    }

    $scope.setQ = function(input){
    	$scope.question.importance = input;
    	console.log($scope.question.importance);
    }
});


