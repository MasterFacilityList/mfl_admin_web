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
                ctrl("geocode_methods_list");
            });
        });

        describe("Test geocode method create controller", function () {
            it("should load", function () {
                ctrl("geocode_methods_create");
            });
        });

        describe("Test geocode method edit controller", function () {
            it("should load", function () {
                ctrl("geocode_methods_edit");
            });
        });

        describe("Test geocode method delete controller", function () {
            it("should load", function () {
                ctrl("geocode_methods_delete");
            });
        });


        describe("Test geocode sources list controller", function () {
            it("should load", function () {
                ctrl("geocode_sources_list");
            });
        });

        describe("Test geocode sources create controller", function () {
            it("should load", function () {
                ctrl("geocode_sources_create");
            });
        });

        describe("Test geocode sources edit controller", function () {
            it("should load", function () {
                ctrl("geocode_sources_edit");
            });
        });

        describe("Test geocode sources delete controller", function () {
            it("should load", function () {
                ctrl("geocode_sources_delete");
            });
        });

    });
})();
