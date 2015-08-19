(function () {
    "use strict";

    describe("mflAdminApp scenario tests:", function() {

        beforeEach(function() {
            browser.get("/");
        });
        it("should automatically redirect to /login?next=dashboard"+
            " when location hash/fragment is empty", function() {
            expect(browser.getLocationAbsUrl()).toEqual("/login?next=dashboard");
        });
    });
})();
