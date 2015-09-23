(function(angular, _){
    "use strict";

    angular.module("mfl.chul.controllers.edit", [])

    .controller("mfl.chul.controllers.edit_chul", ["$scope",
        "mfl.chul.services.wrappers", "$stateParams",
        function ($scope, wrappers, $stateParams) {
            $scope.create = false;
            wrappers.chuls.get($stateParams.unit_id)
            .success(function (data) {
                $scope.unit = data;
                $scope.select_values = {
                    facility: {
                        "id": $scope.unit.facility,
                        "name": $scope.unit.facility_name
                    }
                };
                $scope.spinner = false;
            })
            .error(function (data) {
                $scope.spinner = false;
                $scope.error = data;
            });
        }]
    )
    .controller("mfl.chul.controllers.edit_chul.basic", ["$scope",
        "mfl.chul.services.wrappers",
        function ($scope, wrappers) {
            var value = new Date();
            $scope.maxDate = value.getFullYear() + "/" + (value.getMonth()+1) +
            "/" + value.getDate();
            wrappers.unit_status.list()
            .success(function (data) {
                $scope.unit_status = data.results;
            })
            .error(function (data) {
                $scope.errors = data;
            });
            $scope.facility_no = {"page_size" : 100000};
            wrappers.facilities.filter($scope.facility_no)
            .success(function (data) {
                $scope.facilities = data.results;
            })
            .error(function (data) {
                $scope.errors = data;
            });
            wrappers.contact_types.list()
            .success(function (data) {
                $scope.contact_types = data.results;
            })
            .error(function (data) {
                $scope.errors = data;
            });
            $scope.unit_contacts = [
                {
                    contact_type : "",
                    contact : ""
                }
            ];
            $scope.addContact = function () {
                $scope.unit_contacts.push({contact_type: "", contact : ""});
            };
            $scope.removeContact = function (obj) {
                $scope.unit_contacts = _.without($scope.unit_contacts, obj);
            };
        }]
    )
    .controller("mfl.chul.controllers.edit_chul.chews", ["$scope",
        function ($scope) {
            $scope.addChew = function () {
                $scope.unit.health_unit_workers.push({
                    "first_name" : "",
                    "last_name" : "",
                    "id_number" : "",
                    "is_incharge" : ""
                });
            };
            $scope.removeChew = function (obj) {
                $scope.unit.health_unit_workers = _.without(
                    $scope.unit.health_unit_workers, obj);
            };
        }]
    );

})(window.angular, window._);
