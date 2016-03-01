app.controller('NavigatorCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside NavigatorCtrl");
});

app.controller('CivilLibertiesCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside CivilLibertiesCtrl");
    $scope.title = 'Civil Liberties';
    $scope.talkingPointsImage = 'img/CIVIL_LIBERTIES.svg';

    $scope.subCategories = [
        {'issue': "Privacy"},
        {'issue': "Marriage"},
        {'issue': "Racial Profiling", 'subIssue': ['Stop and Frisk', 'Profiling']},
        {'issue': "Voting", 'subIssues': ['Identification Checks At Polling Places', 'Felons and Voting',
            'Two Party System', 'Primaries', 'Standard Primary vs Open Primary Elections']},
        {'issue': "LGBT"}
    ];

    for (var i = 0; i < 5; i++){
        console.log("Subissues are ... " + JSON.stringify($scope.subCategories[i]));
    }
});

app.controller('CrimeAndPunishmentCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside CrimeAndPunishmentCtrl");
    $scope.title = 'Crime and Punishment';
    $scope.talkingPointsImage = 'img/CRIME_and_PUNISHMENT.svg';
    $scope.subCategories = [
        {'issue': "Police"},
        {'issue': "Punishment", 'subIssues': ["Civil Forfeiture"]},
        {'issue': "Crime Prevention"},
        {'issue': "Judges", 'subIssues': ["General Candidate Info", "Judicial Election Rules", "Judges and Political Activity", 
            "Interpreting The Law"]},
        {'issue': "Punishment", 'subIssues': ["Mandatory Sentencing"]},
        {'issue': "Search and Seizure"},
        {'issue': "A Well Regulated Militia"}
    ];

});

app.controller('EducationCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside EducationCtrl");
    $scope.title = 'Education';
    $scope.talkingPointsImage = 'img/EDUCATION.svg';
    $scope.subCategories = [
        {'issue': "Priorities"},
        {'issue': "General"},
        {'issue': "Health Education"},
        {'issue': "Stress Management Education"},
        {'issue': "Stability"},
        {'issue': "Standardized Tests"},
        {'issue': "Summer Recess"}
    ];

});


app.controller('EnergyCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside EnergyCtrl");
    $scope.title = "Environment";
    $scope.talkingPointsImage = 'img/ENERGY.svg'
    $scope.subCategories = [
        {'issue': "General"},
        {'issue': "Conservation and Increased Efficiency"},
        {'issue': "Carbon Cap and Trade"},
        {'issue': "Fracking"},
        {'issue': "Fossil Fuels", 'subIssues': ["Oil", "Coal", "Natural Gas"]},
        {'issue': "Nuclear Power"},
        {'issue': "Renewables", 'subIssues': ["Wind", "Solar"]},
        {'issue': "Favorites"}
    ];
});

app.controller('EnvironmentCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside EnvironmentCtrl");
    $scope.title = "Environment";
    $scope.talkingPointsImage = 'img/ENVIRONMENT.svg';
    $scope.subCategories = [
        {'issue': "General"},
        {'issue': "Water"},
        {'issue': "Air"},
        {'issue': "Global Warming"},
        {'issue': "Land"},
        {'issue': "Farming", 'subIssues': ["Bees", "Safe Farm Practices", "Genetically Modified Organisms"]},
        {'issue': "Plants/Animals"}
    ];
});

app.controller('ForeignPolicyCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside ForeignPolicyCtrl")
});


app.controller('GunControlCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside GunControlCtrl")
    $scope.title = "Gun Control";
    $scope.talkingPointsImage = "img/GUN-CONTROL.svg";
    $scope.subCategories = [
        {'issue': "Gun Control"}
    ];
});

app.controller('HealthSafetyCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside HealthSafetyCtrl");
    $scope.title = "Health and Safety";
    $scope.talkingPointsImage = "img/HEALTH-SAFETY.svg";
    $scope.subCategories = [
        {'issue': "Billing With Current System"},
        {'issue': "Tort Reform"},
        {'issue': "Nationalized Care"},
        {'issue': "Part Time Benefits"},
        {'issue': "Quality of Care"},
        {'issue': "Testing on Children"},
        {'issue': "Cost of Drugs", 'subIssues': ["Generic Drugs"]},
        {'issue': "End of Life Issues"}
    ];
});

app.controller('ImmigrationCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside ImmigrationCtrl");
    $scope.title = "Immigration";
    $scope.talkingPointsImage = "img/IMMIGRATION.svg";
    $scope.subCategories = [
        {'issue': "Legal Immigration", 'subIssues': ["Immigrant Services"]},
        {'issue': "Illegal Immigration", 'subIssues': ["Services for Undocumented (Illegal) Immigrants"]}
    ];
});

app.controller('InfrastructureCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside InfrastructureCtrl");
    $scope.title = "Infrastructure";
    $scope.talkingPointsImage = "img/INFRASTRUCTURE.svg";
    $scope.subCategories = [
        {'issue': "General"},
        {'issue': "Privatizing", "subIssues": ["Eminent Domain"]},
        {'issue': "Roads and Bridges"},
        {'issue': "Parking"},
        {'issue': "Public Transit"},
        {'issue': "Communication"},
        {'issue': "Energy", 'subIssues': ["Power Lines", "Gas Lines"]},
        {'issue': "Water Supply"},
        {'issue': "Sewage System"}
    ];
});

app.controller('InternationalRelationsCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside InternationalRelationsCtrl");
    $scope.title = "International Relations";
    $scope.talkingPointsImage = "img/INTERNATIONAL-REL.svg";
    $scope.subCategories = [
        {'issue': "Military", 'subIssues': ["Torture"]},
        {'issue': "Economic"},
        {'issue': "The Middle East"},
        {'issue': "The Undeveloped Third World Nations"}
    ];
});

app.controller('JobsEconomyCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside JobsEconomyCtrl");
    $scope.title = "Jobs and Economy";
    $scope.talkingPointsImage = 'img/JOBS-ECONOMY.svg';
    $scope.subCategories = [
        {'issue': "Consumer Confidence"},
        {'issue': "Patents"},
        {'issue': "Digital Millenium Copyright Act and Fair Use Act"}
    ];
});

app.controller('QualityOfLifeCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside QualityOfLifeCtrl");
    $scope.title = "Quality of Life";
    $scope.talkingPointsImage = "img/QUALITY-OF-LIFE.svg";
    $scope.subCategories = [
        {'issue': "Libraries"},
        {'issue': "Retirement", 'subIssues': ["Driving", "Retirement Age"]},
        {'issue': "Quality of Life Crimes"}
    
    ]
});

app.controller('TaxesCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside TaxesCtrl");
    $scope.title = "Taxes";
    $scope.talkingPointsImage = "img/TAXES.svg";
    $scope.subCategories = [
        {'issue': "General"},
        {'issue': "Estate Tax"},
        {'issue': "Tax Incentives"},
        {'issue': "Tax Disencentives"},
        {'issue': "Specific Taxes and Programs"},
        {'issue': "Increasing Revenue Without Taxing"},
        {'issue': "Tax Reform"},
    
    ]
});

app.controller('SocialServicesCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside SocialServicesCtrl");
    $scope.title = "Social Services";
    $scope.talkingPointsImage = "img/Social-Services.svg";
    $scope.subCategories = [
        {'issue': "Housing Programs: Hud/Section 8"},
        {'issue': "Food Stamps/Snap (Supplemental Nutrition Assistance Program"},
        {'issue': "Disaster Services", 'subIssues': ["Emergency Shelter/Housing"]},
        {'issue': "Domestic Violence"},
        {'issue': "Addiction"},
        {'issue': "Breakfast/Lunch"},
        {'issue': "Health", 'subIssues': ["Mental Health", "Medicaid (people with needs)", "Medicare (for retirees)"]},
        {'issue': "Welfare"},
        {'issue': "Social Security"},
        {'issue': "Child Welfare"},
        {'issue': "Wic (Women Infants and Children)"},
        {'issue': "Unemployment/Retraining"},
        {'issue': "Consumer Advocacy"},
        {'issue': "Ada Disability"}   
    ]
});

app.controller('ReproductionCtrl', function ($scope, $rootScope, $routeParams) {
    console.log("Inside ReproductionCtrl");
    $scope.title = "Reproduction";
    $scope.talkingPointsImage = "img/REPRODUCTION.svg";
    $scope.subCategories = [
        {'issue': "Child Rearing"},
        {'issue': "Birth Control"},
        {'issue': "Abortion", 'subIssues': ["Third Trimester Abortions"]},
        {'issue': "Emergency Contraception"}
    ]
});

