(function () {
    "use strict";

    describe("Test facility edit controllers", function () {
        var rootScope, ctrl, httpBackend, server_url, loginService, log,
        yusa, controller, facObjService, state, multistepService, stateParams;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.facility_mgmt.controllers");
            module("mfl.common.services");
            inject(["$controller", "$rootScope", "$httpBackend", "SERVER_URL",
                "mfl.auth.services.login", "$log",
                "mfl.common.services.multistep",
                "mfl.facility.multistep.service", "$state", "$stateParams",
                function (c, r, h, s, ls, lg, ms,fmS, st, sp) {
                    ctrl = function (name, data) {
                        return c("mfl.facility_mgmt.controllers.facility_create"+name, data);
                    };
                    controller = c;
                    rootScope = r;
                    httpBackend = h;
                    server_url = s;
                    loginService = ls;
                    multistepService = ms;
                    facObjService = fmS;
                    state = st;
                    stateParams = sp;
                    yusa = {
                        county: "123"
                    };
                    spyOn(loginService, "getUser").andReturn();
                    log = lg;
                }
            ]);
        });

        describe("Test facility edit controller", function () {

            it("should load facility creation setup details",
                inject(["mfl.facility.multistep.service", function (facObjService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$state" : state,
                        "mfl.facility.multistep.service" : facObjService,
                        "$stateParams": {
                            facility_id: 3
                        }
                    };
                    spyOn(state, "go");
                    //piggy back on test
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
                    var obj = {name : "basic",active : false,furthest : true};
                    data.$scope.tabState(obj);
                    data.$scope.furthest = 1;
                    data.$scope.setFurthest(2);
                    data.$scope.finishFacilityCreation();
                    data.$scope.goToNext(1, "contacts");
                }])
            );

            //checking else part for above test
            it("should load facility creation setup details: failures + fetch",
                inject(["mfl.facility.multistep.service", function (facObjService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$state" : state,
                        "mfl.facility.multistep.service" : facObjService,
                        "$stateParams": {
                            facility_id: 3
                        }
                    };
                    state.params.facility_id = "3";
                    //piggy back on test
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
                    data.$scope.new_facility = "3";
                    var f = {
                        ward_name: "ward",
                        ward: "1",
                        facility_type: "2",
                        facility_type_name: "type",
                        owner: "3",
                        owner_name: "owner",
                        operation_status: "4",
                        operation_status_name: "opstatus",
                        facility_physical_address : {
                            town : "Mombasa",
                            town_id : "13"
                        },
                        sub_county: {
                            "name": "Kisauni",
                            "id": 10
                        }
                    };
                    httpBackend
                        .expectGET(server_url+"api/facilities/facilities/3/")
                        .respond(200, f);
                    data.$scope.facility_physical_address = {
                        town : "Mombasa",
                        town_id : "13"
                    };
                    data.$scope.select_values = {
                        town : {
                            "id" : data.$scope.facility_physical_address.town_id,
                            "name" : data.$scope.facility_physical_address.town
                        }
                    };
                    ctrl("", data);
                    var obj = {name : "basic",active : false,furthest : false};
                    data.$scope.tabState(obj);
                    data.$scope.furthest = 3;
                    data.$scope.setFurthest(2);
                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();
                }])
            );

            it("should initialize select value for town to empty",
                inject(["mfl.facility.multistep.service", function (facObjService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$state" : state,
                        "mfl.facility.multistep.service" : facObjService,
                        "$stateParams": {
                            facility_id: 3
                        }
                    };
                    state.params.facility_id = "3";
                    //piggy back on test
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
                    data.$scope.new_facility = "3";
                    var f = {
                        ward_name: "ward",
                        ward: "1",
                        facility_type: "2",
                        facility_type_name: "type",
                        owner: "3",
                        owner_name: "owner",
                        operation_status: "4",
                        operation_status_name: "opstatus",
                        facility_physical_address : {
                            town : "Mombasa",
                            town_id : "13"
                        }
                    };
                    httpBackend
                        .expectGET(server_url+"api/facilities/facilities/3/")
                        .respond(200, f);
                    data.$scope.facility_physical_address = null;
                    data.$scope.select_values = {
                        town : {
                            "id" : "",
                            "name" : ""
                        }
                    };
                    ctrl("", data);
                    var obj = {name : "basic",active : false,furthest : false};
                    data.$scope.tabState(obj);
                    data.$scope.furthest = 3;
                    data.$scope.setFurthest(2);
                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();
                }])
            );

            xit("should test calling of facility admin units filtering",
                inject(["mfl.facility.multistep.service", function (facObjService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$state" : state,
                        "mfl.facility.multistep.service" : facObjService,
                        "$stateParams": {
                            facility_id: 3
                        }
                    };
                    spyOn(state, "go");
                    //piggy back on test
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
                    var counties = [
                        {
                            "id": "1",
                            "name": "Mombasa"
                        }
                    ];
                    var sub_counties = [
                        {
                            "id": "1",
                            "name": "Kisauni",
                            "county": "1"
                        }
                    ];
                    var consituencies = [
                        {
                            "id": "1",
                            "name": "Kisauni",
                            "county": "1"
                        }
                    ];
                    var wards = [
                        {
                            "id": "1",
                            "name": "Kisauni",
                            "sub_county": "1",
                            "consituency": "1"
                        }
                    ];
                    data.$scope.select_values = {
                        county : {
                            "id" : 1 ,
                            "name" : "Mombasa"
                        },
                        sub_county : {
                            "id" : 10 ,
                            "name" : "Kisauni"
                        },
                        consituency : {
                            "id" : 10 ,
                            "name" : "Kisauni"
                        }
                    };
                    // httpBackend
                    //     .expectGET(server_url+"api/common/counties/?page_size=10000&fields=name,id")
                    //     .respond(200, counties);
                    // httpBackend
                    //     .expectGET(server_url+"api/common/consituencies/?page_size=10000&fields=name,id,county")
                    //     .respond(200, consituencies);
                    // httpBackend
                    //     .expectGET(server_url+"api/common/sub_counties/?page_size=10000&fields=name,id,county")
                    //     .respond(200, sub_counties);
                    // httpBackend
                    //     .expectGET(server_url+"api/common/wards/?page_size=10000&fields=name,id,sub_county,consituency")
                    //     .respond(200, wards);

                    ctrl("", data);
                    // httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    expect(data.$scope.select_values).toBe(
                        {"name": "Mombasa", "id":"1"}
                    );

                    var obj = {name : "basic",active : false,furthest : true};
                    data.$scope.tabState(obj);
                    data.$scope.furthest = 1;
                    data.$scope.setFurthest(2);
                    data.$scope.finishFacilityCreation();
                    data.$scope.goToNext(1, "contacts");
                }])
            );
            //test failure to fetch facility details
            it("should load facility creation setup details: failures - fetch",
                inject(["mfl.facility.multistep.service", function (facObjService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$state" : state,
                        "mfl.facility.multistep.service" : facObjService,
                        "$stateParams": {
                            facility_id: 3
                        }
                    };
                    state.params.facility_id = "3";
                    //piggy back on test
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
                    httpBackend
                        .expectGET(server_url+"api/facilities/facilities/3/")
                        .respond(400, {});
                    ctrl("", data);
                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();
                }])
            );

            it("should show errors on fail reload facilities setup details", function () {
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
                        .expectGET(server_url+"api/facilities/facilities/" +
                                   "?search_auto=kitale")
                        .respond(200);

                    data.$scope.selectReload(wrappers.facilities, "kitale", "facilities");

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    expect(data.$scope.facilities).toEqual(undefined);
                }]);
            });
            it("should show errors on fail reload facilities setup:fail", function () {
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
                        .expectGET(server_url+"api/facilities/facilities/" +
                                   "?search_auto=kitale")
                        .respond(400);

                    data.$scope.selectReload(wrappers.facilities,"kitale", "facilities");

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    expect(data.$scope.facilities).toEqual(undefined);
                }]);
            });

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

            it("should test print cover letter controller", function () {
                var data = {
                    "$scope" : rootScope.$new(),
                    "$state" : state,
                    "$stateParams": stateParams
                };
                state.params.facility_id = "3";
                stateParams.facility_id = "3";
                data.$scope.$parent.print = true;
                data.$scope.fac_id = state.params.facility_id;
                httpBackend
                        .expectGET(server_url+
                            "api/facilities/facilities/3/").respond(200);
                httpBackend
                        .expectGET(server_url+"api/facilities/facility_units/" +
                                   "?facility=3")
                        .respond(200);
                httpBackend
                        .expectGET(server_url+
                            "api/gis/facility_coordinates/3/").respond(200);
                ctrl( ".facility_print", data);
                data.$scope.$apply();
                data.$scope.facility={
                    coordinates : "3"
                };
                data.$scope.$apply();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should fail to get coordinates", function () {
                var data = {
                    "$scope" : rootScope.$new(),
                    "$state" : state,
                    "$stateParams" : {
                        facility_id : ""
                    }
                };
                state.params.facility_id = "3";
                data.$scope.$parent.print = true;
                httpBackend
                        .expectGET(server_url+"api/facilities/facility_units/" +
                                   "?facility=3")
                        .respond(200);
                httpBackend
                        .expectGET(server_url+
                            "api/gis/facility_coordinates/3/").respond(500);
                ctrl( ".facility_print", data);
                data.$scope.$apply();
                data.$scope.facility={
                    coordinates : "3"
                };
                data.$scope.$apply();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should fail to fetch facility units", function () {
                var data = {
                    "$scope" : rootScope.$new(),
                    "$state" : state
                };
                state.params.facility_id = "3";
                data.$scope.$parent.print = true;
                httpBackend
                        .expectGET(server_url+"api/facilities/facility_units/" +
                                   "?facility=3")
                        .respond(500);
                ctrl( ".facility_print", data);
                data.$scope.$apply();
                data.$scope.facility={
                    coordinates : null
                };
                data.$scope.$apply();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
        });
    });
})();
