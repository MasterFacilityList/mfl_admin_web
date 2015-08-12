(function(angular){
    "use strict";
    angular.module("mfl.setup.sub_counties.controllers",[
        "mfl.setup.api"
    ])

    .controller("mfl.setup.controller.sub_counties.list", ["$scope",
        function ($scope) {
            $scope.filters = {
                "fields": "id,name,code"
            };
            $scope.title = {
                icon: "fa-map-marker",
                name: "Sub Counties"
            };
        }]
    )

    .controller("mfl.setup.controller.sub_counties.details", ["$scope",
        "$stateParams", "adminApi",
        function ($scope, $stateParams, adminApi) {
            adminApi.sub_counties.get($stateParams.scount_id)
                .success(function (data) {
                    $scope.scount_details = data;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });
        }
    ]);

})(window.angular);
