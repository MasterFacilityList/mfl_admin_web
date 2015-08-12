(function(angular, _){
    "use strict";
    angular.module("mfl.setup.county.controllers",[
        "mfl.setup.api"
    ])
    .controller("mfl.setup.controller.county.list", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-map-marker",
                name: "Counties"
            };
            $scope.filters = {
                "fields": "id,name,code"
            };
        }]
    )
    .controller("mfl.setup.controller.county.view", ["$scope", "$stateParams",
        "adminApi","mfl.common.forms.changes","$state",
        function ($scope, $stateParams, adminApi, formChanges,$state) {
            $scope.spinner = true;
            adminApi.counties.get($stateParams.count_id)
                .success(function (data) {
                    $scope.county_details = data;
                    $scope.title = {
                        icon: "fa-map-marker",
                        name : $scope.county_details.name
                    };
                    $scope.spinner = false;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });
            //update county
            $scope.saveFrm = function (frm) {
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.counties.update($stateParams.count_id)
                        .success(function () {
                            $state.go("setup.counties");
                        })
                        .error(function (error) {
                            $scope.errors = error;
                        });
                } else {
                    $state.go("setup.counties");
                }
            };
             //getting counties of particular county
            adminApi.constituencies.filter({"county" : $stateParams.count_id})
                .success(function (data) {
                    $scope.county_constituencies = data.results;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });
            $scope.filter = {"county" : $stateParams.count_id};
            adminApi.county_users.filter({"county" : $stateParams.count_id})
                .success(function (data) {
                    $scope.county_users = data.results;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });
        }
    ]);

})(window.angular, window._);
