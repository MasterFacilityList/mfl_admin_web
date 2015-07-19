(function(angular){
    "use strict";
    angular.module("mfl.setup.constituency.controllers",[
        "mfl.setup.api"
    ])

    .controller("mfl.setup.controller.constituency.list", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-map-marker",
                name: "Sub Counties"
            };
        }]
    )

    .controller("mfl.setup.controller.constituency.details", ["$scope",
        "$stateParams", "adminApi",
        function ($scope, $stateParams, adminApi) {
            adminApi.constituencies.get($stateParams.const_id)
                .success(function (data) {
                    $scope.const_details = data;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });
            adminApi.wards.filter({"constituency" : $stateParams.const_id})
                .success(function (data) {
                    $scope.const_wards = data.results;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });
        }
    ]);

})(window.angular);
