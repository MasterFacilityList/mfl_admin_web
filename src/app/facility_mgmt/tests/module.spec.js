(function () {
    "use strict";

    describe("Test facility_mgmt app", function () {

        it("should load facility_mgmt successfully", function () {
            expect(function (){module("mfl.facility_mgmt");}).not.toThrow();
        });
    });
})();
