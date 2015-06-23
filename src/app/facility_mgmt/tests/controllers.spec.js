(function () {
    "use strict";

    describe("Test facility_mgmt controller module", function () {

        it("should load facility_mgmt controller successfully", function () {
            expect(function () {module("mfl.facility_mgmt.controllers");}).not.toThrow();
        });
    });
})();
