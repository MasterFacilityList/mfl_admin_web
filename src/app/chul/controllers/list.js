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
                "fields": "id,code,name,status_name,facility_name,"+
                "facility_county,facility_subcounty,facility_ward"
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
    .controller("mfl.chul.controllers.units_approved_list",
        ["$scope", function ($scope) {
            $scope.filters = {
                "is_approved":"True",
                "fields": "id,code,name,status_name,facility_name,"+
                "facility_county,facility_subcounty,facility_ward"
            };
        }]
    )
    .controller("mfl.chul.controllers.units_pending_approvals",
        ["$scope", function ($scope) {
            $scope.filters = {
                "has_edits":true,
                "fields": "id,code,name,status_name,facility_name,"+
                "facility_county,facility_subcounty,facility_ward"
            };
        }]
    )
    .controller("mfl.chul.controllers.units_rejected_list",
        ["$scope", function ($scope) {
            $scope.filters = {
                "is_rejected":"True",
                "fields": "id,code,name,status_name,facility_name,"+
                "facility_county,facility_subcounty,facility_ward"
            };
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
                //checks if chul has been approved/rejected at least once
                $scope.approve_reject = $scope.unit.is_approved || $scope.unit.is_rejected;
                //status of approval
                $scope.approved = $scope.unit.is_approved;
                //status of rejection
                $scope.rejected = $scope.unit.is_rejected;
                $scope.spinner = false;
            })
            .error(function (data) {
                $scope.spinner = false;
                $scope.error = data;
            });
        }]
    );

})(window.angular);
