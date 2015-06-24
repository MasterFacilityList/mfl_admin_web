(function () {
    "use strict";

    describe("Test facility_mgmt controller module", function () {

        it("should load facility_mgmt controller successfully", function () {
            expect(function () {module("mfl.facility_mgmt.controllers");}).not.toThrow();
        });
    });

    describe("Test facility controllers", function () {
        var rootScope, ctrl, httpBackend, server_url, loginService, log, yusa;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.facility_mgmt.controllers");

            inject(["$controller", "$rootScope", "$httpBackend", "SERVER_URL",
                "mfl.auth.services.login", "$log",
                function (c, r, h, s, ls, lg) {
                    ctrl = function (name, data) {
                        return c("mfl.facility_mgmt.controllers."+name, data);
                    };
                    rootScope = r;
                    httpBackend = h;
                    server_url = s;
                    loginService = ls;
                    yusa = {
                        county: "123"
                    };
                    spyOn(loginService, "getUser").andReturn();
                    log = lg;
                }
            ]);
        });

        describe("Test facility list controller", function () {

            it("should load facility list controller", function () {
                var data = {
                    "$scope": rootScope.$new()
                };

                ctrl("facility_list", data);
                expect(data.$scope.title.name).toEqual("Facility Management");
            });
        });

        describe("Test facility edit controller", function () {

            it("should load facility details", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/facilities/3/")
                    .respond(200, {});

                ctrl("facility_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.title.name).toEqual("Edit Facility");
                expect(data.$scope.facility).toEqual({});
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
                ctrl("facility_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.facility).toBe(undefined);
                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test facility edit basic controller", function () {

            it("should load required data", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.facility = {};
                data.$scope.login_user = yusa;
                httpBackend
                    .expectGET(server_url+"api/facilities/owners/?page_size=100&ordering=name")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/facility_types/?page_size=100&ordering=name")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/common/wards/?page_size=500&ordering=name&county=123")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/common/towns/?page_size=50000&ordering=name")
                    .respond(200, {results: []});
                ctrl("facility_edit.basic", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.facility_owners).toEqual([]);
                expect(data.$scope.facility_types).toEqual([]);
                expect(data.$scope.wards).toEqual([]);
                expect(data.$scope.towns).toEqual([]);
            });

            it("should show errors on load", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "$log": log
                };
                spyOn(log, "error");
                data.$scope.facility = {};
                data.$scope.login_user = yusa;
                httpBackend
                    .expectGET(server_url+"api/facilities/owners/?page_size=100&ordering=name")
                    .respond(500, {});
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/facility_types/?page_size=100&ordering=name")
                    .respond(500, {});
                httpBackend
                    .expectGET(
                        server_url+"api/common/wards/?page_size=500&ordering=name&county=123")
                    .respond(500, {});
                httpBackend
                    .expectGET(
                        server_url+"api/common/towns/?page_size=50000&ordering=name")
                    .respond(500, {});

                ctrl("facility_edit.basic", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.facility_owners).toEqual(undefined);
                expect(data.$scope.facility_types).toEqual(undefined);
                expect(data.$scope.wards).toEqual(undefined);
                expect(data.$scope.towns).toEqual(undefined);
                expect(log.error).toHaveBeenCalled();
            });

            it("should save facility basic details", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.facility = {};
                data.$scope.login_user = yusa;
                httpBackend
                    .expectGET(server_url+"api/facilities/owners/?page_size=100&ordering=name")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/facility_types/?page_size=100&ordering=name")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/common/wards/?page_size=500&ordering=name&county=123")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/common/towns/?page_size=50000&ordering=name")
                    .respond(200, {results: []});

                ctrl("facility_edit.basic", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                data.$scope.save();
            });
        });
    });
})();
