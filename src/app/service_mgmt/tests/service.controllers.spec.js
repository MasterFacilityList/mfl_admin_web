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
                inject(["mfl.service_mgmt.wrappers", "mfl.common.forms.changes",
                    function (wrappers, formChanges) {
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

                        var controller = ctrl("service_edit", data);

                        httpBackend.flush();
                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();

                        expect(scope.service).toEqual({});
                        expect(scope.categories).toEqual([]);
                    }
                ]);
            });

            it("should log errors on get one service failure", function () {
                inject(["mfl.service_mgmt.wrappers", "mfl.common.forms.changes",
                    function (wrappers, formChanges) {
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
                        var controller = ctrl("service_edit", data);

                        httpBackend.flush();
                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();

                        expect(scope.service).toBe(undefined);
                        expect(log.warn).toHaveBeenCalledWith({"error": "a"});
                    }
                ]);
            });
        });
        describe("Test service delete controller", function () {});
        describe("Test service create controller", function () {});
    });

})();
