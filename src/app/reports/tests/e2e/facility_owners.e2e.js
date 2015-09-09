(function () {
    "use strict";

    describe("mflAdminApp scenario tests for facility owner report:", function() {
        var test_utils = require("../../../common/tests/utils.e2e.js");

        it("should log in and load the dashboard", function() {
            test_utils.loginUser(
                browser,
                browser.params.users.national_admin.username,
                browser.params.users.national_admin.password
            );
        });

        it("should open up facility owner reports", function() {

            //navigation
            browser.get("/#/reports/facility_owners");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(3000);

            //expectations
            expect(element(by.repeater("owner in owner_facilities")).isPresent()).toBe(true);
        });

        it("logout user after tests",function () {
            test_utils.logoutUser(browser);
        });
    });
})();
