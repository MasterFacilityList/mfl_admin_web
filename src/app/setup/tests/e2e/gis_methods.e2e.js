(function () {
    "use strict";

    describe("mflAdminApp scenario tests for geo code methods:", function() {

        //variable required in test
        var test_utils = require("../../../common/tests/utils.e2e.js");
        var geocode_desc = "description of method";
        var geocode_method = test_utils.getRandomString(25);

        it("should log in and load the dashboard", function() {
            test_utils.loginUser(
                browser,
                browser.params.users.national_admin.username,
                browser.params.users.national_admin.password
            );
        });

        //Creating without ability to delete hinders test from being included
        it("should open up new geocode method screen and save geocode method", function() {
            //variables
            var gm_input_name, gm_textarea_desc,gm_save_btn;

            //navigation
            browser.get("/#/setup/geocode_methods/create");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(3000);

            //interaction setup

            gm_input_name = element(by.name("name"));
            gm_textarea_desc = element(by.name("description"));
            gm_save_btn = element(by.buttonText("Save"));

            //interations
            gm_input_name.sendKeys(geocode_method);
            gm_textarea_desc.sendKeys(geocode_desc);
            gm_save_btn.click(); //saves geocode_method
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/geocode_methods");
        });

        it("should find created geocode_method in the list generated", function() {
            //variables
            var gmName;

            //navigation
            browser.get("/#/setup/geocode_methods");
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //interaction setup
            gmName = element(by.repeater("gm in geocode_methods").row(0).column("gm.name"));

            //expectations
            expect(gmName.getText()).toEqual(geocode_method);
        });

        it("should go to edit view of created geocode method", function() {
            //variables
            var gmRow, view_btn, gm_input_name;

            //interation setup
            gmRow = element(by.repeater("gm in geocode_methods").row(0));
            view_btn = gmRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail page

            //expectations
            gm_input_name = element(by.name("name"));
            gm_input_name.getAttribute("value").then(function (text) {
                expect(text).toEqual(geocode_method);
            });
        });

        it("should edit geocode method, save and check if updated", function() {
            //variables
            var gm_input_name, gm_textarea_desc, gm_save_btn, gmNameEl;

            //setup interaction
            gm_input_name = element(by.name("name"));
            gm_textarea_desc = element(by.name("description"));
            gm_save_btn = element(by.buttonText("Save"));

            //interaction
            gm_input_name.clear().then(function () {
                gm_input_name.sendKeys(geocode_method);
            });
            gm_textarea_desc.clear().then(function () {
                gm_textarea_desc.sendKeys("Describes different geocode methods "+
                                          "not included in the list");
            });
            expect(gm_save_btn.getText()).toEqual("Save");
            gm_save_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();//navigates to list page

            gmNameEl = element.all(by.repeater("gm in geocode_methods").row(0).column("gm.name"));
            expect(gmNameEl.getText()).toEqual([geocode_method]);
        });

        //Only to be added if deleted fields can be recreated
        it("should delete geocode method from edit view",function () {
            var gm_del_btn,view_btn,del_btn,gmRow;

            //navigation
            browser.get("/#/setup/geocode_methods");
            browser.driver.sleep(1500);
            browser.waitForAngular(); //navigation to list page

            //interation setup
            gmRow = element(by.repeater("gm in geocode_methods").row(0));
            view_btn = gmRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail

            //interaction setup
            gm_del_btn = element(by.cssContainingText(".btn-danger","Delete"));

            //interaction
            gm_del_btn.click();
            browser.waitForAngular(); //navigation to delete page
            browser.driver.sleep(1000);

            del_btn = element(by.id("del_btn"));
            del_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();//goes back to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/geocode_methods");
        });

        it("logout user after tests",function () {
            test_utils.logoutUser(browser);
        });
    });
})();
