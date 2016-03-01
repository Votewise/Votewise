app.controller('ComparisonCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside ComparisonCtrl");


    $scope.set = {}
    $scope.set.question = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum maximus metus urna. Vivamus sit amet mi eros. Cras fermentum enim eros, ac sodales lectus gravida ac. Nullam ex magna, luctus non massa id, aliquet blandit felis. Nulla dapibus non tellus ut finibus. Donec tristique tristique interdum.';
    $scope.set.topic = "privacy";
    $scope.set.current = 1;
    $scope.set.total = 20;

    $scope.makeArray = function(input){
        var myArray = []
        for (var i = 0; i < 6; i++){
            if (i != (input-1)){
                myArray.push(false);
                console.log(myArray);
            } else if (i == input-1){
                myArray.push(true);
                console.log(myArray);
            }
            }
    }

    $scope.checkboxClass = 0;

    $scope.importanceEnum = function(input){
        importance = "";
        if (input == 1){
            importance = "Unimportant";
        } else if( input == 2){
            importance = "Important";
        } else if (input == 3){
            importance = "Very Important";
        }
    }

    $scope.answerQuestion = function (){
    }

    $scope.importance = function (){
        console.log("$scope.question.importance: " + $scope.question.importance)
        console.log("question stance: " + $scope.question.stance);
    }

    $scope.setImportance = function(input){
        $scope.question.importance = input;
        console.log($scope.question.importance);
    }

    $scope.printValue = function(){
        var number = 0
        for (var i = 0; i < 10; i++){
            number++
            console.log(number);
        }
    }


    $scope.setIndex = function(){
        for (key in $scope.profileCompare){
            for (var i = 0; i < $scope.profileCompare[key].questionAnswer.length; i++){
                if ($scope.profileCompare[key].questionAnswer[i] == true){
                    $scope.profileCompare[key].index = i;
                    console.log("Index for " + key + " set to " +
                        $scope.profileCompare[key].index);
                }
            }
        }
    }

    $scope.setDifference = function(){
        var choice, differenceBetween, choice2
        
        for (key in $scope.profileCompare){
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
                            $scope.setDiffProperty(differenceBetween) 
                            break 
                        }
                    }
                } else if (choice < choice2) {
                    for (var i = 0; i < 6; i++){
                        choice++
                        differenceBetween++
                        if(choice2==choice){
                            $scope.setDiffProperty(differenceBetween)
                            break 
                        }
                    }
                }
            }
        }
    };


    $scope.setDiffProperty = function(differenceBetween){
        if (differenceBetween == 1){
            $scope.profileCompare[key].difference = "_20pcnt";
            console.log("Difference for " + key
            + " is " + $scope.profileCompare[key].difference);
        } else if (differenceBetween == 2){
            $scope.profileCompare[key].difference = "_40pcnt";
            console.log("Difference for " + key
            + " is " + $scope.profileCompare[key].difference);
        } else if (differenceBetween == 3){
            $scope.profileCompare[key].difference = "_60pcnt";
            console.log("Difference for " + key
            + " is " + $scope.profileCompare[key].difference);
        } else if (differenceBetween == 4){
            $scope.profileCompare[key].difference = "_80pcnt";
            console.log("Difference for " + key
            + " is " + $scope.profileCompare[key].difference);
        } else if (differenceBetween == 5){
            $scope.profileCompare[key].difference = "_100pcnt";
            console.log("Difference for " + key
            + " is " + $scope.profileCompare[key].difference);
        }
    }


    $scope.currentUser = {
        You: {
            questionAnswer: [false, false, true, false, false, false],
            questionImportance: "Unimportant",
        }
    };

    $scope.profileCompare = {

        Pizza: {
            name: "Pizza",
            questionAnswer: [false, false, false, false, false, true],
            questionImportance: "Important",
            difference: undefined,
            office: "Cheese",
            index: undefined
        },
        GreenieBigNameGuy: {
            name: "Greenie Centipede",
            questionAnswer: [false, false, false, false, true, false],
            questionImportance: "Very Important",
            difference: undefined,
            office: "Green Beans",
            index: undefined
        },
        Red: {
            name: "Seeing Red",
            questionAnswer: [false, false, false, true, false, false],
            questionImportance: "Not Important",
            difference: undefined,
            office: "milk",
            index: undefined
        },
        Yellow: {
            name: "Christmas Tree",
            questionAnswer: [false, false, true, false, false, false],
            questionImportance: "Not Important",
            difference: undefined,
            office: "Elf",
            index: undefined
        },
        Yellow2: {
            name: "Buffalo Bill",
            questionAnswer: [false, true, false, false, false, false],
            questionImportance: "Not Important",
            difference: undefined,
            office: "grass",
            index: undefined
        },
        Yellow3: {
            name: "Ice Cream",
            questionAnswer: [true, false, false, false, false, false],
            questionImportance: "Not Important",
            difference: undefined,
            office: "ping pong",
            index: undefined
        },
        Yellow4: {
            name: "Antelope",
            questionAnswer: [false, false, false, true, false, false],
            questionImportance: "Not Important",
            difference: undefined,
            office: "sneezing",
            index: undefined
        },
        Yellow5: {
            name: "Boa Boa Boa",
            questionAnswer: [false, true, false, false, false, false],
            questionImportance: "Not Important",
            difference: undefined,
            office: "Squirly Things",
            index: undefined
        },
        Yellow6: {
            name: "Screw",
            questionAnswer: [true, false, false, false, false, false],
            questionImportance: "Not Important",
            difference: undefined,
            office: "upside down",
            index: undefined
        },
        Yellow7: {
            name: "Rainbow",
            questionAnswer: [false, false, false, false, true, false],
            questionImportance: "Not Important",
            difference: undefined,
            office: "ghost",
            index: undefined
        },
        Yellow33: {
            name: "Bugs",
            questionAnswer: [false, false, false, false, false, true],
            questionImportance: "Not Important",
            difference: undefined,
            office: "pokemon",
            index: undefined
        }
    };

    $scope.generateMatchPercent = function(user, politician){

    }

    // $scope.profileCompare1 = [{
    //     name: 'You',
    //     stats: {
    //         questionAnswer: [false, true, false, false, false, false],
    //         percent: ['20%', '40%', '60%', '80%', '100%'],
    //         questionImportance: "Unimportant"
    //     }
    // }, {
    //     name: 'Pizza',
    //     stats: {
    //         questionAnswer: [true, false, false, false, false, false],
    //         percent: ['20%', '40%', '60%', '80%', '100%'],
    //         questionImportance: "Very important"
    //     }
    // }, {
    //     name: 'Greenie',
    //     stats: {
    //         questionAnswer: [false, true, false, false, true, false],
    //         percent: ['20%', '40%', '60%', '80%', '100%'],
    //         questionImportance: "Important"
    //     }
    // }];

    $scope.issues = {
        thing: {
            name: "cheese"
        },
        thing2: {
            name: "cheese"
        },
        thing3: {
            name: "cheese"
        }
    }

    console.log(JSON.stringify($scope.profileCompare));

    /**
     * List a set of categories. Have one of these for each category.
     * @Usage: 0 = Unchecked, 1 = Checked
     * @Example: $scope.aCategories.catOne = 1; // Returns True
     */
    $scope.aCategories = {
        catOne: 0,
        catTwo: 0,
        catThr: 0,
        catFou: 0
    };

    /**
     * How much does the voter care about this category?
     * @Example: $scope.aImportance.0;  // User strongly Disagrees
     */
    $scope.aImportance = {
        stronglyDisagree: 0,  // Maroon
        disagree:         1,  // Red
        neutral:          2,  // Orange
        agree:            3,  // Lt. Green
        stronglyAgree:    4   // Agree
    };


    // Have one of these for each politican in the database
    // Ex: Two people in here
    // This is dummy data. You only need one politician object
    $scope.politicans = [
        {
            essay:        true,
            resume:       true,
            endorsements: true
        },
        {
            essay:        false,
            resume:       false,
            endorsements: false
        }
    ];


    $scope.getPoliticians = function () {
        for (var i = 0; i < $scope.politican.length; i++){
            // Loop through politicians here
        }
    };

});


