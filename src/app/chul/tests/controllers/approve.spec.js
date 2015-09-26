(function () {
    "use strict";
    describe("Chul approve controllers: ", function () {
        var rootScope, ctrl, httpBackend, server_url,
        controller, stateParams, state;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.chul.services");
            module("mfl.chul.controllers");
            inject(["$controller", "$rootScope", "$httpBackend", "SERVER_URL",
                "$stateParams", "$state",
                function (c, r, h, s, st, sp) {
                    ctrl = function (name, data) {
                        return c("mfl.chul.controllers."+name, data);
                    };
                    controller = c;
                    rootScope = r;
                    httpBackend = h;
                    server_url = s;
                    state = sp;
                    stateParams = st;
                }
            ]);
        });

        describe("chul approve controller: ", function () {

            it("should load controller and data", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        unit_id: 1
                    }
                };
                ctrl("approve_reject", data);
                httpBackend
                    .expectGET(server_url+"api/chul/units/1/")
                    .respond(200, {});
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should load controller and data but fail to do updates", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        unit_id: 1
                    }
                };
                ctrl("approve_reject", data);
                httpBackend
                    .expectGET(server_url+"api/chul/units/1/")
                    .respond(200, {latest_update:1});
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.resetExpectations();
                httpBackend
                    .expectPATCH(server_url+"api/chul/updates/1/")
                    .respond(500, {});
                data.$scope.approveChu(true,"comment");
                data.$scope.approveChuUpdate(true);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should test failing to view one chul", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        unit_id: 1
                    }
                };
                ctrl("approve_reject", data);
                httpBackend
                    .expectGET(server_url+"api/chul/units/1/")
                    .respond(500, {});
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should patch unit and approve the unit | success", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        unit_id: 1
                    }
                };
                ctrl("approve_reject", data);
                httpBackend
                    .expectGET(server_url+"api/chul/units/1/")
                    .respond(200, {latest_update:1});
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();
                httpBackend
                    .expectPATCH(server_url+"api/chul/units/1/")
                    .respond(200, {});
                httpBackend
                    .expectPATCH(server_url+"api/chul/updates/1/")
                    .respond(200, {});
                data.$scope.approveChu(true,"comment");
                data.$scope.approveChuUpdate(true);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should patch unit and approve the unit | fail", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        unit_id: 1
                    }
                };
                ctrl("approve_reject", data);
                httpBackend
                    .expectGET(server_url+"api/chul/units/1/")
                    .respond(200, {});
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();
                httpBackend
                    .expectPATCH(server_url+"api/chul/units/1/")
                    .respond(500);
                data.$scope.approveChu(true,"comment");
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should patch unit and reject the unit | success", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        unit_id: 1
                    }
                };
                ctrl("approve_reject", data);
                httpBackend
                    .expectGET(server_url+"api/chul/units/1/")
                    .respond(200, {latest_update:1});
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();
                httpBackend
                    .expectPATCH(server_url+"api/chul/units/1/")
                    .respond(200, {});
                httpBackend
                    .expectPATCH(server_url+"api/chul/updates/1/")
                    .respond(200, {});
                data.$scope.approveChu(false,"comment");
                data.$scope.approveChuUpdate(false);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
        });
    });
})();