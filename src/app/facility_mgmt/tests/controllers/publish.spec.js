(function () {
    "use strict";

    describe("Test facility publish controllers", function () {
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

        describe("test publish list", function () {

            it("should load", function () {
                var scope = rootScope.$new();
                ctrl("facilities_publish", {"$scope": scope});
                expect(scope.filters).toEqual(
                    {"is_published": false, "approved": true, "rejected": false}
                );
            });
        });

        describe("test publish detail", function () {

            beforeEach(function () {
                httpBackend
                .expectGET(server_url+"api/facilities/facilities/3/")
                .respond(200, {
                    latest_update: 3
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

                ctrl("facility_publish", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.facility).toBe(undefined);
                expect(log.error).toHaveBeenCalled();
            });

            it("should publish a facility", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$stateParams": {facility_id: 3}
                };
                ctrl("facility_publish", data);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.resetExpectations();

                httpBackend
                    .expectPATCH(server_url+"api/facilities/facilities/3/")
                    .respond(200);
                data.$scope.publish();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalled();
            });

            it("should show errors on fail to publish a facility", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state,
                    "$log": log,
                    "$stateParams": {facility_id: 3}
                };

                ctrl("facility_publish", data);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.resetExpectations();

                httpBackend
                    .expectPATCH(server_url+"api/facilities/facilities/3/")
                    .respond(400);
                data.$scope.publish();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).not.toHaveBeenCalled();
                expect(log.error).toHaveBeenCalled();
            });
        });
    });
})();
