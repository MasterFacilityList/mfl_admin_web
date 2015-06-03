(function (angular, _) {
    "use strict";

    angular.module("mfl.users.controllers.roles", [
        "mfl.auth.services",
        "mfl.users.services"
    ])

    .controller("mfl.users.controllers.role", ["$scope",
        function ($scope) {
            $scope.test = "Roles";
            $scope.title = [
                {
                    icon: "fa-users",
                    name: "Manage roles"
                }
            ];
            $scope.action = [
                {
                    func : "ui-sref='users.new_role' " +
                            "has-permission='users.add_mfluser' ",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "New Role",
                    icon: "fa-plus"
                },
                {
                    func : "onclick=window.history.back()",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go back",
                    icon: "fa-arrow-left"
                }
            ];
        }
    ])

    .controller("mfl.users.controllers.new_role", ["$scope", "mfl.users.wrappers", "$state",
        function ($scope, wrappers, $state) {
            $scope.test = "New role";
            $scope.permissions = "";
            $scope.title = [
                {
                    icon: "fa-plus-circle",
                    name: "New Role"
                }
            ];
            $scope.action = [
                {
                    func : "onclick=window.history.back()",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go back",
                    icon: "fa-arrow-left"
                }
            ];
            $scope.set_permissions = [];
            $scope.is_set = false;
            $scope.all_permissions = {
                page_size : 1500
            };
            wrappers.permissions.filter($scope.all_permissions)
                .success(function (data) {
                    $scope.permissions = data.results;
                })
                .error(function (e) {
                    console.log(e);
                });
            //setting params to change classes on click
            $scope.clickedPermission = function(item){
                item.selected = !item.selected;
                // other oeprations
            };
            $scope.setPermission = function(set_item){
                set_item.set_selected = !set_item.set_selected;
                // other oeprations
            };
            //end of setting up ng-click classes
            //adding permissions to the role
            $scope.addPermissions = function () {
                var selected_perms = _.where(
                    $scope.permissions, {"selected": true}
                );
                _.each(selected_perms, function (a_perm) {
                    a_perm.set_selected = false;
                    $scope.set_permissions.push(a_perm);
                    $scope.is_set = true;
                    $scope.permissions = _.without($scope.permissions, a_perm);
                });
            };
            //end of adding permissions to a role
            //reverting permissions to the role
            $scope.revertPermissions = function () {
                var reverted_perms = _.where(
                    $scope.set_permissions, {"set_selected": true}
                );
                _.each(reverted_perms, function (a_set_perm) {
                    a_set_perm.selected = false;
                    $scope.permissions.push(a_set_perm);
                    $scope.set_permissions = _.without($scope.set_permissions, a_set_perm);
                });
            };
            //end of reverting permissions to a role

            //adding new permission
            $scope.addRole = function (new_role) {
                _.each($scope.set_permissions, function (permission) {
                    delete permission.selected;
                    delete permission.set_selected;
                    delete permission.content_type;
                });
                new_role.permissions = $scope.set_permissions;
                wrappers.groups.create(new_role)
                    .success(function (role_result) {
                        console.log(role_result);
                        $state.go("users.manage_roles");
                    })
                    .error(function (e) {
                        console.log(e);
                    });
            };
            //end of adding new permission
        }
    ]);

})(angular, _);
