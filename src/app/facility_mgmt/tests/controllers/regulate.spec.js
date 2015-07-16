(function () {
    "use strict";

    describe("Test facility regulation controllers", function () {
        var rootScope, ctrl, httpBackend, server_url, log, state;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.facility_mgmt.controllers");

            inject(["$controller", "$rootScope", "$httpBackend", "SERVER_URL", "$log", "$state",
                function (c, r, h, s, lg, st) {
                    ctrl = function (name, data) {
                        return c("mfl.facility_mgmt.controllers."+name, data);
                    };
                    rootScope = r;
                    httpBackend = h;
                    server_url = s;
                    log = lg;
                    state = st;
                    spyOn(state, "go");
                    spyOn(log, "error");
                }
            ]);
        });

        describe("test regulation list (maker)", function () {

            it("should load", function () {
                var scope = rootScope.$new();
                ctrl("facilities_regulation", {"$scope": scope});
                expect(scope.filters).toEqual({"regulated": false});
            });
        });

        describe("test regulation list (checker)", function () {

            it("should load", function () {
                var scope = rootScope.$new();
                ctrl("facilities_regulation_approval", {"$scope": scope});
                expect(scope.filters).toEqual({"regulated": false});
            });
        });

        describe("test regulate detail", function () {

            beforeEach(function () {
                httpBackend
                .expectGET(server_url+"api/facilities/facilities/3/")
                .respond(200, {
                    latest_update: 3
                });
                httpBackend
                .expectGET(server_url+"api/facilities/regulation_status/?ordering=name")
                .respond(200, {
                    results: []
                });
            });

            it("should show error on fail to load facility details", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "$log": log
                };
                httpBackend.resetExpectations();
                httpBackend
                    .expectGET(server_url+"api/facilities/facilities/3/")
                    .respond(400, {});
                httpBackend
                .expectGET(server_url+"api/facilities/regulation_status/?ordering=name")
                .respond(500);

                ctrl("facility_regulate", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.facility).toBe(undefined);
                expect(data.$scope.regulation_status).toBe(undefined);
                expect(log.error).toHaveBeenCalled();
            });

            it("should regulate a facility", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3}
                };
                ctrl("facility_regulate", data);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(server_url+"api/facilities/facility_regulation_status/")
                    .respond(200);
                data.$scope.regulateFacility();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalled();
            });

            it("should show eror on fail to regulate a facility", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3},
                    "$log": log
                };
                ctrl("facility_regulate", data);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(server_url+"api/facilities/facility_regulation_status/")
                    .respond(500);
                data.$scope.regulateFacility();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).not.toHaveBeenCalled();
                expect(log.error).toHaveBeenCalled();
            });

        });
    });
})();
