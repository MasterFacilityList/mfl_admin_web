(function (angular, _) {
    "use strict";

    angular.module("mfl.users.controllers.groups", [
        "mfl.auth.services",
        "mfl.users.services"
    ])

    .controller("mfl.users.controllers.group_list", ["$scope",
        function ($scope) {
            $scope.title = {
                icon: "fa-users",
                name: "Manage groups"
            };
            $scope.action = [
                {
                    func : "ui-sref='groups.group_create' " +
                            "requires-permission='auth.add_group' " +
                            "requires-user-feature='is_staff'",
                    class: "login-btn login-btn-primary",

                    tipmsg: "New Group",
                    icon: "",
                    wording: " Add Group"
                }
            ];
        }
    ])

    .controller("mfl.users.controllers.group_create",
        ["$scope", "$log", "$state", "mfl.users.services.wrappers",
        function ($scope, $log, $state, wrappers) {
            $scope.title = {
                icon : "fa-plus-circle",
                name : "New Group"
            };
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
                if (! _.contains($scope.group.permissions, perm)) {
                    $scope.group.permissions.push(perm);
                }
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
            $scope.title = {
                icon : "fa-edit",
                name : "Edit Group"
            };
            $scope.action = [
                {
                    func : "ui-sref='groups.group_edit.delete' " +
                           "requires-permission='auth.delete_group'"  +
                           "requires-user-feature='is_staff'",
                    class: "login-btn login-btn-danger",
                    tipmsg: "Delete Group",
                    wording: "Delete"
                }
            ];
            wrappers.groups.get($scope.group_id)
                .success(function (data) {
                    $scope.group = data;
                    $scope.deleteText = $scope.group.name;
                })
                .error(function (data) {
                    $log.error(data);
                });

            $scope.remove = function () {
                wrappers.groups.remove($scope.group_id)
                    .success(function () {
                        $state.go("groups");
                    })
                    .error(function (data) {
                        $log.error(data);
                    });
            };
            $scope.cancel = function () {
                $state.go("groups");
            };
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
                    $state.go("groups");
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.spinner = false;
                });
            };
        }]
    );

})(window.angular, window._);
