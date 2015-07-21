(function () {
    "use strict";

    describe("Test options controllers", function () {
        var ctrl, server_url, httpBackend, rootScope, state, log;

        beforeEach(function () {
            module("ui.router");
            module("mflAdminAppConfig");
            module("mfl.common.forms");
            module("mfl.service_mgmt.services");
            module("mfl.setup.options.controllers");

            inject(["$controller", "SERVER_URL", "$httpBackend", "$rootScope", "$state", "$log",
                function ($controller, SERVER_URL, $httpBackend, $rootScope, $state, $log) {
                    httpBackend = $httpBackend;
                    server_url = SERVER_URL;
                    rootScope = $rootScope;
                    state = $state;
                    log = $log;
                    ctrl = function (name, data) {
                        return $controller("mfl.setup.controllers."+name, data);
                    };
                }
            ]);
        });

        describe("Test option edit controller", function () {
            it("should get one option", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        option_id: 1
                    },
                    "$scope": scope
                };

                httpBackend
                    .expectGET(server_url + "api/facilities/options/1/")
                    .respond(200, {});

                ctrl("option_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.option).toEqual({});
            });

            it("should log errors on get one option failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        option_id: 1
                    },
                    "$scope": scope,
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/options/1/")
                    .respond(500, {"error": "a"});

                spyOn(log, "warn");
                ctrl("option_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.option).toBe(undefined);
                expect(log.warn).toHaveBeenCalled();
            });

            it("should save updated option", function () {
                inject(["mfl.common.forms.changes",
                    function (formChanges) {
                        var scope = rootScope.$new();
                        var data = {
                            "$stateParams": {
                                option_id: 1
                            },
                            "$state": state,
                            "$scope": scope,
                            "mfl.common.forms.changes": formChanges
                        };
                        httpBackend
                            .expectGET(server_url + "api/facilities/options/1/")
                            .respond(200, {});

                        spyOn(formChanges, "whatChanged").andReturn({"name": "get"});
                        spyOn(state, "go");
                        ctrl("option_edit", data);

                        httpBackend.flush();
                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();

                        httpBackend.resetExpectations();

                        httpBackend
                            .expectPATCH(
                                server_url + "api/facilities/options/1/",
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

            it("should not save if option is not updated", function () {
                inject(["mfl.common.forms.changes",
                    function (formChanges) {
                        var scope = rootScope.$new();
                        var data = {
                            "$stateParams": {
                                option_id: 1
                            },
                            "$state": state,
                            "$scope": scope,
                            "mfl.common.forms.changes": formChanges
                        };
                        httpBackend
                            .expectGET(server_url + "api/facilities/options/1/")
                            .respond(200, {});

                        spyOn(formChanges, "whatChanged").andReturn({});
                        spyOn(state, "go");
                        ctrl("option_edit", data);

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

        describe("Test option edit controller delete function", function () {
            it("should delete the option", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        option_id: 1
                    },
                    "$state": state,
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/options/1/")
                    .respond(200, {});

                spyOn(state, "go");
                ctrl("option_edit", data);

                httpBackend
                    .expectDELETE(server_url + "api/facilities/options/1/")
                    .respond(204, {});
                scope.remove();
                scope.cancel();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalledWith("setup.srv_option_list.option_edit");
            });
            it("should show error when deleting the option", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        option_id: 1
                    },
                    "$state": state,
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/options/1/")
                    .respond(200, {});

                spyOn(state, "go");
                spyOn(log, "warn");
                ctrl("option_edit", data);

                httpBackend
                    .expectDELETE(server_url + "api/facilities/options/1/")
                    .respond(404, {});
                scope.remove();
                scope.cancel();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalledWith("setup.srv_option_list.option_edit");
            });
        });

        describe("Test option create controller", function () {

            it("should create the option", function () {
                var scope = rootScope.$new();
                var data = {
                    "$state": state,
                    "$scope": scope
                };

                spyOn(state, "go");
                ctrl("option_create", data);

                scope.option = {
                    "name": "get"
                };
                httpBackend
                    .expectPOST(server_url + "api/facilities/options/", {"name": "get"})
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
