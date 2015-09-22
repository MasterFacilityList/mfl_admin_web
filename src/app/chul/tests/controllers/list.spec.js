(function () {
    "use strict";
    describe("Test chul controllers", function () {
        var rootScope, ctrl, httpBackend, server_url,
        controller, stateParams;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.chul.services");
            module("mfl.chul.controllers");
            inject(["$controller", "$rootScope", "$httpBackend", "SERVER_URL", "$stateParams",
                function (c, r, h, s, st) {
                    ctrl = function (name, data) {
                        return c("mfl.chul.controllers"+name, data);
                    };
                    controller = c;
                    rootScope = r;
                    httpBackend = h;
                    server_url = s;
                    stateParams = st;
                }
            ]);
        });

        describe("Test chul list controllers", function () {

            it("should load chul list controller", function () {
                inject(["$controller", "$rootScope",
                    function ($controller, rootScope) {
                        var data = { "$scope": rootScope.$new() };
                        $controller("mfl.chul.controllers.units_list", data);
                    }
                ]);
            });
        });

        describe("Test chul view controller", function () {

            it("should test viewing one chul", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        unit_id: 1
                    }
                };
                ctrl(".view_chul", data);
                httpBackend
                    .expectGET(server_url+"api/chul/units/1/")
                    .respond(200, {});
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
                ctrl(".view_chul", data);
                httpBackend
                    .expectGET(server_url+"api/chul/units/1/")
                    .respond(500, {});
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
        });
    });
})();
