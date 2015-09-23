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

        it("should test 'community units by county' controller export ", function () {
            inject(["mfl.common.export.service",
                function (exportService) {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/chul/?report_type="+
                        "county")
                        .respond(200, {});
                    spyOn(exportService, "excelExport");

                    ctrl("chu_counties", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    data.$scope.exportToExcel();
                    expect(exportService.excelExport).toHaveBeenCalled();
                }
            ]);
        });

        it("should test 'community units count by county' controller | success ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/chul/?report_type="+
                        "county")
                        .respond(200, {});
                    ctrl("chu_counties", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });

        it("should test 'community units count by county' controller | fail ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/chul/?report_type="+
                        "county")
                        .respond(500);
                    ctrl("chu_counties", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });
        it("should test 'community units by constituency' controller | success ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/chul/?report_type="+
                        "constituency")
                        .respond(200, {});
                    ctrl("chu_constituencies", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });

        it("should test 'community units by constituency' controller with params", function () {
            var data = {
                "$scope": rootScope.$new(),
                "$stateParams": {"county": "123"}
            };
            httpBackend
                .expectGET(server_url+"api/reporting/chul/?report_type="+
                "constituency&county=123")
                .respond(200, {});
            ctrl("chu_constituencies", data);

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();
        });

        it("should test 'community units by constituency' controller | fail ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/chul/?report_type="+
                        "constituency")
                        .respond(500);
                    ctrl("chu_constituencies", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });

        it("should test 'community units by ward' controller | success ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/chul/?report_type="+
                        "ward")
                        .respond(200, {});
                    ctrl("chu_wards", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });

        it("should test 'community units by ward' with params", function () {
            var data = {
                "$scope": rootScope.$new(),
                "$stateParams": {
                    "constituency": "456"
                }
            };
            httpBackend
                .expectGET(server_url+"api/reporting/chul/?report_type="+
                "ward&constituency=456")
                .respond(200, {});
            ctrl("chu_wards", data);

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();
        });

        it("should test 'community units by ward' controller | fail ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/chul/?report_type="+
                        "ward")
                        .respond(500);
                    ctrl("chu_wards", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });

        it("should test 'community units by status' controller | success ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/chul/?report_type="+
                        "status")
                        .respond(200, {});
                    ctrl("chu_status", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });

        it("should test 'community units by status' controller | fail ", function () {
            inject([
                function () {
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/reporting/chul/?report_type="+
                        "status")
                        .respond(500);
                    ctrl("chu_status", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }
            ]);
        });

    });
})();
