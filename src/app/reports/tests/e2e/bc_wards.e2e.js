(function () {
    "use strict";

    describe("mflAdminApp scenario tests for beds and cots by ward report:", function() {
        var test_utils = require("../../../common/tests/utils.e2e.js");

        it("should log in and load the dashboard", function() {
            test_utils.loginUser(
                browser,
                browser.params.users.national_admin.username,
                browser.params.users.national_admin.password
            );
        });

        it("should open up beds and cots wards reports", function() {

            //navigation
            browser.get("/#/reports/beds_cots_wards");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(2000);

            //expectations
            var ward = element(by.repeater("ward in ward_bc").row(1));
            expect(ward.isPresent()).toBe(true);
        });

        it("logout user after tests",function () {
            test_utils.logoutUser(browser);
        });
    });
})();
