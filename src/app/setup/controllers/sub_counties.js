(function(angular, _){
    "use strict";
    angular.module("mfl.setup.sub_counties.controllers",[
        "mfl.setup.api"
    ])

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
                           " requires-user-feature='is_staff'",// +
                        //    " requires-permission='common.add_sub_county'",
                    class: "btn btn-primary",
                    tipmsg: "Add Sub County",
                    wording: "Add Sub County"
                }
            ];
        }]
    )

    .controller("mfl.setup.controller.sub_counties.edit", ["$scope",
        "$stateParams", "adminApi","$state","mfl.common.forms.changes",
        function ($scope, $stateParams, adminApi,$state,formChanges) {
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
                            $state.go("setup.sub_counties");
                        })
                        .error(function (error) {
                            $scope.errors = error;
                        });
                    }
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
        }]);

})(window.angular, window._);
