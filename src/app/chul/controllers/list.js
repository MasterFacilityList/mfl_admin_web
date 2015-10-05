(function(angular){
    "use strict";

    angular.module("mfl.chul.controllers.list", ["mfl.facility_mgmt.services"])

    .controller("mfl.chul.controllers.units_list",
        ["$scope", function ($scope) {
            $scope.title = {
                "name": "All Community Units",
                "icon": "fa-hospital-o"
            };
            $scope.filters = {
                "fields": "id,code,name,status_name,facility_name,"+
                "facility_county,facility_subcounty,facility_ward,date_established"
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
                "is_approved": true,
                "fields": "id,code,name,status_name,facility_name,"+
                "facility_county,facility_subcounty,facility_ward,date_established"
            };
        }]
    )
    .controller("mfl.chul.controllers.units_pending_approvals",
        ["$scope", function ($scope) {
            $scope.filters = {
                "pending_approval":true,
                "fields": "id,code,name,status_name,facility_name,"+
                "facility_county,facility_subcounty,facility_ward,date_established"
            };
        }]
    )
    .controller("mfl.chul.controllers.units_rejected_list",
        ["$scope", function ($scope) {
            $scope.filters = {
                "is_rejected": true,
                "fields": "id,code,name,status_name,facility_name,"+
                "facility_county,facility_subcounty,facility_ward,date_established"
            };
        }]
    )
    .controller("mfl.chul.controllers.view_chul", ["$scope",
        "mfl.chul.services.wrappers", "$stateParams",
        "mfl.facility_mgmt.services.wrappers",
        function ($scope, wrappers, $stateParams, printWrapper){
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
            //setting up the query params
            $scope.print_params = {"format" : "pdf"};
            //printing a chul
            $scope.print_chul = printWrapper.printChul;
        }]
    )
        
   .controller("mfl.chul.controllers.chu_feedback",
        ["$scope", "$stateParams", function ($scope, $stateParams) {
            $scope.filters = {
                "fields": "comment,facility_id,facility_name,chu_name,created,rating"
            };
            if ($stateParams.facility_id) {
                $scope.filters.facility = $stateParams.facility_id;
            }
            if ($stateParams.chu) {
                $scope.filters.chu = $stateParams.chu;
            }
        }]
    );

})(window.angular);
