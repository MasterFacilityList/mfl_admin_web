(function () {
    "use strict";

    describe("mflAdminApp scenario tests for facility job titles:", function() {

        //variable required in test
        var test_utils = require("../../../common/tests/utils.e2e.js");
        var facility_job_title_desc = "description of facility job title";
        var facility_job_title = test_utils.getRandomString(25);

        it("should log in and load the dashboard", function() {
            test_utils.loginUser(
                browser,
                browser.params.users.national_admin.username,
                browser.params.users.national_admin.password
            );
        });

        //Creating without ability to delete hinders test from being included
        it("should open up new facility job title screen and save facility job title",
        function() {
            //variables
            var facility_job_title_input_name, facility_job_title_textarea_desc,
                facility_job_title_save_btn;

            //navigation
            browser.get("/#/setup/facility_job_titles/create");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(browser.params.page_timeout);

            //interaction setup

            facility_job_title_input_name = element(by.name("name"));
            facility_job_title_textarea_desc = element(by.name("description"));
            facility_job_title_save_btn = element(by.buttonText("Save"));

            //interations
            facility_job_title_input_name.sendKeys(facility_job_title);
            facility_job_title_textarea_desc.sendKeys(facility_job_title_desc);
            facility_job_title_save_btn.click(); //saves facility_job_title
            browser.driver.sleep(browser.params.page_timeout);
            browser.waitForAngular(); //navigation to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/facility_job_titles");
        });

        it("should find created facility_job_title in the list generated", function() {
            //variables
            var facility_job_titleName;

            //navigation
            browser.get("/#/setup/facility_job_titles");
            browser.driver.sleep(browser.params.page_timeout);
            browser.waitForAngular(); //navigation to list page

            //interaction setup
            facility_job_titleName = element(by.repeater("jobTitle in jobTitles")
                .row(0).column("jobTitle.name"));

            //expectations
            expect(facility_job_titleName.getText()).toEqual(facility_job_title);
        });

        it("should go to edit view of created facility job title", function() {
            //variables
            var facility_job_titleRow, view_btn, facility_job_title_input_name;

            //interation setup
            facility_job_titleRow = element(by.repeater("jobTitle in jobTitles").row(0));
            view_btn = facility_job_titleRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(browser.params.page_timeout);
            browser.waitForAngular();  //navigation to detail page

            //expectations
            facility_job_title_input_name = element(by.name("name"));
            facility_job_title_input_name.getAttribute("value").then(function (text) {
                expect(text).toEqual(facility_job_title);
            });
        });

        it("should edit facility job title, save and check if updated", function() {
            //variables
            var facility_job_title_input_name, facility_job_title_textarea_desc,
                facility_job_title_save_btn,facility_job_titleNameEl;

            //setup interaction
            facility_job_title_input_name = element(by.name("name"));
            facility_job_title_textarea_desc = element(by.name("description"));
            facility_job_title_save_btn = element(by.buttonText("Save"));

            //interaction
            facility_job_title_input_name.clear().then(function () {
                facility_job_title_input_name.sendKeys(facility_job_title);
            });
            facility_job_title_textarea_desc.clear().then(function () {
                facility_job_title_textarea_desc.sendKeys("Describes test facility job title "+
                                                       "for testing");
            });
            expect(facility_job_title_save_btn.getText()).toEqual("Save");
            facility_job_title_save_btn.click();
            browser.driver.sleep(browser.params.page_timeout);
            browser.waitForAngular();//navigates to list page

            facility_job_titleNameEl = element.all(by.repeater("jobTitle in jobTitles")
                                             .row(0).column("jobTitle.name"));
            expect(facility_job_titleNameEl.getText()).toEqual([facility_job_title]);
        });

        //Only to be added if deleted fields can be recreated
        it("should delete facility job title from edit view",function () {
            var facility_job_title_del_btn,view_btn,del_btn,facility_job_titleRow;

            //navigation
            browser.get("/#/setup/facility_job_titles");
            browser.driver.sleep(browser.params.page_timeout);
            browser.waitForAngular(); //navigation to list page

            //interation setup
            facility_job_titleRow = element(by.repeater("jobTitle in jobTitles").row(0));
            view_btn = facility_job_titleRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(browser.params.page_timeout);
            browser.waitForAngular();  //navigation to detail

            //interaction setup
            facility_job_title_del_btn = element(by.cssContainingText(".btn-danger","Delete"));

            //interaction
            facility_job_title_del_btn.click();
            browser.waitForAngular(); //navigation to delete page
            browser.driver.sleep(browser.params.page_timeout);

            del_btn = element(by.id("del_btn"));
            del_btn.click();
            browser.driver.sleep(browser.params.page_timeout);
            browser.waitForAngular();//goes back to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/facility_job_titles");
        });

        it("logout user after tests",function () {
            test_utils.logoutUser(browser);
        });
    });
})();
