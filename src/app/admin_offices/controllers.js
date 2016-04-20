(function(angular, _){
    "use strict";

    angular.module("mfl.admin_offices.controllers",[
        "mfl.admin_offices.services",
        "angular-toasty",
        "mfl.common.filters"
    ])

    .controller("mfl.admin_offices.controllers.list",
        ["$scope", function ($scope) {
            $scope.title = {
                "name": "All Admin Offices",
                "icon": "fa-hospital-o"
            };
            $scope.filters = {
                "fields": "id,county,county_name,sub_county,sub_county_name,"+
                          "first_name,last_name,job_title_name,email,"+
                          "phone_number,is_national"
            };
        }]
    )
    .controller("mfl.admin_offices.controllers.create",
        ["$scope","mfl.admin_offices.services.wrappers","toasty",
        "$state", "$stateParams","mfl.auth.services.login",
        function ($scope, wrappers, toasty, $state, $stateParams, loginService) {
            $scope.title = {
                "name": "New Admin Office"
            };
            $scope.logged_in_user = loginService.getUser();

            var filter_fields = {
                fields: "county,sub_county,job_title"
            };
            var admin_office_id = $stateParams.admin_office_id;

            if(!_.isUndefined(admin_office_id)){
                $scope.create = false;

                wrappers.admin_offices.get(admin_office_id)
                .success(function(data){
                    $scope.admin_office = data;
                })
                .error(function(data){
                    $scope.errors = data;
                });

            }
            else{
                $scope.create = true;
            }


            $scope.$watch("admin_office", function (newVal) {
                if(!_.isUndefined(newVal)){
                    $scope.select_values = {
                        county: {
                            "id": $scope.admin_office.county || null,
                            "name": $scope.admin_office.county_name || null
                        },
                        sub_county: {
                            "id": $scope.admin_office.sub_county || null,
                            "name": $scope.admin_office.sub_county_name || null
                        },
                        job_title: {
                            "id": $scope.admin_office.job_title || null,
                            "name": $scope.admin_office.job_title_name || null
                        }
                    };
                }
            });
            $scope.select_values = {
                county: {
                    "id": null,
                    "name": null
                },
                sub_county: {
                    "id": null,
                    "name": null
                },
                job_title: {
                    "id": null,
                    "name": null
                }
            };

            $scope.subFilter = function (a) {
                return a.county === $scope.select_values.county;
            };

            wrappers.filter_summaries.filter(filter_fields)
            .success(function(data){
                $scope.config_info = data;
            })
            .error(function(data){
                $scope.errors = data;
            });

            $scope.save_admin_office = function(){
                var admin_office_data = {};

                admin_office_data.county = $scope.select_values.county;
                admin_office_data.sub_county = $scope.select_values.sub_county;
                admin_office_data.first_name = $scope.admin_office.first_name;
                admin_office_data.last_name = $scope.admin_office.last_name;
                admin_office_data.job_title = $scope.select_values.job_title;
                admin_office_data.is_national = $scope.admin_office.is_national;
                admin_office_data.email = $scope.admin_office.email;
                admin_office_data.phone_number = $scope.admin_office.phone_number;

                if(!_.isUndefined($scope.select_values.county.id)){
                    admin_office_data.county = $scope.select_values.county.id;
                }
                if(!_.isUndefined($scope.select_values.sub_county.id)){
                    admin_office_data.sub_county = $scope.select_values.sub_county.id;
                }
                if(!_.isUndefined($scope.select_values.job_title.id)){
                    admin_office_data.job_title = $scope.select_values.job_title.id;
                }

                if($scope.create){
                    wrappers.admin_offices.create(admin_office_data)
                    .success(function(){
                        toasty.success({
                            title: "Admin Office Creation",
                            msg: "Office successfully created"
                        });
                        $state.go("admin_offices");
                    })
                    .error(function(data){
                        $scope.errors = data;
                    });
                }
                else{
                    wrappers.admin_offices.update(admin_office_id, admin_office_data)
                    .success(function(){
                        toasty.success({
                            title: "Admin Office Creation",
                            msg: "Office successfully updated"
                        });
                        $state.go("admin_offices");
                    })
                    .error(function(data){
                        $scope.errors = data;
                    });
                }

            };
        }]
    );


})(window.angular, window._);
