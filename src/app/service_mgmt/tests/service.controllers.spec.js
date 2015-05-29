(function () {
    "use strict";

    describe("Test service controllers", function () {
        var ctrl, server_url, httpBackend, rootScope, state, log;

        beforeEach(function () {
            module("ui.router");
            module("mflAdminAppConfig");
            module("mfl.common.forms");
            module("mfl.service_mgmt.services");
            module("mfl.service_mgmt.controllers");

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

        describe("Test service edit controller", function () {

            it("should get one service and all categories", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        service_id: 1
                    },
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/services/1/")
                    .respond(200, {});
                httpBackend
                    .expectGET(server_url +
                               "api/facilities/service_categories/?page_size=1000")
                    .respond(200, {results: []});

                ctrl("service_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.service).toEqual({});
                expect(scope.categories).toEqual([]);
            });

            it("should log errors on get one service failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        service_id: 1
                    },
                    "$scope": scope,
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/services/1/")
                    .respond(500, {"error": "a"});
                httpBackend
                    .expectGET(server_url +
                               "api/facilities/service_categories/?page_size=1000")
                    .respond(200, {results: []});

                spyOn(log, "warn");
                ctrl("service_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.service).toBe(undefined);
                expect(log.warn).toHaveBeenCalledWith({"error": "a"});
            });

            it("should log errors on get categories failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        service_id: 1
                    },
                    "$scope": scope,
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/services/1/")
                    .respond(200, {});
                httpBackend
                    .expectGET(server_url +
                               "api/facilities/service_categories/?page_size=1000")
                    .respond(500, {"error": "a"});

                spyOn(log, "warn");
                ctrl("service_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.service).toEqual({});
                expect(scope.categories).toBe(undefined);
                expect(log.warn).toHaveBeenCalledWith({"error": "a"});
            });

            it("should save updated service", function () {
                inject(["mfl.common.forms.changes",
                    function (formChanges) {
                        var scope = rootScope.$new();
                        var data = {
                            "$stateParams": {
                                service_id: 1
                            },
                            "$state": state,
                            "$scope": scope,
                            "mfl.common.forms.changes": formChanges
                        };
                        httpBackend
                            .expectGET(server_url + "api/facilities/services/1/")
                            .respond(200, {});
                        httpBackend
                            .expectGET(server_url +
                                       "api/facilities/service_categories/?page_size=1000")
                            .respond(200, {results: []});

                        spyOn(formChanges, "whatChanged").andReturn({"name": "get"});
                        spyOn(state, "go");
                        ctrl("service_edit", data);

                        httpBackend.flush();
                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();

                        httpBackend.resetExpectations();

                        httpBackend
                            .expectPATCH(server_url + "api/facilities/services/1/", {"name": "get"})
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

            it("should not save if service is not updated", function () {
                inject(["mfl.common.forms.changes",
                    function (formChanges) {
                        var scope = rootScope.$new();
                        var data = {
                            "$stateParams": {
                                service_id: 1
                            },
                            "$state": state,
                            "$scope": scope,
                            "mfl.common.forms.changes": formChanges
                        };
                        httpBackend
                            .expectGET(server_url + "api/facilities/services/1/")
                            .respond(200, {});
                        httpBackend
                            .expectGET(server_url +
                                       "api/facilities/service_categories/?page_size=1000")
                            .respond(200, {results: []});

                        spyOn(formChanges, "whatChanged").andReturn({});
                        spyOn(state, "go");
                        ctrl("service_edit", data);

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


        describe("Test service delete controller", function () {});
        describe("Test service create controller", function () {});
    });

})();
