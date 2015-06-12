(function () {
    "use strict";

    describe("Test groups controllers: ", function () {
        var server_url, httpBackend, rootScope, ctrl, log, state;

        beforeEach(function () {
            module("mfl.users.controllers.groups");
            module("ui.router");
            module("mflAdminAppConfig");

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

        describe("Test group delete controller", function () {

            it("should fetch group data", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        group_id: 1
                    },
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url + "api/users/groups/1/")
                    .respond(200, {});

                ctrl("group_delete", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.group).toEqual({});
            });

            it("should show error on fetch failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        group_id: 1
                    },
                    "$scope": scope,
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url + "api/users/groups/1/")
                    .respond(500, {"error": "a"});

                spyOn(log, "error");
                ctrl("group_delete", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.group).toBe(undefined);
            });

            it("should delete a group", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        group_id: 1
                    },
                    "$state": state,
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url + "api/users/groups/1/")
                    .respond(200, {});

                spyOn(state, "go");
                ctrl("group_delete", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url+"api/users/groups/1/")
                    .respond(204, {});
                scope.remove();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalled();
            });

            it("should show error on delete group failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        group_id: 1
                    },
                    "$state": state,
                    "$scope": scope,
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url + "api/users/groups/1/")
                    .respond(200, {});

                spyOn(state, "go");
                spyOn(log, "error");
                ctrl("group_delete", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/users/groups/1/")
                    .respond(404, {});

                scope.remove();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).not.toHaveBeenCalled();
                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test group edit controller", function () {

            it("should fetch all permissions and the group to view", function () {
                httpBackend
                    .expectGET(server_url+"api/users/groups/3/")
                    .respond(200, {});

                httpBackend
                    .expectGET(server_url+"api/users/permissions/?page_size=500&ordering=name")
                    .respond(200, {"results": []});

                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {group_id: 3}
                };

                ctrl("group_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(data.$scope.permissions).toEqual([]);
                expect(data.$scope.group).toEqual({});
            });

            it("should show error on fail to fetch all permissions or group", function () {
                httpBackend
                    .expectGET(server_url+"api/users/groups/3/")
                    .respond(500, {"error": "e"});

                httpBackend
                    .expectGET(server_url+"api/users/permissions/?page_size=500&ordering=name")
                    .respond(500, {"error": "e"});

                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {group_id: 3},
                    "$log": log
                };
                spyOn(log, "error");
                ctrl("group_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(data.$scope.permissions).toEqual(undefined);
                expect(data.$scope.group).toEqual(undefined);
                expect(log.error).toHaveBeenCalled();
            });

            it("should manipulate group permissions", function () {
                var perms = {"results": [{"id": 4, "name": "perm"}]};
                httpBackend
                    .expectGET(server_url+"api/users/groups/3/")
                    .respond(200, {permissions: [], name:"name"});

                httpBackend
                    .expectGET(server_url+"api/users/permissions/?page_size=500&ordering=name")
                    .respond(200, perms);
                spyOn(state, "go");

                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {group_id: 3}
                };

                ctrl("group_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                data.$scope.group.name = "ASD";

                data.$scope.addPerm("4");
                expect(data.$scope.group.permissions[0]).toEqual(perms.results[0]);
                data.$scope.addPerm("4");
                expect(data.$scope.group.permissions[0]).toEqual(perms.results[0]);
                data.$scope.removePerm(data.$scope.group.permissions[0]);
                expect(data.$scope.group.permissions).toEqual([]);
            });

            it("should update a group", function () {
                httpBackend
                    .expectGET(server_url+"api/users/groups/3/")
                    .respond(200, {"name": "ASD", "permissions": []});

                httpBackend
                    .expectGET(server_url+"api/users/permissions/?page_size=500&ordering=name")
                    .respond(200, {"results": []});

                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {group_id: 3}
                };

                ctrl("group_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPATCH(
                        server_url+"api/users/groups/3/", {"name": "ASD", "permissions": []})
                    .respond(200);

                data.$scope.save();
                expect(data.$scope.spinner).toBeTruthy();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });

            it("should show errors on fail to update a group", function () {
                httpBackend
                    .expectGET(server_url+"api/users/groups/3/")
                    .respond(200, {"name": "ASD", "permissions": []});

                httpBackend
                    .expectGET(server_url+"api/users/permissions/?page_size=500&ordering=name")
                    .respond(200, {"results": []});

                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {group_id: 3},
                    "$log": log
                };
                spyOn(log, "error");
                ctrl("group_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPATCH(
                        server_url+"api/users/groups/3/", {"name": "ASD", "permissions": []})
                    .respond(500);

                data.$scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test group list controller", function () {

            it("should list groups", function () {
                var data = {
                    "$scope": rootScope.$new()
                };
                ctrl("group_list", data);

            });
        });

        describe("Test group create controller", function () {

            it("should fetch all permissions", function () {
                httpBackend
                    .expectGET(server_url+"api/users/permissions/?page_size=500&ordering=name")
                    .respond(200, {"results": []});

                var data = {
                    "$scope": rootScope.$new()
                };

                ctrl("group_create", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(data.$scope.permissions).toEqual([]);
            });

            it("should show error on fail to fetch all permissions", function () {
                httpBackend
                    .expectGET(server_url+"api/users/permissions/?page_size=500&ordering=name")
                    .respond(500);

                spyOn(log, "error");

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };

                ctrl("group_create", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(data.$scope.permissions).toEqual(undefined);
                expect(log.error).toHaveBeenCalled();
            });

            it("should create a new group", function () {
                httpBackend
                    .expectGET(server_url+"api/users/permissions/?page_size=500&ordering=name")
                    .respond(200, {"results": [{"id": 4, "name": "perm"}]});
                spyOn(state, "go");
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state
                };

                ctrl("group_create", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                var payload = {"name": "ASD", "permissions": [{"id": 4, "name": "perm"}]};
                httpBackend
                    .expectPOST(server_url+"api/users/groups/", payload)
                    .respond(201, {"id": 4});

                data.$scope.group.name = "ASD";

                data.$scope.addPerm("4");
                expect(data.$scope.group.permissions[0]).toEqual(payload.permissions[0]);

                data.$scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(state.go).toHaveBeenCalled();
            });

            it("should show errors on fail to create a new group", function () {
                httpBackend
                    .expectGET(server_url+"api/users/permissions/?page_size=500&ordering=name")
                    .respond(200, {"results": [{"id": 4, "name": "perm"}]});
                spyOn(state, "go");
                spyOn(log, "error");
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$log": log
                };

                ctrl("group_create", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                httpBackend
                    .expectPOST(server_url+"api/users/groups/",
                        {"name": "ASD", "permissions": [{"id": 4, "name": "perm"}]})
                    .respond(400, {"id": 4});
                data.$scope.group.name = "ASD";
                data.$scope.addPerm("4");
                expect(data.$scope.group.permissions[0]).toEqual({"id": 4, "name": "perm"});
                data.$scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(state.go).not.toHaveBeenCalled();
                expect(log.error).toHaveBeenCalled();
            });

            it("should manipulate group permissions", function () {
                var perms = {"results": [{"id": 4, "name": "perm"}]};

                httpBackend
                    .expectGET(server_url+"api/users/permissions/?page_size=500&ordering=name")
                    .respond(200, perms);
                spyOn(state, "go");
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state
                };

                ctrl("group_create", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                data.$scope.group.name = "ASD";

                data.$scope.addPerm("4");
                expect(data.$scope.group.permissions[0]).toEqual(perms.results[0]);

                data.$scope.addPerm("4");
                expect(data.$scope.group.permissions[0]).toEqual(perms.results[0]);

                data.$scope.removePerm(data.$scope.group.permissions[0]);
                expect(data.$scope.group.permissions).toEqual([]);
            });
        });

    });
})();
