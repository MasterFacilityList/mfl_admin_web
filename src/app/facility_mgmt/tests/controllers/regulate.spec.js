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

        describe("test regulation list", function () {

            it("should load", function () {
                var scope = rootScope.$new();
                ctrl("facilities_regulation", {"$scope": scope});
                expect(scope.filters.regulated).toEqual(false);
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

        describe("test regulator sync update", function () {

            it("should load the sync object", function () {
                httpBackend.expectGET(
                    server_url+"api/facilities/regulator_sync/431/?fields=" +
                        "official_name,name,registration_number,"+
                        "regulatory_body_name,owner_name,facility_type_name,"+
                        "probable_matches,mfl_code"
                    ).respond(200, {});
                var scope = rootScope.$new();
                ctrl("regulator_sync.update", {
                    "$scope": scope,
                    "$stateParams": {"sync_id": "431"}
                });
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                expect(scope.sync_obj).toEqual({});
            });

            it("should handle failure to load the sync object", function () {
                httpBackend.expectGET(
                    server_url+"api/facilities/regulator_sync/431/?fields=" +
                        "official_name,name,registration_number,"+
                        "regulatory_body_name,owner_name,facility_type_name,"+
                        "probable_matches,mfl_code"
                    ).respond(500, {});
                var scope = rootScope.$new();
                ctrl("regulator_sync.update", {
                    "$scope": scope,
                    "$stateParams": {"sync_id": "431"}
                });
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                expect(scope.sync_obj).toBe(undefined);
            });

            it("should update the sync object", function () {
                httpBackend.expectGET(
                    server_url+"api/facilities/regulator_sync/431/?fields=" +
                        "official_name,name,registration_number,"+
                        "regulatory_body_name,owner_name,facility_type_name,"+
                        "probable_matches,mfl_code"
                    ).respond(200, {});
                var scope = rootScope.$new();
                ctrl("regulator_sync.update", {
                    "$scope": scope,
                    "$stateParams": {"sync_id": "431"},
                    "$state": state
                });
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(
                        server_url+"api/facilities/regulator_sync_update/431/",
                        {"mfl_code": 783}
                    )
                    .respond(200, {});
                scope.updateSyncObject(783);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                expect(state.go).toHaveBeenCalledWith("facilities_regulator_sync");
            });

            it("should handle failure to update the sync object", function () {
                httpBackend.expectGET(
                    server_url+"api/facilities/regulator_sync/431/?fields=" +
                        "official_name,name,registration_number,"+
                        "regulatory_body_name,owner_name,facility_type_name,"+
                        "probable_matches,mfl_code"
                    ).respond(200, {});
                var scope = rootScope.$new();
                ctrl("regulator_sync.update", {
                    "$scope": scope,
                    "$stateParams": {"sync_id": "431"},
                    "$state": state
                });
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(
                        server_url+"api/facilities/regulator_sync_update/431/",
                        {"mfl_code": 783}
                    )
                    .respond(500, {});
                scope.updateSyncObject(783);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                expect(state.go).not.toHaveBeenCalledWith("facilities_regulator_sync");
            });
        });
    });
})();
