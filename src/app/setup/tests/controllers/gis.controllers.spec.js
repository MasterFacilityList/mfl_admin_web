(function () {
    "use strict";

    describe("Test gis controllers", function () {
        var rootScope, state, log, ctrl;

        beforeEach(function () {
            module("mfl.setup.gis.controllers");
            module("mflAdminAppConfig");
            module("ui.router");
            module("mfl.setup.api");

            inject(["$state", "$rootScope", "$log", function (s, r, l) {
                rootScope = r;
                state = s;
                log = l;
            }]);

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
            it("should load", function () {
                var data = {
                    "$scope": rootScope.$new()
                };

                ctrl("geocode_methods_create", data);
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
            it("should load", function () {
                var data = {
                    "$scope": rootScope.$new()
                };

                ctrl("geocode_sources_create", data);
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
