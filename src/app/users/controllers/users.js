(function (angular, _) {
    "use strict";

    angular.module("mfl.users.controllers.users", [
        "mfl.auth.services",
        "mfl.users.services",
        "ui.router",
        "mfl.common.forms"
    ])

    .controller("mfl.users.controllers.user_delete",
        ["$scope", "$log", "$state", "$stateParams", "mfl.users.services.wrappers",
        function ($scope, $log, $state, $stateParams, wrappers) {
            $scope.user_id = $stateParams.user_id;

            wrappers.users.get($scope.user_id)
                .success(function (data) {
                    $scope.user = data;
                })
                .error(function (data) {
                    $log.error(data);
                });

            $scope.remove = function () {
                wrappers.users.remove($scope.user_id)
                    .success(function () {
                        $state.go("users");
                    })
                    .error(function (data) {
                        $log.error(data);
                    });
            };
        }]
    )

    .controller("mfl.users.controllers.user_create", [angular.noop])

    .controller("mfl.users.controllers.user_create.basic",
        ["$scope", "$log", "$state", "mfl.users.services.wrappers",
        function ($scope, $log, $state, wrappers) {

            $scope.save = function () {
                wrappers.users.create($scope.user)
                .success(function (data) {
                    $state.go("users.user_edit.basic", {user_id: data.id});
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )

    .controller("mfl.users.controllers.user_edit",
        ["$scope", "$stateParams", "$log", "mfl.users.services.wrappers",
        function ($scope, $stateParams, $log, wrappers) {
            $scope.user_id = $stateParams.user_id;

            wrappers.users.get($scope.user_id)
                .success(function (data) {
                    $scope.user = data;
                })
                .error(function (data) {
                    $log.error(data);
                });
        }]
    )

    .controller("mfl.users.controllers.user_edit.basic",
        ["$scope", "$log", "mfl.common.forms.changes", "mfl.users.services.wrappers",
        function ($scope, $log, formChanges, wrappers) {

            $scope.save = function (frm) {
                var changes = formChanges.whatChanged(frm);

                if (! _.isEmpty(changes)) {
                    wrappers.users.update($scope.user_id, changes)
                    .success(function () {

                    })
                    .error(function (data) {
                        $log.error(data);
                    });
                }
            };
        }]
    )

    .controller("mfl.users.controllers.user_edit.contacts",
        ["$scope", "$log", "mfl.users.services.wrappers",
        function ($scope, $log, wrappers) {
            $scope.contact = {
                contact_type: "",
                contact: ""
            };

            wrappers.contact_types.list()
                .success(function (data) {
                    $scope.contact_types = data.results;
                })
                .error(function (data) {
                    $log.error(data);
                });

            wrappers.user_contacts.filter({"user": $scope.user_id})
                .success(function(data) {
                    $scope.contacts = data.results;
                })
                .error(function (data) {
                    $log.error(data);
                });

            $scope.remove = function (obj) {
                obj.delete_spinner = true;
                wrappers.user_contacts.remove(obj.id)
                .success(function () {
                    wrappers.contacts.remove(obj.contact)
                    .success(function () {
                        $scope.contacts = _.without($scope.contacts, obj);
                        obj.delete_spinner = false;
                    })
                    .error(function (data) {
                        $log.error(data);
                        obj.delete_spinner = false;
                    });
                })
                .error(function (data) {
                    $log.error(data);
                    obj.delete_spinner = false;
                });
            };

            $scope.add = function () {
                $scope.spinner = true;
                wrappers.contacts.create({
                    "contact_type": $scope.contact.contact_type,
                    "contact": $scope.contact.contact
                })
                .success(function (data) {
                    wrappers.user_contacts.create({
                        "user": $scope.user_id,
                        "contact": data.id
                    })
                    .success(function (data) {
                        $scope.contacts.push(data);
                        $scope.contact = {
                            contact_type: "",
                            contact: ""
                        };
                        $scope.spinner = false;
                    })
                    .error(function (data) {
                        $log.error(data);
                        $scope.spinner = false;
                    });
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.spinner = false;
                });
            };
        }
    ])

    .controller("mfl.users.controllers.user_edit.groups",
        ["mfl.users.services.wrappers", "$log", "$scope", function (wrappers, $log, $scope) {
            wrappers.groups.filter({page_size: 100, ordering: "name"})
            .success(function (data) {
                $scope.groups = data.results;
            })
            .error(function (data) {
                $log.error(data);
            });
            $scope.new_grp = "";

            var updateGroups = function (new_grps) {
                var grps = _.map(new_grps, function (grp) {
                    return {"id": grp.id, "name": grp.name};
                });

                wrappers.users.update($scope.user_id, {"groups": grps})
                .success(function (data) {
                    $scope.user = data;
                    $scope.new_grp = "";
                })
                .error(function (data) {
                    $log.error(data);
                });
            };

            $scope.add = function () {
                var grp = _.findWhere($scope.groups, {"id": parseInt($scope.new_grp, 10)});
                var update = angular.copy($scope.user.groups);
                update.push(grp);
                updateGroups(update);
            };

            $scope.remove = function (grp) {
                var update = _.without($scope.user.groups, grp);
                updateGroups(update);
            };
        }]
    )

    .controller("mfl.users.controllers.user_edit.counties", [function () {}])

    // ====================================================================== //

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
                func : "ui-sref='users.user_create.basic' " +
                        "has-permission='users.add_mfluser' ",
                class: "action-btn action-btn-info action-btn-md",
                color: "blue",
                tipmsg: "New User",
                icon: "fa-user-plus"
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
