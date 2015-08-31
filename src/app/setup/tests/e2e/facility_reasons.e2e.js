(function () {
    "use strict";

    describe("mflAdminApp scenario tests for facility reasons:", function() {

        //variable required in test
        var facility_reason_desc = "description of facility reason";
        var getRandomString = function (characterLength) {
            var randomText = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < characterLength; i++){
                randomText += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return randomText;
        };
        var facility_reason = getRandomString(25);

        it("should log in as superuser and load the dashboard", function() {
            //test variables
            var email, password, loginButton;

            //navigation
            browser.get("/");

            //setup interactions
            email = element(by.name("email"));
            password = element(by.name("password"));
            loginButton = element(by.id("login_btn"));

            //interations
            email.clear().then(function () {
                email.sendKeys("10000");
            });
            password.clear().then(function () {
                password.sendKeys("password1");
            });
            loginButton.click();
            browser.ignoreSynchronization = true;
            browser.driver.sleep(1000);
            browser.waitForAngular();

            expect(element(by.linkText("Home")).isPresent()).toBe(true);
        });

        //Creating without ability to delete hinders test from being included
        it("should open up new facility reason screen and save facility reason", function() {
            //variables
            var facility_reason_input_name, facility_reason_textarea_desc,facility_reason_save_btn;

            //navigation
            browser.get("/#/setup/facility_reasons/create");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(3000);

            //interaction setup

            facility_reason_input_name = element(by.name("reason"));
            facility_reason_textarea_desc = element(by.name("description"));
            facility_reason_save_btn = element(by.buttonText("Save"));

            //interations
            facility_reason_input_name.sendKeys(facility_reason);
            facility_reason_textarea_desc.sendKeys(facility_reason_desc);
            facility_reason_save_btn.click(); //saves facility_reason
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/facility_reasons");
        });

        it("should find created facility_reason in the list generated", function() {
            //variables
            var facility_reasonName;

            //navigation
            browser.get("/#/setup/facility_reasons");
            browser.driver.sleep(1000);
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
            browser.driver.sleep(1000);
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
            browser.driver.sleep(1000);
            browser.waitForAngular();//navigates to list page
            
            facility_reasonNameEl = element.all(by.repeater("reason in change_reasons")
                                             .row(0).column("reason.reason"));
            expect(facility_reasonNameEl.getText()).toEqual([facility_reason]);
        });

        //Only to be added if deleted fields can be recreated
        it("should delete facility reason from edit view",function () {
            var facility_reason_del_btn,view_btn,del_btn,facility_reasonRow;

            //navigation
            browser.get("/#/setup/facility_reasons");
            browser.driver.sleep(1500);
            browser.waitForAngular(); //navigation to list page

            //interation setup
            facility_reasonRow = element(by.repeater("reason in change_reasons").row(0));
            view_btn = facility_reasonRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail

            //interaction setup
            facility_reason_del_btn = element(by.cssContainingText(".btn-danger","Delete"));

            //interaction
            facility_reason_del_btn.click();
            browser.waitForAngular(); //navigation to delete page

            del_btn = element(by.id("del_btn"));
            del_btn.click();
            browser.driver.sleep(1500);
            browser.waitForAngular();//goes back to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/facility_reasons");
        });

        it("logout user after tests",function () {
            //variables
            var title;
            browser.get("/#/logout");
            browser.driver.sleep(1000);
            browser.waitForAngular();//goes back to login page

            //expectations
            title = element(by.css("h2"));
            expect(title.getText()).toEqual("Master Facility List V 2.0");
        });
    });
})();