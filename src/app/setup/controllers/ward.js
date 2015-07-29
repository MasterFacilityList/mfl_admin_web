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
    );
})(window.angular);
