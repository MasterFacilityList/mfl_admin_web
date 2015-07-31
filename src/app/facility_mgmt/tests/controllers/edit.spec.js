(function (angular) {
    "use strict";

    describe("Test facility edit controllers", function () {
        var rootScope, ctrl, httpBackend, server_url, loginService, log,
        yusa, controller, facObjService, state, multistepService;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.facility_mgmt.controllers");
            module("mfl.common.services");
            inject(["$controller", "$rootScope", "$httpBackend", "SERVER_URL",
                "mfl.auth.services.login", "$log",
                "mfl.common.services.multistep",
                "mfl.facility.multistep.service", "$state",
                function (c, r, h, s, ls, lg, ms,fmS, st) {
                    ctrl = function (name, data) {
                        return c("mfl.facility_mgmt.controllers.facility_edit"+name, data);
                    };
                    controller = c;
                    rootScope = r;
                    httpBackend = h;
                    server_url = s;
                    loginService = ls;
                    multistepService = ms;
                    facObjService = fmS;
                    state = st;
                    yusa = {
                        county: "123"
                    };
                    log = lg;
                }
            ]);
        });

        describe("Test facility edit controller", function () {

            it("should load facility details",
                inject(["mfl.facility.multistep.service", function (facObjService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$state" : state,
                        "mfl.facility.multistep.service" : facObjService,
                        "$stateParams": {
                            facility_id: 3
                        }
                    };

                    var f = {
                        ward_name: "ward",
                        ward: "1",
                        facility_type: "2",
                        facility_type_name: "type",
                        owner: "3",
                        owner_name: "owner",
                        operation_status: "4",
                        operation_status_name: "opstatus",
                        regulatory_body_name: "def",
                        regulatory_body: "23",
                        facility_physical_address : {
                            town_id : "3",
                            town : "Mombasa"
                        }
                    };
                    spyOn(state, "go");
                    httpBackend
                        .expectGET(server_url+"api/facilities/facilities/3/")
                        .respond(200, f);
                    data.$scope.steps = [
                        {
                            name : "basic",
                            active : false
                        },
                        {
                            name : "contacts",
                            active : false
                        }
                    ];

                    ctrl("", data);
                    var obj = {name : "basic", active : false};
                    data.$scope.tabState(obj);
                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    expect(data.$scope.facility).toEqual(f);
                    expect(data.$scope.select_values).toEqual({
                        ward: {
                            "id": "1",
                            "name": "ward"
                        },
                        facility_type: {
                            "id": "2",
                            "name": "type"
                        },
                        owner: {
                            "id": "3",
                            "name": "owner"
                        },
                        operation_status: {
                            "id": "4",
                            "name": "opstatus"
                        },
                        regulatory_body: {
                            "id": "23",
                            "name": "def"
                        },
                        town : {
                            "id" : "3",
                            "name" : "Mombasa"
                        }
                    });
                }])
            );

            it("should deactivate a facility",
                inject(["mfl.facility.multistep.service", function (facObjService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$state" : state,
                        "mfl.facility.multistep.service" : facObjService,
                        "$stateParams": {
                            facility_id: 3
                        }
                    };

                    var f = {
                        ward_name: "ward",
                        ward: "1",
                        facility_type: "2",
                        facility_type_name: "type",
                        owner: "3",
                        owner_name: "owner",
                        operation_status: "4",
                        operation_status_name: "opstatus",
                        regulatory_body_name: "def",
                        regulatory_body: "23"
                    };
                    spyOn(state, "go");
                    httpBackend
                        .expectGET(server_url+"api/facilities/facilities/3/")
                        .respond(200, f);
                    data.$scope.steps = [
                        {
                            name : "basic",
                            active : false
                        },
                        {
                            name : "contacts",
                            active : false
                        }
                    ];

                    ctrl("", data);
                    var obj = {name : "basic", active : false};
                    data.$scope.tabState(obj);
                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    expect(data.$scope.facility).toEqual(f);
                    expect(data.$scope.select_values).toEqual({
                        ward: {
                            "id": "1",
                            "name": "ward"
                        },
                        facility_type: {
                            "id": "2",
                            "name": "type"
                        },
                        owner: {
                            "id": "3",
                            "name": "owner"
                        },
                        operation_status: {
                            "id": "4",
                            "name": "opstatus"
                        },
                        regulatory_body: {
                            "id": "23",
                            "name": "def"
                        },
                        town : {
                            "id" : "",
                            "name" : ""
                        }
                    });

                    httpBackend.resetExpectations();

                    httpBackend
                        .expectPATCH(server_url+"api/facilities/facilities/3/")
                        .respond(200, {});

                    data.$scope.remove();

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }])
            );

            it("should show error on fail to delete facility",
                inject(["mfl.facility.multistep.service", function (facObjService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$state" : state,
                        "mfl.facility.multistep.service" : facObjService,
                        "$stateParams": {
                            facility_id: 3
                        }
                    };

                    var f = {
                        ward_name: "ward",
                        ward: "1",
                        facility_type: "2",
                        facility_type_name: "type",
                        owner: "3",
                        owner_name: "owner",
                        operation_status: "4",
                        operation_status_name: "opstatus",
                        regulatory_body: "23",
                        regulatory_body_name: "def"
                    };
                    spyOn(state, "go");
                    httpBackend
                        .expectGET(server_url+"api/facilities/facilities/3/")
                        .respond(200, f);
                    data.$scope.steps = [
                        {
                            name : "basic",
                            active : false
                        },
                        {
                            name : "contacts",
                            active : false
                        }
                    ];

                    ctrl("", data);
                    var obj = {name : "basic", active : false};
                    data.$scope.tabState(obj);
                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    expect(data.$scope.facility).toEqual(f);
                    expect(data.$scope.select_values).toEqual({
                        ward: {
                            "id": "1",
                            "name": "ward"
                        },
                        facility_type: {
                            "id": "2",
                            "name": "type"
                        },
                        owner: {
                            "id": "3",
                            "name": "owner"
                        },
                        operation_status: {
                            "id": "4",
                            "name": "opstatus"
                        },
                        regulatory_body: {
                            "id": "23",
                            "name": "def"
                        },
                        town : {
                            "id" : "",
                            "name" : ""
                        }
                    });

                    httpBackend.resetExpectations();

                    httpBackend
                        .expectPATCH(server_url+"api/facilities/facilities/3/")
                        .respond(500);

                    data.$scope.remove();
                    data.$scope.cancel();

                    expect(state.go).toHaveBeenCalled();

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();
                }])
            );

            it("should data", function () {
                inject(["mfl.facility_mgmt.services.wrappers", function (wrappers) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$state" : state,
                        "$stateParams": {
                            facility_id: 3
                        }
                    };
                    state.params.facility_id = "";
                    ctrl("", data);

                    httpBackend
                        .expectGET(server_url+"api/facilities/facility_status/?")
                        .respond(200, {});

                    data.$scope.selectReload();
                    data.$scope.selectReload(null, null, 3);
                    data.$scope.selectReload(wrappers.operation_status, "", "ops");

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();
                }]);
            });

            it("should show error on fail to load facility details", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/facilities/3/")
                    .respond(400, {});

                spyOn(log, "error");
                ctrl("", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.facility).toBe(undefined);
                expect(log.error).toHaveBeenCalled();
            });

            it("should reload facilities", function () {
                inject(["mfl.facility_mgmt.services.wrappers", function (wrappers) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 3
                        }
                    };
                    httpBackend
                        .expectGET(server_url+"api/facilities/facilities/3/")
                        .respond(200, {});

                    ctrl("", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    httpBackend.resetExpectations();

                    httpBackend
                        .expectGET(server_url+"api/facilities/facilities/" +
                                   "?search_auto=kitale")
                        .respond(200, {results : []});

                    data.$scope.selectReload(wrappers.facility_detail, "kitale", "facilities");

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    expect(data.$scope.facilities).toEqual([]);
                }]);
            });

            it("should show errors on fail to reload facilities", function () {
                inject(["mfl.facility_mgmt.services.wrappers", function (wrappers) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 3
                        }
                    };
                    httpBackend
                        .expectGET(server_url+"api/facilities/facilities/3/")
                        .respond(200, {});

                    ctrl("", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    httpBackend.resetExpectations();

                    httpBackend
                        .expectGET(server_url+"api/facilities/facilities/" +
                                   "?search_auto=kitale")
                        .respond(400);

                    data.$scope.selectReload(wrappers.facility_detail, "kitale", "facilities");

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    expect(data.$scope.facilities).toEqual(undefined);
                }]);
            });
        });

        describe("Test facility edit basic controller", function () {

            beforeEach(function () {
                spyOn(loginService, "getUser").andReturn({
                    constituency: "123"
                });
            });

            it("should not save if no changes made", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state" : state,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                spyOn(state, "go");

                data.$scope.selectReload = function () {
                    return {"results": []};
                };
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                data.$scope.setFurthest = angular.noop;
                data.$scope.facility = {
                    facility_physical_address : {town : "5"}
                };
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"}
                ];
                data.$scope.select_values = {
                    ward : {id : "1"},
                    facility_type : {id : "2"},
                    owner : {id : "3"},
                    operation_status : {id : "4"},
                    town : {id : "5"}
                };
                ctrl(".basic", data);

                var frm = {
                    "$dirty": false,
                    "name": {
                        "$dirty": false,
                        "$$modelValue": "test"
                    }
                };
                data.$scope.save(frm);
                var official = "Antony Facility";
                var name;
                data.$scope.initUniqueName(official, name);
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                expect(data.$scope.facility.name).toEqual(official);
            });
            //new test
            it("should not save if no changes", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state" : state,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                spyOn(state, "go");

                data.$scope.selectReload = function () {
                    return {"results": []};
                };
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                data.$scope.setFurthest = angular.noop;
                data.$scope.facility = {
                    facility_physical_address : {town : "5"}
                };
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"}
                ];
                data.$scope.select_values = {
                    ward : {id : "1"},
                    facility_type : {id : "2"},
                    owner : {id : "3"},
                    operation_status : {id : "4"},
                    town : {id : "5"}
                };
                ctrl(".basic", data);

                var frm = {
                    "$dirty": false,
                    "name": {
                        "$dirty": false,
                        "$$modelValue": "test"
                    }
                };
                data.$scope.save(frm);
                var official = "Antony Facility";
                var name;
                data.$scope.initUniqueName(official, name);
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                expect(data.$scope.facility.name).toEqual(official);
            });

            it("should edit facility basic details", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.selectReload = function () {
                    return {"results": []};
                };
                data.$scope.facility = {
                    facility_physical_address : {town : "5"}
                };
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"}
                ];
                data.$scope.select_values = {
                    ward : {id : "1"},
                    facility_type : {id : "2"},
                    owner : {id : "3"},
                    operation_status : {id : "4"},
                    town : {id : "5"}
                };
                data.$scope.create = false;
                ctrl(".basic", data);

                httpBackend
                    .expectPATCH(server_url+"api/facilities/facilities/3/")
                    .respond(204);
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$dirty": true,
                        "$$modelValue": "test"
                    }
                };
                data.$scope.facility_id = 3;
                data.$scope.save(frm);
                var official = "Antony Facility";
                var name = "Yitch";
                data.$scope.initUniqueName(official, name);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });

            it("should save facility basic details", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state" : state,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.selectReload = function () {
                    return {"results": []};
                };
                state.params.facility_id = "";
                data.$scope.facility = {
                    facility_physical_address : {town : "5"}
                };
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"}
                ];
                data.$scope.select_values = {
                    ward : {id : "1"},
                    facility_type : {id : "2"},
                    owner : {id : "3"},
                    operation_status : {id : "4"},
                    town : {id : "5"}
                };
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                data.$scope.setFurthest = angular.noop;
                ctrl(".basic", data);

                httpBackend
                    .expectPOST(server_url+"api/facilities/facilities/")
                    .respond(201, {name : "Yitchouse"});
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$dirty": true,
                        "$$modelValue": "test"
                    }
                };
                data.$scope.facility_id = 3;
                data.$scope.save(frm);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });

            it("should save facility basic details: fail", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state" : state,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.selectReload = function () {
                    return {"results": []};
                };
                state.params.facility_id = "";
                data.$scope.facility = {
                    facility_physical_address : {town : "5"}
                };
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"}
                ];
                data.$scope.select_values = {
                    ward : {id : "1"},
                    facility_type : {id : "2"},
                    owner : {id : "3"},
                    operation_status : {id : "4"},
                    town : {id : "5"}
                };
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                data.$scope.setFurthest = angular.noop;
                ctrl(".basic", data);

                httpBackend
                    .expectPOST(server_url+"api/facilities/facilities/")
                    .respond(500, {name : "Yitchouse"});
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$dirty": true,
                        "$$modelValue": "test"
                    }
                };
                data.$scope.facility_id = 3;
                data.$scope.save(frm);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });

            it("should save facility basic details: update", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state" : state,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.selectReload = function () {
                    return {"results": []};
                };
                state.params.facility_id = "3";
                data.$scope.facility = {
                    facility_physical_address : {town : "5"}
                };
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"}
                ];
                data.$scope.select_values = {
                    ward : {id : "1"},
                    facility_type : {id : "2"},
                    owner : {id : "3"},
                    operation_status : {id : "4"},
                    town : {id : "5"}
                };
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                data.$scope.setFurthest = angular.noop;
                ctrl(".basic", data);
                httpBackend
                    .expectPATCH(server_url+"api/facilities/facilities/3/")
                    .respond(204);
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$dirty": true,
                        "$$modelValue": "test"
                    }
                };
                data.$scope.facility_id = 3;
                data.$scope.save(frm);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });

            it("should save facility basic details: update, fail",function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state" : state,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.selectReload = function () {
                    return {"results": []};
                };
                state.params.facility_id = "3";
                data.$scope.facility = {
                    facility_physical_address : {town : "5"}
                };
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"}
                ];
                data.$scope.select_values = {
                    ward : {id : "1"},
                    facility_type : {id : "2"},
                    owner : {id : "3"},
                    operation_status : {id : "4"},
                    town : {id : "5"}
                };
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                data.$scope.setFurthest = angular.noop;
                ctrl(".basic", data);
                httpBackend
                    .expectPATCH(server_url+"api/facilities/facilities/3/")
                    .respond(500);
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$dirty": true,
                        "$$modelValue": "test"
                    }
                };
                data.$scope.facility_id = 3;
                data.$scope.save(frm);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });

            it("should save facility basic details: empty form",function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state" : state,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.selectReload = function () {
                    return {"results": []};
                };
                spyOn(state, "go");
                state.params.facility_id = "3";
                data.$scope.facility = {
                    facility_physical_address : {town : "5"}
                };
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"}
                ];
                data.$scope.select_values = {
                    ward : {id : "1"},
                    facility_type : {id : "2"},
                    owner : {id : "3"},
                    operation_status : {id : "4"},
                    town : {id : "5"}
                };
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                data.$scope.setFurthest = angular.noop;
                ctrl(".basic", data);
                var frm = {
                    "$dirty": false,
                    "name": {
                        "$dirty": false,
                        "$$modelValue": "test"
                    }
                };
                data.$scope.facility_id = 3;
                data.$scope.save(frm);
            });

            it("should show error on fail to edit facility basic details", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.selectReload = function () {
                    return {"results": []};
                };
                data.$scope.facility = {
                    facility_physical_address : {town : "5"}
                };
                data.$scope.steps = [
                    {name : "basic"}
                ];
                data.$scope.create = false;
                data.$scope.select_values = {
                    ward : {id : "1"},
                    facility_type : {id : "2"},
                    owner : {id : "3"},
                    operation_status : {id : "4"},
                    town : {id : "5"}
                };
                ctrl(".basic", data);


                httpBackend
                    .expectPATCH(server_url+"api/facilities/facilities/3/")
                    .respond(404);
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$dirty": true,
                        "$$modelValue": "test"
                    }
                };
                data.$scope.facility_id = 3;
                data.$scope.save(frm);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });
        });

        describe("Test facility edit contact controller", function () {
            it("should load the required data", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                httpBackend
                    .expectGET(server_url+"api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/contacts/?facility=3")
                    .respond(200, {results: []});
                data.$scope.create = true;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"}
                ];
                data.$scope.nextState = angular.noop;
                ctrl(".contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should fail to load the required data", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "geolocation"},
                    {name : "contacts"}
                ];
                httpBackend
                    .expectGET(server_url+"api/common/contact_types/")
                    .respond(500, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/contacts/?facility=3")
                    .respond(500, {results: []});
                ctrl(".contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should succeed to add facility contact", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/facilities/contacts/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "geolocation"},
                    {name : "contacts"}
                ];
                ctrl(".contacts", data);

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
                    .expectPOST(server_url + "api/facilities/contacts/", {"facility": 3,
                      "contact": 3})
                    .respond(201, {"id": 4});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                expect(data.$scope.fac_contacts).toEqual([{"id": 4}]);
            });

            it("should show error if add a new contact fails", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$log":log,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                spyOn(log, "error");
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/facilities/contacts/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "geolocation"},
                    {name : "contacts"}
                ];
                ctrl(".contacts", data);

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

                expect(data.$scope.fac_contacts).toEqual([]);
                expect(log.error).toHaveBeenCalled();
            });

            it("should show error if add contacts fails", function () {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/facilities/contacts/?facility=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.user_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "geolocation"},
                    {name : "contacts"}
                ];
                ctrl(".contacts", data);

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
                    .expectPOST(server_url + "api/facilities/contacts/", {"facility": 3,
                                                              "contact": 3})
                    .respond(400, {"error_code": 4});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.contacts).toEqual([]);
                expect(log.error).toHaveBeenCalled();
            });

            it("should show error if associate new contact to facility fails", function () {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/facilities/contacts/?facility=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.user_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "geolocation"},
                    {name : "contacts"}
                ];
                ctrl(".contacts", data);

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
                    .expectPOST(server_url + "api/facilities/contacts/", {"facility": 3,
                        "contact": 3})
                    .respond(400, {"error_code": 4});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_contacts).toEqual([]);
                expect(data.$scope.fac_contacts).toEqual([]);
                expect(log.error).toHaveBeenCalled();
            });

            it("should remove a contact from the current facility", function () {
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/facilities/contacts/?facility=3")
                    .respond(200, {results: [{"contact": "123", "id": "456"}]});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.user_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "geolocation"},
                    {name : "contacts"}
                ];
                ctrl(".contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/contacts/456/")
                    .respond(204);
                httpBackend
                    .expectDELETE(server_url + "api/common/contacts/123/")
                    .respond(204);

                data.$scope.contacts = [{"contact": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.fac_contacts[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_contacts).toEqual([]);
            });

            it("should show an error if delete facility_contact failed", function () {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/facilities/contacts/?facility=3")
                    .respond(
                        200, {results: [{"contact": "123","id": "456"}]});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.user_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "gelocstion"},
                    {name : "contacts"}
                ];
                ctrl(".contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/contacts/456/")
                    .respond(500);

                data.$scope.contacts = [{"contact": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.fac_contacts[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_contacts)
                .toEqual([{"contact": "123", "id": "456", "delete_spinner" :false}]);
            });

            it("should show an error if delete contact failed",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/facilities/contacts/?facility=3")
                    .respond(200, {results: [{"contact": "123", "id": "456"}]});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log,
                    "mfl.common.services.multistep" : multistepService,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.user_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "geolocation"},
                    {name : "contacts"}
                ];
                ctrl(".contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/contacts/456/")
                    .respond(204);
                httpBackend
                    .expectDELETE(server_url + "api/common/contacts/123/")
                    .respond(500);

                data.$scope.fac_contacts = [{"contact": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.fac_contacts[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_contacts)
                .toEqual([{"contact": "123", "id": "456", "delete_spinner" : false}]);
            }]));
        });

        describe("Test facility edit officers controller", function () {
            it("should load data from facility officers edit controller",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "mfl.common.services.multistep" : multistepService
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/officers/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_officers/?facility=3")
                    .respond(200, {results: []});
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"},
                    {name : "officers"}
                ];
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                ctrl(".officers", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            }]));
            it("should fail to load data from facility officers edit controller",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "mfl.common.services.multistep" : multistepService
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/officers/")
                    .respond(500, {results: []});
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"},
                    {name : "officers"}
                ];
                data.$scope.create = false;
                ctrl(".officers", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            }]));
            it("should successfully add an officer to a facility",
            inject(["mfl.common.services.multistep",
                "mfl.common.forms.changes",
                function (multistepService, formChanges) {

                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "$state" : state,
                    "mfl.common.services.multistep" : multistepService,
                    "mfl.common.forms.changes" : formChanges
                };
                spyOn(state, "go");
                httpBackend
                    .expectGET(server_url+"api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/job_titles/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/officers/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_officers/?facility=3")
                    .respond(200, {results: []});
                data.$scope.user_id = 3;
                data.$scope.create = false;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"},
                    {name : "officers"}
                ];
                ctrl(".officers", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();
                data.$scope.off = {officer: "13"};
                data.$scope.officer = {
                    "id": "3"
                };
                data.$scope.facility_id = "3";
                data.$scope.contacts = [{type : "13", contact : "0978423" }];
                httpBackend
                    .expectPATCH(server_url + "api/facilities/officers_incharge/13/")
                    .respond(201, {"id": 5});
                data.$scope.contacts = [{type : "13", contact : "t@t.com"}];
                var obj = {type : "13", contact : "t@t.com"};
                data.$scope.add_contact();
                data.$scope.remove_contact(obj);
                var frm =  {
                    $dirty: true,
                    name : {
                        $dirty: true,
                        $modelValue: "Rick Ryan"
                    },
                    id_no : {
                        $modelValue: "3",
                        $dirty: true
                    }
                };
                data.$scope.add(frm);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                expect(data.$scope.fac_officers).toEqual([{"id": 5}]);
            }]));
            it("should successfully create an officer of a facility",
            inject(["mfl.common.services.multistep",
                "mfl.common.forms.changes",
                function (multistepService, formChanges) {

                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "$state" : state,
                    "mfl.common.services.multistep" : multistepService,
                    "mfl.common.forms.changes" : formChanges
                };
                spyOn(state, "go");
                httpBackend
                    .expectGET(server_url+"api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/job_titles/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/officers/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_officers/?facility=3")
                    .respond(200, {results: []});
                data.$scope.user_id = 3;
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"},
                    {name : "officers"}
                ];
                ctrl(".officers", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();
                data.$scope.off = {officer: "13"};
                data.$scope.officer = {
                    "id": "3"
                };
                data.$scope.facility_id = "3";
                data.$scope.contacts = [{type : "13", contact : "0978423" }];
                httpBackend
                    .expectPOST(server_url + "api/facilities/officer_facade/")
                    .respond(201, {"id": 5});
                data.$scope.contacts = [{type : "13", contact : "t@t.com"}];
                var obj = {type : "13", contact : "t@t.com"};
                data.$scope.add_contact();
                data.$scope.remove_contact(obj);
                var frm =  {
                    $dirty: true,
                    name : {
                        $dirty: true,
                        $modelValue: "Rick Ryan"
                    },
                    id_no : {
                        $modelValue: "3",
                        $dirty: true
                    }
                };
                data.$scope.add(frm);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            }]));
            it("should fail to add an officer to a facility",
            inject(["mfl.common.services.multistep",
                function (multistepService) {

                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "mfl.common.services.multistep" : multistepService
                };
                data.$scope.create = false;
                httpBackend
                    .expectGET(server_url+"api/facilities/officers/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_officers/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"},
                    {name : "officers"}
                ];

                ctrl(".officers", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                data.$scope.officer = {
                    "id": "3"
                };
                data.$scope.off = {officer: "13"};
                data.$scope.facility_id = "3";

                httpBackend
                    .expectPATCH(server_url + "api/facilities/officers_incharge/13/")
                    .respond(500, {"id": 5});
                data.$scope.contacts = [{type : "13", contact : "t@t.com"}];
                var obj = {type : "13", contact : "t@t.com"};
                data.$scope.add_contact();
                data.$scope.remove_contact(obj);
                var frm =  {
                    $dirty: true,
                    name : {
                        $dirty: true,
                        $modelValue: "Rick Ryan"
                    },
                    id_no : {
                        $modelValue: "3",
                        $dirty: true
                    }
                };
                data.$scope.add(frm);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                expect(data.$scope.fac_officers).toEqual([]);
            }]));
            it("should fail to create an officer of a facility",
            inject(["mfl.common.services.multistep",
                function (multistepService) {

                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "mfl.common.services.multistep" : multistepService
                };
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                httpBackend
                    .expectGET(server_url+"api/facilities/officers/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_officers/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"},
                    {name : "officers"}
                ];

                ctrl(".officers", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                data.$scope.officer = {
                    "id": "3"
                };
                data.$scope.off = {officer: "13"};
                data.$scope.facility_id = "3";

                httpBackend
                    .expectPOST(server_url + "api/facilities/officer_facade/")
                    .respond(500, {"id": 5});
                data.$scope.contacts = [{type : "13", contact : "t@t.com"}];
                var obj = {type : "13", contact : "t@t.com"};
                data.$scope.add_contact();
                data.$scope.remove_contact(obj);
                var frm =  {
                    $dirty: true,
                    name : {
                        $dirty: true,
                        $modelValue: "Rick Ryan"
                    },
                    id_no : {
                        $modelValue: "3",
                        $dirty: true
                    }
                };
                data.$scope.add(frm);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                expect(data.$scope.fac_officers).toEqual([]);
            }]));
            it("should remove an officer from the current facility",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "mfl.common.services.multistep" : multistepService
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/officers/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_officers/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"},
                    {name : "officers"}
                ];
                ctrl(".officers", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/facility_officers/456/")
                    .respond(204);

                data.$scope.fac_officers = [{"facility": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.fac_officers[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_officers).toEqual([]);
            }]));
            it("should fail to remove an officer from the current facility",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "mfl.common.services.multistep" : multistepService
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/officers/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_officers/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"},
                    {name : "officers"}
                ];
                ctrl(".officers", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/facility_officers/456/")
                    .respond(500);

                data.$scope.fac_officers = [{"facility": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.fac_officers[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_officers).toEqual([{"facility":"123",
                   "id":"456",delete_spinner:false}]);
            }]));
        });

        describe("Test facility edit facility units controller", function () {
            it("should load data from facility units edit controller",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 4
                    },
                    "mfl.common.services.multistep" : multistepService
                };
                data.$scope.facility_id = 4;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"},
                    {name : "officers"},
                    {name : "units"}
                ];
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                httpBackend
                    .expectGET(server_url+"api/facilities/regulating_bodies/?fields=id,name")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/"+
                        "facility_units/?facility=4&fields=id,name,"+
                        "regulating_body,regulating_body_name")
                    .respond(200, {results: []});
                ctrl(".units", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            }]));
            it("should fail to load data from facility units edit controller",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "mfl.common.services.multistep" : multistepService
                };
                data.$scope.facility_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"},
                    {name : "officers"},
                    {name : "units"}
                ];
                data.$scope.create = false;
                httpBackend
                    .expectGET(server_url+"api/facilities/regulating_bodies/?fields=id,name")
                    .respond(500, {results: []});
                ctrl(".units", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            }]));
            it("should successfully add a facility unit to the current facility",
            inject(["mfl.common.services.multistep",
                function (multistepService) {

                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "mfl.common.services.multistep" : multistepService
                };
                data.$scope.facility_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"},
                    {name : "officers"},
                    {name : "units"}
                ];
                httpBackend
                    .expectGET(server_url+"api/facilities/regulating_bodies/?fields=id,name")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/"+
                        "facility_units/?facility=3&fields=id,name,"+
                        "regulating_body,regulating_body_name")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;

                ctrl(".units", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                data.$scope.facility_unit = {
                    "regulating_body": "3",
                    "name": "name"
                };
                data.$scope.facility_id = "3";
                httpBackend
                    .expectPOST(server_url + "api/facilities/facility_units/", {"facility": "3",
                      "regulating_body": "3","name":"name","description":"name"})
                    .respond(201, {"id": 5});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                expect(data.$scope.fac_units).toEqual([{"id": 5}]);
            }]));
            it("should fail to add facility unit to the current facility",
            inject(["mfl.common.services.multistep",
                function (multistepService) {

                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "mfl.common.services.multistep" : multistepService
                };
                data.$scope.facility_id = 3;
                httpBackend
                    .expectGET(server_url+"api/facilities/regulating_bodies/?fields=id,name")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/"+
                        "facility_units/?facility=3&fields=id,name,"+
                        "regulating_body,regulating_body_name")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"},
                    {name : "officers"},
                    {name : "units"}
                ];
                ctrl(".units", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                data.$scope.facility_unit = {
                    "regulating_body": "3",
                    "name": "name",
                    "description": "description"
                };
                data.$scope.facility_id = "3";

                httpBackend
                    .expectPOST(server_url + "api/facilities/facility_units/")
                    .respond(500, {"id": 5});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                expect(data.$scope.fac_units).toEqual([]);
            }]));
            it("should remove a facility unit from the current facility",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "mfl.common.services.multistep" : multistepService
                };
                data.$scope.facility_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"},
                    {name : "officers"},
                    {name : "units"}
                ];
                httpBackend
                    .expectGET(server_url+"api/facilities/regulating_bodies/?fields=id,name")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/"+
                        "facility_units/?facility=3&fields=id,name,"+
                        "regulating_body,regulating_body_name")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;

                ctrl(".units", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/facility_units/456/")
                    .respond(204);

                data.$scope.fac_units = [{"facility": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.fac_units[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_units).toEqual([]);
            }]));
            it("should fail to remove a facility unit from the current facility",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "mfl.common.services.multistep" : multistepService
                };
                data.$scope.facility_id = 3;
                httpBackend
                    .expectGET(server_url+"api/facilities/regulating_bodies/?fields=id,name")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/"+
                        "facility_units/?facility=3&fields=id,name,"+
                        "regulating_body,regulating_body_name")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"},
                    {name : "officers"},
                    {name : "units"}
                ];
                ctrl(".units", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/facility_units/456/")
                    .respond(500);

                data.$scope.fac_units = [{"facility": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.fac_units[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_units).toEqual([{"facility":"123",
                   "id":"456",delete_spinner:false}]);
            }]));
        });

        describe("Test facility edit services controller", function () {
            it("should bootstrap from helper controller",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                var data = {
                    "$scope": rootScope.$new(),
                    "$controller": null,
                    "mfl.common.services.multistep" : multistepService
                };
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"}
                ];
                var helper = {"bootstrap": angular.noop};
                spyOn(data, "$controller").andReturn(helper);
                spyOn(helper, "bootstrap");
                ctrl(".services", data);
            }]));
            it("should bootstrap from helper controller: when editing",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                var data = {
                    "$scope": rootScope.$new(),
                    "$controller": null,
                    "mfl.common.services.multistep" : multistepService
                };
                data.$scope.create = false;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "geolocation"},
                    {name : "contacts"},
                    {name : "officer"},
                    {name : "units"},
                    {name : "services"}
                ];
                var helper = {"bootstrap": angular.noop};
                spyOn(data, "$controller").andReturn(helper);
                spyOn(helper, "bootstrap");
                ctrl(".services", data);
            }]));
        });

        describe("Test facility services helper controller", function () {

            beforeEach(function () {
                ctrl = function (data) {
                    return controller("mfl.facility_mgmt.controllers.services_helper", data);
                };
            });

            it("should expose bootstrap method", function () {
                var c = ctrl();
                expect(angular.isFunction(c.bootstrap)).toBe(true);
            });

            it("should load services", function () {
                httpBackend
                    .expectGET(server_url+"api/facilities/services/?page_size=100&ordering=name")
                    .respond(200, {results: [{"id": 3}]});

                var c = ctrl();
                var scope = rootScope.$new();
                c.bootstrap(scope);

                expect(scope.new_service.service).toEqual("");
                expect(scope.new_service.option).toEqual("");
                expect(scope.services).toEqual([]);
                expect(scope.service_options).toEqual([]);
                expect(angular.isFunction(scope.addServiceOption)).toBe(true);
                expect(angular.isFunction(scope.removeChild)).toBe(true);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.services).toEqual([{"id": 3}]);
            });

            it("should show error on fail to load services", function () {
                httpBackend
                    .expectGET(server_url+"api/facilities/services/?page_size=100&ordering=name")
                    .respond(500, {"error": "e"});

                spyOn(log, "error");
                var c = ctrl({"$log": log});
                var scope = rootScope.$new();
                c.bootstrap(scope);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.services).toEqual([]);
                expect(log.error).toHaveBeenCalled();
            });

            it("should add a facility service", function () {
                var payload = {results: [{"id": 3}]};
                httpBackend
                    .expectGET(server_url+"api/facilities/services/?page_size=100&ordering=name")
                    .respond(200, payload);

                var c = ctrl();
                var scope = rootScope.$new();
                c.bootstrap(scope);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(server_url+"api/facilities/facility_services/")
                    .respond(201, {"id": 4});

                scope.facility = {
                    facility_services: []
                };
                scope.addServiceOption(payload.results[0]);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                expect(scope.facility.facility_services[0]).toEqual({"id": 4});
            });

            it("should show error on fail to add a facility service", function () {
                var payload = {results: [{"id": 3}]};
                httpBackend
                    .expectGET(server_url+"api/facilities/services/?page_size=100&ordering=name")
                    .respond(200, payload);

                spyOn(log, "error");
                var c = ctrl({"$log": log});
                var scope = rootScope.$new();
                c.bootstrap(scope);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(server_url+"api/facilities/facility_services/")
                    .respond(500);

                scope.facility = {
                    facility_services: []
                };
                scope.addServiceOption(payload.results[0]);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(scope.facility.facility_services).toEqual([]);
                expect(log.error).toHaveBeenCalled();
            });

            it("should remove a facility service", function () {
                httpBackend
                    .expectGET(server_url+"api/facilities/services/?page_size=100&ordering=name")
                    .respond(200, {results: [{"id": 3}]});

                var c = ctrl();
                var scope = rootScope.$new();
                c.bootstrap(scope);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url+"api/facilities/facility_services/4/")
                    .respond(204);

                scope.facility = {
                    facility_services: [{"id": 4}]
                };
                scope.removeChild(scope.facility.facility_services[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(scope.facility.facility_services).toEqual([]);
            });

            it("should show an error on fail to remove a facility service", function () {
                httpBackend
                    .expectGET(server_url+"api/facilities/services/?page_size=100&ordering=name")
                    .respond(200, {results: [{"id": 3}]});

                spyOn(log, "error");
                var c = ctrl({"$log": log});
                var scope = rootScope.$new();
                c.bootstrap(scope);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url+"api/facilities/facility_services/4/")
                    .respond(404);

                scope.facility = {
                    facility_services: [{"id": 4}]
                };
                scope.removeChild(scope.facility.facility_services[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(scope.facility.facility_services).toEqual([{"id": 4}]);
            });

            it("should update service_options on change service", function () {
                var payload = {
                    results: [
                        {
                            "id": "1",
                            "service_options": [
                                {"name": "YES"}
                            ]
                        },
                        {
                            "id": "2",
                            "service_options": [
                                {"name": "NO"}
                            ]
                        },
                        {
                            "id": "3"
                        },
                        {
                            "id": "4",
                            "service_options": []
                        }
                    ]
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/services/?page_size=100&ordering=name")
                    .respond(200, payload);

                var c = ctrl();
                var scope = rootScope.$new();

                c.bootstrap(scope);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.services).toEqual(payload.results);

                scope.new_service.service = "2";
                scope.$apply();
                expect(scope.service_options).toEqual(payload.results[1].service_options);

                scope.new_service.service = "1";
                scope.$apply();
                expect(scope.service_options).toEqual(payload.results[0].service_options);

                scope.new_service.service = "3";
                scope.$apply();
                expect(scope.service_options).toEqual([]);

                scope.new_service.service = "4";
                scope.$apply();
                expect(scope.service_options).toEqual([]);

                scope.new_service.service = "5";
                scope.$apply();
                expect(scope.service_options).toEqual([]);
            });
        });

        describe("Test facility edit facility setup controller", function () {

            it("should reload state if no changes to facility operation setup",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 4
                    },
                    "$state" : state,
                    "mfl.common.service.multistep" : multistepService
                };
                spyOn(state, "go");
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                data.$scope.goToNext = angular.noop;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"}
                ];
                ctrl(".setup", data);

                httpBackend.resetExpectations();

                data.$scope.facility_id = 4;
                var opFrm = {
                    number_of_beds : 4,
                    number_of_cotss : 3
                };
                var changed = [];

                data.$scope.updateOp(opFrm);
                expect(changed).toEqual([]);
            }]));

            it("should reload state if no changes to facility operation:fail",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 4
                    },
                    "$state" : state,
                    "mfl.common.service.multistep" : multistepService
                };
                spyOn(state, "go");
                data.$scope.create = false;
                data.$scope.nextState = angular.noop;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"}
                ];
                ctrl(".setup", data);
                data.$scope.facility_id = 4;
                var form = {
                    "$dirty": false,
                    "name": {
                        "$modelValue": "ASD",
                        "$dirty": false
                    }
                };

                data.$scope.updateOp(form);

            }]));
            it("should reload state if no changes to facility: empty form",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 4
                    },
                    "$state" : state,
                    "mfl.common.service.multistep" : multistepService
                };
                spyOn(state, "go");
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                data.$scope.goToNext = angular.noop;
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"}
                ];
                ctrl(".setup", data);
                data.$scope.facility_id = 4;
                var form = {
                    "$dirty": false,
                    "name": {
                        "$modelValue": "ASD",
                        "$dirty": false
                    }
                };

                data.$scope.updateOp(form);
                data.$scope.create = true;
                data.$scope.goToNext = angular.noop;
            }]));

            it("should successfully edit facility : creation", function () {
                inject(["mfl.common.forms.changes","$state",
                    "mfl.common.services.multistep",
                    function (formChanges, st, multistepService) {
                        var scope = rootScope.$new();
                        var state = st;
                        var data = {
                            "$state": state,
                            "$scope": scope,
                            "$stateParams": {
                                facility_id: 4
                            },
                            "mfl.common.services.multistep" : multistepService,
                            "mfl.common.forms.changes": formChanges
                        };

                        spyOn(formChanges, "whatChanged").andReturn({number_of_beds : 4,
                                                                     number_of_cots : 3});
                        data.$scope.steps = [
                            {name : "basic"},
                            {name : "contacts"},
                            {name : "services"},
                            {name : "setup"}
                        ];
                        data.$scope.create = true;
                        data.$scope.nextState = angular.noop;
                        ctrl(".setup", data);

                        var opFrm = {
                            $dirty: true,
                            number_of_beds : {
                                $dirty: true,
                                $modelValue: 4
                            },
                            number_of_cots : {
                                $modelValue: 3,
                                $dirty: true
                            }
                        };
                        var changed = {
                            number_of_beds : 4,
                            number_of_cots : 3
                        };

                        spyOn(state, "go");

                        httpBackend
                            .expectPATCH(server_url + "api/facilities/facilities/4/",changed)
                            .respond(200);
                        data.$scope.facility_id = 4;

                        data.$scope.facility = {
                            number_of_beds : 3,
                            number_of_cots : 4
                        };
                        data.$scope.create = true;
                        data.$scope.goToNext = angular.noop;
                        expect(state.go).not.toHaveBeenCalled();

                        data.$scope.updateOp(opFrm);

                        httpBackend.flush();
                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();

                    }
                ]);
            });

            it("should successfully edit facility operation setup", function () {
                inject(["mfl.common.forms.changes","$state",
                    "mfl.common.services.multistep",
                    function (formChanges, st, multistepService) {
                        var scope = rootScope.$new();
                        var state = st;
                        var data = {
                            "$state": state,
                            "$scope": scope,
                            "$stateParams": {
                                facility_id: 4
                            },
                            "mfl.common.services.multistep" : multistepService,
                            "mfl.common.forms.changes": formChanges
                        };
                        spyOn(state, "go");
                        spyOn(formChanges, "whatChanged").andReturn({number_of_beds : 4,
                                                                     number_of_cots : 3});
                        data.$scope.steps = [
                            {name : "basic"},
                            {name : "contacts"},
                            {name : "services"},
                            {name : "setup"}
                        ];
                        data.$scope.create = false;
                        data.$scope.goToNext = angular.noop;
                        ctrl(".setup", data);

                        var opFrm = {
                            number_of_beds : 4,
                            number_of_cots : 3
                        };
                        var changed = {
                            number_of_beds : 4,
                            number_of_cots : 3
                        };


                        httpBackend
                            .expectPATCH(server_url + "api/facilities/facilities/4/",changed)
                            .respond(200);

                        data.$scope.facility_id = 4;

                        data.$scope.facility = {
                            number_of_beds : 3,
                            number_of_cots : 4
                        };

                        data.$scope.updateOp(opFrm);
                        expect(changed).not.toBeNull();


                        httpBackend.flush();
                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();
                    }
                ]);
            });

            it("should fail to edit facility operation setup", function () {
                    inject(["mfl.common.forms.changes","$state",
                    "mfl.common.services.multistep",
                    function (formChanges, st, multistepService) {
                        var scope = rootScope.$new();
                        var state = st;
                        var data = {
                            "$state": state,
                            "$scope": scope,
                            "$stateParams": {
                                facility_id: 4
                            },
                            "mfl.common.services.multistep" : multistepService,
                            "mfl.common.forms.changes": formChanges
                        };
                        data.$scope.coordinates = 4;
                        data.$scope.steps = [
                            {name : "basic"},
                            {name : "contacts"},
                            {name : "services"},
                            {name : "setup"}
                        ];
                        spyOn(formChanges, "whatChanged").andReturn({number_of_beds : 4,
                                                                     number_of_cots : 3});

                        ctrl(".setup", data);

                        var opFrm = {
                            number_of_beds : 4,
                            number_of_cots : 3
                        };
                        var changed = {
                            number_of_beds : 4,
                            number_of_cots : 3
                        };

                        spyOn(log, "error");

                        httpBackend
                            .expectPATCH(server_url + "api/facilities/facilities/4/",changed)
                            .respond(500);

                        data.$scope.facility_id = 4;

                        data.$scope.facility = {
                            number_of_beds : 3,
                            number_of_cots : 4
                        };

                        data.$scope.updateOp(opFrm);
                        expect(changed).not.toBeNull();


                        httpBackend.flush();
                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();
                        expect(log.error).toHaveBeenCalled();
                    }
                ]);
                });
        });
    });

    describe("Edit facility", function () {
        var rootScope, ctrl, httpBackend, server_url, loginService, log,
            yusa, controller, multistepService,leafletData, state;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.common.services");
            module("mfl.facility_mgmt.controllers");
            module("leaflet-directive");
            inject(["$controller", "$rootScope", "$httpBackend", "SERVER_URL",
                "mfl.auth.services.login", "$log","leafletData",
                "mfl.common.services.multistep", "$state",
                function (c, r, h, s, ls, lg, ld, ms, st) {
                    ctrl = function (name, data) {
                        return c("mfl.facility_mgmt.controllers.facility_edit"+name, data);
                    };
                    controller = c;
                    rootScope = r;
                    leafletData = ld;
                    httpBackend = h;
                    server_url = s;
                    state = st;
                    multistepService = ms;
                    loginService = ls;
                    yusa = {
                        county: "123"
                    };
                    spyOn(loginService, "getUser").andReturn();
                    log = lg;
                }
            ]);
        });
        describe("location and geolocation controller: ", function () {
            it("should load the data required by location controller",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 4
                    },
                    "mfl.common.services.multistep" : multistepService
                };
                data.$scope.steps = [
                    {name : "basic"},
                    {name : "contacts"},
                    {name : "services"},
                    {name : "setup"},
                    {name : "officers"},
                    {name : "units"},
                    {name : "location"}
                ];
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                httpBackend
                    .expectGET(server_url+"api/common/towns/")
                    .respond(200, {results: []});
                ctrl(".location", data);
                data.$scope.facility={
                    coordinates : "3",
                    ward : "3"
                };
                data.$scope.$apply();
                data.$scope.$digest();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            }]));

            it("should save physical location details", function () {
                inject(["mfl.common.services.multistep",
                    function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "$state": state,
                        "mfl.common.services.multistep" : multistepService
                    };
                    spyOn(state, "go");
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    httpBackend
                        .expectGET(server_url+"api/common/towns/")
                        .respond(200, {results: []});
                    ctrl(".location", data);
                    data.$scope.$apply();
                    data.$scope.facility={
                        coordinates : "3",
                        ward : "3",
                        facility_physical_address:{
                            address : "ZUZU",
                            postal_code: "254",
                            id: "3"
                        }
                    };
                    data.$scope.$apply();
                    data.$scope.$digest();

                    httpBackend.flush();

                    httpBackend.resetExpectations();

                    httpBackend
                        .expectPATCH(server_url+"api/common/address/3/")
                        .respond(204, {results: []});
                    var frm = {
                        "$dirty": true,
                        "name": {
                            "$dirty": true,
                            "$$modelValue": "test"
                        }
                    };
                    data.$scope.$parent.facility = {
                        facility_physical_address : {name : "MC"}
                    };
                    data.$scope.create = false;
                    data.$scope.goToNext = angular.noop;
                    data.$scope.savePhy(frm);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();
                }]);
            });
            //creation of physical details
            it("should save physical location details: creation", function () {
                inject(["mfl.common.services.multistep",
                    function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "$state": state,
                        "mfl.common.services.multistep" : multistepService
                    };
                    state.params.facility_id = "3";
                    spyOn(state, "go");
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    ctrl(".location", data);
                    data.$scope.$apply();
                    data.$scope.facility={
                        id : "3",
                        coordinates : "3",
                        ward : "3",
                        physical_address: null
                    };
                    data.$scope.$apply();
                    data.$scope.$digest();
                    var rst_data = {id : "13"};
                    httpBackend
                        .expectPOST(server_url+"api/common/address/")
                        .respond(204, {results: []});
                    httpBackend
                        .expectPATCH(server_url+"api/facilities/facilities/3/")
                        .respond(204, {"physical_address": rst_data.id});
                    var frm = {
                        "$dirty": true,
                        "name": {
                            "$dirty": true,
                            "$$modelValue": "test"
                        }
                    };
                    data.$scope.$parent.facility = {
                        physical_address : null
                    };
                    data.$scope.create = true;
                    data.$scope.goToNext = angular.noop;
                    data.$scope.savePhy(frm);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();
                }]);
            });
            //creation of physical details failure to patch
            it("should create physical location details", function () {
                inject(["mfl.common.services.multistep",
                    function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "$state": state,
                        "mfl.common.services.multistep" : multistepService
                    };
                    state.params.facility_id = "3";
                    spyOn(state, "go");
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    ctrl(".location", data);
                    data.$scope.$apply();
                    data.$scope.facility={
                        id : "3",
                        coordinates : "3",
                        ward : "3",
                        physical_address: null
                    };
                    data.$scope.$apply();
                    data.$scope.$digest();
                    httpBackend
                        .expectPOST(server_url+"api/common/address/")
                        .respond(204, {results: []});
                    httpBackend
                        .expectPATCH(server_url+"api/facilities/facilities/3/")
                        .respond(500, {});
                    var frm = {
                        "$dirty": true,
                        "name": {
                            "$dirty": true,
                            "$$modelValue": "test"
                        }
                    };
                    data.$scope.$parent.facility = {
                        physical_address : null
                    };
                    data.$scope.create = true;
                    data.$scope.goToNext = angular.noop;
                    data.$scope.savePhy(frm);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();
                }]);
            });

            //creation of physical details failure to patch
            it("should create physical location details:fail", function () {
                inject(["mfl.common.services.multistep",
                    function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "$state": state,
                        "mfl.common.services.multistep" : multistepService
                    };
                    state.params.facility_id = "3";
                    spyOn(state, "go");
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    ctrl(".location", data);
                    data.$scope.$apply();
                    data.$scope.facility={
                        id : "3",
                        coordinates : "3",
                        ward : "3",
                        physical_address: null
                    };
                    data.$scope.$apply();
                    data.$scope.$digest();
                    httpBackend
                        .expectPOST(server_url+"api/common/address/")
                        .respond(500, {results: []});
                    var frm = {
                        "$dirty": true,
                        "name": {
                            "$dirty": true,
                            "$$modelValue": "test"
                        }
                    };
                    data.$scope.$parent.facility = {
                        physical_address : null
                    };
                    data.$scope.create = true;
                    data.$scope.savePhy(frm);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();
                }]);
            });
            //test that updates location during facility creation
            it("should save physical location details: update", function () {
                inject(["mfl.common.services.multistep",
                    function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "$state": state,
                        "mfl.common.services.multistep" : multistepService
                    };
                    spyOn(state, "go");
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    httpBackend
                        .expectGET(server_url+"api/common/towns/")
                        .respond(200, {results: []});
                    ctrl(".location", data);
                    data.$scope.$apply();
                    data.$scope.facility={
                        coordinates : "3",
                        ward : "3",
                        facility_physical_address:{
                            address : "ZUZU",
                            postal_code: "254",
                            id: "3"
                        }
                    };
                    data.$scope.$apply();
                    data.$scope.$digest();

                    httpBackend.flush();

                    httpBackend.resetExpectations();

                    httpBackend
                        .expectPATCH(server_url+"api/common/address/3/")
                        .respond(204, {results: []});
                    var frm = {
                        "$dirty": true,
                        "name": {
                            "$dirty": true,
                            "$$modelValue": "test"
                        }
                    };
                    data.$scope.$parent.facility = {
                        facility_physical_address : {name : "MC"}
                    };
                    data.$scope.create = true;
                    data.$scope.goToNext = angular.noop;
                    data.$scope.savePhy(frm);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();
                }]);
            });

            it("should fail to save physical location details",
               function () {
                inject(["mfl.common.services.multistep",
                    function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "$state": state,
                        "mfl.common.services.multistep" : multistepService
                    };
                    spyOn(state, "go");
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    data.$scope.create = false;
                    httpBackend
                        .expectGET(server_url+"api/common/towns/")
                        .respond(200, {results: []});
                    ctrl(".location", data);
                    data.$scope.$apply();
                    data.$scope.facility={
                        coordinates : "3",
                        ward : "3",
                        facility_physical_address:{
                            address : "ZUZU",
                            postal_code: "254",
                            id: "3"
                        }
                    };
                    data.$scope.$apply();
                    data.$scope.$digest();

                    httpBackend.flush();

                    httpBackend.resetExpectations();
                    spyOn(log, "error");
                    httpBackend
                        .expectPATCH(server_url+"api/common/address/3/")
                        .respond(500, {results: []});
                    var frm = {
                        "$dirty": true,
                        "name": {
                            "$dirty": true,
                            "$$modelValue": "test"
                        }
                    };

                    data.$scope.savePhy(frm);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();

                    expect(log.error).toHaveBeenCalled();

                }]);
            });
            //empty form on edit path
            it("should not save physical location details", function () {
                inject(["mfl.common.services.multistep","mfl.common.forms.changes",
                    function (multistepService,formChanges) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "$state" : state,
                        "mfl.common.services.multistep" : multistepService,
                        "mfl.common.forms.changes": formChanges
                    };
                    spyOn(state, "go");
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    data.$scope.create = false;
                    httpBackend
                        .expectGET(server_url+"api/common/towns/")
                        .respond(200, {results: []});
                    ctrl(".location", data);
                    data.$scope.$apply();
                    data.$scope.facility={
                        coordinates : "3",
                        ward : "3",
                        facility_physical_address:{
                            address : "ZUZU",
                            postal_code: "254",
                            id: "3"
                        }
                    };
                    data.$scope.$apply();
                    data.$scope.$digest();

                    httpBackend.flush();

                    var frm = {
                        "$dirty": false,
                        "name": {
                            "$dirty": false,
                            "$$modelValue": "test"
                        }
                    };

                    data.$scope.savePhy(frm);

                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();
                }]);
            });
            //end of test
            it("should not save physical location details", function () {
                inject(["mfl.common.services.multistep","mfl.common.forms.changes",
                    function (multistepService,formChanges) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "$state" : state,
                        "mfl.common.services.multistep" : multistepService,
                        "mfl.common.forms.changes": formChanges
                    };
                    spyOn(state, "go");
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    data.$scope.create = true;
                    data.$scope.nextState = angular.noop;
                    data.$scope.goToNext = angular.noop;
                    httpBackend
                        .expectGET(server_url+"api/common/towns/")
                        .respond(200, {results: []});
                    ctrl(".location", data);
                    data.$scope.$apply();
                    data.$scope.facility={
                        coordinates : "3",
                        ward : "3",
                        facility_physical_address:{
                            address : "ZUZU",
                            postal_code: "254",
                            id: "3"
                        }
                    };
                    data.$scope.$apply();
                    data.$scope.$digest();

                    httpBackend.flush();

                    var frm = {
                        "$dirty": false,
                        "name": {
                            "$dirty": false,
                            "$$modelValue": "test"
                        }
                    };

                    data.$scope.savePhy(frm);

                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();
                }]);
            });

            it("should fail to load the data required by controller",
                inject(["mfl.common.services.multistep",
                    function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "mfl.common.services.multistep" : multistepService
                    };
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    httpBackend
                        .expectGET(server_url+"api/gis/facility_coordinates/3/")
                        .respond(500, {results: []});

                    ctrl(".location", data);

                    data.$scope.$apply();
                    data.$scope.$digest();
                    data.$scope.facility={
                        coordinates : "3",
                        ward : "3"
                    };
                    data.$scope.markers = {
                        mainMarker :{
                            lat: 2,
                            lng: 3
                        }
                    };
                    data.$scope.$apply();
                    data.$scope.$digest();
                }]));

            it("should save geolocation details", function () {
                inject(["mfl.common.services.multistep",
                    function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "mfl.common.services.multistep" : multistepService
                    };
                    var coords = {
                        coordinates : [0,1]
                    };
                    data.$scope.create = true;
                    data.$scope.nextState = angular.noop;
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    var rst_data = {
                        coordinates : {
                            coordinates : [3, 1]
                        }
                    };
                    var args = {
                        model:{
                            lat:1,
                            lng:2
                        }
                    };
                    httpBackend
                        .expectGET(server_url+"api/gis/geo_code_methods/")
                        .respond(200, {results: []});
                    httpBackend
                        .expectGET(server_url+"api/gis/geo_code_sources/")
                        .respond(200, {results: []});
                    httpBackend
                        .expectGET(server_url+"api/common/wards/3/")
                        .respond(200, {results: []});
                    httpBackend
                        .expectGET(server_url+"api/gis/facility_coordinates/3/")
                        .respond(200, rst_data);
                    ctrl(".geolocation", data);
                    rootScope.$broadcast("leafletDirectiveMarker.dragend",null,args);
                    data.$scope.$apply();
                    data.$scope.facility={
                        coordinates : "3",
                        ward : "3",
                        facility_physical_address:{
                            address : "ZUZU",
                            postal_code: "254",
                            id: "3"
                        }
                    };
                    data.$scope.$apply();
                    data.$scope.$digest();
                    data.$scope.checkLocation(coords);

                    httpBackend.flush();

                    httpBackend.resetExpectations();

                    httpBackend
                        .expectPATCH(server_url+"api/gis/facility_coordinates/3/")
                        .respond(204, {results: []});
                    var frm = {
                        "$dirty": true,
                        "name": {
                            "$dirty": true,
                            "$$modelValue": "test"
                        }
                    };

                    data.$scope.saveGeo(frm);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();
                }]);
            });

            /*Test should cover negative of ternary*/
            it("should save geolocation details and go to print", function () {
                inject(["mfl.common.services.multistep",
                    function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "mfl.common.services.multistep" : multistepService
                    };
                    var coords = {
                        coordinates : [0,1]
                    };
                    data.$scope.create = false;
                    data.$scope.nextState = angular.noop;
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    var rst_data = {
                        coordinates : {
                            coordinates : [3, 1]
                        }
                    };
                    httpBackend
                        .expectGET(server_url+"api/gis/geo_code_methods/")
                        .respond(200, {results: []});
                    httpBackend
                        .expectGET(server_url+"api/gis/geo_code_sources/")
                        .respond(200, {results: []});
                    httpBackend
                        .expectGET(server_url+"api/common/wards/3/")
                        .respond(200, {results: []});
                    httpBackend
                        .expectGET(server_url+"api/gis/facility_coordinates/3/")
                        .respond(200, rst_data);
                    ctrl(".geolocation", data);
                    data.$scope.$apply();
                    data.$scope.facility={
                        coordinates : "3",
                        ward : "3",
                        facility_physical_address:{
                            address : "ZUZU",
                            postal_code: "254",
                            id: "3"
                        }
                    };
                    data.$scope.$apply();
                    data.$scope.$digest();
                    data.$scope.checkLocation(coords);

                    httpBackend.flush();

                    httpBackend.resetExpectations();

                    httpBackend
                        .expectPATCH(server_url+"api/gis/facility_coordinates/3/")
                        .respond(204, {results: []});
                    var frm = {
                        "$dirty": true,
                        "name": {
                            "$dirty": true,
                            "$$modelValue": "test"
                        }
                    };

                    data.$scope.saveGeo(frm);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();
                }]);
            });
            /*End of ternary test*/

            it("should try to save geolocation details but form has no changes", function () {
                inject(["mfl.common.services.multistep",
                    function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "$state": state,
                        "mfl.common.services.multistep" : multistepService
                    };
                    spyOn(state, "go");
                    var coords = {
                        coordinates : [0,1]
                    };
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    //added create
                    data.$scope.create = false;
                    data.$scope.geo = {
                        coordinates : []
                    };
                    var rst_data = {
                        coordinates : {
                            coordinates : [3, 1]
                        }
                    };
                    httpBackend
                        .expectGET(server_url+"api/gis/geo_code_methods/")
                        .respond(200, {results: []});
                    httpBackend
                        .expectGET(server_url+"api/gis/geo_code_sources/")
                        .respond(200, {results: []});
                    httpBackend
                        .expectGET(server_url+"api/common/wards/3/")
                        .respond(200, {results: []});
                    httpBackend
                        .expectGET(server_url+"api/gis/facility_coordinates/3/")
                        .respond(200, rst_data);
                    ctrl(".geolocation", data);
                    data.$scope.$apply();
                    data.$scope.facility={
                        coordinates : "3",
                        ward : "3",
                        facility_physical_address:{
                            address : "ZUZU",
                            postal_code: "254",
                            id: "3"
                        }
                    };
                    data.$scope.geo = rst_data;
                    data.$scope.$apply();
                    data.$scope.$digest();
                    data.$scope.getFacilityCoordinates(data.$scope.facility);
                    data.$scope.checkLocation(coords);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();

                    var frm = {
                        "$dirty": false,
                        "name": {
                            "$dirty": false,
                            "$$modelValue": "test"
                        }
                    };

                    data.$scope.saveGeo(frm);

                }]);
            });

            //facility is null
            it("should try to save geolocation is : null", function () {
                inject(["mfl.common.services.multistep",
                    function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "$state": state,
                        "mfl.common.services.multistep" : multistepService
                    };
                    spyOn(state, "go");
                    var coords = {
                        coordinates : [0,1]
                    };
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    data.$scope.geo = {
                        coordinates : []
                    };
                    var rst_data = {
                        coordinates : {
                            coordinates : [3, 1]
                        }
                    };
                    ctrl(".geolocation", data);
                    data.$scope.$apply();
                    data.$scope.facility={
                        coordinates : "3",
                        ward : "3",
                        facility_physical_address:{
                            address : "ZUZU",
                            postal_code: "254",
                            id: "3"
                        }
                    };
                    data.$scope.geo = rst_data;
                    data.$scope.$apply();
                    data.$scope.$digest();
                    data.$scope.getFacilityCoordinates(data.$scope.facility);
                    data.$scope.checkLocation(coords);

                    var frm = {
                        "$dirty": false,
                        "name": {
                            "$dirty": false,
                            "$$modelValue": "test"
                        }
                    };

                    data.$scope.saveGeo(frm);

                }]);
            });

            it("should fail to save geolocation details",
               function () {
                inject(["mfl.common.services.multistep",
                    function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "mfl.common.services.multistep" : multistepService
                    };
                    var coords = {
                        coordinates : [0,1]
                    };
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    var rst_data = {
                        coordinates : {
                            coordinates : [3, 1]
                        }
                    };
                    httpBackend
                        .expectGET(server_url+"api/gis/geo_code_methods/")
                        .respond(500, {results: []});
                    httpBackend
                        .expectGET(server_url+"api/gis/geo_code_sources/")
                        .respond(500, {results: []});
                    ctrl(".geolocation", data);
                    data.$scope.$apply();
                    data.$scope.facility={
                        coordinates : "3",
                        ward : "3",
                        facility_physical_address:{
                            address : "ZUZU",
                            postal_code: "254",
                            id: "3"
                        }
                    };
                    data.$scope.geo = rst_data;
                    data.$scope.$apply();
                    data.$scope.$digest();
                    data.$scope.checkLocation(coords);

                    httpBackend.flush();

                    httpBackend.resetExpectations();
                    spyOn(log, "error");
                    httpBackend
                        .expectPATCH(server_url+"api/gis/facility_coordinates/3/")
                        .respond(500, {results: []});
                    var frm = {
                        "$dirty": true,
                        "name": {
                            "$dirty": true,
                            "$$modelValue": "test"
                        }
                    };
                    data.$scope.getFacilityCoordinates(data.$scope.facility);
                    data.$scope.saveGeo(frm);
                    data.$scope.geo = {
                        coordinates : []
                    };
                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();

                    expect(log.error).toHaveBeenCalled();

                }]);
            });

            //on creation where facility coordinates is Null
            it("should fail as coordinates is null",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "mfl.common.services.multistep" : multistepService
                    };
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    data.$scope.facility_id = 3;
                    var rst_data = {
                        coordinates : {
                            coordinates : [3, 1]
                        }
                    };
                    data.$scope.facility = {
                        coordinates : null
                    };
                    var rst_coord = {id : "3"};
                    httpBackend
                        .expectPOST(server_url +
                            "api/gis/facility_coordinates/")
                        .respond(204, rst_coord);

                    httpBackend
                        .expectPATCH(server_url +
                            "api/facilities/facilities/3/")
                        .respond(204, {results : []});
                    ctrl(".geolocation", data);
                    var frm = {
                        "$dirty": true,
                        "name": {
                            "$dirty": true,
                            "$$modelValue": "test"
                        }
                    };
                    data.$scope.geo = rst_data;
                    data.$scope.saveGeo(frm);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();
                }
            ]));

            it("should fail as coordinates is null: and return error",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "mfl.common.services.multistep" : multistepService
                    };
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    data.$scope.facility_id = 3;
                    var rst_data = {
                        coordinates : {
                            coordinates : [3, 1]
                        }
                    };
                    data.$scope.facility = {
                        coordinates : null
                    };
                    var rst_coord = {id : "3"};
                    httpBackend
                        .expectPOST(server_url +
                            "api/gis/facility_coordinates/")
                        .respond(204, rst_coord);

                    httpBackend
                        .expectPATCH(server_url +
                            "api/facilities/facilities/3/")
                        .respond(500, {});
                    ctrl(".geolocation", data);
                    var frm = {
                        "$dirty": true,
                        "name": {
                            "$dirty": true,
                            "$$modelValue": "test"
                        }
                    };
                    data.$scope.geo = rst_data;
                    data.$scope.saveGeo(frm);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();
                }
            ]));

            it("should fail as coordinates is null: not create coords",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "mfl.common.services.multistep" : multistepService
                    };
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    data.$scope.facility_id = 3;
                    var rst_data = {
                        coordinates : {
                            coordinates : [3, 1]
                        }
                    };
                    data.$scope.facility = {
                        coordinates : null
                    };
                    var rst_coord = {id : "3"};
                    httpBackend
                        .expectPOST(server_url +
                            "api/gis/facility_coordinates/")
                        .respond(500, rst_coord);

                    ctrl(".geolocation", data);
                    var frm = {
                        "$dirty": true,
                        "name": {
                            "$dirty": true,
                            "$$modelValue": "test"
                        }
                    };
                    data.$scope.geo = rst_data;
                    data.$scope.saveGeo(frm);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();
                }
            ]));
            //coordinates being null
            it("should fail whith null coordinates",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "$state" : state,
                        "mfl.common.services.multistep" : multistepService
                    };
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    ctrl(".geolocation", data);
                    data.$scope.$apply();
                    data.$scope.facility={
                        coordinates : null,
                        ward : "3",
                        facility_physical_address:{
                            address : "ZUZU",
                            postal_code: "254",
                            id: "3"
                        }
                    };
                    data.$scope.$apply();
                    data.$scope.facilityWard(data.$scope.facility);
                }
            ]));

            it("should fail while coordinates isn't null",
            inject(["mfl.common.services.multistep",
                function (multistepService) {
                    var changes = {
                        whatChanged: angular.noop
                    };
                    var data = {
                        "$scope": rootScope.$new(),
                        "$stateParams": {
                            facility_id: 4
                        },
                        "$state" : state,
                        "mfl.common.services.multistep" : multistepService,
                        "mfl.common.forms.changes": changes
                    };
                    spyOn(state, "go");
                    spyOn(changes, "whatChanged").andReturn({});
                    data.$scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    data.$scope.facility_id = 3;
                    var rst_data = {
                        coordinates : {
                            coordinates : [3, 1]
                        }
                    };
                    data.$scope.facility = {
                        coordinates : "13"
                    };
                    ctrl(".geolocation", data);
                    data.$scope.geo = rst_data;
                    data.$scope.saveGeo();
                }
            ]));

            it("should expect map data to be loaded", function () {
                    var data = {
                        ward_boundary:{
                            geometry:{
                                coordinates : [
                                    [
                                        [1,2],
                                        [3,4]
                                    ]
                                ]
                            },
                            properties : {
                                type: "Polygon",
                                bound: {
                                    coordinates : [
                                        [
                                            [2,3],
                                            [3,4]
                                        ]
                                    ]
                                }
                            }
                        }
                    };
                    var obj = {
                        then: angular.noop
                    };
                    var scope = rootScope.$new();
                    scope.facility = {
                        ward : "3",
                        coordinates: "3"
                    };
                    scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    scope.create = false;
                    spyOn(scope, "$on").andCallThrough();
                    spyOn(leafletData, "getMap").andReturn(obj);
                    spyOn(obj, "then");

                    ctrl(".geolocation",{
                        "$scope": scope,
                        "leafletData": leafletData
                    });

                    httpBackend
                        .expectGET(server_url+"api/common/wards/3/")
                        .respond(200, data);
                    httpBackend
                        .expectGET(server_url+"api/gis/facility_coordinates/3/")
                        .respond(200, {results: []});

                    scope.$apply();
                    scope.$digest();

                    httpBackend.flush();

                    expect(leafletData.getMap).toHaveBeenCalled();
                    expect(obj.then).toHaveBeenCalled();

                    var then_fxn = obj.then.calls[0].args[0];
                    expect(angular.isFunction(then_fxn)).toBe(true);
                    var map = {
                        fitBounds: angular.noop
                    };
                    spyOn(map, "fitBounds");
                    then_fxn(map);
                    expect(map.fitBounds).toHaveBeenCalledWith([[3,2],
                                                                [4,3]]);
                });
            it("should not plot facility marker", function () {
                    var data = {
                        ward_boundary:{
                            geometry:{
                                coordinates : [
                                    [
                                        [1,2],
                                        [3,4]
                                    ]
                                ]
                            },
                            properties : {
                                type: "Polygon",
                                bound: {
                                    coordinates : [
                                        [
                                            [2,3],
                                            [3,4]
                                        ]
                                    ]
                                }
                            }
                        }
                    };
                    var obj = {
                        then: angular.noop
                    };
                    var scope = rootScope.$new();
                    scope.facility = {
                        ward : "3",
                        coordinates: null
                    };
                    scope.steps = [
                        {name : "basic"},
                        {name : "contacts"},
                        {name : "services"},
                        {name : "setup"},
                        {name : "officers"},
                        {name : "units"},
                        {name : "location"}
                    ];
                    scope.create = false;
                    spyOn(scope, "$on").andCallThrough();
                    spyOn(leafletData, "getMap").andReturn(obj);
                    spyOn(obj, "then");

                    ctrl(".geolocation",{
                        "$scope": scope,
                        "leafletData": leafletData
                    });

                    httpBackend
                        .expectGET(server_url+"api/common/wards/3/")
                        .respond(200, data);

                    scope.$apply();
                    scope.$digest();

                    httpBackend.flush();

                    expect(leafletData.getMap).toHaveBeenCalled();
                    expect(obj.then).toHaveBeenCalled();

                    var then_fxn = obj.then.calls[0].args[0];
                    expect(angular.isFunction(then_fxn)).toBe(true);
                    var map = {
                        fitBounds: angular.noop
                    };
                    spyOn(map, "fitBounds");
                    then_fxn(map);
                    expect(map.fitBounds).toHaveBeenCalledWith([[3,2],
                                                                [4,3]]);
                });
        });
    });
})(window.angular);
