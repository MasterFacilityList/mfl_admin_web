(function (_) {
    "use strict";

    describe("Test facility approve controllers", function () {
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

        describe("test rejected facilities list", function () {

            it("should load", function () {
                var scope = rootScope.$new();
                ctrl("facilities_rejected", {"$scope": scope});
                expect(scope.filters.rejected).toEqual(true);
            });
        });

        describe("test closed facilities list", function () {

            it("should load", function () {
                var scope = rootScope.$new();
                ctrl("facilities_closed", {"$scope": scope});
                expect(scope.filters.closed).toEqual(true);
            });
        });

        describe("test facility approve list", function () {

            it("should load", function () {
                var scope = rootScope.$new();
                ctrl("facilities_approve", {"$scope": scope});
                expect(scope.filters.approved).toEqual(false);
            });
        });

        describe("test facility update approve list", function () {

            it("should load", function () {
                var scope = rootScope.$new();
                ctrl("facilities_approve_update", {"$scope": scope});
                expect(scope.filters.has_edits).toEqual(true);
            });
        });

        describe("test facility approve/reject view", function () {

            it("should load reject list of a facility", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3},
                    "$log": log
                };
                state.current.name = "facility_reject_list.view";
                var scope = rootScope.$new();
                httpBackend
                .expectGET(server_url+"api/facilities/facilities/3/")
                .respond(200, {});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_units/?facility=3")
                    .respond(200, {results : []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_approvals/?facility=3&"+
                    "is_cancelled=true").respond(200, {results : []});
                ctrl("facility_rejected", data);
                scope.reject = true;
                httpBackend.flush();
            });

            it("should load approve list of a facility", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3},
                    "$log": log
                };
                state.current.name = "facility_approve_list.view";
                var scope = rootScope.$new();
                httpBackend
                .expectGET(server_url+"api/facilities/facilities/3/")
                .respond(200, {});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_units/?facility=3")
                    .respond(200, {results : []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_approvals/?facility=3&"+
                    "is_cancelled=false").respond(200, {results : []});
                ctrl("facility_rejected", data);
                scope.reject = false;
                httpBackend.flush();
            });

            it("should fail to load approve list of a facility", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3},
                    "$log": log
                };
                state.current.name = "facility_approve_list.view";
                var scope = rootScope.$new();
                httpBackend
                .expectGET(server_url+"api/facilities/facilities/3/")
                .respond(500);
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_units/?facility=3")
                    .respond(500);
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_approvals/?facility=3&"+
                    "is_cancelled=false").respond(500);
                ctrl("facility_rejected", data);
                scope.reject = false;
                httpBackend.flush();
            });
        });

        describe("test facility approve controller", function () {

            beforeEach(function () {
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_units/?facility=3")
                    .respond(200, {results : []});

                httpBackend
                    .expectGET(server_url+"api/facilities/facility_services/?" +
                        "facility=3&is_cancelled=false&is_confirmed=false&" +
                        "fields=id,service_name,option_display_value")
                    .respond(200, {results: []});

                httpBackend
                .expectGET(server_url+"api/facilities/facilities/3/")
                .respond(200, {
                    coordinates: 13,
                    latest_update: 3,
                    rejected: false,
                    approved: true
                });
            });
            it("should load facility update", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3}
                };
                ctrl("facility_approve", data);
                httpBackend
                    .expectGET(server_url+"api/gis/facility_coordinates/13/")
                    .respond(200, {results : []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_updates/3/")
                    .respond(200, {facility_updates: "{\"abbreviation\":2}"});
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.facility_update).toEqual({facility_updates: {abbreviation: 2}});
            });
        });

        describe("test facility approve controller", function () {

            beforeEach(function () {
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_units/?facility=3")
                    .respond(200, {results : []});

                httpBackend
                    .expectGET(server_url+"api/facilities/facility_services/?" +
                        "facility=3&is_cancelled=false&is_confirmed=false&" +
                        "fields=id,service_name,option_display_value")
                    .respond(200, {results: []});

                httpBackend
                .expectGET(server_url+"api/facilities/facilities/3/")
                .respond(200, {
                    coordinates: 13,
                    latest_update: 3,
                    rejected: true,
                    approved: true
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
                state.current.name = "facility_approve_list.view.reject";
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_approvals/?facility=3&"+
                               "is_cancelled=false")
                    .respond(500, {results: []});

                httpBackend
                    .expectGET(server_url+"api/facilities/facilities/3/")
                    .respond(400, {});

                ctrl("facility_approve", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.facility).toBe(undefined);
                expect(log.error).toHaveBeenCalled();
            });

            it("should load facility update", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3}
                };
                httpBackend.resetExpectations();
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_units/?facility=3")
                    .respond(200, {results : []});

                httpBackend
                    .expectGET(server_url+"api/facilities/facility_approvals/?facility=3&"+
                               "is_cancelled=false")
                    .respond(200, {results: []});

                httpBackend
                    .expectGET(server_url+"api/facilities/facility_services/?" +
                        "facility=3&is_cancelled=false&is_confirmed=false&" +
                        "fields=id,service_name,option_display_value")
                    .respond(200, {results: []});

                httpBackend
                .expectGET(server_url+"api/facilities/facilities/3/")
                .respond(200, {
                    coordinates: 13,
                    latest_update: 3,
                    rejected: true,
                    approved: true
                });

                state.current.name = "facility_approve_list.view.reject";
                ctrl("facility_approve", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

            });

            it("should not load undefined facility update or coordinates", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3}
                };

                httpBackend.resetExpectations();
                httpBackend
                .expectGET(server_url+"api/facilities/facility_units/?facility=3")
                .respond(200, {results : []});
                httpBackend
                .expectGET(server_url+"api/facilities/facilities/3/")
                .respond(200, {"id": "2", "latest_update": null, coordinates: null});

                ctrl("facility_approve", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                expect(data.$scope.facility_update).toEqual(undefined);
            });

            it("should show errors on fail to load facility update", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3},
                    "$log": log
                };

                ctrl("facility_approve", data);
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_updates/3/")
                    .respond(500);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.facility_update).toEqual(undefined);
                expect(log.error).toHaveBeenCalled();
            });

            it("should not make an update without update_id", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3}
                };

                ctrl("facility_approve", data);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.resetExpectations();

                data.$scope.facility.latest_update = "";
                data.$scope.approveUpdate();

                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should approve a facility update", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3}
                };

                ctrl("facility_approve", data);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.resetExpectations();

                httpBackend
                    .expectPATCH(server_url+"api/facilities/facility_updates/3/")
                    .respond(200);

                data.$scope.approveUpdate(true);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalled();
            });

            it("should reject a facility update", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3}
                };

                ctrl("facility_approve", data);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.resetExpectations();

                httpBackend
                    .expectPATCH(server_url+"api/facilities/facility_updates/3/")
                    .respond(200);

                data.$scope.approveUpdate(false);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalled();
            });

            it("should show errors on fail to approve a facility", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$log": log,
                    "$stateParams": {facility_id: 3}
                };

                ctrl("facility_approve", data);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.resetExpectations();

                httpBackend
                    .expectPATCH(server_url+"api/facilities/facility_updates/3/")
                    .respond(400);

                data.$scope.approveUpdate();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).not.toHaveBeenCalled();
                expect(log.error).toHaveBeenCalled();
            });

            it("should approve a facility", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3}
                };

                ctrl("facility_approve", data);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(server_url+"api/facilities/facility_approvals/")
                    .respond(201);

                data.$scope.facility_approval.comment = "Koment";
                data.$scope.approveFacility();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalled();
            });

            it("should show errors on fail to approve a facility", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3},
                    "$log": log
                };

                ctrl("facility_approve", data);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(server_url+"api/facilities/facility_approvals/")
                    .respond(401);

                data.$scope.facility_approval.comment = "Koment";
                data.$scope.approveFacility();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).not.toHaveBeenCalled();
                expect(log.error).toHaveBeenCalled();
            });

            it("should approve/reject a facility service update", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3}
                };

                ctrl("facility_approve", data);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.resetExpectations();

                httpBackend
                    .expectPATCH(server_url+"api/facilities/facility_services/1/",
                        {"is_cancelled":false,"is_confirmed":true})
                    .respond(200);

                data.$scope.facility_service_updates = [
                    {"id": "1"}, {"id": "2"}, {"id": "3"}
                ];
                data.$scope.approveFacilityService(
                    data.$scope.facility_service_updates[0], true
                );

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.resetExpectations();

                expect(_.contains(data.$scope.facility_service_updates, {"id": "1"})).toBe(false);

                httpBackend
                    .expectPATCH(server_url+"api/facilities/facility_services/2/",
                        {"is_cancelled":true,"is_confirmed":false})
                    .respond(200);

                data.$scope.approveFacilityService(
                    data.$scope.facility_service_updates[0], false
                );

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.resetExpectations();

                expect(_.contains(data.$scope.facility_service_updates, {"id": "2"})).toBe(false);
            });

            it("should approve/reject a facility service update", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3}
                };

                ctrl("facility_approve", data);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.resetExpectations();

                httpBackend
                    .expectPATCH(server_url+"api/facilities/facility_services/1/",
                        {"is_cancelled":false,"is_confirmed":true})
                    .respond(400);

                data.$scope.facility_service_updates = [
                    {"id": "1"}, {"id": "2"}, {"id": "3"}
                ];
                data.$scope.approveFacilityService(
                    data.$scope.facility_service_updates[0], true
                );

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.resetExpectations();

                expect(_.contains(data.$scope.facility_service_updates, {"id": "1"})).toBe(false);
            });
        });
    });
})(window._);
