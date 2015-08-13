(function(angular, _){
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
            $scope.action = [
                {
                    func : "ui-sref='setup.sub_counties.create'" +
                           " requires-user-feature='is_staff'",// +
                        //    " requires-permission='common.add_sub_county'",
                    class: "btn btn-primary",
                    tipmsg: "Add Sub County",
                    wording: "Add Sub County"
                }
            ];
        }]
    )

    .controller("mfl.setup.controller.sub_counties.edit", ["$scope",
        "$stateParams", "adminApi",
        function ($scope, $stateParams, adminApi) {
            if(_.isUndefined($stateParams.scount_id)){
                $scope.state = false;
            } else {
                $scope.state = true;
                adminApi.sub_counties.get($stateParams.scount_id)
                    .success(function (data) {
                        $scope.scount_details = data;
                    })
                    .error(function (err) {
                        $scope.alert = err.error;
                    });
            }
        }
    ]);

})(window.angular, window._);
