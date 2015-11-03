(function (angular, _) {
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.users.controllers.users
     *
     * @description
     * Contains all the controllers used to manage the users
     */
    angular.module("mfl.users.controllers.users", [
        "mfl.auth.services",
        "mfl.users.services",
        "ui.router",
        "mfl.common.forms",
        "mfl.common.errors"
    ])

    /**
     * @ngdoc controller
     *
     * @name mfl.users.controllers.user_create
     *
     * @description
     * The parent controller managing creation of users
     */
    .controller("mfl.users.controllers.user_create", ["$scope", "$state",
        "$stateParams", "mfl.common.services.multistep",
        "mfl.users.services.wrappers","$log","mfl.auth.services.login",
        "mfl.users.services.groups", "toasty",
        function ($scope, $state, $stateParams, multistepService, wrappers,
            $log,loginService, groupsService, toasty) {
            $scope.addLine = function (obj_str) {
                switch(obj_str){
                case "contacts" :
                    $scope.user.contacts.push({
                        contact_type : "",
                        contact_text : ""
                    });
                    break;
                case "groups" :
                    $scope.user.groups.push({name : ""});
                    break;
                case "counties" :
                    $scope.user.user_counties.push({county : ""});
                    break;
                case "constituencies" :
                    $scope.user.user_constituencies.push({constituency :""});
                    break;
                case "regbody" :
                    $scope.user.regulatory_users.push({regulatory_body : ""});
                    break;
                }
            };
            $scope.inactivate = function (obj, obj_str) {
                console.log(obj, obj_str);
                var active_obj = {};
                var active_key = JSON.stringify(obj_str);
                if(obj_str === "user_constituencies"){
                    active_obj[active_key] = $scope.user.user_constituencies;
                    wrappers.users.update($scope.user_id, active_obj)
                        .success(function (){})
                        .error(function (data) {
                            $scope.errors = data;
                        });
                }
            };
            $scope.removeItems = function (parent_obj, child_obj, obj_string) {
                var usr_obj = {};
                var usr_key = JSON.stringify(obj_string);
                var modified;
                if(!child_obj.hasOwnProperty ("id")){
                    modified = _.without(parent_obj, child_obj);
                }
                else{
                    modified = _.without(parent_obj, child_obj);
                    usr_obj[usr_key] = modified;
                    console.log(usr_obj);
                    wrappers.users.update($scope.user_id,usr_obj)
                        .success(function () {})
                        .error(function (data) {
                            $scope.errors = data;
                        });
                }
                return modified;
            };
            $scope.removeLine = function (obj_str, obj) {
                switch(obj_str){
                case "contacts" :
                    if(_.isUndefined(obj.id)){
                        $scope.user.contacts = _.without(
                            $scope.user.contacts, obj);
                    }else{
                        wrappers.user_contacts.remove(obj.id)
                        .success(function () {
                            wrappers.contacts.remove(obj.contact)
                            .success(function () {
                                $scope.user.contacts = _.without(
                                    $scope.user.contacts, obj);
                            })
                            .error(function (data) {
                                $scope.errors = data;
                            });
                        })
                        .error(function (data) {
                            $scope.errors = data;
                        });
                    }
                    break;
                case "groups" :
                    $scope.user.groups = $scope.removeItems($scope.user.groups, obj, "groups");
                    break;
                case "counties" :
                    $scope.user.user_counties = $scope.removeItems(
                        $scope.user.user_counties, obj, "user_counties");
                    break;
                case "constituencies" :
                    $scope.user.user_constituencies = $scope.removeItems(
                        $scope.user.user_constituencies, obj,
                        "user_constituencies");
                    break;
                case "regbody" :
                    $scope.user.regulatory_users = $scope.removeItems(
                        $scope.user.regulatory_users, obj, "regulatory_users");
                    break;
                }
            };
            $scope.save = function () {
                _.each($scope.user.groups, function (new_grps) {
                    var curr_grp = _.findWhere(
                        $scope.groups, {id : parseInt(new_grps.id, 10)});
                    new_grps.name = curr_grp.name;
                });
                if($scope.create){
                    wrappers.users.create($scope.user)
                        .success(function () {
                            toasty.success({
                                title: "Email sent",
                                msg: "An email has been sent to the new user"
                            });
                            toasty.success({
                                title: "User Added",
                                msg: "User added successfully"
                            });
                            $state.go("users");
                        })
                        .error(function (data) {
                            $log.error(data);
                            $scope.errors = data;
                        });
                }else{
                    wrappers.users.update($scope.user_id, $scope.user)
                        .success(function () {
                            toasty.success({
                                title: "User Updates",
                                msg: "User updated successfully"
                            });
                            $state.go("users");
                        })
                        .error(function (data) {
                            $log.error(data);
                            $scope.errors = data;
                        });
                }
            };
            $scope.tab = 0;
            if(_.isUndefined($stateParams.user_id)) {
                $scope.create = true;
                $scope.title = {
                    icon : "fa-plus-circle",
                    name : "New User"
                };
                $scope.groups = "";
                $scope.group_obj = [
                    {
                        new_grp : ""
                    }
                ];
                //Declaration of user object
                $scope.user = {
                    contacts : [
                        {
                            contact_type : "",
                            contact_text : ""
                        }
                    ],
                    groups : [
                        {
                            id :"",
                            name : ""
                        }
                    ],
                    user_counties : [
                        {
                            county : ""
                        }
                    ],
                    user_constituencies : [
                        {
                            constituency : ""
                        }
                    ],
                    regulatory_users : [
                        {
                            regulatory_body : ""
                        }
                    ]
                };

            }else{
                $scope.create = false;
                $scope.title = {
                    icon: "fa-edit",
                    name: "Edit User"
                };
                wrappers.users.get($stateParams.user_id)
                .success(function (data) {
                    $scope.user = data;
                    $scope.current_group = groupsService.checkWhichGroup($scope.user.groups);
                })
                .error(function (data) {
                    $scope.errors = data;
                });
                $scope.user_id = $stateParams.user_id;
                $scope.wrapper = wrappers.users;
            }
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
                },
                {
                    name : "constituency",
                    prev : ["basic", "contacts", "groups"],
                    count: "5"
                },
                {
                    name : "regulatory_body",
                    prev : ["basic", "contacts", "groups"],
                    count: "6"
                }
            ];

            $scope.nextState = function () {
                var curr = $state.current.name;
                curr = curr.split(".", 3).pop();
                multistepService.nextState($scope, $stateParams ,
                    $scope.steps, curr);
            };
            $scope.tabState = function (obj) {
                if(obj.active || obj.done || obj.furthest) {
                    $scope.nextState();
                    $state.go("users.user_create."+ obj.name,
                    {furthest: $scope.furthest, user_id : $scope.new_user});
                }
            };
            $scope.login_user = loginService.getUser();
        }
    ])

    /**
     * @ngdoc controller
     *
     * @name mfl.users.controllers.user_create.basic
     *
     * @description
     * The child controller managing basic details of users when creating new users.
     * It's parent is 'mfl.users.controllers.user_create'
     */
    .controller("mfl.users.controllers.user_create.basic",
        ["$scope", "$log", "$state", "mfl.users.services.wrappers",
        "mfl.common.forms.changes", "PWD_RULE",
        function ($scope, $log, $state, wrappers, formChanges, PR) {
            $scope.PWD_RULE = PR;
            $scope.create = true;
            $scope.title = {
                icon : "fa-plus-circle",
                name : "New User"
            };
            $scope.nextState();
            $scope.save = function (frm) {
                if($scope.$parent.furthest < 2) {
                    $scope.$parent.furthest = 2;
                }
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
                            $scope.errors = data;
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
                    .success(function () {
                        $state.go("users");
                    })
                    .error(function (data) {
                        $log.error(data);
                        $scope.errors = data;
                    });
                }
            };
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.users.controllers.user_edit
     *
     * @description
     * The parent controller managing editting of user records
     */
    .controller("mfl.users.controllers.user_edit",
        ["$scope", "$stateParams", "$log", "mfl.users.services.wrappers",
         "$state","mfl.auth.services.login", "mfl.common.services.multistep",
         "mfl.users.services.groups",
        function ($scope, $stateParams, $log, wrappers,$state, loginService,
            multistepService,groupsService) {
            $scope.steps = multistepService.userMultistep();
            $scope.title = {
                icon: "fa-edit",
                name: "Edit User"
            };
            $scope.action = [
                {
                    func : "ui-sref='users.user_edit.delete'" +
                            "requires-user-feature='is_staff'" +
                            "requires-permission='users.delete_mfluser'",
                    class: "btn btn-danger",
                    tipmsg: "Delete User",
                    wording : "Delete"
                }
            ];
            $scope.user_id = $stateParams.user_id;
            $scope.wrapper = wrappers.users;
            $scope.create = false;
            $scope.tabState = function(obj) {
                _.each($scope.steps, function (step) {
                    if(step.name === obj.name) {
                        step.active = true;
                    }
                    else {
                        step.active = false;
                    }
                });
                $state.go(
                        "users.user_edit."+ obj.name,
                        {user_id : $scope.user_id});
            };
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
                    $scope.current_group = groupsService.checkWhichGroup($scope.user.groups);
                    $scope.deleteText = $scope.user.full_name;
                })
                .error(function (data) {
                    $log.error(data);
                });
            $scope.login_user = loginService.getUser();
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.users.controllers.user_edit.basic
     *
     * @description
     * The child controller that edits basic details of user records.
     * It's parent controller is 'mfl.users.controllers.user_edit'
     */
    .controller("mfl.users.controllers.user_edit.basic",
        ["$scope", "$log", "mfl.common.forms.changes",
        "mfl.users.services.wrappers", "mfl.common.services.multistep",
        "$state","toasty", "PWD_RULE",
        function ($scope, $log, formChanges, wrappers, multistepService,
            $state,toasty, PR) {
            $scope.PWD_RULE = PR;
            multistepService.filterActive(
                $scope, $scope.steps, $scope.steps[0]);
            $scope.save = function (frm) {
                var changes = formChanges.whatChanged(frm);
                if (! _.isEmpty(changes)) {
                    wrappers.users.update($scope.user_id, changes)
                    .success(function () {
                        toasty.success({
                            title: "User updated",
                            msg: "User has been updated"
                        });
                        $state.go("users.user_edit.contacts",
                            {user_id : $scope.user_id});
                    })
                    .error(function (data) {
                        $log.error(data);
                        $scope.errors = data;
                    });
                }
                else {
                    $state.go("users.user_edit.contacts",
                            {user_id : $scope.user_id});
                }
            };
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.users.controllers.user_edit.contacts
     *
     * @description
     * The child controller that edits contacts of users.
     * It's parent controller is 'mfl.users.controllers.user_edit'
     */
    .controller("mfl.users.controllers.user_edit.contacts",
        ["$scope", "$log", "mfl.users.services.wrappers", "$state",
        "mfl.common.services.multistep","toasty",
        function ($scope, $log, wrappers, $state, multistepService,toasty) {
            $scope.tooltip = {
                "title": "",
                "checked": false
            };
            $scope.goToGroups = function () {
                if($scope.$parent.furthest < 3) {
                    $scope.$parent.furthest = 3;
                }
                $state.go("users.user_create.groups",
                    {user_id : $state.params.user_id, furthest : $scope.furthest});
            };
            $scope.contacts = [];
            $scope.contact = {
                contact_type: "",
                contact: ""
            };
            if($scope.create) {
                $scope.nextState();
            }
            if(!$scope.create) {
                multistepService.filterActive(
                $scope, $scope.steps, $scope.steps[1]);
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
                        toasty.success({
                            title: "Contact added",
                            msg: "Contact has been added to the user"
                        });
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

    /**
     * @ngdoc controller
     *
     * @name mfl.users.controllers.user_edit.groups
     *
     * @description
     * The child controller that manages assignment of groups to users
     * It's parent controller is 'mfl.users.controllers.user_edit'
     */
    .controller("mfl.users.controllers.user_edit.groups",
        ["mfl.users.services.wrappers", "$log", "$scope", "$state",
        "mfl.common.services.multistep","mfl.users.services.groups","toasty",
        function (wrappers, $log, $scope, $state, multistepService, groupsService, toasty) {
            if($scope.create) {
                $scope.nextState();
            }
            if(!$scope.create) {
                multistepService.filterActive(
                $scope, $scope.steps, $scope.steps[2]);
            }
            wrappers.groups.filter({page_size: 100, ordering: "name"})
            .success(function (data) {
                $scope.$parent.groups =  groupsService.filterGroups(
                    $scope.login_user.is_national, data.results);
            })
            .error(function (data) {
                $log.error(data);
            });
            $scope.new_grp = "";
            $scope.edit_groups = (! _.isUndefined($scope.user_id));
            $scope.user_id = $scope.user_id || $state.params.user_id;

            var updateGroups = function (new_grps) {
                $scope.spinner = true;
                if($scope.$parent.furthest < 4) {
                    $scope.$parent.furthest = 4;
                }
                var grps = _.map(new_grps, function (grp) {
                    return {"id": grp.id, "name": grp.name};
                });

                wrappers.users.update($scope.user_id, {"groups": grps})
                .success(function (data) {
                    toasty.success({
                        title: "Group updated",
                        msg: "User's group has been updated"
                    });
                    $scope.user = data;
                    $scope.$parent.user = data;
                    $scope.$parent.current_group= groupsService.checkWhichGroup($scope.user.groups);
                    $scope.spinner = false;
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

            $scope.removeChild = function (grp) {
                var update = _.without($scope.user.groups, grp);
                updateGroups(update);
            };
            $scope.updateUserGroups = function () {
                updateGroups($scope.user.groups);
            };
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.users.controllers.user_edit.counties
     *
     * @description
     * The child controller that manages assignment of counties to users
     * It's parent controller is 'mfl.users.controllers.user_edit'
     */
    .controller("mfl.users.controllers.user_edit.counties",
        ["mfl.users.services.wrappers", "$log", "$scope", "$state",
        "mfl.common.services.multistep",
        function (wrappers, $log, $scope, $state, multistepService) {
            if($scope.create) {
                $scope.nextState();
            }
            if(!$scope.create) {
                multistepService.filterActive(
                $scope, $scope.steps, $scope.steps[3]);
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
                    $scope.error = "A user can only be active in one county at a time";
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

    /**
     * @ngdoc controller
     *
     * @name mfl.users.controllers.user_edit.regulatory_body
     *
     * @description
     * The child controller that manages assignment of regulatory_bodies to users
     * It's parent controller is 'mfl.users.controllers.user_edit'
     */
    .controller("mfl.users.controllers.user_edit.regulatory_body",
        ["mfl.users.services.wrappers", "$log", "$scope",
        "mfl.common.services.multistep","$state",
        function (wrappers, $log, $scope, multistepService,$state) {
            $scope.$parent.tab = 4;
            if(!$scope.create) {
                multistepService.filterActive(
                $scope, $scope.steps, $scope.steps[5]);
            } else {
                $scope.nextState();
            }

            $scope.edit_bodies = (! _.isUndefined($scope.user_id));
            $scope.user_id = $scope.user_id || $state.params.user_id;

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
                if(!_.isEmpty($scope.user_bodies)){
                    $scope.error = "The user already belongs to a regulatory body";
                } else{
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
                }
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

    /**
     * @ngdoc controller
     *
     * @name mfl.users.controllers.user_edit.constituency
     *
     * @description
     * The child controller that manages assignment of constituencies to users
     * It's parent controller is 'mfl.users.controllers.user_edit'
     */
    .controller("mfl.users.controllers.user_edit.constituency",
        ["mfl.users.services.wrappers", "$log", "$scope",
        "mfl.common.services.multistep","$state",
        function (wrappers, $log, $scope, multistepService, $state) {
            $scope.$parent.tab = 4;
            if(!$scope.create) {
                multistepService.filterActive(
                $scope, $scope.steps, $scope.steps[4]);
            } else {
                $scope.nextState();
            }
            wrappers.constituencies.filter(
                {"page_size": 20, "ordering": "name", "county": $scope.login_user.county})
            .success(function (data) {
                $scope.constituencies = data.results;
            })
            .error(function (data) {
                $log.error(data);
            });
            $scope.user_id = $scope.user_id || $state.params.user_id;
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
                    $scope.error =  "A user can only be active in only one sub-county at a time";
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

    /**
     * @ngdoc controller
     *
     * @name mfl.users.controllers.user_list
     *
     * @description
     * Controls displaying the user listing
     */
    .controller("mfl.users.controllers.user_list", ["$scope", function ($scope) {
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.title = {
            icon: "fa-user",
            name: "Manage users"
        };
        $scope.filters = {
            "fields": "id,first_name,last_name,username,email,last_login,is_active,employee_number"
        };
        $scope.action = [
            {
                func: "ui-sref='users.user_create.basic ({furthest : 1})'" +
                        "requires-permission='users.add_mfluser' ",
                class: "btn btn-primary",

                tipmsg: "New User",
                icon: "",
                wording: " Add User"
            }
        ];
    }]);

})(window.angular, window._);
