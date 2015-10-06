(function () {
    "use strict";

    describe("mflAdminApp scenario tests for contact types:", function() {

        //variable required in test
        var test_utils = require("../../../common/tests/utils.e2e.js");
        var contact_type_desc = "description of contacts";
        var contact_type = test_utils.getRandomString(25);

        it("should log in and load the dashboard", function() {
            test_utils.loginUser(
                browser,
                browser.params.users.national_admin.username,
                browser.params.users.national_admin.password
            );
        });

        //Creating without ability to delete hinders test from being included
        it("should open up new contact type screen and save contact type", function() {
            //variables
            var contact_type_input_name, contact_type_textarea_desc,contact_type_save_btn;

            //navigation
            browser.get("/#/setup/contact_types/create");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(3000);

            //interaction setup

            contact_type_input_name = element(by.name("name"));
            contact_type_textarea_desc = element(by.name("description"));
            contact_type_save_btn = element(by.buttonText("Save"));

            //interations
            contact_type_input_name.sendKeys(contact_type);
            contact_type_textarea_desc.sendKeys(contact_type_desc);
            contact_type_save_btn.click(); //saves contact_type
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/contact_types");
        });

        it("should find created contact_type in the list generated", function() {
            //variables
            var contact_typeName;

            //navigation
            browser.get("/#/setup/contact_types");
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //interaction setup
            contact_typeName = element(by.repeater("contact_type in contact_types")
                .row(0).column("contact_type.name"));

            //expectations
            expect(contact_typeName.getText()).toEqual(contact_type);
        });

        it("should go to edit view of created contact type", function() {
            //variables
            var contact_typeRow, view_btn, contact_type_input_name;

            //interation setup
            contact_typeRow = element(by.repeater("contact_type in contact_types").row(0));
            view_btn = contact_typeRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail page

            //expectations
            contact_type_input_name = element(by.name("name"));
            contact_type_input_name.getAttribute("value").then(function (text) {
                expect(text).toEqual(contact_type);
            });
        });

        it("should edit contact type, save and check if updated", function() {
            //variables
            var contact_type_input_name, contact_type_textarea_desc, contact_type_save_btn,
                contact_typeNameEl;

            //setup interaction
            contact_type_input_name = element(by.name("name"));
            contact_type_textarea_desc = element(by.name("description"));
            contact_type_save_btn = element(by.buttonText("Save"));

            //interaction
            contact_type_input_name.clear().then(function () {
                contact_type_input_name.sendKeys(contact_type);
            });
            contact_type_textarea_desc.clear().then(function () {
                contact_type_textarea_desc.sendKeys("Describes test Contact Type for testing");
            });
            expect(contact_type_save_btn.getText()).toEqual("Save");
            contact_type_save_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();//navigates to list page

            contact_typeNameEl = element.all(by.repeater("contact_type in contact_types")
                                             .row(0).column("contact_type.name"));
            expect(contact_typeNameEl.getText()).toEqual([contact_type]);
        });

        //Only to be added if deleted fields can be recreated
        it("should delete contact type from edit view",function () {
            var contact_type_del_btn,view_btn,del_btn,contact_typeRow;

            //navigation
            browser.get("/#/setup/contact_types");
            browser.driver.sleep(1500);
            browser.waitForAngular(); //navigation to list page

            //interation setup
            contact_typeRow = element(by.repeater("contact_type in contact_types").row(0));
            view_btn = contact_typeRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail

            //interaction setup
            contact_type_del_btn = element(by.cssContainingText(".btn-danger","Delete"));

            //interaction
            contact_type_del_btn.click();
            browser.waitForAngular(); //navigation to delete page
            browser.driver.sleep(1000);

            del_btn = element(by.id("del_btn"));
            del_btn.click();
            browser.driver.sleep(1500);
            browser.waitForAngular();//goes back to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/contact_types");
        });

        iit("logout user after tests",function () {
            test_utils.logoutUser(browser);
        });
    });
})();
