(function (angular, _) {
    "use strict";

    angular.module("mfl.users.controllers.users", [
        "mfl.auth.services",
        "mfl.users.services",
        "ui.router",
        "mfl.common.forms"
    ])

    .controller("mfl.users.controllers.user_create", ["$scope", "$state", "$stateParams",
        function ($scope, $state, $stateParams) {
            $scope.title = {
                icon : "fa-plus-circle",
                name : "New User"
            };
            $scope.tab = 0;
            $scope.create = true;
            $scope.new_user = $state.params.user_id;
            $scope.furthest = $stateParams.furthest;
            $scope.steps = [
                {
                    name : "basic",
                    prev : [],
                    count: "1"
                },
                {
                    name : "contacts",
                    prev : ["basic"],
                    count: "2"
                },
                {
                    name : "groups",
                    prev : ["basic", "contacts"],
                    count: "3"
                },
                {
                    name : "counties",
                    prev : ["basic", "contacts", "groups"],
                    count: "4"
                }
            ];
            $scope.isActive = function (curr) {
                _.each($scope.steps, function (step) {
                    step.active = (step.name === curr);
                });
            };

            $scope.setFurthest = function () {
                _.each($scope.steps, function (step) {
                    if(step.count === $stateParams.furthest) {
                        step.furthest = true;
                        _.each(step.prev, function (prev_state) {
                            _.each($scope.steps, function (a_step) {
                                if(a_step.name === prev_state) {
                                    a_step.done = true;
                                }
                            });
                        });
                    }
                });
            };
            $scope.nextState = function () {
                var curr = $state.current.name;
                curr = curr.split(".", 3).pop();
                $scope.isActive(curr);
                $scope.setFurthest();
            };
            $scope.tabState = function (obj) {
                if(obj.active || obj.done || obj.furthest) {
                    $scope.nextState();
                    $state.go("users.user_create."+ obj.name,
                    {furthest: $scope.furthest, user_id : $scope.new_user});
                }
            };

        }
    ])

    .controller("mfl.users.controllers.user_create.basic",
        ["$scope", "$log", "$state", "mfl.users.services.wrappers",
        "mfl.common.forms.changes",
        function ($scope, $log, $state, wrappers, formChanges) {
            $scope.create = true;
            if($scope.$parent.furthest < 2) {
                $scope.$parent.furthest = 2;
            }
            $scope.title = {
                icon : "fa-plus-circle",
                name : "New User"
            };

            if(!_.isEmpty($state.params.user_id)) {
                wrappers.users.get($state.params.user_id)
                .success(function (data) {
                    $scope.user = data;
                })
                .error(function (data) {
                    $log.error(data);
                });
            }
            $scope.nextState();
            $scope.save = function (frm) {
                if(!_.isEmpty($state.params.user_id)) {
                    var changes = formChanges.whatChanged(frm);

                    if (! _.isEmpty(changes)) {
                        wrappers.users.update($state.params.user_id, changes)
                        .success(function () {
                            $state.go("users.user_create.contacts",
                                {user_id : $state.params.user_id,
                                    furthest : $scope.furthest});
                        })
                        .error(function (data) {
                            $log.error(data);
                        });
                    }
                    else {
                        $state.go("users.user_create.contacts",
                                {user_id : $state.params.user_id,
                                    furthest : $scope.furthest});
                    }
                }
                else {
                    wrappers.users.create($scope.user)
                    .success(function (data) {
                        $state.go("users.user_create.contacts",
                            {user_id: data.id, furthest : $scope.furthest});
                    })
                    .error(function (data) {
                        $log.error(data);
                    });
                }
            };
        }]
    )

    //end of assigning roles to user
    .controller("mfl.users.controllers.user_create.details", ["$scope",
        "mfl.users.services.wrappers", "$state",
        function ($scope, wrappers, $state) {
            $scope.context = "Confirm";
            $scope.tooltip = {
                "title": "",
                "checked": false
            };
            wrappers.users.get($state.params.user_id)
                .success(function (data) {
                    $scope.detail_user = data;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });
        }
    ])
    //end of assigning admininstrative areas to users
    .controller("mfl.users.controllers.user_edit",
        ["$scope", "$stateParams", "$log", "mfl.users.services.wrappers",
         "$state","mfl.auth.services.login",
        function ($scope, $stateParams, $log, wrappers,$state, loginService) {
            $scope.title = {
                icon: "fa-edit",
                name: "Edit User"
            };
            $scope.action = [
                {
                    func : "ui-sref='users.user_edit.delete'",
                    class: "action-btn action-btn-danger action-btn-md",

                    tipmsg: "Delete User",
                    icon: "fa-trash"
                }
            ];
            $scope.user_id = $stateParams.user_id;
            $scope.create = false;
            $scope.remove = function () {
                wrappers.users.remove($scope.user_id)
                    .success(function () {
                        $state.go("users");
                    })
                    .error(function (data) {
                        $log.error(data);
                    });
            };
            $scope.cancel = function(){
                $state.go("users.user_edit.basic");
            };
            wrappers.users.get($scope.user_id)
                .success(function (data) {
                    $scope.user = data;
                    $scope.deleteText = $scope.user.full_name;
                })
                .error(function (data) {
                    $log.error(data);
                });
            $scope.login_user = loginService.getUser();
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
        ["$scope", "$log", "mfl.users.services.wrappers", "$state",
        function ($scope, $log, wrappers, $state) {
            $scope.tooltip = {
                "title": "",
                "checked": false
            };
            if($scope.$parent.furthest < 3) {
                $scope.$parent.furthest = 3;
            }
            $scope.contacts = [];
            $scope.contact = {
                contact_type: "",
                contact: ""
            };
            if($scope.create) {
                $scope.nextState();
            }
            $scope.user_id = $scope.user_id || $state.params.user_id;
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

            $scope.removeChild = function (obj) {
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
        ["mfl.users.services.wrappers", "$log", "$scope", "$state",
        function (wrappers, $log, $scope, $state) {
            if($scope.$parent.furthest < 4) {
                $scope.$parent.furthest = 4;
            }
            if($scope.create) {
                $scope.nextState();
            }
            wrappers.groups.filter({page_size: 100, ordering: "name"})
            .success(function (data) {
                $scope.groups = data.results;
            })
            .error(function (data) {
                $log.error(data);
            });
            $scope.new_grp = "";

            $scope.user = {
                groups : []
            };

            $scope.edit_groups = (! _.isUndefined($scope.user_id));
            $scope.user_id = $scope.user_id || $state.params.user_id;

            var updateGroups = function (new_grps) {
                $scope.spinner = true;
                var grps = _.map(new_grps, function (grp) {
                    return {"id": grp.id, "name": grp.name};
                });

                wrappers.users.update($scope.user_id, {"groups": grps})
                .success(function (data) {
                    $scope.user = data;
                    $scope.new_grp = "";
                    $scope.spinner = false;
                    if (! $scope.edit_groups) {
                        $state.go("users.user_create.counties",
                            {"user_id": $scope.user_id, furthest : $scope.furthest});
                    }
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.spinner = false;
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
            $scope.updateUserGroups = function () {
                updateGroups($scope.user.groups);
            };
        }]
    )

    .controller("mfl.users.controllers.user_edit.counties",
        ["mfl.users.services.wrappers", "$log", "$scope", "$state",
        function (wrappers, $log, $scope, $state) {
            if($scope.create) {
                $scope.nextState();
            }
            $scope.edit_counties = (! _.isUndefined($scope.user_id));
            $scope.user_id = $scope.user_id || $state.params.user_id;

            wrappers.counties.filter({page_size: 50, ordering: "name"})
            .success(function (data) {
                $scope.counties = data.results;
            })
            .error(function (data) {
                $log.error(data);
            });
            wrappers.user_counties.filter({user: $scope.user_id})
            .success(function (data) {
                $scope.user_counties = data.results;
            })
            .error(function (data) {
                $log.error(data);
            });
            $scope.new_county = "";

            $scope.add = function (county_id) {
                $scope.spinner = true;
                var payload = {
                    "user": $scope.user_id,
                    "county": county_id
                };
                wrappers.user_counties.create(payload)
                .success(function (data) {
                    $scope.user_counties.push(data);
                    $scope.spinner = false;
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.spinner = false;
                });
            };
            $scope.removeChild = function (user_county) {
                user_county.delete_spinner = true;
                wrappers.user_counties.remove(user_county.id)
                .success(function () {
                    $scope.user_counties = _.without($scope.user_counties, user_county);
                    user_county.delete_spinner = false;
                })
                .error(function (data) {
                    $log.error(data);
                    user_county.delete_spinner = false;
                });
            };
        }]
    )

    .controller("mfl.users.controllers.user_edit.regulatory_body",
        ["mfl.users.services.wrappers", "$log", "$scope",
        function (wrappers, $log, $scope) {
            $scope.$parent.tab = 4;
            wrappers.regulatory_bodies.filter({page_size: 100, ordering: "name"})
            .success(function (data) {
                $scope.bodies = data.results;
            })
            .error(function (data) {
                $log.error(data);
            });
            wrappers.regulatory_body_users.filter({"user": $scope.user_id})
            .success(function (data) {
                $scope.user_bodies = data.results;
            })
            .error(function (data) {
                $log.error(data);
            });

            $scope.new_body = "";
            $scope.addBody = function () {
                var payload = {
                    "regulatory_body": $scope.new_body,
                    "user": $scope.user_id
                };
                wrappers.regulatory_body_users.create(payload)
                .success(function (data) {
                    $scope.user_bodies.push(data);
                    $scope.new_body = "";
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
            $scope.removeChild = function (reg) {
                wrappers.regulatory_body_users.remove(reg.id)
                .success(function () {
                    $scope.user_bodies = _.without($scope.user_bodies, reg);
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )

    .controller("mfl.users.controllers.user_edit.constituency",
        ["mfl.users.services.wrappers", "$log", "$scope",
        function (wrappers, $log, $scope) {
            $scope.$parent.tab = 4;
            wrappers.constituencies.filter(
                {"page_size": 20, "ordering": "name", "county": $scope.login_user.county})
            .success(function (data) {
                $scope.constituencies = data.results;
            })
            .error(function (data) {
                $log.error(data);
            });
            wrappers.user_constituencies.filter({user: $scope.user_id})
            .success(function (data) {
                $scope.user_constituencies = data.results;
            })
            .error(function (data) {
                $log.error(data);
            });
            $scope.new_constituency = "";

            $scope.add = function (const_id) {
                $scope.spinner = true;
                var payload = {
                    "user": $scope.user_id,
                    "constituency": const_id
                };
                wrappers.user_constituencies.create(payload)
                .success(function (data) {
                    $scope.user_constituencies.push(data);
                    $scope.spinner = false;
                    $scope.new_constituency = "";
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.spinner = false;
                });
            };
            $scope.removeChild = function (user_const) {
                user_const.delete_spinner = true;
                wrappers.user_constituencies.remove(user_const.id)
                .success(function () {
                    $scope.user_constituencies = _.without($scope.user_constituencies, user_const);
                    user_const.delete_spinner = false;
                })
                .error(function (data) {
                    $log.error(data);
                    user_const.delete_spinner = false;
                });
            };
        }]
    )

    .controller("mfl.users.controllers.user_list", ["$scope", function ($scope) {
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.title = {
            icon: "fa-user",
            name: "Manage users"
        };
        $scope.action = [
            {
                func: "ui-sref='users.user_create.basic ({furthest : 1})'" +
                        "requires-permission='users.add_mfluser' ",
                class: "action-btn action-btn-primary action-btn-md",

                tipmsg: "New User",
                icon: "fa-plus"
            }
        ];
    }]);

})(angular, _);
