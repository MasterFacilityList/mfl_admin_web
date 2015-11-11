(function(angular, _){
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.sub_counties.controllers
     *
     * @description
     * Contains all the controllers used for sub_counties setup
     */
    angular.module("mfl.setup.sub_counties.controllers",[
        "mfl.setup.api"
    ])


    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.sub_counties.list
     *
     * @description
     * The controller used to list sub_counties
     */
    .controller("mfl.setup.controller.sub_counties.list", ["$scope",
        function ($scope) {
            $scope.filters = {
                "fields": "id,name,code,county_name"
            };
            $scope.title = {
                icon: "fa-map-marker",
                name: "Sub Counties"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.sub_counties.create'" +
                           " requires-user-feature='is_staff'"+
                           " requires-permission='common.add_subcounty'",
                    class: "btn btn-primary",
                    tipmsg: "Add Sub County",
                    wording: "Add Sub County"
                }
            ];
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.sub_counties.edit
     *
     * @description
     * The controller used to create/edit sub_counties
     */
    .controller("mfl.setup.controller.sub_counties.edit", ["$scope",
        "$stateParams", "adminApi","$state","mfl.common.forms.changes","toasty",
        function ($scope, $stateParams, adminApi,$state,formChanges, toasty) {
            $scope.select_values = {
                county : {}
            };
            $scope.sub_county_id = $stateParams.scount_id;
            $scope.wrapper = adminApi.sub_counties;

            if(_.isUndefined($stateParams.scount_id)){
                $scope.state = false;
            } else {
                $scope.state = true;
                adminApi.sub_counties.get($stateParams.scount_id)
                    .success(function (data) {
                        $scope.scount_details = data;
                        $scope.deleteText = $scope.scount_details.county_name;
                        $scope.select_values = {
                            county: {
                                "id": $scope.scount_details.county,
                                "name": $scope.scount_details.county_name
                            }
                        };
                    }).error(function (err) {
                        $scope.alert = err.error;
                    });
            //update sub county
            }
            $scope.saveFrm = function (frm) {
                if(_.isUndefined($stateParams.scount_id)){
                    //create scounty
                    adminApi.sub_counties.create({"name": frm.name,
                       "county": $scope.select_values.county})
                    .success(function () {
                        toasty.success({
                            title: "Sub County Added",
                            msg: "Sub county has been added"
                        });
                        $state.go("setup.sub_counties");
                    })
                    .error(function (error) {
                        $scope.errors = error;
                    });
                } else {
                    //update scounty
                    var changes= formChanges.whatChanged(frm);
                    if(!_.isEmpty(changes)){
                        adminApi.sub_counties.update($stateParams.scount_id,changes)
                        .success(function () {
                            toasty.success({
                                title: "Sub County Updated",
                                msg: "Sub county has been updated"
                            });
                            $state.go("setup.sub_counties");
                        })
                        .error(function (error) {
                            $scope.errors = error;
                        });
                    }
                }
            };
            $scope.remove = function () {
                adminApi.sub_counties.remove($stateParams.scount_id).success(function(){
                    toasty.success({
                        title: "Sub County Deleted",
                        msg: "Sub County has been updated"
                    });
                    $state.go("setup.sub_counties");
                }).error(function(error){
                    $scope.alert = error.error;
                    $state.go("setup.sub_counties");
                });
            };
            $scope.cancel = function () {
                $state.go("setup.sub_counties");
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
        }]);

})(window.angular, window._);
