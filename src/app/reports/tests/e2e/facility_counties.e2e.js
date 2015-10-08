(function () {
    "use strict";

    xdescribe("mflAdminApp scenario tests for facilities by county report:", function() {
        var test_utils = require("../../../common/tests/utils.e2e.js");

        it("should log in and load the dashboard", function() {
            test_utils.loginUser(
                browser,
                browser.params.users.national_admin.username,
                browser.params.users.national_admin.password
            );
        });

        it("should open up facility by counties reports", function() {

            //navigation
            browser.get("/#/reports/facility_counties");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(3000);

            //expectations
            expect(element(by.repeater("county in county_facilities")).isPresent()).toBe(true);
        });

        it("logout user after tests",function () {
            test_utils.logoutUser(browser);
        });
    });
})();
