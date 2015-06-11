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
    });
})();
