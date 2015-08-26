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

        it("should test 'facility count by county' controller export ", function () {
            inject(["mfl.common.export.service",
                function (exportService) {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "facility_count_by_county")
                        .respond(200, {});
                    spyOn(exportService, "excelExport");

                    ctrl("facility_counties", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    data.$scope.exportToExcel();
                    expect(exportService.excelExport).toHaveBeenCalled();
                }
            ]);
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

        it("should test 'beds and cots count by county' controller | success ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "beds_and_cots_by_county")
                        .respond(200, {});
                    ctrl("bc_counties", data);

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
        it("should test 'beds and cots count by county' controller | fail ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "beds_and_cots_by_county")
                        .respond(500);
                    ctrl("bc_counties", data);

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
        it("should test 'beds and cots by constituency' controller | success ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "beds_and_cots_by_constituency")
                        .respond(200, {});
                    ctrl("bc_constituencies", data);

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
        it("should test 'beds and cots by constituency' controller | fail ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "beds_and_cots_by_constituency")
                        .respond(500);
                    ctrl("bc_constituencies", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'beds and cots by ward' controller | success ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "beds_and_cots_by_ward")
                        .respond(200, {});
                    ctrl("bc_wards", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'beds and cots by ward' controller | fail ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/?report_type="+
                        "beds_and_cots_by_ward")
                        .respond(500);
                    ctrl("bc_wards", data);

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
                        .respond(200, {
                            total: [],
                            results: [
                                {
                                    county: "NAIROBI",
                                    keph_level: "Not Classified",
                                    number_of_facilities: 0
                                },
                                {
                                    county: "KISUMU",
                                    keph_level: "Level 6",
                                    number_of_facilities: 7
                                },
                                {
                                    county: "MOMBASA",
                                    keph_level: "Level 5",
                                    number_of_facilities: 4
                                }
                            ]
                        });
                    ctrl("keph_levels", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();
                    expect(data.$scope.counties).toEqual(["NAIROBI", "KISUMU", "MOMBASA"]);
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
