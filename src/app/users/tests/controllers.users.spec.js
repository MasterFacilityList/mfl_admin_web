(function () {
    "use strict";

    describe("Test users controllers :", function () {
        var controller, data, root, scope, SERVER_URL, httpBackend, state;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.users.services");
            module("sil.api.wrapper");
            module("ui.router");
            module("mfl.users.controllers.users");

            inject(["$rootScope", "$controller", "$httpBackend", "$state", "SERVER_URL",
                function ($rootScope, $controller, $httpBackend, $state, url) {
                    root = $rootScope;
                    scope = root.$new();
                    state = $state;
                    httpBackend = $httpBackend;
                    SERVER_URL = url;
                    scope.fakeStateParams = {
                        user_id : 6
                    };
                    data = {
                        $scope : scope,
                        $state : $state,
                        SERVER_URL : url,
                        $stateParams : scope.fakeStateParams
                    };
                    controller = function (cntrl) {
                        return $controller(cntrl, data);
                    };
                }
            ]);
        });
        it("should test $scope.test === 'Manage users'", function () {
            controller("mfl.users.controllers.home");
            var test = "Manage users";
            expect(scope.test).toEqual(test);
        });
        it("should test $scope.test === 'users'", function () {
            controller("mfl.users.controllers.users");
            var test = "Users";
            expect(scope.test).toEqual(test);
        });
        it("should test new_user controller: ", function () {
            controller("mfl.users.controllers.new_user");
            var arg = "Antony";
            var arg_two = "Antony";
            scope.confirm = false;
            scope.conifrmPassword(arg, arg_two);
            expect(scope.confirm).toBeFalsy();
            var arg_three = "Antony";
            var arg_four = "Owaga";
            scope.conifrmPassword(arg_three, arg_four);
            expect(scope.confirm).toBeTruthy();
        });
        it("should test adding contacts to user", function () {
            controller("mfl.users.controllers.new_user");
            var usr_cont = [
                {contact_type : "", contact : ""},
                {contact_type : "", contact : ""}
            ];
            scope.addContact();
            expect(scope.user_contacts).toEqual(usr_cont);
        });
        it("should test removing contacts from user", function () {
            controller("mfl.users.controllers.new_user");
            var cont_obj = {contact_type : "", contact : ""};
            var compr_obj = [cont_obj];
            scope.user_contacts = [
                {contact_type : "", contact : ""},
                cont_obj
            ];
            scope.removeContact(cont_obj);
            expect(scope.user_contacts).toEqual(compr_obj);
        });
        it("should test adding user function", inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
                controller("mfl.users.controllers.new_user");
                spyOn($state, "go");
                var user = {
                    groups: [],
                    email: "serikalindogo@mfltest.slade360.co.ke",
                    first_name: "Serikali",
                    last_name: "Ndogo",
                    other_names: "",
                    username: "serikalindogo",
                    is_national: false,
                    password : "password"
                };
                scope.user = user;
                scope.addUser(user);
                var cont_type = "";
                var roles_result = "";
                $httpBackend.expectGET(
                    SERVER_URL + "api/common/contact_types/").respond(
                    200, cont_type);
                $httpBackend.expectGET(SERVER_URL + "api/users/groups/").respond(200, roles_result);
                $httpBackend.expectPOST(SERVER_URL + "api/users/").respond(200, scope.user);
                scope.addUser({"name": "test"});
                var e = {
                    "username": [
                        "This field is required."
                    ],
                    "password": [
                        "This field is required."
                    ],
                    "email": [
                        "This field is required."
                    ]
                };
                $httpBackend.expectPOST(SERVER_URL + "api/users/").respond(400, e);
                $httpBackend.flush();
                // expect($state.go).toHaveBeenCalled();
            }
        ]));
        it("should tfetch users, contacts: fail", inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
                controller("mfl.users.controllers.new_user");
                spyOn($state, "go");
                var user = {
                    groups: [],
                    email: "serikalindogo@mfltest.slade360.co.ke",
                    first_name: "Serikali",
                    last_name: "Ndogo",
                    other_names: "",
                    username: "serikalindogo",
                    is_national: false,
                    password : "password"
                };
                scope.user = user;
                scope.addUser(user);
                var cont_type = "";
                var roles_result = "";
                $httpBackend.expectGET(
                    SERVER_URL + "api/common/contact_types/").respond(
                    400, cont_type);
                $httpBackend.expectGET(SERVER_URL + "api/users/groups/").respond(400, roles_result);
                $httpBackend.flush();
                // expect($state.go).toHaveBeenCalled();
            }
        ]));
        //test not working
        it("should add user contacts: succeed",
        inject(["$httpBackend", "$state",function ($httpBackend, $state) {
            controller("mfl.users.controllers.new_user");
            spyOn($state, "go");
            scope.addUserContacts();
            state.params.user_id = 6;
            var contact = {
                contact : "+254722367009",
                contact_type : "26849c83-7d7b-49bb-bb91-16ff29def9c3"
            };
            scope.user_contact = [contact];

            $httpBackend.expectPOST(
                SERVER_URL + "api/common/contacts/").respond(
                200, scope.user_contact[0]);

            scope.user_contact = {
                user: 6,
                contact : "26849c83-7d7b-49bb-bb91-16ff29def9c3"
            };
            $httpBackend.expectPOST(
                SERVER_URL + "api/common/user_contacts/").respond(
                200, scope.user_contact);

            $httpBackend.flush();
        }]));
        it("should add user contacts: succeed",
        inject(["$httpBackend", "$state", function ($httpBackend, $state) {
            controller("mfl.users.controllers.new_user");
            spyOn($state, "go");
            scope.addUserContacts();
            state.params.user_id = 6;
            var contact = {
                contact : "+254722367009",
                contact_type : "26849c83-7d7b-49bb-bb91-16ff29def9c3"
            };
            scope.user_contact = [contact];

            $httpBackend.expectPOST(
                SERVER_URL + "api/common/contacts/").respond(
                200, scope.user_contact[0]);

            scope.user_contact = {
                user: 6,
                contact : "26849c83-7d7b-49bb-bb91-16ff29def9c3"
            };
            $httpBackend.expectPOST(
                SERVER_URL + "api/common/user_contacts/").respond(
                400, {name: ""});
            $httpBackend.flush();
        }]));
        it("should add user_contact in through table: fail",
            inject(["$httpBackend",  "$state",
            function ($httpBackend, $state) {
                controller("mfl.users.controllers.new_user");
                spyOn($state, "go");
                scope.addUserContacts();
                state.params.user_id = 6;
                var contact = {
                    contact : "+254722367009",
                    contact_type : "26849c83-7d7b-49bb-bb91-16ff29def9c3"
                };
                scope.user_contact = {
                    user: 6,
                    contact : "26849c83-7d7b-49bb-bb91-16ff29def9c3"
                };
                scope.user_contact = [contact];
                $httpBackend.expectPOST(
                    SERVER_URL + "api/common/contacts/").respond(
                    400, {name : ""});
                $httpBackend.flush();
            }
        ]));
        it("should test clicked Role", function () {
            controller("mfl.users.controllers.new_user");
            var item = {selected : false};
            scope.clickedRole(item);
            expect(item.selected).toBeTruthy();
        });
        it("should test clicked Role", function () {
            controller("mfl.users.controllers.new_user");
            var item = {set_selected : false};
            scope.setRole(item);
            expect(item.set_selected).toBeTruthy();
        });
        it("should test add roles : setting roles", function () {
            controller("mfl.users.controllers.new_user");
            var role = {
                name : "",
                permissions : [
                    {id : "1", name : "", code_name : ""}
                ],
                selected : true,
                set_selected : false
            };
            scope.roles = [
                {
                    name : "",
                    permissions : [
                        {id : "1", name : "", code_name : ""}
                    ],
                    selected : true
                }
            ];
            scope.set_roles = [];
            scope.addRoles();
            expect(scope.set_roles).toContain(role);
        });
        it("should test add roles : reverting roles", function () {
            controller("mfl.users.controllers.new_user");
            var role = {
                name : "",
                permissions : [
                    {id : "1", name : "", code_name : ""}
                ],
                selected : false,
                set_selected : true
            };
            scope.set_roles = [
                {
                    name : "",
                    permissions : [
                        {id : "1", name : "", code_name : ""}
                    ],
                    set_selected : true
                }
            ];
            scope.roles = [];
            scope.revertRoles();
            expect(scope.roles).toContain(role);
        });
        it("should test add user role function ", inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
                controller("mfl.users.controllers.new_user");
                spyOn($state, "go");
                scope.set_roles = [
                    {
                        name : "",
                        permissions : [
                            {id : "1", name : "", code_name : ""}
                        ],
                        selected : false,
                        set_selected : true
                    }
                ];
                state.params.user_id = 6;
                scope.addUserRole();
                $httpBackend.expectPATCH(
                    SERVER_URL + "api/users/6/").respond(
                    200,{});
                $httpBackend.flush();
            }
        ]));
        it("should test add user call : fail", inject(["$httpBackend", "$state",
            function($httpBackend, $state) {
                controller("mfl.users.controllers.new_user");
                spyOn($state, "go");
                state.params.user_id = 6;
                scope.addUserRole();
                $httpBackend.expectPATCH(
                    SERVER_URL + "api/users/6/").respond(
                    400,{});
                $httpBackend.flush();
            }
        ]));
        it("should test edit user controller", function () {
            controller("mfl.users.controllers.edit_user");
            expect(scope.test).toEqual("Edit user");
        });
        it("should test view user controller", function () {
            controller("mfl.users.controllers.view_user");
            expect(scope.test).toEqual("View user");
        });
        //test not working viewing a user
        it("should test viewing one user : success", inject(["$httpBackend",
            function ($httpBackend) {
                controller("mfl.users.controllers.view_user");
                var data = "";
                $httpBackend.expectGET(
                    SERVER_URL + "api/users/6/").respond(200, data);
                $httpBackend.expectGET(
                    SERVER_URL + "api/common/contact_types/").respond(200, data);
                $httpBackend.flush();
            }
        ]));
        it("should test viewing one user: fail", inject(["$httpBackend",
            function ($httpBackend) {
                controller("mfl.users.controllers.view_user");
                var data = "";
                $httpBackend.expectGET(
                    SERVER_URL + "api/users/6/").respond(400, data);
                $httpBackend.flush();
            }
        ]));

        it("should test getting all contacts of a single user",
        inject(["$httpBackend","$stateParams",
        function ($httpBackend, $stateParams) {
            $stateParams.user_id = 6;
            controller("mfl.users.controllers.view_user");
            var usr_conts = {
                results : [
                    {
                        id : "1",
                        user : 6,
                        contact : "3"
                    }
                ]
            };
            var a_cont = [
                {
                    id : "3",
                    contact : "+254724222797",
                    contact_type: "2"
                }
            ];
            $httpBackend.expectGET(
                SERVER_URL + "api/common/user_contacts/?user=6").respond(
                200, usr_conts);
            scope.user_contacts = usr_conts.results;
            $httpBackend.expectGET(
                SERVER_URL + "api/common/contacts/3/").respond(200, a_cont[0]);
            $httpBackend.flush();
            expect(scope.contacts).toEqual(a_cont);
        }]));
        it("should test getting all contacts of a single user: fail",
        inject(["$httpBackend","$stateParams",
        function ($httpBackend, $stateParams) {
            $stateParams.user_id = 6;
            controller("mfl.users.controllers.view_user");
            var usr_conts = {
                results : [
                    {
                        id : "1",
                        user : 6,
                        contact : "3"
                    }
                ]
            };
            $httpBackend.expectGET(
                SERVER_URL + "api/common/user_contacts/?user=6").respond(
                200, usr_conts);
            scope.user_contacts = usr_conts.results;
            $httpBackend.expectGET(
                SERVER_URL + "api/common/contacts/3/").respond(400, {});
            $httpBackend.flush();
        }]));
    });

    describe("Test users controllers: ", function () {
        var server_url, httpBackend, rootScope, ctrl, log, state;

        beforeEach(function () {
            module("mfl.users.controllers.users");
            module("ui.router");
            module("mflAdminAppConfig");
            module("mfl.common.forms");

            inject(["$controller", "$log", "$httpBackend", "$rootScope", "SERVER_URL", "$state",
                function ($controller, $log, $httpBackend, $rootScope, SERVER_URL, $state) {
                    httpBackend = $httpBackend;
                    rootScope = $rootScope;
                    log = $log;
                    server_url = SERVER_URL;
                    state = $state;
                    ctrl = function (name, data) {
                        return $controller("mfl.users.controllers."+name, data);
                    };
                }
            ]);
        });

        describe("Test user delete controller", function () {

            it("should fetch user data", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        user_id: 1
                    },
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url + "api/users/1/")
                    .respond(200, {});

                ctrl("user_delete", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.user).toEqual({});
            });

            it("should show error on fetch failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        user_id: 1
                    },
                    "$scope": scope,
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url + "api/users/1/")
                    .respond(500, {"error": "a"});

                spyOn(log, "error");
                ctrl("user_delete", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.users).toBe(undefined);
                expect(log.error).toHaveBeenCalledWith({"error": "a"});
            });

            it("should delete user", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        user_id: 1
                    },
                    "$state": state,
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url + "api/users/1/")
                    .respond(200, {});

                spyOn(state, "go");
                ctrl("user_delete", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/users/1/")
                    .respond(204, {});
                scope.remove();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalled();
            });

            it("should show error on delete user failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        user_id: 1
                    },
                    "$state": state,
                    "$scope": scope,
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url + "api/users/1/")
                    .respond(200, {});

                spyOn(state, "go");
                spyOn(log, "error");
                ctrl("user_delete", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/users/1/")
                    .respond(404, {});

                scope.remove();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).not.toHaveBeenCalled();
                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test user create main controller", function () {
            it("should load", function () {
                ctrl("user_create");
            });
        });

        describe("Test user create basic controller", function () {

            it("should save a new user", function () {
                var scope = rootScope.$new();
                spyOn(state, "go");

                var data = {
                    "$scope": scope,
                    "$state": state
                };
                data.$scope.user = {
                    "first_name":"qwe",
                    "username":"qwe",
                    "password":"qwe",
                    "confirm_password":"qwe",
                    "last_name":"qwe",
                    "other_names":"qwe",
                    "email":"qwe@mail.com"
                };
                httpBackend
                    .expectPOST(server_url + "api/users/", data.$scope.user)
                    .respond(201, {"id": 3});

                ctrl("user_create.basic", data);

                data.$scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                expect(state.go).toHaveBeenCalledWith("users.user_edit.basic", {"user_id": 3});
            });

            it("should show an error on save a new user", function () {
                var scope = rootScope.$new();
                spyOn(state, "go");
                spyOn(log, "error");

                var data = {
                    "$scope": scope,
                    "$state": state,
                    "$log": log
                };
                data.$scope.user = {
                    "first_name":"qwe",
                    "username":"qwe",
                    "password":"qwe",
                    "confirm_password":"qwe",
                    "last_name":"qwe",
                    "other_names":"qwe",
                    "email":"qwe@mail.com"
                };
                httpBackend
                    .expectPOST(server_url + "api/users/", data.$scope.user)
                    .respond(500, {});

                ctrl("user_create.basic", data);

                data.$scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(state.go).not.toHaveBeenCalled();
                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test user edit main controller", function () {

            it("should load a user", function () {
                var scope = rootScope.$new();

                var data = {
                    "$scope": scope,
                    "$stateParams": {user_id: 3}
                };

                httpBackend
                    .expectGET(server_url + "api/users/3/")
                    .respond(200, {});

                ctrl("user_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(scope.user_id).toEqual(3);
                expect(scope.user).toEqual({});
            });

            it("should show an error if load user fails", function () {
                spyOn(log, "error");

                var scope = rootScope.$new();

                var data = {
                    "$scope": scope,
                    "$stateParams": {user_id: 3},
                    "$log": log
                };

                httpBackend
                    .expectGET(server_url + "api/users/3/")
                    .respond(404, {});

                ctrl("user_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(scope.user).toEqual(undefined);
                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test user edit groups controller", function () {

            it("should load", function () {
                ctrl("user_edit.groups");
            });
        });

        describe("Test user edit contacts controller", function () {

            it("should show error on load contact types error", function () {
                spyOn(log, "error");
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(500, {"error": "e"});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;

                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
                expect(_.isUndefined(data.$scope.contact_types)).toBe(true);
                expect(data.$scope.contacts).toEqual([]);
            });

            it("should show error on load contacts error", function () {
                spyOn(log, "error");
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(500, {"error": "e"});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;

                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
                expect(data.$scope.contact_types).toEqual([]);
                expect(_.isUndefined(data.$scope.contacts)).toBe(true);
            });

            it("should load user contacts", function () {
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;
                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.contact_types).toEqual([]);
                expect(data.$scope.contacts).toEqual([]);
            });

            it("should remove a contact from the current user", function () {
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: [{"contact": "123", "id": "456"}]});

                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;

                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/common/user_contacts/456/")
                    .respond(204);
                httpBackend
                    .expectDELETE(server_url + "api/common/contacts/123/")
                    .respond(204);

                data.$scope.contacts = [{"contact": "123", "id": "456"}];
                data.$scope.remove(data.$scope.contacts[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.contacts).toEqual([]);
            });

            it("should show an error if delete user_contact failed", function () {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: [{"contact": "123", "id": "456"}]});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;

                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/common/user_contacts/456/")
                    .respond(500);

                data.$scope.contacts = [{"contact": "123", "id": "456"}];
                data.$scope.remove(data.$scope.contacts[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.contacts).toEqual([{"contact": "123", "id": "456"}]);
            });

            it("should show an error if delete contact failed", function () {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: [{"contact": "123", "id": "456"}]});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;

                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/common/user_contacts/456/")
                    .respond(204);
                httpBackend
                    .expectDELETE(server_url + "api/common/contacts/123/")
                    .respond(500);

                data.$scope.contacts = [{"contact": "123", "id": "456"}];
                data.$scope.remove(data.$scope.contacts[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.contacts).toEqual([{"contact": "123", "id": "456"}]);
            });

            it("should add a new contact to the user", function () {
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;

                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                data.$scope.contact = {
                    "contact": "ccc",
                    "contact_type": "123"
                };
                httpBackend
                    .expectPOST(server_url + "api/common/contacts/", data.$scope.contact)
                    .respond(201, {"id": 3});

                httpBackend
                    .expectPOST(server_url + "api/common/user_contacts/", {"user": 3, "contact": 3})
                    .respond(201, {"id": 4});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                expect(data.$scope.contacts).toEqual([{"id": 4}]);
            });

            it("should show error if add a new contact fails", function () {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;

                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                data.$scope.contact = {
                    "contact": "ccc",
                    "contact_type": "123"
                };
                httpBackend
                    .expectPOST(server_url + "api/common/contacts/", data.$scope.contact)
                    .respond(400, {"error_code": 3});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.contacts).toEqual([]);
                expect(log.error).toHaveBeenCalled();
            });

            it("should show error if associate new contact to user fails", function () {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;

                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                data.$scope.contact = {
                    "contact": "ccc",
                    "contact_type": "123"
                };
                httpBackend
                    .expectPOST(server_url + "api/common/contacts/", data.$scope.contact)
                    .respond(201, {"id": 3});

                httpBackend
                    .expectPOST(server_url + "api/common/user_contacts/", {"user": 3, "contact": 3})
                    .respond(400, {"error_code": 4});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.contacts).toEqual([]);
                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test user edit basic controller", function () {
            var controller;

            beforeEach(function () {
                inject(["$controller", function (c) {
                    controller = c;
                }]);
            });

            it("should update user changes", function () {
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$modelValue": "ASD",
                        "$dirty": true
                    }
                };
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope
                };
                data.$scope.user_id = 3;

                controller("mfl.users.controllers.user_edit.basic", data);

                httpBackend
                    .expectPATCH(server_url + "api/users/3/", {"name": "ASD"})
                    .respond(200);

                data.$scope.save(frm);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should not update user if no changes are made", function () {
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$modelValue": "ASD",
                        "$dirty": false
                    }
                };
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope
                };
                data.$scope.user_id = 3;

                controller("mfl.users.controllers.user_edit.basic", data);

                data.$scope.save(frm);

                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should show error on fail to update user changes", function () {
                spyOn(log, "error");
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$modelValue": "ASD",
                        "$dirty": true
                    }
                };
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope,
                    "$log": log
                };
                data.$scope.user_id = 3;

                controller("mfl.users.controllers.user_edit.basic", data);

                httpBackend
                    .expectPATCH(server_url + "api/users/3/", {"name": "ASD"})
                    .respond(400);

                data.$scope.save(frm);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
            });
        });
    });
})();
