(function (angular, _) {
    "use strict";

    angular.module("mfl.users.controllers.groups", [
        "mfl.auth.services",
        "mfl.users.services",
        "angular-toasty"
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
                    class: "btn btn-primary",

                    tipmsg: "New Group",
                    icon: "",
                    wording: " Add Group"
                }
            ];
            $scope.filters = {
                "fields": "id,name"
            };
        }
    ])

    .controller("mfl.users.controllers.group_create",
        ["$scope", "$log", "$state", "mfl.users.services.wrappers", "toasty",
        function ($scope, $log, $state, wrappers, toasty) {
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
            $scope.wrapper = wrappers.groups;
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
                _.each($scope.group.permissions, function (perm) {
                    delete perm.set_selected;
                    delete perm.selected;
                });
                wrappers.groups.create($scope.group)
                .success(function () {
                    toasty.success({
                        title : "User Groups",
                        msg : "Successfully added new user group"
                    });
                    $state.go("groups");
                })
                .error(function (data) {
                    $log.error(data);
                });
            };

        }]
    )

    .controller("mfl.users.controllers.group_edit",
        ["$scope", "$log", "$state", "$stateParams", "mfl.users.services.wrappers", "toasty",
        function ($scope, $log, $state, $stateParams, wrappers, toasty) {
            $scope.group_id = $stateParams.group_id;
            $scope.edit_view = true;
            $scope.title = {
                icon : "fa-edit",
                name : "Edit Group"
            };
            $scope.action = [
                {
                    func : "ui-sref='groups.group_edit.delete' " +
                           "requires-permission='auth.delete_group'"  +
                           "requires-user-feature='is_staff'",
                    class: "btn btn-danger",
                    tipmsg: "Delete Group",
                    wording: "Delete"
                }
            ];
            $scope.wrapper = wrappers.groups;

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
                        toasty.success({
                            title : "User Groups",
                            msg : "Successfully deleted user group"
                        });
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
                _.each($scope.group.permissions, function (perm) {
                    delete perm.set_selected;
                    delete perm.selected;
                });
                wrappers.groups.update($scope.group_id, $scope.group)
                .success(function () {
                    toasty.success({
                        title : "User Groups",
                        msg : "Successfully updated user group"
                    });
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
