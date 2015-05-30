(function (angular, _) {
    "use strict";

    angular.module("mfl.users.controllers", [])

    .controller("mfl.users.controllers.home", ["$scope",
        function ($scope) {
            $scope.user = "Antony";
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
            }
        ];
        $scope.title = [
            {
                icon: "fa-users",
                name: "Users"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='users.new_user.basic' " +
                        "has-permission='users.add_mfluser' ",
                class: "action-btn action-btn-info action-btn-md",
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
    "$state", "contact_typeApi", "contactsApi", "user_contactsApi",
    "rolesApi",
    function ($scope, userWrapper, $state, contactTypeWrapper,
        contactWrapper, user_contactWrapper, rolesWrapper) {
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
        $scope.user = {
            other_names : " "
        };
        $scope.group = [];
        $scope.addUser = function (user) {
            user.groups = $scope.group;
            userWrapper.api.create(user)
                .success(function (new_usr) {
                    $state.go(
                        "users.new_user.contacts", {user_id : new_usr.id});
                })
                .error(function (e) {
                    console.log(e.error);
                });
        };
        //listing all the contact types wrapper implementation
        contactTypeWrapper.api.list()
            .success(function (cont_type) {
                $scope.contact_type = cont_type.results;
            })
            .error(function (e) {
                console.log(e.error);
            });
        //listing roles wrapper
        rolesWrapper.api.list()
            .success(function (roles_result) {
                $scope.roles = roles_result.results;
            })
            .error(function (e) {
                console.log(e.error);
            });

        $scope.addUserContacts = function () {
            console.log($scope.user_contacts);
            _.each($scope.user_contacts, function (contact) {
                var user_id = $state.params.user_id;
                contactWrapper.api.create(contact)
                    .success(function (cont_result) {
                        $scope.user_contact = {
                            user : user_id,
                            contact : cont_result.id
                        };
                        user_contactWrapper.api.create($scope.user_contact)
                            .success(function (usr_cont) {
                                console.log(usr_cont);
                            })
                            .error(function (e) {
                                console.log(e);
                            });
                    })
                    .error(function (e) {
                        console.log(e);
                    });
            });
            $state.go(
                "users.new_user.groups", {user_id : $state.params.user_id});
        };
        $scope.is_set = false;
        $scope.set_roles = [];
        //setting params to change classes on click
        $scope.clickedRole = function(item){
            item.selected = !item.selected;
            // other oeprations
        };
        $scope.setRole = function(set_item){
            set_item.set_selected = !set_item.set_selected;
            // other oeprations
        };
        //adding permissions to the role
        $scope.addRoles = function () {
            var selected_roles = _.where(
                $scope.roles, {"selected": true}
            );
            _.each(selected_roles, function (a_role) {
                a_role.set_selected = false;
                $scope.set_roles.push(a_role);
                $scope.is_set = true;
                $scope.roles = _.without($scope.roles, a_role);
                console.log($scope.set_roles);
            });
        };
        //end of adding permissions to a role
        //reverting permissions to the role
        $scope.revertRoles = function () {
            var reverted_roles = _.where(
                $scope.set_roles, {"set_selected": true}
            );
            _.each(reverted_roles, function (a_set_role) {
                a_set_role.selected = false;
                $scope.roles.push(a_set_role);
                $scope.set_roles = _.without($scope.set_roles, a_set_role);
                console.log($scope.set_roles);
            });
        };
        //end of reverting permissions to a role

        //adding a users role
        $scope.addUserRole = function () {
            console.log("adding user");
            console.log($state.params.user_id);
            _.each($scope.set_roles, function (assigned_role) {
                delete assigned_role.permissions;
            });
            var user = {
                groups : []
            };
            user.groups = $scope.set_roles;
            userWrapper.api.update($state.params.user_id, user)
                .success(function () {
                    $state.go("users.manage_users");
                })
                .error(function (e) {
                    console.log(e);
                });
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
    "usersApi", "$stateParams", "user_contactsApi", "contactsApi",
    "contact_typeApi",
    function ($scope, userswrapper, $stateParams,
        user_contactsApi, contactsWrapper, contact_typeWrapper) {
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
        userswrapper.api.get($stateParams.user_id)
            .success(function (data) {
                $scope.oneUser = data;
            })
            .error(function (e) {
                console.log(e);
            });
        $scope.usr_cont = {
            user : $stateParams.user_id
        };
        contact_typeWrapper.api.list()
            .success(function (cont_type) {
                $scope.cont_types = cont_type.results;
            })
            .error(function (e) {
                console.log(e);
            });
        //declaring the object to hold contacts for a user
        $scope.contacts = [];
        user_contactsApi.api.filter($scope.usr_cont)
            .success(function (answer) {
                $scope.user_contacts = answer.results;
                _.each($scope.user_contacts, function (contacts) {
                    contactsWrapper.api.get(contacts.contact)
                        .success(function (usr_cont) {
                            $scope.contacts.push(usr_cont);
                        })
                        .error(function (e) {
                            console.log(e.error);
                        });
                });
            })
            .error(function (e) {
                console.log(e);
            });
    }])
    .controller("mfl.users.controllers.permissions", ["$scope",
        function ($scope) {
            $scope.test = "Permissions";
            $scope.path = [
                {
                    name: "Users",
                    route: "users"
                },
                {
                    name: "Manage permissions",
                    route: "users.manage_permissions"
                }
            ];
            $scope.title = [
                {
                    icon: "fa-sort-amount-asc",
                    name: "Manage Permissions"
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
            $scope.all_permissions = {
                page_size : 1500
            };
            permissionsWrapper.api.filter($scope.all_permissions)
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
                roleswrapper.api.create(new_role)
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
