(function(angular){
    "use strict";
    angular.module("mfl.setup.ward.controllers",[
        "mfl.setup.api"
    ])
    .controller("mfl.setup.controller.ward.list", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-map-marker",
                name: "Wards"
            };
            $scope.filters = {
                "fields": "id,name,code"
            };
        }]
    )
    .controller("mfl.setup.controller.ward.edit", ["$scope","adminApi","$stateParams",
        function ($scope,adminApi,$stateParams) {
            adminApi.wards.get($stateParams.ward_id)
            .success(function (data) {
                $scope.ward_details = data;
            }).error(function (err) {
                $scope.errors = err;
            });
        }]
    );
})(window.angular);
