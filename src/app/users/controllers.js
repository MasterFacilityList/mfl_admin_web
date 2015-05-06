"use strict";

angular.module("mfl.users.controllers", [])

    .controller("mfl.users.controllers.home", ["$scope",
        function ($scope) {
            $scope.test = "Manage users";
            $scope.path = [
                {
                    name: "Users",
                    route: "users"
                }
            ];
            $scope.title = [
                {
                    icon: "fa-user",
                    name: "Users"
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
        }
    ])

    .controller("mfl.users.controllers.users", ["$scope",
    function ($scope) {
        $scope.test = "Users";
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.path = [
            {
                name: "Users",
                route: "users"
            },
            {
                name: "Manage users",
                route: "users.manage_users"
            }
        ];
        $scope.title = [
            {
                icon: "fa-users",
                name: "Manage Users"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='users.new_user.basic' " +
                        "has-permission='users.add_mfluser' ",
                class: "action-btn action-btn-success action-btn-md",
                color: "blue",
                tipmsg: "New User",
                icon: "fa-user-plus"
            },
            {
                func : "onclick=window.history.back()",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Go back",
                icon: "fa-arrow-left"
            }
        ];
    }])
    .controller("mfl.users.controllers.new_user", ["$scope", "usersApi",
    "$state",
    function ($scope, userWrapper, $state) {
        $scope.test = "New user";
        $scope.new_user = true;
        $scope.path = [
            {
                name: "Users",
                route: "users"
            },
            {
                name: "Manage users",
                route: "users.manage_users"
            },
            {
                name: "New user",
                route: "users.new_user"
            }
        ];
        $scope.title = [
            {
                icon: "fa-user-plus",
                name: "New user"
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
        $scope.confirm = false;
        $scope.conifrmPassword = function (pass, pass_conf) {
            if(pass !== pass_conf) {
                $scope.confirm = true;
            }
            else {
                $scope.confirm = false;
            }
        };
        $scope.user_contacts = [
            {
                contact_type: "",
                contact : ""
            }
        ];
        $scope.addContact = function () {
            $scope.user_contacts.push({contact_type: "", contact: ""});
        };
        $scope.removeContact = function (obj) {
            $scope.user_contacts = _.without(
                $scope.user_contacts, obj);
        };
        $scope.usr_id = "";
        $scope.addUser = function (user) {
            user.short_name = user.first_name;
            user.full_name = user.first_name + " " + user.last_name;
            userWrapper.api.create(user)
                .success(function (new_usr) {
                    $state.go(
                        "users.new_user.contacts", {user_id : new_usr.id});
                })
                .error(function (e) {
                    console.log(e);
                });
        };
        $scope.addUserContacts = function () {
            console.log($scope.user_contacts);
            $state.go("users.new_user.groups");
        };
    }])
    .controller("mfl.users.controllers.edit_user", ["$scope",
    function ($scope) {
        $scope.test = "Edit user";
        $scope.edit = true;
        $scope.path = [
            {
                name: "Users",
                route: "users"
            },
            {
                name: "Edit user",
                route: "users.edit_user"
            }
        ];
        $scope.title = [
            {
                icon: "fa-edit",
                name: "Edit user"
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
    }])
    .controller("mfl.users.controllers.view_user", ["$scope",
    "mfl.users.services.uses", "$stateParams",
    function ($scope, userService, $stateParams) {
        $scope.test = "View user";
        $scope.path = [
            {
                name: "Users",
                route: "users"
            },
            {
                name: "View user",
                route: "users.view_user"
            }
        ];
        $scope.title = [
            {
                icon: "fa-eye",
                name: "View user"
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
        $scope.users = userService.getUsers();
        $scope.getOneUser = function () {
            $scope.oneUser = _.findWhere(
                $scope.users.results, {"id" : $stateParams.user_id});
            return $scope.oneUser;
        };
    }])
    .controller("mfl.users.controllers.role", ["$scope",
        function ($scope) {
            $scope.test = "Roles";
            $scope.path = [
                {
                    name: "Users",
                    route: "users"
                },
                {
                    name: "Manage roles",
                    route: "users.manage_roles"
                }
            ];
            $scope.title = [
                {
                    icon: "fa-users",
                    name: "Manage Roles"
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
    .controller("mfl.users.controllers.new_role", ["$scope", "permissionsApi",
        "rolesApi", "$state",
        function ($scope, permissionsWrapper, roleswrapper, $state) {
            $scope.test = "New role";
            $scope.permissions = "";
            $scope.path = [
                {
                    name: "Users",
                    route: "users"
                },
                {
                    name: "Manage roles",
                    route: "users.manage_roles"
                },
                {
                    name: "New role",
                    route: "users.new_role"
                }
            ];
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
            permissionsWrapper.api.list()
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
                new_role.permissions = $scope.set_permissions;
                roleswrapper.api.post(new_role)
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
