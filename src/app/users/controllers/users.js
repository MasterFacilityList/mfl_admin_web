(function (angular, _) {
    "use strict";

    angular.module("mfl.users.controllers.users", [
        "mfl.auth.services",
        "mfl.users.services"
    ])

    .controller("mfl.users.controllers.home", ["$scope", function ($scope) {
        $scope.test = "Manage users";
        $scope.title = [
            {
                icon: "fa-user",
                name: "Manage users"
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

    .controller("mfl.users.controllers.users", ["$scope", function ($scope) {
        $scope.test = "Users";
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.title = [
            {
                icon: "fa-user",
                name: "Manage users"
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

    .controller("mfl.users.controllers.new_user",
        ["$scope", "$state", "mfl.users.services.wrappers",
        function ($scope, $state, wrappers) {
            $scope.new_user = true;
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
                wrappers.users.create(user)
                    .success(function (new_usr) {
                        $state.go(
                            "users.new_user.contacts", {user_id : new_usr.id});
                    })
                    .error(function (e) {
                        console.log(e.error);
                    });
            };
            //listing all the contact types wrapper implementation
            wrappers.contact_types.list()
                .success(function (cont_type) {
                    $scope.contact_type = cont_type.results;
                })
                .error(function (e) {
                    console.log(e.error);
                });
            //listing roles wrapper
            wrappers.groups.list()
                .success(function (roles_result) {
                    $scope.roles = roles_result.results;
                })
                .error(function (e) {
                    console.log(e.error);
                });

            $scope.addUserContacts = function () {
                _.each($scope.user_contacts, function (contact) {
                    var user_id = $state.params.user_id;
                    wrappers.contacts.create(contact)
                        .success(function (cont_result) {
                            $scope.user_contact = {
                                user : user_id,
                                contact : cont_result.id
                            };
                            wrappers.user_contacts.create($scope.user_contact)
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
                });
            };
            //end of reverting permissions to a role

            //adding a users role
            $scope.addUserRole = function () {
                _.each($scope.set_roles, function (assigned_role) {
                    delete assigned_role.permissions;
                });
                var user = {
                    groups : []
                };
                user.groups = $scope.set_roles;
                wrappers.users.update($state.params.user_id, user)
                    .success(function () {
                        $state.go("users.manage_users");
                    })
                    .error(function (e) {
                        console.log(e);
                    });
            };
        }]
    )

    .controller("mfl.users.controllers.edit_user", ["$scope", function ($scope) {
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

    .controller("mfl.users.controllers.view_user",
        ["$scope", "$stateParams", "mfl.users.services.wrappers",
        function ($scope, $stateParams, wrappers) {
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
            wrappers.users.get($stateParams.user_id)
                .success(function (data) {
                    $scope.oneUser = data;
                })
                .error(function (e) {
                    console.log(e);
                });
            $scope.usr_cont = {
                user : $stateParams.user_id
            };
            wrappers.contact_types.list()
                .success(function (cont_type) {
                    $scope.cont_types = cont_type.results;
                })
                .error(function (e) {
                    console.log(e);
                });
            //declaring the object to hold contacts for a user
            $scope.contacts = [];
            wrappers.user_contacts.filter($scope.usr_cont)
                .success(function (answer) {
                    $scope.user_contacts = answer.results;
                    _.each($scope.user_contacts, function (contacts) {
                        wrappers.contacts.get(contacts.contact)
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
        }]
    );

})(angular, _);
