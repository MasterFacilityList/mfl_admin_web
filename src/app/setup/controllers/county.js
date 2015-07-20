(function(angular){
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
        }]
    )
    .controller("mfl.setup.controller.county.view", ["$scope", "$stateParams",
        "adminApi",
        function ($scope, $stateParams, adminApi) {
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

})(window.angular);
