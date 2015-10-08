(function () {
    "use strict";

    xdescribe("mflAdminApp scenario tests for service categories:", function() {

        var test_utils = require("../../../common/tests/utils.e2e.js");
        var category = test_utils.getRandomString(25);

        it("should log in and load the dashboard", function() {
            test_utils.loginUser(
                browser,
                browser.params.users.national_admin.username,
                browser.params.users.national_admin.password
            );
        });

        //Creating without ability to delete hinders test from being included
        it("should open up new service category screen and save service category",
        function() {
            //variables
            var category_input_name,
                category_save_btn;

            //navigation
            browser.get("/#/setup/services/categories/create/");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(1000);

            //interaction setup
            category_input_name = element(by.name("name"));
            element(by.tagName("select"))
                .element(by.cssContainingText("option", "Level 1")).click();

            category_save_btn = element(by.buttonText("Save"));

            //interations
            category_input_name.sendKeys(category);
            category_save_btn.click(); //saves category
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/services/categories/");
        });

        it("should find created category in the list generated", function() {
            //variables
            var categoryName;

            //navigation
            browser.get("/#/setup/services/categories/");
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //interaction setup
            categoryName = element(by.repeater("category in categories")
                .row(0).column("category.name"));

            //expectations
            expect(categoryName.getText()).toEqual(category);
        });

        it("should go to edit view of created service category", function() {
            //variables
            var categoryRow, view_btn, category_input_name;

            //interation setup
            categoryRow = element(by.repeater("category in categories").row(0));
            view_btn = categoryRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail page

            //expectations
            category_input_name = element(by.name("name"));
            category_input_name.getAttribute("value").then(function (text) {
                expect(text).toEqual(category);
            });
        });

        it("should edit service category, save and check if updated", function() {
            //variables
            var category_input_name, category_textarea_desc,
                category_save_btn,categoryNameEl;

            //setup interaction
            category_input_name = element(by.name("name"));
            category_textarea_desc = element(by.name("description"));
            category_save_btn = element(by.buttonText("Save"));
            category_textarea_desc = element(by.css("select"));
            category_textarea_desc.click();
            element(by.tagName("select"))
                .element(by.cssContainingText("option", "Level 2")).click();

            category_save_btn = element(by.buttonText("Save"));

            //interations
            category_input_name.clear().then(function () {
                category_input_name.sendKeys(category);
            });
            expect(category_save_btn.getText()).toEqual("Save");
            category_save_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();//navigates to list page

            categoryNameEl = element.all(by.repeater("category in categories")
                                             .row(0).column("category.name"));
            expect(categoryNameEl.getText()).toEqual([category]);
        });

        //Only to be added if deleted fields can be recreated
        it("should delete service category from edit view",function () {
            var category_del_btn,view_btn,del_btn,categoryRow;

            //navigation
            browser.get("/#/setup/services/categories/");
            browser.driver.sleep(1500);
            browser.waitForAngular(); //navigation to list page

            //interation setup
            categoryRow = element(by.repeater("category in categories").row(0));
            view_btn = categoryRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail

            //interaction setup
            category_del_btn = element(by.cssContainingText(".btn-danger","Delete"));

            //interaction
            category_del_btn.click();
            browser.waitForAngular(); //navigation to delete page
            browser.driver.sleep(1000);

            del_btn = element(by.id("del_btn"));
            del_btn.click();
            browser.driver.sleep(1500);
            browser.waitForAngular();//goes back to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/services/categories/");
        });

        it("logout user after tests",function () {
            test_utils.logoutUser(browser);
        });
    });
})();
