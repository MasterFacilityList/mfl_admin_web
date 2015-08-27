(function () {
    "use strict";

    describe("mflAdminApp scenario tests for geo code screens:", function() {

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
            
            expect(browser.getLocationAbsUrl()).toEqual("/");
        });

        xit("should open up new geocode method screen and save geocode method", function() {
            //variables
            var gm_input_name, gm_textarea_desc,gm_save_btn;

            //navigation
            browser.get("/#/setup/geocode_methods/create");
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to create

            //interaction setup
            gm_input_name = element(by.id("gm_name"));
            gm_textarea_desc = element(by.id("gm_desc"));
            gm_save_btn = element(by.id("gm_save_btn"));

            //interations
            expect(gm_input_name.getAttribute("value")).toEqual("");
            gm_input_name.sendKeys("test_geocode_method");
            gm_textarea_desc.sendKeys("Test gecode method");
            gm_save_btn.click(); //saves geocode_method
            

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/#/setup/geocode_methods");
            expect(gm_input_name.getAttribute("value")).toEqual("");
        });

        it("should find created geocode_method in the list generated", function() {
            //variables
            var gmName;

            //navigation
            browser.get("/#/setup/geocode_methods");
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list

            //interaction setup
            gmName = element(by.repeater("gm in geocode_methods").row(0).column("gm.name"));

            //expectations
            expect(gmName.getText()).toEqual("test2_geocode_name");
        });

        it("should go to edit view of created geocode method", function() {
            //variables
            var gmRow, view_btn, gm_input_name;

            //interation setup
            gmRow = element(by.repeater("gm in geocode_methods").row(0));
            view_btn = gmRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.waitForAngular();  //navigation to detail

            //expectations
            gm_input_name = element(by.id("gm_name"));
            gm_input_name.getAttribute("value").then(function (text) {
                expect(text).toEqual("test2_geocode_name");
            });
        });

        it("should edit geocode method, save and check if updated", function() {
            //variables
            var gm_input_name,gm_save_btn, gmName;

            //setup interaction
            gm_input_name = element(by.id("gm_name"));
            gm_save_btn = element(by.id("gm_save_btn"));

            //interaction
            gm_input_name.clear().then(function () {
                gm_input_name.sendKeys("test2_geocode_name");
            });
            gm_save_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();
            
            expect(browser.getLocationAbsUrl()).toEqual("/setup/geocode_methods");
            gmName = element(by.repeater("gm in geocode_methods").row(0).column("gm.name"));
            expect(gmName.getText()).toEqual("test2_geocode_name");
        });

        it("should delete geocode method from edit view",function () {
            var gm_del_btn,view_btn,del_btn,gmRow,gmName;

            //navigation
            browser.get("/#/setup/geocode_methods");
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list

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
            browser.waitForAngular(); //delete page loads

            del_btn = element(by.id("del_btn"));
            expect(del_btn.getText()).toEqual("Delete");
            del_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();

            expect(browser.getLocationAbsUrl()).toEqual("/setup/geocode_methods");
            gmName = element(by.repeater("gm in geocode_methods").row(0).column("gm.name"));
            expect(gmName.getText()).toEqual("test2_geocode_name");
        });
    });
})();
