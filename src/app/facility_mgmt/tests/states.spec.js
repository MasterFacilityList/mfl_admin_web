(function () {
    "use strict";

    describe("Test facility_mgmt states module", function () {

        it("should load facility_mgmt states successfully", function () {
            expect(function () {module("mfl.facility_mgmt.states");}).not.toThrow();
        });
    });
})();
