(function () {

    "use strict";

    describe("Reports test for facility summary reporting controller", function () {
        var ctrl, rootScope, state, server_url, httpBackend;
        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.reports.controllers");
            module("ui.router");
            inject(["$controller", "$rootScope", "$state", "$httpBackend", "SERVER_URL",
                function ($controller, $rootScope, $state, $httpBackend, SU) {
                    httpBackend = $httpBackend;
                    server_url = SU;
                    rootScope = $rootScope;
                    state = $state;
                    ctrl = function (name, data) {
                        return $controller("mfl.reports.controllers."+name, data);
                    };
                }]
            );
        });

        it("should test 'facility count by county' controller | success ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_count_by_county")
                        .respond(200, {});
                    ctrl("facility_counties", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'facility count by county' controller | fail ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_count_by_county")
                        .respond(500);
                    ctrl("facility_counties", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'facility count by constituency' controller | success ",
           function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_count_by_consituency")
                        .respond(200, {});
                    ctrl("facility_constituencies", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'facility count by constituency' controller | fail ",
           function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_count_by_consituency")
                        .respond(500);
                    ctrl("facility_constituencies", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'facility count by owner category' controller | success ",
           function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_count_by_owner_category")
                        .respond(200, {});
                    ctrl("facility_owner_categories", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'facility count by owner category' controller | fail ",
            function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_count_by_owner_category")
                        .respond(500);
                    ctrl("facility_owner_categories", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'facility count by owner' controller | success ",
            function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_count_by_owner")
                        .respond(200, {});
                    ctrl("facility_owners", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'facility count by owner' controller | fail ",
            function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_count_by_owner")
                        .respond(500);
                    ctrl("facility_owners", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'facility count by facility types' controller | success ",
            function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_count_by_facility_type")
                        .respond(200, {});
                    ctrl("facility_types", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'facility count by facility types' controller | fail ",
            function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_count_by_facility_type")
                        .respond(500);
                    ctrl("facility_types", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'facility count by county by types' controller | success ",
           function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_count_by_facility_type_detailed")
                        .respond(200, {});
                    ctrl("county_facility_types", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'facility count by county by types' controller | fail ",
           function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_count_by_facility_type_detailed")
                        .respond(500);
                    ctrl("county_facility_types", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'facility count by county by keph' controller | success ",
           function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_keph_level_report")
                        .respond(200, {});
                    ctrl("keph_levels", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'facility count by county by keph' controller | fail ",
           function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_keph_level_report")
                        .respond(500);
                    ctrl("keph_levels", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'facility count by county by constituency' controller | success ",
           function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_constituency_report")
                        .respond(200, {});
                    ctrl("county_constituencies", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'facility count by county by constituency' controller | fail ",
           function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_constituency_report")
                        .respond(500);
                    ctrl("county_constituencies", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
    });
})();