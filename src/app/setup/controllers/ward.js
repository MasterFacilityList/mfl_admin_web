(function(angular, _) {
    "use strict";
    angular.module("mfl.setup.ward.controllers",[
        "mfl.setup.api"
    ])
    .controller("mfl.setup.controller.ward.list", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-map-marker",
                name: "Wards"
            };
            $scope.filters = {
                "fields": "id,name,code"
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
    .controller("mfl.setup.controller.ward.edit", ["$scope","adminApi","$stateParams",
        "mfl.common.forms.changes","$state",
        function ($scope,adminApi,$stateParams,formChanges,$state) {
            if(!_.isUndefined($stateParams.ward_id)){
                $scope.state =  true;
                adminApi.wards.get($stateParams.ward_id)
                .success(function (data) {
                    $scope.ward_details =  data;
                    $scope.select_values = {
                        constituency: {
                            "id": $scope.ward_details.constituency,
                            "name": $scope.ward_details.constituency_name
                        }
                    };
                })
                .error(function (err) {
                    $scope.errors = err;
                });
            } else {
                $scope.state = false;
            }
            $scope.filters = {
                "fields":"id,name",
                "page_size":300
            };
            adminApi.constituencies.filter($scope.filters)
                .success(function(data){
                    $scope.constituencies = data.results;
                })
                .error(function (data) {
                    $scope.errors = data;
                });
            $scope.saveFrm = function (frm) {
                if(_.isUndefined($stateParams.ward_id)){
                    //create ward
                    adminApi.wards.create(frm)
                    .success(function () {
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
