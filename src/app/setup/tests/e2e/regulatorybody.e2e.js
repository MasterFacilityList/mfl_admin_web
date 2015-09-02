(function () {
    "use strict";

    describe("mflAdminApp scenario tests for facility regulatory bodies:", function() {

        //variable required in test
        var facility_regulatory_body_desc = "description of facility regulatory body";
        var getRandomString = function (characterLength) {
            var randomText = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < characterLength; i++){
                randomText += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return randomText;
        };
        var facility_regulatory_body = getRandomString(25);

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
        it("should open up new facility regulatory body screen and save facility regulatory body",
        function() {
            //variables
            var facility_regulatory_body_input_name, facility_regulatory_body_textarea_desc,
                facility_regulatory_body_save_btn;

            //navigation
            browser.get("/#/setup/facility_regulatory_bodies/create");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(3000);

            //interaction setup

            facility_regulatory_body_input_name = element(by.name("name"));
            facility_regulatory_body_textarea_desc = element(by.name("regulation_verb"));
            facility_regulatory_body_save_btn = element(by.buttonText("Save"));

            //interations
            facility_regulatory_body_input_name.sendKeys(facility_regulatory_body);
            facility_regulatory_body_textarea_desc.sendKeys(facility_regulatory_body_desc);
            element(by.tagName("select"))
                .element(by.cssContainingText("option", "LANDLINE")).click();
            element(by.model("contact.contact")).sendKeys(facility_regulatory_body);
            facility_regulatory_body_save_btn.click(); //saves facility_regulatory_body
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/facility_regulatory_bodies");
        });

        it("should find created facility_regulatory_body in the list generated", function() {
            //variables
            var facility_regulatory_bodyName;

            //navigation
            browser.get("/#/setup/facility_regulatory_bodies");
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //interaction setup
            facility_regulatory_bodyName = element(by.repeater("body in regulatingBodies")
                .row(0).column("body.name"));

            //expectations
            expect(facility_regulatory_bodyName.getText()).toEqual(facility_regulatory_body);
        });

        it("should go to edit view of created facility regulatory body", function() {
            //variables
            var facility_regulatory_bodyRow, view_btn, facility_regulatory_body_input_name;

            //interation setup
            facility_regulatory_bodyRow = element(by.repeater("body in regulatingBodies").row(0));
            view_btn = facility_regulatory_bodyRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail page

            //expectations
            facility_regulatory_body_input_name = element(by.name("name"));
            facility_regulatory_body_input_name.getAttribute("value").then(function (text) {
                expect(text).toEqual(facility_regulatory_body);
            });
        });

        it("should edit facility regulatory body, save and check if updated", function() {
            //variables
            var facility_regulatory_body_input_name, facility_regulatory_body_textarea_desc,
                facility_regulatory_body_save_btn,facility_regulatory_bodyNameEl;

            //setup interaction
            facility_regulatory_body_input_name = element(by.name("name"));
            facility_regulatory_body_textarea_desc = element(by.name("regulation_verb"));
            facility_regulatory_body_save_btn = element(by.buttonText("Save"));

            //interaction
            facility_regulatory_body_input_name.clear().then(function () {
                facility_regulatory_body_input_name.sendKeys(facility_regulatory_body);
            });
            facility_regulatory_body_textarea_desc.clear().then(function () {
                facility_regulatory_body_textarea_desc.sendKeys("Describes test facility "+
                                                    "regulatory body for testing");
            });
            expect(facility_regulatory_body_save_btn.getText()).toEqual("Save");
            facility_regulatory_body_save_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();//navigates to list page
            
            facility_regulatory_bodyNameEl = element.all(by.repeater("body in regulatingBodies")
                                             .row(0).column("body.name"));
            expect(facility_regulatory_bodyNameEl.getText()).toEqual([facility_regulatory_body]);
        });

        //Only to be added if deleted fields can be recreated
        it("should delete facility regulatory body from edit view",function () {
            var facility_regulatory_body_del_btn,view_btn,del_btn,facility_regulatory_bodyRow;

            //navigation
            browser.get("/#/setup/facility_regulatory_bodies");
            browser.driver.sleep(1500);
            browser.waitForAngular(); //navigation to list page

            //interation setup
            facility_regulatory_bodyRow = element(by.repeater("body in regulatingBodies").row(0));
            view_btn = facility_regulatory_bodyRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail

            //interaction setup
            facility_regulatory_body_del_btn = element(by.cssContainingText(".btn-danger",
                                                                            "Delete"));

            //interaction
            facility_regulatory_body_del_btn.click();
            browser.waitForAngular(); //navigation to delete page

            del_btn = element(by.id("del_btn"));
            del_btn.click();
            browser.driver.sleep(1500);
            browser.waitForAngular();//goes back to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/facility_regulatory_bodies");
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