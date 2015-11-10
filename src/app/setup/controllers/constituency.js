(function(angular,_){
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.constituency.controllers
     *
     * @description
     * Contains all the controllers used for constituency setup
     */
    angular.module("mfl.setup.constituency.controllers",[
        "mfl.setup.api"
    ])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.constituency.list
     *
     * @description
     * The controller used to list the constituencies
     */
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

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.constituency.create
     *
     * @description
     * The controller used to create a constituency
     */
    .controller("mfl.setup.controller.constituency.create", ["$scope",
        "adminApi","$state","toasty",
        function ($scope, adminApi,$state,toasty) {
            //update constituency
            $scope.saveFrm = function (frm) {
                adminApi.constituencies.create(frm)
                    .success(function () {
                        toasty.success({
                            title: "Constituency added",
                            msg: "Constituency has been added"
                        });
                        $state.go("setup.constituencies");
                    })
                    .error(function (error) {
                        $scope.errors = error;
                    });
            };
            $scope.filters = {
                "fields":"id,name",
                "page_size":100
            };
            $scope.const_details = {
                county: {
                    "id": null,
                    "name": null
                }
            };
            adminApi.counties.filter($scope.filters)
                .success(function(data){
                    $scope.counties = data.results;
                })
                .error(function (data) {
                    $scope.errors = data;
                });
        }
    ])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.constituency.details
     *
     * @description
     * The controller used for consistuency details
     */
    .controller("mfl.setup.controller.constituency.details", ["$scope",
        "$stateParams", "adminApi","mfl.common.forms.changes","$state","toasty",
        function ($scope, $stateParams, adminApi, formChanges,$state,toasty) {
            $scope.constituency_id = $stateParams.const_id;
            $scope.wrapper = adminApi.constituencies;
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
                    adminApi.constituencies.update($stateParams.const_id,changes)
                        .success(function () {
                            toasty.success({
                                title: "Constituency updated",
                                msg: "Constituency has been updated"
                            });
                            $state.go("setup.constituencies");
                        })
                        .error(function (error) {
                            $scope.errors = error;
                        });
                }
            };
            $scope.filters = {
                "fields":"id,name",
                "page_size":100
            };
            adminApi.counties.filter($scope.filters)
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
