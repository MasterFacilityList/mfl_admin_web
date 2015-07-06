(function () {
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
                }])
            );
            //checking else part for above test
            it("should load facility creation setup details: failures",
                inject(["mfl.facility.multistep.service", function (facObjService) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "$state" : state,
                        "mfl.facility.multistep.service" : facObjService,
                        "$stateParams": {
                            facility_id: 3
                        }
                    };
                    state.params.facility_id = "2";
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
                    var obj = {name : "basic",active : false,furthest : false};
                    data.$scope.tabState(obj);
                    data.$scope.furthest = 3;
                    data.$scope.setFurthest(2);
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
                                   "?page_size=20&ordering=name&search_auto=kitale")
                        .respond(200);

                    data.$scope.selectReload(
                        wrappers.facility_detail, "name", "kitale", "facilities"
                    );

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
                                   "?page_size=20&ordering=name&search_auto=kitale")
                        .respond(400);

                    data.$scope.selectReload(
                        wrappers.facility_detail, "name", "kitale", "facilities"
                    );

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    expect(data.$scope.facilities).toEqual(undefined);
                }]);
            });

            it("should show errors on empty search term", function () {
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
                    data.$scope.selectReload(
                        wrappers.facility_detail, "name", "", "facilities"
                    );

                    expect(data.$scope.facilities).toEqual(undefined);
                }]);
            });
        });
    });
})();
