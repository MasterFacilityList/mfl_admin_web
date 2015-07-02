(function () {
    "use strict";

    describe("Test facility approve controllers", function () {
        var rootScope, ctrl, httpBackend, server_url, log, state;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.facility_mgmt.controllers");

            inject(["$controller", "$rootScope", "$httpBackend", "SERVER_URL", "$log", "$state",
                function (c, r, h, s, lg, st) {
                    ctrl = function (data) {
                        return c("mfl.facility_mgmt.controllers.facility_approve", data);
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

        it("should load facility update", function () {
            var data = {
                "$scope": rootScope.$new(),
                "$state": state,
                "$stateParams": {update_id: 3}
            };
            data.$scope.facility_id = 3;

            ctrl(data);

            httpBackend
                .expectGET(server_url+"api/facilities/facility_updates/3/")
                .respond(200, {facility_updates: "{\"abbreviation\":2}"});

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            expect(data.$scope.facility_update).toEqual({facility_updates: {abbreviation: 2}});
        });

        it("should show errors on fail to load facility update", function () {
            var data = {
                "$scope": rootScope.$new(),
                "$state": state,
                "$stateParams": {update_id: 3},
                "$log": log
            };
            data.$scope.facility_id = 3;

            ctrl(data);

            httpBackend
                .expectGET(server_url+"api/facilities/facility_updates/3/")
                .respond(500);

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            expect(data.$scope.facility_update).toEqual(undefined);
            expect(log.error).toHaveBeenCalled();
        });

        it("should make an update without update_id", function () {
            var data = {
                "$scope": rootScope.$new(),
                "$state": state,
                "$stateParams": {update_id: ""}
            };
            data.$scope.facility_id = 3;

            ctrl(data);

            data.$scope.approveUpdate();

            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

        });

        it("should approve a facility update", function () {
            var data = {
                "$scope": rootScope.$new(),
                "$state": state,
                "$stateParams": {update_id: 3}
            };
            data.$scope.facility_id = 3;

            ctrl(data);

            httpBackend
                .expectPATCH(server_url+"api/facilities/facility_updates/3/")
                .respond(200);

            data.$scope.approveUpdate();

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            expect(state.go).toHaveBeenCalled();
        });

        it("should reject a facility update", function () {
            var data = {
                "$scope": rootScope.$new(),
                "$state": state,
                "$stateParams": {update_id: 3}
            };
            data.$scope.facility_id = 3;

            ctrl(data);

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
                "$stateParams": {update_id: 3}
            };
            data.$scope.facility_id = 3;

            ctrl(data);

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
                "$stateParams": {update_id: 3}
            };
            data.$scope.facility_id = 3;

            ctrl(data);

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
                "$stateParams": {update_id: 3},
                "$log": log
            };
            data.$scope.facility_id = 3;

            ctrl(data);

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
    });
})();
