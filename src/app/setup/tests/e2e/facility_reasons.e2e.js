(function () {
    "use strict";

    describe("mflAdminApp scenario tests for facility reasons:", function() {

        //variable required in test
        var test_utils = require("../../../common/tests/utils.e2e.js");
        var facility_reason_desc = "description of facility reason";
        var facility_reason = test_utils.getRandomString(25);

        it("should log in and load the dashboard", function() {
            test_utils.loginUser(
                browser,
                browser.params.users.national_admin.username,
                browser.params.users.national_admin.password
            );
        });

        //Creating without ability to delete hinders test from being included
        it("should open up new facility reason screen and save facility reason", function() {
            //variables
            var facility_reason_input_name, facility_reason_textarea_desc,facility_reason_save_btn;

            //navigation
            browser.get("/#/setup/facility_reasons/create");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(browser.params.page_timeout);

            //interaction setup

            facility_reason_input_name = element(by.name("reason"));
            facility_reason_textarea_desc = element(by.name("description"));
            facility_reason_save_btn = element(by.buttonText("Save"));

            //interations
            facility_reason_input_name.sendKeys(facility_reason);
            facility_reason_textarea_desc.sendKeys(facility_reason_desc);
            facility_reason_save_btn.click(); //saves facility_reason
            browser.driver.sleep(browser.params.page_timeout);
            browser.waitForAngular(); //navigation to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/facility_reasons");
        });

        it("should find created facility_reason in the list generated", function() {
            //variables
            var facility_reasonName;

            //navigation
            browser.get("/#/setup/facility_reasons");
            browser.driver.sleep(browser.params.page_timeout);
            browser.waitForAngular(); //navigation to list page

            //interaction setup
            facility_reasonName = element(by.repeater("reason in change_reasons")
                .row(0).column("reason.reason"));

            //expectations
            expect(facility_reasonName.getText()).toEqual(facility_reason);
        });

        it("should go to edit view of created facility reason", function() {
            //variables
            var facility_reasonRow, view_btn, facility_reason_input_name;

            //interation setup
            facility_reasonRow = element(by.repeater("reason in change_reasons").row(0));
            view_btn = facility_reasonRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(browser.params.page_timeout);
            browser.waitForAngular();  //navigation to detail page

            //expectations
            facility_reason_input_name = element(by.name("reason"));
            facility_reason_input_name.getAttribute("value").then(function (text) {
                expect(text).toEqual(facility_reason);
            });
        });

        it("should edit facility reason, save and check if updated", function() {
            //variables
            var facility_reason_input_name, facility_reason_textarea_desc, facility_reason_save_btn,
                facility_reasonNameEl;

            //setup interaction
            facility_reason_input_name = element(by.name("reason"));
            facility_reason_textarea_desc = element(by.name("description"));
            facility_reason_save_btn = element(by.buttonText("Save"));

            //interaction
            facility_reason_input_name.clear().then(function () {
                facility_reason_input_name.sendKeys(facility_reason);
            });
            facility_reason_textarea_desc.clear().then(function () {
                facility_reason_textarea_desc.sendKeys("Describes test facility reason "+
                                                       "for testing");
            });
            expect(facility_reason_save_btn.getText()).toEqual("Save");
            facility_reason_save_btn.click();
            browser.driver.sleep(browser.params.page_timeout);
            browser.waitForAngular();//navigates to list page

            facility_reasonNameEl = element.all(by.repeater("reason in change_reasons")
                                             .row(0).column("reason.reason"));
            expect(facility_reasonNameEl.getText()).toEqual([facility_reason]);
        });

        //Only to be added if deleted fields can be recreated
        it("should delete facility reason from edit view",function () {
            var facility_reasonRow;

            //navigation
            browser.get("/#/setup/facility_reasons");
            browser.driver.sleep(browser.params.page_timeout);
            browser.waitForAngular(); //navigation to list page

            facility_reasonRow = element(by.repeater("reason in change_reasons").row(0));
            facility_reasonRow.element(by.cssContainingText(".btn","View")).click();
            browser.driver.sleep(browser.params.page_timeout);
            browser.waitForAngular();  //navigation to detail

            //interaction setup
            element(by.cssContainingText(".btn-danger","Delete")).click();
            browser.waitForAngular(); //navigation to delete page
            browser.driver.sleep(browser.params.page_timeout);

            element(by.id("del_btn")).click();
            browser.driver.sleep(browser.params.page_timeout);
            browser.waitForAngular();//goes back to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/facility_reasons");
        });

        it("logout user after tests",function () {
            test_utils.logoutUser(browser);
        });
    });
})();
