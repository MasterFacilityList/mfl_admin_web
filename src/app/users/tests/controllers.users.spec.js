(function () {
    "use strict";

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
                // toHaveBeenCalled();
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
