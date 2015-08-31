(function () {
    "use strict";

    describe("mflAdminApp scenario tests for facility keph levels:", function() {

        //variable required in test
        var facility_keph_desc = "description of facility keph level";
        var getRandomString = function (characterLength) {
            var randomText = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < characterLength; i++){
                randomText += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return randomText;
        };
        var facility_keph = getRandomString(25);

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
        it("should open up new facility keph level screen and save facility keph level",
        function() {
            //variables
            var facility_keph_input_name, facility_keph_textarea_desc,
                facility_keph_save_btn;

            //navigation
            browser.get("/#/setup/facility_kephs/create");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(3000);

            //interaction setup

            facility_keph_input_name = element(by.name("name"));
            facility_keph_textarea_desc = element(by.name("description"));
            facility_keph_save_btn = element(by.buttonText("Save"));

            //interations
            facility_keph_input_name.sendKeys(facility_keph);
            facility_keph_textarea_desc.sendKeys(facility_keph_desc);
            facility_keph_save_btn.click(); //saves facility_keph
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/facility_kephs");
        });

        it("should find created facility_keph in the list generated", function() {
            //variables
            var facility_kephName;

            //navigation
            browser.get("/#/setup/facility_kephs");
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //interaction setup
            facility_kephName = element(by.repeater("keph in kephs")
                .row(0).column("keph.name"));

            //expectations
            expect(facility_kephName.getText()).toEqual(facility_keph);
        });

        it("should go to edit view of created facility keph level", function() {
            //variables
            var facility_kephRow, view_btn, facility_keph_input_name;

            //interation setup
            facility_kephRow = element(by.repeater("keph in kephs").row(0));
            view_btn = facility_kephRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail page

            //expectations
            facility_keph_input_name = element(by.name("name"));
            facility_keph_input_name.getAttribute("value").then(function (text) {
                expect(text).toEqual(facility_keph);
            });
        });

        it("should edit facility keph level, save and check if updated", function() {
            //variables
            var facility_keph_input_name, facility_keph_textarea_desc,
                facility_keph_save_btn,facility_kephNameEl;

            //setup interaction
            facility_keph_input_name = element(by.name("name"));
            facility_keph_textarea_desc = element(by.name("description"));
            facility_keph_save_btn = element(by.buttonText("Save"));

            //interaction
            facility_keph_input_name.clear().then(function () {
                facility_keph_input_name.sendKeys(facility_keph);
            });
            facility_keph_textarea_desc.clear().then(function () {
                facility_keph_textarea_desc.sendKeys("Describes test facility keph level "+
                                                       "for testing");
            });
            expect(facility_keph_save_btn.getText()).toEqual("Save");
            facility_keph_save_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();//navigates to list page
            
            facility_kephNameEl = element.all(by.repeater("keph in kephs")
                                             .row(0).column("keph.name"));
            expect(facility_kephNameEl.getText()).toEqual([facility_keph]);
        });

        //Only to be added if deleted fields can be recreated
        it("should delete facility keph level from edit view",function () {
            var facility_keph_del_btn,view_btn,del_btn,facility_kephRow;

            //navigation
            browser.get("/#/setup/facility_kephs");
            browser.driver.sleep(1500);
            browser.waitForAngular(); //navigation to list page

            //interation setup
            facility_kephRow = element(by.repeater("keph in kephs").row(0));
            view_btn = facility_kephRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail

            //interaction setup
            facility_keph_del_btn = element(by.cssContainingText(".btn-danger","Delete"));

            //interaction
            facility_keph_del_btn.click();
            browser.waitForAngular(); //navigation to delete page

            del_btn = element(by.id("del_btn"));
            del_btn.click();
            browser.driver.sleep(1500);
            browser.waitForAngular();//goes back to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/facility_kephs");
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