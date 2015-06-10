(function (_) {
    "use strict";

    describe("Test profile controllers", function () {
        var ctrl, httpBackend, server_url, log, rootScope;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.users.services");
            module("mfl.users.controllers.profile");
            module("mfl.auth.services");

            inject(["$controller", "$rootScope", "$httpBackend", "$log", "SERVER_URL",
                function ($controller, $rootScope, $httpBackend, $log, url) {
                    httpBackend = $httpBackend;
                    server_url = url;
                    log = $log;
                    rootScope = $rootScope;
                    ctrl = function (name, data) {
                        return $controller("mfl.users.controllers.profile."+name, data);
                    };
                }
            ]);
        });

        describe("Test base profile controller", function () {

            it("should load base controller", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope
                };
                ctrl("base", data);

                expect(scope.title).toEqual("Profile");
            });
        });

        describe("Test basic profile controller", function () {

            it("should load current user details", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url+"api/rest-auth/user/")
                    .respond(200, {});

                ctrl("basic", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.title[0].name).toEqual("Basic Details");
                expect(scope.profile).toEqual({});
            });

            it("should show error on fail to load current user details", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope,
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url+"api/rest-auth/user/")
                    .respond(500, {});

                spyOn(log, "error");
                ctrl("basic", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.title[0].name).toEqual("Basic Details");
                expect(_.isUndefined(scope.profile)).toBe(true);
                expect(log.error).toHaveBeenCalled();
            });

            it("should update current user details", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url+"api/rest-auth/user/")
                    .respond(200, {});

                var frm = {
                    "$dirty": true,
                    "first_name": {
                        "$modelValue": "Lefty",
                        "$dirty": true
                    }
                };

                ctrl("basic", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPATCH(server_url+"api/rest-auth/user/", {"first_name": "Lefty"})
                    .respond(200, {});

                scope.save(frm);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should not update if no change was made", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url+"api/rest-auth/user/")
                    .respond(200, {});

                var frm = {};

                ctrl("basic", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                scope.save(frm);

                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should show errors on fail to update current user details", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope,
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url+"api/rest-auth/user/")
                    .respond(200, {});

                var frm = {
                    "$dirty": true,
                    "first_name": {
                        "$modelValue": "Lefty",
                        "$dirty": true
                    }
                };
                spyOn(log, "error");

                ctrl("basic", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPATCH(server_url+"api/rest-auth/user/", {"first_name": "Lefty"})
                    .respond(500, {});

                scope.save(frm);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test password profile controller", function () {

            it("should update user's password", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope
                };

                ctrl("password", data);

                expect(scope.title[0].name).toEqual("Password");

                httpBackend
                    .expectPOST(server_url+"api/rest-auth/password/change/", {
                        "old_password": "b",
                        "new_password1": "a",
                        "new_password2": "a"
                    })
                    .respond(200, {});

                scope.save("b", "a", "a");
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });

            it("should show error update user's password failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope,
                    "$log": log
                };

                spyOn(log, "error");

                ctrl("password", data);

                expect(scope.title[0].name).toEqual("Password");

                httpBackend
                    .expectPOST(server_url+"api/rest-auth/password/change/", {
                        "old_password": "b",
                        "new_password1": "a",
                        "new_password2": "a"
                    })
                    .respond(500, {});

                scope.save("b", "a", "a");
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(log.error).toHaveBeenCalled();
            });

            it("should not update on validation failure (new != confirm)", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope,
                    "$log": log
                };
                spyOn(log, "error");

                ctrl("password", data);

                expect(scope.title[0].name).toEqual("Password");

                scope.save("c", "a", "b");

                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(log.error).toHaveBeenCalledWith({
                    "detail": "The two passwords do not match"
                });
            });

            it("should not update on validation failure (old == new)", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope,
                    "$log": log
                };
                spyOn(log, "error");

                ctrl("password", data);

                expect(scope.title[0].name).toEqual("Password");

                scope.save("a", "a", "a");

                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(log.error).toHaveBeenCalledWith({
                    "detail": "The current password is the same as the old password"
                });
            });
        });

        describe("Test contacts profile controller", function () {
            var loginService;

            beforeEach(function () {
                inject(["mfl.auth.services.login", function (ls) {
                    loginService = ls;
                }]);
            });

            it("should show error on load contact types error", function () {
                spyOn(loginService, "getUser").andReturn({"id": 3});
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

                ctrl("contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
                expect(_.isUndefined(data.$scope.contact_types)).toBe(true);
                expect(data.$scope.contacts).toEqual([]);
            });

            it("should show error on load contacts error", function () {
                spyOn(loginService, "getUser").andReturn({"id": 3});
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

                ctrl("contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
                expect(data.$scope.contact_types).toEqual([]);
                expect(_.isUndefined(data.$scope.contacts)).toBe(true);
            });

            it("should load user contacts", function () {
                spyOn(loginService, "getUser").andReturn({"id": 3});
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new()
                };

                ctrl("contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.contact_types).toEqual([]);
                expect(data.$scope.contacts).toEqual([]);
            });

            it("should add a new contact to the current user", function () {
                spyOn(loginService, "getUser").andReturn({"id": 3});
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new()
                };

                ctrl("contacts", data);

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
                console.log(data.$scope.contacts);
                expect(data.$scope.contacts).toEqual([{"id": 4}]);
            });

            it("should show error if add a new contact fails", function () {
                spyOn(loginService, "getUser").andReturn({"id": 3});
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

                ctrl("contacts", data);

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
                spyOn(loginService, "getUser").andReturn({"id": 3});
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

                ctrl("contacts", data);

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

            it("should remove a contact from the current user", function () {
                spyOn(loginService, "getUser").andReturn({"id": 3});
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: [{"contact": "123", "id": "456"}]});

                var data = {
                    "$scope": rootScope.$new()
                };

                ctrl("contacts", data);

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
                spyOn(loginService, "getUser").andReturn({"id": 3});
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

                ctrl("contacts", data);

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

                expect(data.$scope.contacts).toEqual(
                    [
                        {
                            "contact": "123",
                            "id": "456",
                            "delete_spinner" : true
                        }
                    ]);
            });

            it("should show an error if delete contact failed", function () {
                spyOn(loginService, "getUser").andReturn({"id": 3});
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

                ctrl("contacts", data);

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

                expect(data.$scope.contacts).toEqual(
                    [
                        {
                            "contact": "123",
                            "id": "456",
                            "delete_spinner" : true
                        }
                    ]);
            });
        });
    });
})(_);
