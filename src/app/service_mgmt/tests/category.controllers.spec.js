(function () {
    "use strict";

    describe("Test category controllers", function () {
        var ctrl, server_url, httpBackend, rootScope, state, log;

        beforeEach(function () {
            module("ui.router");
            module("mflAdminAppConfig");
            module("mfl.common.forms");
            module("mfl.service_mgmt.services");
            module("mfl.service_mgmt.controllers.categories");

            inject(["$controller", "SERVER_URL", "$httpBackend", "$rootScope", "$state", "$log",
                function ($controller, SERVER_URL, $httpBackend, $rootScope, $state, $log) {
                    httpBackend = $httpBackend;
                    server_url = SERVER_URL;
                    rootScope = $rootScope;
                    state = $state;
                    log = $log;
                    ctrl = function (name, data) {
                        return $controller("mfl.service_mgmt.controllers."+name, data);
                    };
                }
            ]);
        });

        describe("Test category edit controller", function () {
            it("should get one category", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        category_id: 1
                    },
                    "$scope": scope
                };

                httpBackend
                    .expectGET(server_url + "api/facilities/service_categories/1/")
                    .respond(200, {});

                ctrl("category_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.category).toEqual({});
            });

            it("should log errors on get one category failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        category_id: 1
                    },
                    "$scope": scope,
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url +
                               "api/facilities/service_categories/1/")
                    .respond(500, {"error": "a"});

                spyOn(log, "warn");
                ctrl("category_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.category).toBe(undefined);
                expect(log.warn).toHaveBeenCalledWith({"error": "a"});
            });

            it("should save updated category", function () {
                inject(["mfl.common.forms.changes",
                    function (formChanges) {
                        var scope = rootScope.$new();
                        var data = {
                            "$stateParams": {
                                category_id: 1
                            },
                            "$state": state,
                            "$scope": scope,
                            "mfl.common.forms.changes": formChanges
                        };
                        httpBackend
                            .expectGET(server_url +
                                       "api/facilities/service_categories/1/")
                            .respond(200, {});

                        spyOn(formChanges, "whatChanged").andReturn({"name": "get"});
                        spyOn(state, "go");
                        ctrl("category_edit", data);

                        httpBackend.flush();
                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();

                        httpBackend.resetExpectations();

                        httpBackend
                            .expectPATCH(
                                server_url + "api/facilities/service_categories/1/",
                                {"name": "get"})
                            .respond(200, {});
                        scope.save();

                        httpBackend.flush();
                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();
                        expect(formChanges.whatChanged).toHaveBeenCalled();
                        expect(state.go).toHaveBeenCalled();
                    }
                ]);
            });

            it("should not save if category is not updated", function () {
                inject(["mfl.common.forms.changes",
                    function (formChanges) {
                        var scope = rootScope.$new();
                        var data = {
                            "$stateParams": {
                                category_id: 1
                            },
                            "$state": state,
                            "$scope": scope,
                            "mfl.common.forms.changes": formChanges
                        };
                        httpBackend
                            .expectGET(server_url + "api/facilities/service_categories/1/")
                            .respond(200, {});

                        spyOn(formChanges, "whatChanged").andReturn({});
                        spyOn(state, "go");
                        ctrl("category_edit", data);

                        httpBackend.flush();
                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();

                        httpBackend.resetExpectations();

                        scope.save();

                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();
                        expect(formChanges.whatChanged).toHaveBeenCalled();
                        expect(state.go).not.toHaveBeenCalled();
                    }
                ]);
            });
        });

        describe("Test category delete controller", function () {
            it("should get the category to delete", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        category_id: 1
                    },
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/service_categories/1/")
                    .respond(200, {});

                ctrl("category_delete", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.category).toEqual({});
            });

            it("should log errors on get one category failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        category_id: 1
                    },
                    "$scope": scope,
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/service_categories/1/")
                    .respond(500, {"error": "a"});

                spyOn(log, "warn");
                ctrl("category_delete", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.category).toBe(undefined);
                expect(log.warn).toHaveBeenCalledWith({"error": "a"});
            });

            it("should delete the category", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        category_id: 1
                    },
                    "$state": state,
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/service_categories/1/")
                    .respond(200, {});

                spyOn(state, "go");
                ctrl("category_delete", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/service_categories/1/")
                    .respond(204, {});
                scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalled();
            });

            it("should show error on delete the category failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        category_id: 1
                    },
                    "$state": state,
                    "$scope": scope,
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/service_categories/1/")
                    .respond(200, {});

                spyOn(state, "go");
                spyOn(log, "warn");
                ctrl("category_delete", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/service_categories/1/")
                    .respond(404, {});

                scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).not.toHaveBeenCalled();
                expect(log.warn).toHaveBeenCalled();
            });
        });

        describe("Test category create controller", function () {

            it("should create the category", function () {
                var scope = rootScope.$new();
                var data = {
                    "$state": state,
                    "$scope": scope
                };

                spyOn(state, "go");
                ctrl("category_create", data);

                scope.category = {
                    "name": "get"
                };
                httpBackend
                    .expectPOST(server_url + "api/facilities/service_categories/", {"name": "get"})
                    .respond(200, {});

                scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalled();
            });
        });
    });

})();
