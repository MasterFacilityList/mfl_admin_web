(function(angular, _){
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.county.controllers
     *
     * @description
     * Contains all the controllers used for county setup
     */
    angular.module("mfl.setup.county.controllers",[
        "mfl.setup.api"
    ])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.county.list
     *
     * @description
     * The controller used to list the counties
     */
    .controller("mfl.setup.controller.county.list", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-map-marker",
                name: "Counties"
            };
            $scope.filters = {
                "fields": "id,name,code"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.counties.create'" +
                           " requires-user-feature='is_staff'",// +
                        //    " requires-permission='common.add_county'",
                    class: "btn btn-primary",
                    tipmsg: "Add County",
                    wording: "Add County"
                }
            ];
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.county.view
     *
     * @description
     * The controller used to view/edit a constituency
     */
    .controller("mfl.setup.controller.county.view", ["$scope", "$stateParams",
        "adminApi","mfl.common.forms.changes","$state","toasty",
        function ($scope, $stateParams, adminApi, formChanges,$state,toasty) {
            $scope.spinner = true;
            $scope.county_id = $stateParams.count_id;
            $scope.wrapper = adminApi.counties;

            adminApi.counties.get($stateParams.count_id)
                .success(function (data) {
                    $scope.county_details = data;
                    $scope.title = {
                        icon: "fa-map-marker",
                        name : $scope.county_details.name
                    };
                    $scope.spinner = false;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });
            //update county
            $scope.saveFrm = function (frm) {
                var changes= formChanges.whatChanged(frm);
                if(!_.isEmpty(changes)){
                    adminApi.counties.update($stateParams.count_id,changes)
                        .success(function () {
                            toasty.success({
                                title: "County updated",
                                msg: "County has been updated"
                            });
                            $state.go("setup.counties");
                        })
                        .error(function (error) {
                            $scope.errors = error;
                        });
                }
            };
             //getting counties of particular county
            adminApi.constituencies.filter({"county" : $stateParams.count_id})
                .success(function (data) {
                    $scope.county_constituencies = data.results;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });
            $scope.filter = {"county" : $stateParams.count_id};
            adminApi.county_users.filter({"county" : $stateParams.count_id})
                .success(function (data) {
                    $scope.county_users = data.results;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });
        }
    ])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.county.create
     *
     * @description
     * The controller used to create a constituency
     */
    .controller("mfl.setup.controller.county.create", ["$scope", "$stateParams",
        "adminApi","mfl.common.forms.changes","$state","toasty",
        function ($scope, $stateParams, adminApi, formChanges,$state,toasty) {
            //update county
            $scope.saveFrm = function (frm) {
                adminApi.counties.create(frm)
                    .success(function () {
                        $state.go("setup.counties");
                        toasty.success({
                            title: "County added",
                            msg: "County has been added"
                        });
                    })
                    .error(function (error) {
                        $scope.errors = error;
                    });
            };
        }
    ]);

})(window.angular, window._);
