(function (angular, _) {
    "use strict";

    angular.module("mfl.users.controllers.groups", [
        "mfl.auth.services",
        "mfl.users.services"
    ])

    .controller("mfl.users.controllers.group_list", ["$scope",
        function ($scope) {
            $scope.title = [
                {
                    icon: "fa-users",
                    name: "Manage groups"
                }
            ];
            $scope.action = [
                {
                    func : "ui-sref='groups.group_create' " +
                            "has-permission='users.add_mfluser' ",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "New Group",
                    icon: "fa-plus"
                }
            ];
        }
    ])

    .controller("mfl.users.controllers.group_create",
        ["$scope", "$log", "$state", "mfl.users.services.wrappers",
        function ($scope, $log, $state, wrappers) {
            $scope.title = [
                {
                    icon : "fa-plus-circle",
                    name : "New Group"
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
            wrappers.permissions.filter({page_size: 500, ordering: "name"})
                .success(function (data) {
                    $scope.permissions = data.results;
                })
                .error(function (data) {
                    $log.error(data);
                });

            $scope.group = {
                name: "",
                permissions: []
            };

            $scope.addPerm = function (perm_id) {
                $scope.new_perm = "";
                var perm = _.findWhere($scope.permissions, {id: parseInt(perm_id, 10)});
                $scope.group.permissions.push(perm);
            };

            $scope.removePerm = function (perm) {
                $scope.group.permissions = _.without($scope.group.permissions, perm);
            };

            $scope.save = function () {
                wrappers.groups.create($scope.group)
                .success(function (data) {
                    $state.go("groups.group_edit", {"group_id": data.id});
                })
                .error(function (data) {
                    $log.error(data);
                });
            };

        }]
    )

    .controller("mfl.users.controllers.group_edit",
        ["$scope", "$log", "$state", "$stateParams", "mfl.users.services.wrappers",
        function ($scope, $log, $state, $stateParams, wrappers) {
            $scope.group_id = $stateParams.group_id;
            $scope.title = [
                {
                    icon : "fa-edit",
                    name : "Edit Group"
                }
            ];
            $scope.action = [
                {
                    func : "ui-sref='groups.group_delete({group_id: group.id})'",
                    class: "action-btn action-btn-danger action-btn-md",
                    color: "blue",
                    tipmsg: "Delete User",
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
            wrappers.groups.get($scope.group_id)
                .success(function (data) {
                    $scope.group = data;
                })
                .error(function (data) {
                    $log.error(data);
                });

            wrappers.permissions.filter({page_size: 500, ordering: "name"})
                .success(function (data) {
                    $scope.permissions = data.results;
                })
                .error(function (data) {
                    $log.error(data);
                });

            $scope.addPerm = function (perm_id) {
                $scope.new_perm = "";
                var perm = _.findWhere($scope.permissions, {id: parseInt(perm_id, 10)});
                if (! _.contains($scope.group.permissions, perm)) {
                    $scope.group.permissions.push(perm);
                }
            };

            $scope.removePerm = function (perm) {
                $scope.group.permissions = _.without($scope.group.permissions, perm);
            };

            $scope.save = function () {
                $scope.spinner = true;
                wrappers.groups.update($scope.group_id, $scope.group)
                .success(function () {
                    $scope.spinner = false;
                    $state.go("groups.group_list");
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.spinner = false;
                });
            };
        }]
    )

    .controller("mfl.users.controllers.group_delete",
        ["$scope", "$log", "$state", "$stateParams", "mfl.users.services.wrappers",
        function ($scope, $log, $state, $stateParams, wrappers) {
            $scope.group_id = $stateParams.group_id;

            wrappers.groups.get($scope.group_id)
                .success(function (data) {
                    $scope.group = data;
                })
                .error(function (data) {
                    $log.error(data);
                });

            $scope.remove = function () {
                wrappers.groups.remove($scope.group_id)
                    .success(function () {
                        $state.go("groups.group_list");
                    })
                    .error(function (data) {
                        $log.error(data);
                    });
            };
        }]
    );

})(angular, _);
