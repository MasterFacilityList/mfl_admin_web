(function (angular) {

    "use strict";

    angular.module("mfl.service_mgmt.controllers.services", [
        "mfl.service_mgmt.services",
        "ui.router"
    ])

    .controller("mfl.service_mgmt.controllers.service_list", [angular.noop])

    .controller("mfl.service_mgmt.controllers.service_edit",
        ["$scope", "$state", "$stateParams", "$log", "mfl.service_mgmt.wrappers",
        function ($scope, $state, $stateParams, $log, wrappers) {
            $scope.create = false;
            $scope.service_id = $stateParams.service_id;
            wrappers.services.get($scope.service_id).success(function (data) {
                $scope.service = data;
                $scope.deleteText = $scope.service.name;
            }).error(function (data) {
                $log.warn(data);
            });
            $scope.remove = function () {
                wrappers.services.remove($scope.service_id).success(function(){
                    $state.go("service_mgmt.service_list",{},{reload:true});
                }).error(function(error){
                    $scope.alert = error.error;
                });
            };
            $scope.cancel = function () {
                $state.go("service_mgmt.service_list.service_edit");
            };
        }
    ])

    .controller("mfl.service_mgmt.controllers.service_edit.basic",
        ["$scope", "$state", "$log", "mfl.service_mgmt.wrappers", "mfl.common.forms.changes",
        function ($scope, $state, $log, wrappers, forms) {
            wrappers.categories.filter({page_size: 1000}).success(function (data) {
                $scope.categories = data.results;
            }).error(function (data) {
                $log.warn(data);
            });
            $scope.save = function (frm) {
                var changed = forms.whatChanged(frm);

                if (! _.isEmpty(changed)) {
                    wrappers.services.update($scope.service_id, changed)
                        .success(function () {
                            $state.go(
                                "service_mgmt.service_list",
                                {"service_id": $scope.service_id},
                                {reload: true}
                            );
                        });
                }
            };
        }
    ])

    .controller("mfl.service_mgmt.controllers.service_edit.options",
        ["$scope", "$state", "$log", "mfl.service_mgmt.wrappers",
        function ($scope, $state, $log, wrappers) {
            $scope.service_options = [];
            $scope.$parent.tab = 2;
            $scope.options = [];
            $scope.new_option_id = "";
            $scope.service_id = $scope.service_id || $state.params.service_id;
            wrappers.options.filter({page_size: 1000}).success(function (data) {
                $scope.options = data.results;
            }).error(function (data) {
                $log.warn(data);
            });
            wrappers.service_options.filter({page_size: 1000, service: $scope.service_id})
            .success(function (data) {
                $scope.service_options = data.results;
            })
            .error(function (data) {
                $log.warn(data);
            });

            $scope.addOption = function () {
                $scope.spinner = true;
                var data = {
                    "service": $scope.service_id,
                    "option": $scope.new_option_id
                };
                wrappers.service_options.create(data)
                .success(function (data) {
                    $scope.spinner = false;
                    $scope.service_options.push(data);
                    $scope.new_option_id = "";
                })
                .error(function (data) {
                    $scope.spinner = false;
                    $log.warn(data);
                });
            };
            $scope.removeChild = function (service_opt) {
                wrappers.service_options.remove(service_opt.id)
                .success(function () {
                    $scope.service_options = _.without($scope.service_options, service_opt);
                })
                .error(function (data) {
                    $log.warn(data);
                });
            };
            $scope.cancel= function(){
                $state.go("service_mgmt.service_list.service_edit.options");
            };
        }
    ])

    .controller("mfl.service_mgmt.controllers.service_create",
        ["$scope", "$state", "$stateParams", "$log", "mfl.service_mgmt.wrappers",
        function ($scope, $state, $stateParams, $log, wrappers) {
            $scope.create = true;
            $scope.tab = 0;
            $scope.service = wrappers.newService();
            wrappers.categories.filter({page_size: 1000}).success(function (data) {
                $scope.categories = data.results;
            }).error(function (data) {
                $log.warn(data);
            });

            $scope.new_service = $state.params.service_id;
            $scope.tabState = function (val) {
                if(!_.isEmpty($state.params.service_id) ||
                    $scope.tab >= val && val === 2) {
                    $scope.tab = val;
                    $state.go("service_mgmt.service_list.service_create.options",
                        {service_id : $scope.new_service});
                }
                if($scope.tab <= val && val === 1) {
                    $scope.tab = val;
                    $state.go("service_mgmt.service_list.service_create.basic",
                        {service_id : $scope.new_service});
                }
            };
        }
    ])

    .controller("mfl.service_mgmt.controllers.service_create.basic",[
        "$scope", "$state","mfl.service_mgmt.wrappers",
        "mfl.common.forms.changes",
        function ($scope, $state, wrappers, formChanges) {
            $scope.$parent.tab = 1;
            if(!_.isEmpty($state.params.service_id)) {
                wrappers.services.get($state.params.service_id)
                .success(function (data) {
                    $scope.service = data;
                })
                .error(function (data) {
                    $log.warn(data);
                });
            }
            $scope.save = function (frm) {
                if(!_.isEmpty($state.params.service_id)) {
                    var changes = formChanges.whatChanged(frm);

                    if (! _.isEmpty(changes)) {
                        wrappers.services.update(
                            $state.params.service_id, changes)
                        .success(function () {
                            $state.go("service_mgmt.service_list.service_create.options",
                                {service_id : $state.params.service_id});
                        })
                        .error (function (err) {
                            $scope.alert = err.error;
                        });
                    }
                    else {
                        $state.go("service_mgmt.service_list.service_create.options",
                                {user_id : $state.params.user_id});
                    }
                }
                else {
                    console.log("param undefined");
                    wrappers.services.create($scope.service)
                    .success(function (data) {
                        $state.go(
                            "service_mgmt.service_list.service_create.options",
                            {"service_id": data.id},
                            {reload: true}
                        );
                    });
                }
            };
        }
    ]);

})(angular);
