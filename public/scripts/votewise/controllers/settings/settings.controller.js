'use strict';
var controllername = 'settings';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [
        '$scope',
        'main.votewise.Groups',
        'main.votewise.Parties',
        'main.votewise.User',
            ];

    function controller($scope, Groups, Parties, User) {
        $scope.store = $scope.store || {};
        $scope.store.userInfo = $scope.store.userInfo;
          //|| {
          //      Parties: [ {name: "Linenbane Spider"}, {name: "Rampantlighter Iguana"}],
          //      Groups: [
          //          [ { category: "Madyak Hound",description: "Shadethroat King",id: 1, name: "Jadechiller Stealer"} ],
          //          [
          //              { category: "Leafgambler Ferret", description: "Shardplayer Duck", id: 5, name: "Harvestdoom Panther" },
          //              {  category: "Leafgambler Ferret", description: "Shimmersentry Fin", id: 7, name: "Lakeocelot Seed" }
          //          ]
          //      ],
          //      active: null,
          //      address: null,
          //      answerCount: 77,
          //      city: "box",
          //      county: "box",
          //      district: "box",
          //      email: "box@box.com",
          //      firstName: null,
          //      id: 19,
          //      lastName: null,
          //      passwordHash: "$2a$10$cLzezsNrM0tKS5xQcNBDbuWmxF6ad/nP1dOOrLiX4M.HOdfuCXNIm",
          //      phone: null,
          //      state: "pa",
          //      type: "voter",
          //      userLevel: null,
          //      userName: "box"
          //  };
        $scope.store.hideMainHeader = false;
        var vm = this;
        vm.controllername = fullname;

        var initialGroups = _.flatten(angular.copy($scope.store.userInfo.Groups));
        var initialParties = _.flatten($scope.store.userInfo.Parties);
        var initialUserSettings = {};
        for (var k in $scope.store.userInfo){
            if( k !== "Groups" && k !== "Parties") {
                initialUserSettings[k] = $scope.store.userInfo[k];
            };
        };

        $scope.populateCategorySelects = function(categoryIndex, dontCreateElement) {
            $scope.categoriesSelectOptions = [];
            console.log("CATEGORY INDEX", categoryIndex, "DONTCREATEELEMENT", dontCreateElement);

            console.log("GROUPS...", $scope.store.userInfo.Groups[categoryIndex]);

            if (categoryIndex || categoryIndex === 0){
                var categoryParam = $scope.store.userInfo.Groups[categoryIndex][0].category;
                return Groups.query({category: categoryParam }, function(result) {
                    if (!dontCreateElement){
                        $scope.store.userInfo.Groups[categoryIndex].push({ showSelect: true });
                    }
                    _.map(result, function(key){
                        var retVal = {};
                        var detection = false;
                        for (var i = 0;  i < $scope.store.userInfo.Groups[categoryIndex].length; i++){
                            if ($scope.store.userInfo.Groups[categoryIndex][i].name === key.name){
                                detection = true;
                            }
                        };
                        if (detection === false){
                            retVal.id = key.id;
                            retVal.name = key.name;
                            $scope.categoriesSelectOptions.push(retVal);
                        };

                    });
                });
            } else {
                var categoryParam = "categoryName";
                return Groups.query({category: categoryParam }, function(result) {
                    $scope.store.userInfo.Groups.push([{}]);

                    _.map(result, function(key){
                        var retVal = {};
                        var detection = false;
                        for (var i = 0;  i < $scope.store.userInfo.Groups.length; i++){
                            if ($scope.store.userInfo.Groups[i].name === key.name){
                                detection = true;
                            }
                        };
                        if (detection === false){
                            retVal.id = key.id;
                            retVal.name = key.name;
                            $scope.categoriesSelectOptions.push(retVal);
                        };
                    });
                });
            }

        };

        $scope.selectPartyOptions = [];
        $scope.populatePartySelect = function() {

            return Parties.query(function(result) {
                console.log(result);
                $scope.store.userInfo.Parties.push({ showSelect: true });

                if (_.isEmpty($scope.selectPartyOptions)){

                    _.forEach(result, function(key){

                        var retVal = {};
                        var detection = false;

                        for (var i = 0;  i < $scope.store.userInfo.Parties.length; i++){
                            if ($scope.store.userInfo.Parties[i].name === key.name){
                                detection = true;
                            }
                        };

                        if (detection === false){
                            retVal.id = key.id;
                            retVal.name = key.name;
                            $scope.selectPartyOptions.push(retVal);
                        };

                    });

                }

            });

        };

        $scope.submitNewElement = function(type, newElement, elementIndex, categoryIndex){

            console.log("TYPE", type, "NEWELEMENT", newElement, "ELEMENTINDEX", elementIndex, "CATEGORYINDEX", categoryIndex);

            if (type === "Groups") {
                console.log("new group", newElement, categoryIndex, elementIndex );
                $scope.categoriesSelectOptions.splice(_.find($scope.selectGroupOptions, function(index, key){
                    if (key === newElement) { return index }
                }), 1);
                $scope.store.userInfo.Groups[categoryIndex][elementIndex].showSelect = false;
                $scope.store.userInfo.Groups[categoryIndex][elementIndex].name = newElement.name;
                $scope.store.userInfo.Groups[categoryIndex][elementIndex].id = newElement.id;
                $scope.store.userInfo.Groups[categoryIndex][elementIndex].new = true;
            } else if (type === "Categories") {
                console.log("type", type, "newElement", newElement, "elementIndex", elementIndex);
                $scope.store.userInfo.Groups[elementIndex][0] = {};
                $scope.store.userInfo.Groups[elementIndex][0].showSelect = true;
                $scope.store.userInfo.Groups[elementIndex][0].category = newElement.name;
                $scope.populateCategorySelects(elementIndex, true);

            } else if (type === "Party") {
                $scope.selectPartyOptions.splice(_.find($scope.selectPartyOptions, function(index, key){
                    if (key === newElement) { return index }
                }), 1);
                $scope.store.userInfo.Parties[elementIndex].showSelect = false;
                $scope.store.userInfo.Parties[elementIndex].name = newElement.name;
                $scope.store.userInfo.Parties[elementIndex].id = newElement.id;
                $scope.store.userInfo.Parties[elementIndex].new = true;
            }

        };

        $scope.removeElement = function(toDelete, model_identifier, elementIndex, categoryIndex){

            if (model_identifier === "Groups"){
                console.log("removeElement  toDelete", toDelete, "model_ident", model_identifier, "groupIndex", elementIndex, "categoryIndex", categoryIndex);
                if (toDelete) { $scope.store.userInfo.Groups[categoryIndex][elementIndex].delete = true; }
                else { $scope.store.userInfo.Groups[categoryIndex][elementIndex].delete = false; }

            } else if(model_identifier === "Parties"){

                if (toDelete) { $scope.store.userInfo.Parties[elementIndex].delete = true; }
                else { $scope.store.userInfo.Parties[elementIndex].delete = false; }

            } else if (model_identifier === "Categories"){
                $scope.store.userInfo.Groups.splice(elementIndex, 1);
            }

        };

        $scope.updateUser = function(){

            var groupsToSort = _.flatten($scope.store.userInfo.Groups);
            var groupsToDelete = [];
            var groupsToCreate = [];
            for (var i = 0; i < groupsToSort.length; i++){
               if (groupsToSort[i].delete){
                   console.log(groupsToSort[i]);
                   groupsToDelete.push(groupsToSort[i].UserGroups.id);
               } else if (groupsToSort[i].new) {
                   groupsToCreate.push(groupsToSort[i].id);
               }
            }

            var partiesToDelete = [];
            var partiesToCreate = [];
            for (var i = 0; i < $scope.store.userInfo.Parties.length; i++){
                if ($scope.store.userInfo.Parties[i].delete){
                    partiesToDelete.push($scope.store.userInfo.Parties[i].UserParties.id);
                } else if ($scope.store.userInfo.Parties[i].new) {
                    partiesToCreate.push($scope.store.userInfo.Parties[i].id);
                }
            }

            var settingsToUpdate = {};
            for (var k in $scope.store.userInfo){
                if( k !== "Groups" && k !== "Parties" && initialUserSettings[k] != $scope.store.userInfo[k]) {
                    settingsToUpdate[k] = $scope.store.userInfo[k];
                };
            };

            var user = new User();

            if (!_.isEmpty(groupsToCreate)) { user.createGroups = groupsToCreate; };
            if (!_.isEmpty(groupsToDelete)) { user.deleteGroups = groupsToDelete; };
            if (!_.isEmpty(partiesToCreate)) { user.createParties = partiesToCreate; };
            if (!_.isEmpty(partiesToCreate)) { user.deleteParties = partiesToDelete; };
            if (Object.keys(settingsToUpdate).length === 0 && JSON.stringify(settingsToUpdate) === JSON.stringify({})){
                user.updateSettings = settingsToUpdate;
            };
            User.update({userId: $scope.store.userInfo.id }, user, function(result){
                console.log(result);
            })

        }
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
