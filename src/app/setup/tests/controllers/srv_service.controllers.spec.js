(function (angular) {
    "use strict";

    describe("Test service controllers", function () {
        var ctrl, server_url, httpBackend, rootScope, state, log;

        beforeEach(function () {
            module("ui.router");
            module("mflAdminAppConfig");
            module("mfl.common.forms");
            module("mfl.common.services");
            module("mfl.setup.api");
            module("mfl.setup.services.controllers");

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

        describe("Test service edit controller", function () {
            it("should get one service", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        service_id: 1
                    },
                    "$scope": scope,
                    "$state" : state
                };
                spyOn(state, "go");
                httpBackend
                    .expectGET(server_url + "api/facilities/services/1/")
                    .respond(200, {});

                ctrl("service_edit", data);
                scope.steps = [
                    {
                        name: "basic",
                        active: false
                    },
                    {
                        name : "options",
                        active: true
                    }
                ];
                var obj = {name : "basic"};
                scope.tabState(obj);
                expect(scope.steps[0].active).toBeTruthy();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.service).toEqual({});
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

                spyOn(log, "warn");
                ctrl("service_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.service).toBe(undefined);
                expect(log.warn).toHaveBeenCalled();
            });
        });

        describe("Test service edit basic controller", function () {
            it("should get all categories", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope
                };
                data.$scope.steps = [
                    {active : true},
                    {active : false}
                ];
                httpBackend
                    .expectGET(server_url +
                               "api/facilities/service_categories/?page_size=1000")
                    .respond(200, {results: []});

                ctrl("service_edit.basic", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.categories).toEqual([]);
            });

            it("should log errors on get categories failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope,
                    "$log": log
                };
                data.$scope.steps = [
                    {active: true},
                    {active: false}
                ];
                httpBackend
                    .expectGET(server_url +
                               "api/facilities/service_categories/?page_size=1000")
                    .respond(500, {"error": "a"});

                spyOn(log, "warn");

                ctrl("service_edit.basic", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.categories).toBe(undefined);
                expect(log.warn).toHaveBeenCalled();
            });

            it("should save updated service", function () {
                inject(["mfl.common.forms.changes",
                    function (formChanges) {
                        var scope = rootScope.$new();
                        var data = {
                            "$state": state,
                            "$scope": scope,
                            "mfl.common.forms.changes": formChanges
                        };
                        data.$scope.steps = [
                            {active : true},
                            {active : false}
                        ];
                        httpBackend
                            .expectGET(server_url +
                                       "api/facilities/service_categories/?page_size=1000")
                            .respond(200, {results: []});

                        spyOn(formChanges, "whatChanged").andReturn({"name": "get"});
                        spyOn(state, "go");
                        data.$scope.service = {};
                        data.$scope.service_id = 1;
                        ctrl("service_edit.basic", data);

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
                            "$state": state,
                            "$scope": scope,
                            "mfl.common.forms.changes": formChanges
                        };
                        data.$scope.steps = [
                            {active : true},
                            {active : false}
                        ];
                        httpBackend
                            .expectGET(server_url +
                                       "api/facilities/service_categories/?page_size=1000")
                            .respond(200, {results: []});

                        spyOn(formChanges, "whatChanged").andReturn({});
                        spyOn(state, "go");
                        data.$scope.service_id = 1;
                        data.$scope.service = {};
                        ctrl("service_edit.basic", data);

                        httpBackend.flush();
                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();

                        httpBackend.resetExpectations();

                        scope.save();

                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();
                        expect(formChanges.whatChanged).toHaveBeenCalled();
                    }
                ]);
            });
        });

        describe("Test service edit options controller", function () {

            it("should load all options and service options", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope,
                    "$state": state
                };
                data.$scope.create = false;
                data.$scope.steps = [
                    {active : false},
                    {active : true}
                ];
                spyOn(state, "go");
                httpBackend
                    .expectGET(server_url + "api/facilities/options/?page_size=1000")
                    .respond(200, {results: [{"id": 2}, {"id": 1}]});

                httpBackend
                    .expectGET(
                        server_url + "api/facilities/service_options/?page_size=1000&service=1")
                    .respond(200, {results: [{"id": 2}]});

                data.$scope.service_id = 1;
                ctrl("service_edit.options", data);
                scope.cancel();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalled();
                expect(scope.options).toEqual([{"id": 2}, {"id": 1}]);
                expect(scope.service_options).toEqual([{"id": 2}]);
            });

            it("should show errors on fail to load options and service options", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope,
                    "$log": log
                };
                data.$scope.create = false;
                data.$scope.steps = [
                    {active : false},
                    {active : true}
                ];
                httpBackend
                    .expectGET(server_url + "api/facilities/options/?page_size=1000")
                    .respond(500, {"error": "e"});

                httpBackend
                    .expectGET(
                        server_url + "api/facilities/service_options/?page_size=1000&service=1")
                    .respond(500, {"error": "e"});

                data.$scope.service_id = 1;
                spyOn(log, "warn");
                ctrl("service_edit.options", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.options).toEqual([]);
                expect(scope.service_options).toEqual([]);
                expect(log.warn).toHaveBeenCalled();
            });

            it("should add an option to a service", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope
                };
                data.$scope.create = false;
                data.$scope.steps = [
                    {active : false},
                    {active : true}
                ];
                httpBackend
                    .expectGET(server_url + "api/facilities/options/?page_size=1000")
                    .respond(200, {results: [{"id": 2}, {"id": 1}]});

                httpBackend
                    .expectGET(
                        server_url + "api/facilities/service_options/?page_size=1000&service=1")
                    .respond(200, {results: [{"id": 2}]});

                data.$scope.service_id = 1;

                ctrl("service_edit.options", data);

                httpBackend.flush();
                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(server_url+"api/facilities/service_options/")
                    .respond(201, {"id": 1});
                scope.new_option_id = "2";
                scope.addOption();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                expect(scope.service_options[1]).toEqual({"id": 1});
            });

            it("should show error on fail to add an option to a service", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope
                };
                data.$scope.create = false;
                data.$scope.steps = [
                    {active : false},
                    {active : true}
                ];
                httpBackend
                    .expectGET(server_url + "api/facilities/options/?page_size=1000")
                    .respond(200, {results: [{"id": 2}, {"id": 1}]});

                httpBackend
                    .expectGET(
                        server_url + "api/facilities/service_options/?page_size=1000&service=1")
                    .respond(200, {results: [{"id": 2}]});

                data.$scope.service_id = 1;

                ctrl("service_edit.options", data);

                httpBackend.flush();
                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(server_url+"api/facilities/service_options/")
                    .respond(400, {"error": "q"});
                scope.new_option_id = "2";
                scope.addOption();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                expect(scope.service_options).toEqual([{"id": 2}]);
            });

            it("should remove an option from a service", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope
                };
                data.$scope.create = false;
                data.$scope.steps = [
                    {active : false},
                    {active : true}
                ];
                httpBackend
                    .expectGET(server_url + "api/facilities/options/?page_size=1000")
                    .respond(200, {results: [{"id": 2}, {"id": 1}]});

                httpBackend
                    .expectGET(
                        server_url + "api/facilities/service_options/?page_size=1000&service=1")
                    .respond(200, {results: [{"id": 2}]});

                data.$scope.service_id = 1;

                ctrl("service_edit.options", data);

                httpBackend.flush();
                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url+"api/facilities/service_options/2/")
                    .respond(204);

                scope.removeChild({id:2});
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                expect(scope.service_options).toEqual([{id:2}]);
            });

            it("should show errors on fail to remove an option from a service", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope
                };
                data.$scope.create = false;
                data.$scope.steps = [
                    {active : false},
                    {active : true}
                ];
                httpBackend
                    .expectGET(server_url + "api/facilities/options/?page_size=1000")
                    .respond(200, {results: [{"id": 2}, {"id": 1}]});

                httpBackend
                    .expectGET(
                        server_url + "api/facilities/service_options/?page_size=1000&service=1")
                    .respond(200, {results: []});

                data.$scope.service_id = 1;

                ctrl("service_edit.options", data);

                httpBackend.flush();
                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url+"api/facilities/service_options/2/")
                    .respond(500);

                scope.removeChild({id:2});
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                expect(scope.service_options).toEqual([]);
            });
        });

        describe("Test service delete on edit controller", function () {

            it("should delete the service", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        service_id: 1
                    },
                    "$state": state,
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/services/1/")
                    .respond(200, {});

                spyOn(state, "go");
                ctrl("service_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/services/1/")
                    .respond(204, {});
                scope.remove();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalled();
            });

            it("should show error on delete the service failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        service_id: 1
                    },
                    "$state": state,
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/services/1/")
                    .respond(200, {});

                spyOn(state, "go");
                ctrl("service_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/services/1/")
                    .respond(404, {});

                scope.remove();
                scope.cancel();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalled();
            });
        });

        describe("Test service create controller", function () {
            it("should get all categories & test methods",
            inject(["mfl.common.services.multistep",
            function (multistepService) {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope,
                    "$state" : state,
                    "$stateParams": {
                        furthest : 1
                    },
                    "mfl.common.services.multistep" : multistepService
                };
                spyOn(state, "go");
                httpBackend
                    .expectGET(server_url +
                               "api/facilities/service_categories/?page_size=1000")
                    .respond(200, {results: []});

                ctrl("service_create", data);
                scope.steps = [
                    {
                        name : "basic",
                        active: false ,
                        furthest: false,
                        prev: ["options"],
                        count : 1
                    },
                    {
                        name : "options",
                        done : false
                    }
                ];
                var obj = {active : true};
                scope.nextState();
                scope.tabState(obj);
                expect(scope.steps[0].active).toEqual(false);
                expect(scope.steps[0].furthest).toBeTruthy();
                expect(scope.steps[1].done).toEqual(true);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.categories).toEqual([]);
            }]));

            it("should log errors on get categories failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope,
                    "$log": log
                };

                httpBackend
                    .expectGET(server_url +
                               "api/facilities/service_categories/?page_size=1000")
                    .respond(500, {"error": "a"});

                spyOn(log, "warn");
                ctrl("service_create", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.categories).toBe(undefined);
                expect(log.warn).toHaveBeenCalled();
            });
        });

        describe("Test service edit option controller", function () {
            it("should set $state param", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope" : scope,
                    "$state" : state
                };
                data.$scope.create = false;
                data.$scope.steps = [
                    {active : false},
                    {active : true}
                ];
                state.params.service_id = 1;

                ctrl("service_edit.options", data);
            });
            it("should set create anf nextState method", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope" : scope
                };
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                ctrl("service_edit.options", data);
            });
        });

        describe("Testing creation controller val = 1",function () {
            it("Should call tabState method val = 2", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope" : scope,
                    "$state" : state
                };
                spyOn(state, "go");
                state.params.service_id = 1;
                ctrl("service_create", data);
                var val = 2;
                scope.tab = 2;
                scope.tabState(val);
                expect(scope.tab).toEqual(val);
            });
            it("Should call tabState method", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope" : scope,
                    "$state" : state
                };
                spyOn(state, "go");
                ctrl("service_create", data);
                var val = 0;
                scope.tabState(val);
                expect(scope.tab).toEqual(val);
            });
            it("Should call tabState method val = 0", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope" : scope,
                    "$state" : state
                };
                spyOn(state, "go");
                ctrl("service_create", data);
                var val = 2;
                scope.tabState(val);
                var val_rstl = 0;
                expect(scope.tab).toEqual(val_rstl);
            });

        });
        describe("This tests create basic service controller", function () {
            it("should test getting details of new service created",
            inject(["mfl.common.forms.changes", "$controller", "$state",
                function (formChanges, $controller, $state) {
                    var scope = rootScope.$new();
                    var data = {
                        "$scope" : scope,
                        "$state" : $state,
                        "mfl.common.forms.changes": formChanges
                    };
                    $state.params.service_id = "1";
                    httpBackend.expectGET(server_url +
                        "api/facilities/services/1/").respond(
                        200, {});
                    data.$scope.create = true;
                    data.$scope.nextState = angular.noop;
                    $controller(
                        "mfl.setup.controllers.service_create.basic",data);
                    httpBackend.flush();
                }
            ]));
            it("should test getting details of new service created: success",
            inject(["mfl.common.forms.changes", "$controller", "$state",
                function (formChanges, $controller, $state) {
                    var scope = rootScope.$new();
                    var data = {
                        "$scope" : scope,
                        "$state" : $state,
                        "mfl.common.forms.changes": formChanges
                    };
                    $state.params.service_id = "";
                    data.$scope.create = true;
                    data.$scope.nextState = angular.noop;
                    $controller(
                        "mfl.setup.controllers.service_create.basic",data);
                }
            ]));
            it("should test getting details of new service created: fail",
            inject(["mfl.common.forms.changes", "$controller", "$state",
                function (formChanges, $controller, $state) {
                    var scope = rootScope.$new();
                    var data = {
                        "$scope" : scope,
                        "$state" : $state,
                        "mfl.common.forms.changes": formChanges
                    };

                    $state.params.service_id = "1";
                    httpBackend.expectGET(server_url +
                        "api/facilities/services/1/").respond(
                        500, {});
                    data.$scope.create = true;
                    data.$scope.nextState = angular.noop;
                    $controller(
                        "mfl.setup.controllers.service_create.basic",data);
                    httpBackend.flush();
                }
            ]));
            //failing test should update
            it("should test updating service in save method:pass",
            inject(["mfl.common.forms.changes", "$state",
                function (formChanges, $state) {
                    var scope = rootScope.$new();
                    var data = {
                        "$scope" : scope,
                        "mfl.common.forms.changes": formChanges,
                        "$state" : $state
                    };
                    $state.params.service_id = "1";
                    var form = {
                        "$dirty": true,
                        "name": {
                            "$modelValue": "ASD",
                            "$dirty": true
                        }
                    };
                    httpBackend.expectPATCH(server_url +
                        "api/facilities/services/1/").respond(
                        200, {"name" : "ASD"});
                    spyOn(state, "go");
                    data.$scope.nextState = angular.noop;
                    ctrl("service_create.basic", data);
                    scope.save(form);
                    httpBackend.flush();
                }
            ]));
            it("should test updating service in save method:pass",
            inject(["mfl.common.forms.changes", "$state",
                function (formChanges, $state) {
                    var scope = rootScope.$new();
                    var data = {
                        "$scope" : scope,
                        "mfl.common.forms.changes": formChanges,
                        "$state" : $state
                    };
                    $state.params.service_id = "1";
                    var form = {
                        "$dirty": true,
                        "name": {
                            "$modelValue": "ASD",
                            "$dirty": true
                        }
                    };
                    httpBackend.expectPATCH(server_url +
                        "api/facilities/services/1/").respond(
                        500, {"name" : "ASD"});
                    spyOn(state, "go");
                    data.$scope.nextState = angular.noop;
                    ctrl("service_create.basic", data);
                    scope.save(form);
                    httpBackend.flush();
                }
            ]));
            it("should test getting details of new service save: invalid form",
            inject(["mfl.common.forms.changes", "$state",
                function (formChanges, $state) {
                    var scope = rootScope.$new();
                    var data = {
                        "$scope" : scope,
                        "mfl.common.forms.changes": formChanges,
                        "$state" : $state
                    };
                    $state.params.service_id = "1";
                    var form = {};
                    httpBackend.expectGET(server_url +
                        "api/facilities/services/1/").respond(
                        200, {});
                    spyOn(state, "go");
                    data.$scope.nextState = angular.noop;
                    ctrl("service_create.basic", data);
                    scope.save(form);
                    httpBackend.flush();
                }
            ]));
            //failing coverage
            it("should test getting details of new service save method: fail",
            inject(["mfl.common.forms.changes", "$state",
                function (formChanges, $state) {
                    var scope = rootScope.$new();
                    var data = {
                        "$scope" : scope,
                        "mfl.common.forms.changes": formChanges,
                        "$state" : $state
                    };
                    spyOn($state, "go");
                    $state.params.service_id = "";
                    var form = {
                        "$dirty": true,
                        "name": {
                            "$modelValue": "ASD",
                            "$dirty": true
                        }
                    };
                    httpBackend.expectPOST(server_url +
                        "api/facilities/services/").respond(
                        201, {"name" : "ASD"});
                    data.$scope.nextState = angular.noop;
                    ctrl("service_create.basic", data);
                    scope.save(form);
                    httpBackend.flush();
                }
            ]));
        });
    });

})(window.angular);
