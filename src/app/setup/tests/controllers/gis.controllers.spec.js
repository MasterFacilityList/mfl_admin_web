(function () {
    "use strict";

    describe("Test gis controllers", function () {
        var rootScope, state, log, ctrl, httpBackend, server_url;

        beforeEach(function () {
            module("mfl.setup.gis.controllers");
            module("mflAdminAppConfig");
            module("ui.router");
            module("mfl.setup.api");

            inject(["$state", "$rootScope", "$log", "$httpBackend", "SERVER_URL",
                function (s, r, l, h, su) {
                    rootScope = r;
                    state = s;
                    log = l;
                    httpBackend = h;
                    server_url = su;
                }
            ]);

            inject(["$controller", function (c) {
                ctrl = function (name, data) {
                    return c("mfl.setup.gis.controllers."+name, data);
                };
            }]);
        });

        describe("Test geocode method list controller", function () {
            it("should load", function () {
                var data = {
                    "$scope": rootScope.$new()
                };
                ctrl("geocode_methods_list", data);
            });
        });

        describe("Test geocode method create controller", function () {

            it("should create a new geocode method", function () {

                var data = {
                    "$scope": rootScope.$new()
                };

                ctrl("geocode_methods_create", data);

                httpBackend
                    .expectPOST(server_url+"api/gis/geo_code_methods/",
                        {name: "A", description: "D"})
                    .respond(201);
                data.$scope.geocode_method = {name: "A", description: "D"};
                data.$scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

            });

            it("should show errors on create", function () {
                spyOn(log, "error");
                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };

                ctrl("geocode_methods_create", data);

                httpBackend
                    .expectPOST(server_url+"api/gis/geo_code_methods/",
                        {name: "A", description: "D"})
                    .respond(400);
                data.$scope.geocode_method = {name: "A", description: "D"};
                data.$scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test geocode method edit controller", function () {
            it("should load", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {}
                };

                ctrl("geocode_methods_edit", data);
            });
        });

        describe("Test geocode method delete controller", function () {
            it("should load", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {}
                };

                ctrl("geocode_methods_delete", data);
            });
        });


        describe("Test geocode sources list controller", function () {
            it("should load", function () {
                var data = {
                    "$scope": rootScope.$new()
                };

                ctrl("geocode_sources_list", data);
            });
        });

        describe("Test geocode sources create controller", function () {

            it("should create a new geocode source", function () {

                var data = {
                    "$scope": rootScope.$new()
                };

                ctrl("geocode_sources_create", data);

                httpBackend
                    .expectPOST(server_url+"api/gis/geo_code_sources/")
                    .respond(201);
                data.$scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

            });

            it("should show errors on create", function () {
                spyOn(log, "error");
                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };

                ctrl("geocode_sources_create", data);

                httpBackend
                    .expectPOST(server_url+"api/gis/geo_code_sources/")
                    .respond(502);

                data.$scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test geocode sources edit controller", function () {
            it("should load", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {}
                };

                ctrl("geocode_sources_edit", data);
            });
        });

        describe("Test geocode sources delete controller", function () {
            it("should load", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {}
                };

                ctrl("geocode_sources_delete", data);
            });
        });

    });
})();
