(function(angular,_){
    "use strict";
    angular.module("mfl.setup.constituency.controllers",[
        "mfl.setup.api"
    ])

    .controller("mfl.setup.controller.constituency.list", ["$scope",
        function ($scope) {
            $scope.filters = {
                "fields": "id,name,code"
            };
            $scope.title = {
                icon: "fa-map-marker",
                name: "Constituencies"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.constituencies.create'" +
                           " requires-user-feature='is_staff'",// +
                        //    " requires-permission='common.add_county'",
                    class: "btn btn-primary",
                    tipmsg: "Add Constituency",
                    wording: "Add Constituency"
                }
            ];
        }]
    )

    .controller("mfl.setup.controller.constituency.create", ["$scope",
        "adminApi","$state",
        function ($scope, adminApi,$state) {
            //update constituency
            $scope.saveFrm = function (frm) {
                adminApi.constituencies.create(frm)
                    .success(function () {
                        $state.go("setup.constituencies");
                    })
                    .error(function (error) {
                        $scope.errors = error;
                    });
            };
            adminApi.counties.filter({"page_size":100})
                .success(function(data){
                    $scope.counties = data.results;
                })
                .error(function (data) {
                    $scope.errors = data;
                });
        }
    ])
    .controller("mfl.setup.controller.constituency.details", ["$scope",
        "$stateParams", "adminApi","mfl.common.forms.changes","$state",
        function ($scope, $stateParams, adminApi, formChanges,$state) {
            adminApi.constituencies.get($stateParams.const_id)
                .success(function (data) {
                    $scope.const_details = data;
                    $scope.select_values = {
                        county: {
                            "id": $scope.const_details.county,
                            "name": $scope.const_details.county_name
                        }
                    };
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });
            //update constituency
            $scope.saveFrm = function (frm) {
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.counties.update($stateParams.const_id)
                        .success(function () {
                            $state.go("setup.constituencies");
                        })
                        .error(function (error) {
                            $scope.errors = error;
                        });
                }
            };
            adminApi.counties.filter({"page_size":100})
                .success(function(data){
                    $scope.counties = data.results;
                })
                .error(function (data) {
                    $scope.errors = data;
                });
            adminApi.wards.filter({"constituency" : $stateParams.const_id})
                .success(function (data) {
                    $scope.const_wards = data.results;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });
        }
    ]);

})(window.angular, window._);
