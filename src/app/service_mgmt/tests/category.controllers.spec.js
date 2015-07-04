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
                expect(log.warn).toHaveBeenCalled();
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

                        spyOn(formChanges, "whatChangedFormly").andReturn({"name": "get"});
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
                        expect(formChanges.whatChangedFormly).toHaveBeenCalled();
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

                        spyOn(formChanges, "whatChangedFormly").andReturn({});
                        spyOn(state, "go");
                        ctrl("category_edit", data);

                        httpBackend.flush();
                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();

                        httpBackend.resetExpectations();
                        /* Else path */
                        var changes = {};
                        scope.save();
                        expect(changes).toEqual({});

                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();
                        expect(formChanges.whatChangedFormly).toHaveBeenCalled();
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
                    "$scope": scope,
                    "$state": state
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/service_categories/1/")
                    .respond(200, {});
                spyOn(state,"go");
                ctrl("category_edit", data);
                scope.remove();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.category).toEqual({});
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
                ctrl("category_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/service_categories/1/")
                    .respond(204, {});
                scope.remove();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalledWith("service_mgmt.category_list",
                    {},{reload:true});
                scope.cancel();
                expect(state.go).toHaveBeenCalledWith("service_mgmt.category_list.category_edit");
                expect(state.go).toHaveBeenCalled();
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
