(function(angular){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.list", [])

    .controller("mfl.facility_mgmt.controllers.facility_list",
        ["$scope", function ($scope) {
            $scope.title = {
                "name": "All Facilities",
                "icon": "fa-building"
            };
            $scope.filters = {
                "rejected": false,
                "fields": "id,code,name,facility_type_name,owner_name,county,"+
                          "sub_county,constituency,ward_name,updated"
            };
            $scope.action = [
                {
                    func : "ui-sref='facilities.facility_create({furthest : 1})'" +
                           "requires-permission='facilities.add_facility'",
                    class: "mfl-btn mfl-btn-primary",
                    tipmsg: "Add Facility",
                    icon: "",
                    wording : " Add Facility"
                }
            ];
        }]
    );

})(window.angular);
