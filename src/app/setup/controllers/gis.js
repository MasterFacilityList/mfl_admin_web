(function (angular) {
    "use strict";

    angular.module("mfl.setup.gis.controllers", [
        "ui.router",
        "mfl.setup.api"
    ])

    .controller("mfl.setup.gis.controllers.geocode_methods_list", ["$scope", function ($scope) {
        $scope.title = [
            {
                icon: "fa-crosshairs",
                name: "GeoCode Methods"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='setup.geocode_methods_list.geocode_methods_create'",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Add geocode method",
                icon: "fa-plus"
            }
        ];
    }])
    .controller("mfl.setup.gis.controllers.geocode_methods_create",
        ["$scope", "adminApi", "$log", "$state", function ($scope, adminApi, $log, $state) {
            $scope.title = [
                {
                    icon: "fa-plus-circle",
                    name: "New GeoCode Method"
                }
            ];
            $scope.action = [
                {
                    func : "onclick='window.history.back()'",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go Back",
                    icon: "fa-arrow-left"
                }
            ];
            $scope.geocode_method = {
                name: "",
                description: ""
            };
            $scope.save = function () {
                adminApi.geocode_methods.create($scope.geocode_method)
                .success(function (data) {
                    $state.go("setup.geocode_methods_edit", {"method_id": data.id});
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )
    .controller("mfl.setup.gis.controllers.geocode_methods_edit",
        ["$scope", "$state", "$log", "$stateParams", "adminApi",
        function ($scope, $state, $log, $stateParams, adminApi) {
            $scope.geocode_method_id = $stateParams.geocode_method_id;
            $scope.title = [
                {
                    icon: "fa-edit",
                    name: "Edit GeoCode Method"
                }
            ];
            $scope.action = [
                {
                    func : "ui-sref='setup.geocode_methods_list.geocode_methods_delete({"+
                        "geocode_method_id:geocode_method.id})'",
                    class: "action-btn action-btn-danger action-btn-md",
                    color: "blue",
                    tipmsg: "Delete Town",
                    icon: "fa-trash"
                },
                {
                    func : "onclick='window.history.back()'",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go Back",
                    icon: "fa-arrow-left"
                }
            ];
            adminApi.geocode_methods.get($scope.geocode_method_id)
            .success(function (data) {
                $scope.geocode_method = data;
            })
            .error(function (data) {
                $log.error(data);
            });

            $scope.save = function () {
                var p = {
                    name: $scope.geocode_method.name,
                    description: $scope.geocode_method.description
                };
                adminApi.geocode_methods.update($scope.geocode_method_id, p)
                .success(function () {
                    $state.go("setup.geocode_methods_list");
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )
    .controller("mfl.setup.gis.controllers.geocode_methods_delete",
        ["$scope", "$state", "$log", "$stateParams", "adminApi",
        function ($scope, $state, $log, $stateParams, adminApi) {
            $scope.geocode_method_id = $stateParams.geocode_method_id;
            $scope.title = [
                {
                    name: "Delete GeoCode Method"
                }
            ];
            $scope.action = [
                {
                    func : "onclick='window.history.back()'",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go Back",
                    icon: "fa-arrow-left"
                }
            ];
            adminApi.geocode_methods.get($scope.geocode_method_id)
            .success(function (data) {
                $scope.geocode_method = data;
            })
            .error(function (data) {
                $log.error(data);
            });

            $scope.remove = function () {
                adminApi.geocode_methods.remove($scope.geocode_method_id)
                .success(function () {
                    $state.go("setup.geocode_methods_list");
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )

    .controller("mfl.setup.gis.controllers.geocode_sources_list", ["$scope", function ($scope) {
        $scope.title = [
            {
                icon : "fa-compass",
                name: "GeoCode Sources"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='setup.geocode_sources_create'",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Add geocode sources",
                icon: "fa-plus"
            }
        ];
    }])
    .controller("mfl.setup.gis.controllers.geocode_sources_create",
        ["$scope", "adminApi", "$log", "$state", function ($scope, adminApi, $log, $state) {
            $scope.title = [
                {
                    icon: "fa-plus-circle",
                    name: "New GeoCode Source"
                }
            ];
            $scope.action = [
                {
                    func : "onclick='window.history.back()'",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go Back",
                    icon: "fa-arrow-left"
                }
            ];
            $scope.geocode_source = {
                name: "",
                abbreviation: "",
                description: ""
            };
            $scope.save = function () {
                adminApi.geocode_sources.create($scope.geocode_source)
                .success(function (data) {
                    $state.go("setup.geocode_sources_edit", {"geocode_source_id": data.id});
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )
    .controller("mfl.setup.gis.controllers.geocode_sources_edit",
        ["$scope", "$state", "$log", "$stateParams", "adminApi",
        function ($scope, $state, $log, $stateParams, adminApi) {
            $scope.geocode_source_id = $stateParams.geocode_source_id;
            $scope.title = [
                {
                    icon: "fa-edit",
                    name: "Edit GeoCode Source"
                }
            ];
            $scope.action = [
                {
                    func : "onclick='window.history.back()'",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go Back",
                    icon: "fa-arrow-left"
                }
            ];
            adminApi.geocode_sources.get($scope.geocode_source_id)
            .success(function (data) {
                $scope.geocode_source = data;
            })
            .error(function (data) {
                $log.error(data);
            });

            $scope.save = function () {
                var p = {
                    "name": $scope.geocode_source.name,
                    "description": $scope.geocode_source.description,
                    "abbreviation": $scope.geocode_source.abbreviation
                };
                adminApi.geocode_sources.update($scope.geocode_source_id, p)
                .success(function () {
                    $state.go("setup.geocode_sources_list");
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )
    .controller("mfl.setup.gis.controllers.geocode_sources_delete",
        ["$scope", "$state", "$log", "$stateParams", "adminApi",
        function ($scope, $state, $log, $stateParams, adminApi) {
            $scope.geocode_source_id = $stateParams.geocode_source_id;
            $scope.title = [
                {
                    name: "Delete GeoCode Source"
                }
            ];

            adminApi.geocode_sources.get($scope.geocode_source_id)
            .success(function (data) {
                $scope.geocode_source = data;
            })
            .error(function (data) {
                $log.error(data);
            });

            $scope.remove = function () {
                adminApi.geocode_sources.remove($scope.geocode_source_id)
                .success(function () {
                    $state.go("setup.geocode_sources_list");
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )
    ;

})(angular);
