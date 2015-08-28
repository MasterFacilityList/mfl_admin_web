(function () {
    "use strict";

    describe("mflAdminApp scenario tests for geo code sources:", function() {

        //variable required in test
        var geocode_desc = "description of source";
        var getRandomString = function (characterLength) {
            var randomText = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < characterLength; i++){
                randomText += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return randomText;
        };
        var geocode_source = getRandomString(25);

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
        it("should open up new geocode source screen and save geocode source", function() {
            //variables
            var gs_input_name, gs_textarea_desc,gs_save_btn;

            //navigation
            browser.get("/#/setup/geocode_sources/create");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(3000);

            //interaction setup

            gs_input_name = element(by.name("name"));
            gs_textarea_desc = element(by.name("description"));
            gs_save_btn = element(by.buttonText("Save"));

            //interations
            gs_input_name.sendKeys(geocode_source);
            gs_textarea_desc.sendKeys(geocode_desc);
            gs_save_btn.click(); //saves geocode_source
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/geocode_sources");
        });

        it("should find created geocode_source in the list generated", function() {
            //variables
            var gsName;

            //navigation
            browser.get("/#/setup/geocode_sources");
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //interaction setup
            gsName = element(by.repeater("gs in geocode_sources").row(0).column("gs.name"));

            //expectations
            expect(gsName.getText()).toEqual(geocode_source);
        });

        it("should go to edit view of created geocode source", function() {
            //variables
            var gsRow, view_btn, gs_input_name;

            //interation setup
            gsRow = element(by.repeater("gs in geocode_sources").row(0));
            view_btn = gsRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail page

            //expectations
            gs_input_name = element(by.name("name"));
            gs_input_name.getAttribute("value").then(function (text) {
                expect(text).toEqual(geocode_source);
            });
        });

        it("should edit geocode source, save and check if updated", function() {
            //variables
            var gs_input_name, gs_textarea_desc, gs_save_btn, gsNameEl;

            //setup interaction
            gs_input_name = element(by.name("name"));
            gs_textarea_desc = element(by.name("description"));
            gs_save_btn = element(by.buttonText("Save"));

            //interaction
            gs_input_name.clear().then(function () {
                gs_input_name.sendKeys(geocode_source);
            });
            gs_textarea_desc.clear().then(function () {
                gs_textarea_desc.sendKeys("Describes different geocode sources "+
                                          "not included in the list");
            });
            expect(gs_save_btn.getText()).toEqual("Save");
            gs_save_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();//navigates to list page
            
            gsNameEl = element.all(by.repeater("gs in geocode_sources").row(0).column("gs.name"));
            expect(gsNameEl.getText()).toEqual([geocode_source]);
        });

        //Only to be added if deleted fields can be recreated
        it("should delete geocode source from edit view",function () {
            var gs_del_btn,view_btn,del_btn,gsRow;

            //navigation
            browser.get("/#/setup/geocode_sources");
            browser.driver.sleep(1500);
            browser.waitForAngular(); //navigation to list page

            //interation setup
            gsRow = element(by.repeater("gs in geocode_sources").row(0));
            view_btn = gsRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail

            //interaction setup
            gs_del_btn = element(by.cssContainingText(".btn-danger","Delete"));

            //interaction
            gs_del_btn.click();
            browser.waitForAngular(); //navigation to delete page

            del_btn = element(by.id("del_btn"));
            del_btn.click();
            browser.driver.sleep(1500);
            browser.waitForAngular();//goes back to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/geocode_sources");
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
