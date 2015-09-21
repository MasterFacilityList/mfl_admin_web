(function(angular){
    "use strict";

    angular.module("mfl.chul.controllers.list", [])

    .controller("mfl.chul.controllers.units_list",
        ["$scope", function ($scope) {
            $scope.title = {
                "name": "All Community Units",
                "icon": "fa-hospital-o"
            };
            $scope.filters = {
                "fields": "id,code,name,status_name,facility"
            };
            $scope.action = [
                {
                    func : "ui-sref='chul.unit_create({furthest : 1})'" +
                           "requires-permission='chul.add_communityhealthunit'",
                    class: "btn btn-primary",
                    tipmsg: "Add Unit",
                    icon: "",
                    wording : " Add Unit"
                }
            ];
        }]
    )
    .controller("mfl.chul.controllers.view_chul", ["$scope",
        "mfl.chul.services.wrappers", "$stateParams",
        function ($scope, wrappers, $stateParams){
            $scope.spinner = true;
            $scope.wrapper = wrappers.chuls;
            wrappers.chuls.get($stateParams.unit_id)
            .success(function (data) {
                $scope.unit = data;
                $scope.spinner = false;
            })
            .error(function (data) {
                $scope.spinner = false;
                $scope.error = data;
            });
        }]
    );

})(window.angular);
