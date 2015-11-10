(function (angular) {
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.facilities.controllers
     *
     * @description
     * Contains all the controllers used for gis
     */
    angular.module("mfl.setup.gis.controllers", [
        "ui.router",
        "mfl.setup.api"
    ])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.geocode_methods_list
     *
     * @description
     * The controller used to list geocode methods
     */
    .controller("mfl.setup.gis.controllers.geocode_methods_list", ["$scope", function ($scope) {
        $scope.title = {
            icon: "fa-crosshairs",
            name: "GeoCode Methods"
        };

        $scope.filters =  {
            "fields": "id,name,description"
        };
        $scope.action = [
            {
                func : "ui-sref='setup.geocode_methods_list.geocode_methods_create'" +
                       " requires-user-feature='is_staff'" +
                       " requires-permission='mfl_gis.add_geocodemethod'",
                class: "btn btn-primary",
                tipmsg: "Add geocode method",
                wording: "Add Geocode Method"
            }
        ];
    }])


    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.geocode_methods_create
     *
     * @description
     * The controller used to create geocode methods
     */
    .controller("mfl.setup.gis.controllers.geocode_methods_create",
        ["$scope", "adminApi", "$log", "$state","toasty",
         function ($scope, adminApi, $log, $state,toasty) {
            $scope.title = {
                icon: "fa-plus-circle",
                name: "New GeoCode Method"
            };
            $scope.geocode_method = {
                name: "",
                description: ""
            };
            $scope.save = function () {
                adminApi.geocode_methods.create($scope.geocode_method)
                .success(function () {
                    toasty.success({
                        title: "Geocode Method Added",
                        msg: "Geocode method has been added"
                    });
                    $state.go(
                        "setup.geocode_methods_list",
                        {reload: true});
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.errors = data;
                });
            };
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.geocode_methods_edit
     *
     * @description
     * The controller used to view/edit geocode methods
     */
    .controller("mfl.setup.gis.controllers.geocode_methods_edit",
        ["$scope", "$state", "$log", "$stateParams", "adminApi","toasty",
        function ($scope, $state, $log, $stateParams, adminApi, toasty) {
            $scope.geocode_method_id = $stateParams.geocode_method_id;
            $scope.wrapper = adminApi.geocode_methods;

            $scope.title = {
                icon: "fa-edit",
                name: "Edit GeoCode Method"
            };
            $scope.action = [
                {
                    func :"id='gm_del_btn' "+
                    "ui-sref='setup.geocode_methods_list.geocode_methods_edit" +
                    ".geocode_methods_delete({"+
                        "geocode_method_id:geocode_method.id})'" +
                       " requires-user-feature='is_staff'" +
                       " requires-permission='mfl_gis.delete_geocodemethod'",
                    class: "btn btn-danger",
                    wording: "Delete",
                    tipmsg: "Delete Geocode Method"
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
                    toasty.success({
                        title: "Geocode Method Updated",
                        msg: "Geocode method has been updated"
                    });
                    $state.go("setup.geocode_methods_list");
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.errors = data;
                });
            };
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.geocode_methods_create
     *
     * @description
     * The controller used to create geocode methods
     */
    .controller("mfl.setup.gis.controllers.geocode_methods_delete",
        ["$scope", "$state", "$log", "$stateParams", "adminApi","toasty",
        function ($scope, $state, $log, $stateParams, adminApi, toasty) {
            $scope.geocode_method_id = $stateParams.geocode_method_id;
            $scope.title = {
                name: "Delete GeoCode Method"
            };
            adminApi.geocode_methods.get($scope.geocode_method_id)
            .success(function (data) {
                $scope.geocode_method = data;
                $scope.deleteText = $scope.geocode_method.name;
            })
            .error(function (data) {
                $log.error(data);
            });

            $scope.remove = function () {
                adminApi.geocode_methods.remove($scope.geocode_method_id)
                .success(function () {
                    toasty.success({
                        title: "Geocode Method Deleted",
                        msg: "Geocode method has been deleted"
                    });
                    $state.go("setup.geocode_methods_list");
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.errors = data;
                });
            };
            $scope.cancel = function () {
                $state.go("setup.geocode_methods_list.geocode_methods_edit");
            };
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.geocode_sources_list
     *
     * @description
     * The controller used to list geocode sources
     */
    .controller("mfl.setup.gis.controllers.geocode_sources_list", ["$scope", function ($scope) {
        $scope.title = {
            icon : "fa-compass",
            name: "GeoCode Sources"
        };

        $scope.filters =  {
            "fields": "id,name,abbreviation,description"
        };
        $scope.action = [
            {
                func : "ui-sref='setup.geocode_sources_list.geocode_sources_create'" +
                       " requires-user-feature='is_staff'" +
                       " requires-permission='mfl_gis.add_geocodesource'",
                class: "btn btn-primary",
                wording: "Add Geocode Sources"
            }
        ];
    }])

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.geocode_sources_create
     *
     * @description
     * The controller used to create geocode sources
     */
    .controller("mfl.setup.gis.controllers.geocode_sources_create",
        ["$scope", "adminApi", "$log", "$state","toasty",
         function ($scope, adminApi, $log, $state, toasty) {
            $scope.title = {
                icon: "fa-plus-circle",
                name: "New GeoCode Source"
            };
            $scope.geocode_source = {
                name: "",
                abbreviation: "",
                description: ""
            };
            $scope.save = function () {
                adminApi.geocode_sources.create($scope.geocode_source)
                .success(function () {
                    toasty.success({
                        title: "Geocode Source Added",
                        msg: "Geocode source has been added"
                    });
                    $state.go(
                        "setup.geocode_sources_list", {reload: true});
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.errors = data;
                });
            };
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.geocode_sources_edit
     *
     * @description
     * The controller used to edit geocode sources
     */
    .controller("mfl.setup.gis.controllers.geocode_sources_edit",
        ["$scope", "$state", "$log", "$stateParams", "adminApi","toasty",
        function ($scope, $state, $log, $stateParams, adminApi, toasty) {
            $scope.geocode_source_id = $stateParams.geocode_source_id;
            $scope.wrapper = adminApi.geocode_sources;

            $scope.title = {
                icon: "fa-edit",
                name: "Edit GeoCode Source"
            };
            $scope.action = [
                {
                    func : "ui-sref='setup.geocode_sources_list.geocode_sources_edit." +
                    "geocode_sources_delete({"+
                        "geocode_source_id:geocode_source.id})'" +
                       " requires-user-feature='is_staff'" +
                       " requires-permission='mfl_gis.delete_geocodesource'",
                    class: "btn btn-danger",
                    wording: "Delete",
                    tipmsg: "Delete Geocode Source"
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
                    toasty.success({
                        title: "Geocode Source Updated",
                        msg: "Geocode source has been updated"
                    });
                    $state.go("setup.geocode_sources_list");
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.errors = data;
                });
            };
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.setup.controller.geocode_sources_delete
     *
     * @description
     * The controller used to delete geocode sources
     */
    .controller("mfl.setup.gis.controllers.geocode_sources_delete",
        ["$scope", "$state", "$log", "$stateParams", "adminApi","toasty",
        function ($scope, $state, $log, $stateParams, adminApi, toasty) {
            $scope.geocode_source_id = $stateParams.geocode_source_id;
            $scope.title = {
                name: "Delete GeoCode Source"
            };

            adminApi.geocode_sources.get($scope.geocode_source_id)
            .success(function (data) {
                $scope.geocode_source = data;
                $scope.deleteText = $scope.geocode_source.name;
            })
            .error(function (data) {
                $log.error(data);
            });
            $scope.remove = function () {
                adminApi.geocode_sources.remove($scope.geocode_source_id)
                .success(function () {
                    toasty.success({
                        title: "Geocode Source Deleted",
                        msg: "Geocode source has been deleted"
                    });
                    $state.go("setup.geocode_sources_list");
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.errors = data;
                });
            };
            $scope.cancel = function () {
                $state.go("setup.geocode_sources_list.geocode_sources_edit");
            };
        }]
    );

})(window.angular);
