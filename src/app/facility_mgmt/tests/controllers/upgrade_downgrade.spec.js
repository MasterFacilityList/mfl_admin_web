(function (angular) {
    "use strict";

    describe("Test facility upgrade, downgrade controllers", function () {
        var rootScope, ctrl, httpBackend, server_url, log, state;

        beforeEach(function () {
            module("mflAdminAppConfig");
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

        describe("Test upgrade downgrade helper controller", function () {
            it("should update facility types", function () {
                var data = {
                    "$log": log
                };
                var scope = {};

                httpBackend
                    .expectGET(
                        server_url+"api/facilities/facility_types/?page_size=100&ordering=name")
                    .respond(200, {results: []});

                var c = ctrl("updown_helper", data);
                c.bootstrap(scope, false);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.facility_types).toEqual([]);
                expect(scope.upgrade).toEqual(false);

                httpBackend.resetExpectations();

                scope.new_type.facility_type = "2";
                scope.new_type.reason = "some reason";
                httpBackend
                    .expectPOST(server_url+"api/facilities/facility_upgrade/")
                    .respond(201, {id: "89"});

                scope.updateType();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.new_type.id).toEqual("89");
            });

            it("should update facility types", function () {
                var data = {
                    "$log": log
                };
                var scope = {};

                httpBackend
                    .expectGET(
                        server_url+"api/facilities/facility_types/?page_size=100&ordering=name")
                    .respond(500);

                var c = ctrl("updown_helper", data);
                c.bootstrap(scope, true);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.facility_types).toEqual(undefined);
                expect(scope.upgrade).toEqual(true);

                httpBackend.resetExpectations();

                scope.new_type.facility_type = "2";
                scope.new_type.reason = "some reason";
                httpBackend
                    .expectPOST(server_url+"api/facilities/facility_upgrade/")
                    .respond(400);

                scope.updateType();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.new_type.id).toEqual("");
            });
        });

        describe("Test upgrade controller", function () {
            it("should load", function () {
                var data = {
                    "$scope": rootScope.$new()
                };

                ctrl("facility_upgrade", data);
            });
        });

        describe("Test downgrade controller", function () {
            it("should load", function () {
                var c = {
                    "bootstrap": angular.noop
                };
                var data = {
                    "$scope": rootScope.$new(),
                    "$controller": angular.noop
                };

                spyOn(data, "$controller").andReturn(c);
                spyOn(c, "bootstrap");
                ctrl("facility_downgrade", data);

                expect(data.$controller).toHaveBeenCalled();
                expect(c.bootstrap).toHaveBeenCalled();
            });
        });
    });
})(angular);
