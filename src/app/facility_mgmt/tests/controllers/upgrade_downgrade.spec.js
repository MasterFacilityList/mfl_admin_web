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

            it("should load data", function () {
                var data = {
                    "$log": log
                };
                var scope = {
                    "facility_id": "33"
                };

                httpBackend
                    .expectGET(
                        server_url+"api/facilities/facility_upgrade/?" +
                        "facility=33&is_cancelled=false&is_confirmed=false")
                    .respond(200, {results: [{"id": "1"}]});

                httpBackend
                    .expectGET(
                        server_url+"api/facilities/facility_types/?page_size=100&ordering=name")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/keph/?fields=id,name&ordering=name")
                    .respond(200, {results: [{"id": 3, "name": "Level 2"}]});

                var c = ctrl("updown_helper", data);
                c.bootstrap(scope, false);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.new_type).toEqual({"id": "1"});
                expect(scope.facility_types).toEqual([]);
                expect(scope.keph_levels).toEqual([{"id": 3, "name": "Level 2"}]);
                expect(scope.upgrade).toEqual(false);
            });

            it("should update facility types", function () {
                var data = {
                    "$log": log
                };
                var scope = {
                    "facility_id": "33"
                };

                httpBackend
                    .expectGET(
                        server_url+"api/facilities/facility_upgrade/?" +
                        "facility=33&is_cancelled=false&is_confirmed=false")
                    .respond(200, {results: []});

                httpBackend
                    .expectGET(
                        server_url+"api/facilities/facility_types/?page_size=100&ordering=name")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/keph/?fields=id,name&ordering=name")
                    .respond(200, {results: [{"id": 3, "name": "Level 2"}]});

                var c = ctrl("updown_helper", data);
                c.bootstrap(scope, false);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.new_type).not.toEqual({});
                expect(scope.facility_types).toEqual([]);
                expect(scope.keph_levels).toEqual([{"id": 3, "name": "Level 2"}]);
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

            it("should catch failures", function () {
                var data = {
                    "$log": log
                };
                var scope = {
                    "facility_id": "33"
                };

                httpBackend
                    .expectGET(
                        server_url+"api/facilities/facility_upgrade/?" +
                        "facility=33&is_cancelled=false&is_confirmed=false")
                    .respond(503);

                httpBackend
                    .expectGET(
                        server_url+"api/facilities/facility_types/?page_size=100&ordering=name")
                    .respond(500);
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/keph/?fields=id,name&ordering=name")
                    .respond(404);

                var c = ctrl("updown_helper", data);
                c.bootstrap(scope, true);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.facility_types).toEqual(undefined);
                expect(scope.keph_levels).toEqual(undefined);
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
            });
        });

        describe("Test upgrade & downgrade controller", function () {

            it("should load upgrade controller", function () {
                var c = {
                    "bootstrap": angular.noop
                };
                var data = {
                    "$scope": rootScope.$new(),
                    "$controller": angular.noop
                };

                spyOn(data, "$controller").andReturn(c);
                spyOn(c, "bootstrap");
                ctrl("facility_upgrade", data);

                expect(data.$controller.calls.length).toEqual(2);
                expect(c.bootstrap).toHaveBeenCalled();
            });

            it("should load downgrade controller", function () {
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

                expect(data.$controller.calls.length).toEqual(2);
                expect(c.bootstrap).toHaveBeenCalled();
            });
        });
    });
})(window.angular);
