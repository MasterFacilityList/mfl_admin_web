(function(angular, _) {
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.wards.controllers
     *
     * @description
     * Contains all the controllers used for ward setup
     */
    angular.module("mfl.setup.ward.controllers",[
        "mfl.setup.api"
    ])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.ward.list
     *
     * @description
     * The controller used to list wards
     */
    .controller("mfl.setup.controller.ward.list", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-map-marker",
                name: "Wards"
            };
            $scope.filters = {
                "fields": "id,name,code,county_name,constituency_name,sub_county_name,"+
                "county"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.wards.create'" +
                           " requires-user-feature='is_staff'",// +
                        //    " requires-permission='common.add_ward'",
                    class: "btn btn-primary",
                    tipmsg: "Add Ward",
                    wording: "Add Ward"
                }
            ];
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.ward.edit
     *
     * @description
     * The controller used to create/edit wards
     */
    .controller("mfl.setup.controller.ward.edit", ["$scope","adminApi","$stateParams",
        "mfl.common.forms.changes","$state","toasty",
        function ($scope,adminApi,$stateParams,formChanges,$state,toasty) {
            $scope.select_values = {
                constituency: {},
                sub_county: {},
                county: {}
            };
            $scope.ward_id = $stateParams.ward_id;
            $scope.wrapper = adminApi.wards;

            if(!_.isUndefined($stateParams.ward_id)){
                $scope.state =  true;
                adminApi.wards.get($stateParams.ward_id)
                .success(function (data) {
                    $scope.ward_details =  data;
                    $scope.select_values = {
                        constituency: {
                            "id": $scope.ward_details.constituency,
                            "name": $scope.ward_details.constituency_name
                        },
                        sub_county: {
                            "id": $scope.ward_details.sub_county,
                            "name": $scope.ward_details.sub_county_name
                        },
                        county: {
                            "id": $scope.ward_details.county.id,
                            "name": $scope.ward_details.county.name
                        }
                    };
                })
                .error(function (err) {
                    $scope.errors = err;
                });
            } else {
                $scope.state = false;
            }
            $scope.autofillCounty = function (constituency_id){
                var new_county = _.findWhere($scope.constituencies, {"id" : constituency_id});
                $scope.ward_details.county_name = new_county.county_name;
            };
            $scope.autofillCountyFromSubCounty = function (sub_county_id){
                var new_county = _.findWhere($scope.sub_counties, {"id" : sub_county_id});
                $scope.ward_details.county_name = new_county.county_name;
            };

            $scope.autofillConstituencyAndSubCounties = function(county_id){

                var sub_counties_to_filter = angular.copy(
                    $scope.original_sub_counties);

                var constituencies_to_filter = angular.copy(
                    $scope.original_consituencies);

                var filtered_sub_counties = _.filter(
                    sub_counties_to_filter, function(sub){
                        return sub.county === county_id;
                    }
                );
                $scope.sub_counties = filtered_sub_counties;

                var filtered_cons = _.filter(
                    constituencies_to_filter, function(con){
                        return con.county === county_id;
                    }
                );
                $scope.constituencies = filtered_cons;
            };

            $scope.filters = {
                "fields":"id,name,county_name,county",
                "page_size":300
            };
            adminApi.constituencies.filter($scope.filters)
                .success(function(data){
                    $scope.constituencies = data.results;
                    $scope.original_consituencies = data.results;
                })
                .error(function (data) {
                    $scope.errors = data;
                });
            adminApi.sub_counties.filter($scope.filters)
                .success(function(data){
                    $scope.sub_counties = data.results;
                    $scope.original_sub_counties = data.results;
                })
                .error(function (data) {
                    $scope.errors = data;
                });

            adminApi.counties.filter($scope.filters)
                .success(function(data){
                    $scope.counties = data.results;
                })
                .error(function (data) {
                    $scope.errors = data;
                });

            $scope.saveFrm = function (frm) {
                if(_.isUndefined($stateParams.ward_id)){
                    //create ward
                    adminApi.wards.create({"name": frm.name,
                       "constituency": $scope.select_values.constituency,
                       "sub_county": $scope.select_values.sub_county})
                    .success(function () {
                        toasty.success({
                            title: "Ward Added",
                            msg: "Ward has been added"
                        });
                        $state.go("setup.wards");
                    })
                    .error(function (error) {
                        $scope.errors = error;
                    });
                } else {
                    //update ward
                    var changes= formChanges.whatChanged(frm);
                    if(!_.isEmpty(changes)){
                        adminApi.wards.update($stateParams.ward_id,changes)
                        .success(function () {
                            toasty.success({
                                title: "Ward Updated",
                                msg: "Ward has been updated"
                            });
                            $state.go("setup.wards");
                        })
                        .error(function (error) {
                            $scope.errors = error;
                        });
                    }
                }
            };
        }]
    );
})(window.angular, window._);
