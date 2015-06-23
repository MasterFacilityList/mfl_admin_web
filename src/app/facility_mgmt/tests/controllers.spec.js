(function () {
    "use strict";

    describe("Test facility_mgmt controller module", function () {

        it("should load facility_mgmt controller successfully", function () {
            expect(function () {module("mfl.facility_mgmt.controllers");}).not.toThrow();
        });
    });

    describe("Test facility controllers", function () {
        var rootScope, ctrl;

        beforeEach(function () {
            module("mfl.facility_mgmt.controllers");

            inject(["$controller", "$rootScope", function (c, r) {
                ctrl = function (name, data) {
                    return c("mfl.facility_mgmt.controllers."+name, data);
                };
                rootScope = r;
            }]);
        });

        describe("Test facility list controller", function () {

            it("should load facility list controller", function () {
                var data = {
                    "$scope": rootScope.$new()
                };

                ctrl("facility_list", data);
                expect(data.$scope.title.name).toEqual("Facility Management");
            });
        });
    });
})();
