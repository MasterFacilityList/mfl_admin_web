(function(angular, _){
    "use strict";

    /*
     * @ngdoc module
     *
     * @name mfl.facility_mgmt.controllers.list
     *
     * @description
     * Module containing controllers for list views in facility management
     */
    angular.module("mfl.facility_mgmt.controllers.list", [])

    /*
     * @ngdoc controller
     *
     * @name mfl.facility_mgmt.controllers.facility_list
     *
     * @description
     * Handles listing of facilities
     */
    .controller("mfl.facility_mgmt.controllers.facility_list",
        ["$scope", function ($scope) {
            $scope.title = {
                "name": "All Facilities",
                "icon": "fa-building"
            };
            $scope.filters = {
                "rejected": false,
                "closed": false,
                "fields": "id,code,official_name,facility_type_name,owner_name,county," +
                          "sub_county,ward_name,updated,operation_status_name,"+
                          "sub_county_name"
            };
            $scope.action = [
                {
                    func : "ui-sref='facilities.facility_create({furthest : 1})'" +
                           "requires-permission='facilities.add_facility'",
                    class: "btn btn-primary",
                    tipmsg: "Add Facility",
                    icon: "",
                    wording : " Add Facility"
                }
            ];
        }]
    )

    /*
     * @ngdoc controller
     *
     * @name mfl.facility_mgmt.controllers.facility_approve_list
     *
     * @description
     * Handles listing of facilities that are pending approval
     */
    .controller("mfl.facility_mgmt.controllers.facility_approve_list",
        ["$scope", function ($scope) {
            $scope.title = { "name": "Approved Facilities", "icon": "fa-building" };
            $scope.filters = {
                "approved": true,
                "rejected": false,
                "fields": "id,code,official_name,facility_type_name,owner_name,county," +
                          "sub_county,constituency,ward_name,updated," +
                          "operation_status_name,date_requested,date_approved"
            };
        }]
    )

    /*
     * @ngdoc controller
     *
     * @name mfl.facility_mgmt.controllers.regulator_sync
     *
     * @description
     * Handles listing of facilities pending synchronization with regulators
     */
    .controller("mfl.facility_mgmt.controllers.regulator_sync",
        ["$scope", "mfl.auth.services.login", function ($scope, loginUser) {
            $scope.title = { "name": "Synchronize Regulated Facilities" };
            $scope.filters = {
                "mfl_code_null": true,
                "county": _.pluck(loginUser.getUser().user_counties, "county_code"),
                "fields": "id,name,regulatory_body_name,registration_number," +
                          "facility_type_name,owner_name,probable_matches,mfl_code"
            };
        }]
    )

    /*
     * @ngdoc controller
     *
     * @name mfl.facility_mgmt.controllers.facilities_feedback
     *
     * @description
     * Handles listing of facility service feedback
     */
    .controller("mfl.facility_mgmt.controllers.facilities_feedback",
        ["$scope", "$stateParams", function ($scope, $stateParams) {
            $scope.filters = {
                "fields": "comment,facility_id,facility_name,service_name,created,rating"
            };
            if ($stateParams.facility_id) {
                $scope.filters.facility = $stateParams.facility_id;
            }
        }]
    );

})(window.angular, window._);
