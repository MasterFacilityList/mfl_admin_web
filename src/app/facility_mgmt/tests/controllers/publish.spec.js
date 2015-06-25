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
                    ctrl = function (data) {
                        return c("mfl.facility_mgmt.controllers.facility_publish", data);
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

        it("should publish a facility", function () {
            var data = {
                "$scope": rootScope.$new(),
                "$state": state
            };
            data.$scope.facility_id = 3;
            ctrl(data);

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
                "$log": log
            };
            data.$scope.facility_id = 3;
            ctrl(data);

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
})();
