(function () {
    "use strict";

    describe("mflAdminApp scenario tests for geo code sources:", function() {

        xit("should log in as superuser and load the dashboard", function() {
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
            browser.driver.sleep(2000);
            browser.waitForAngular();
            
            expect(browser.getLocationAbsUrl()).toEqual("/");
        });

        //Creating without ability to delete hinders test from being included
        xit("should open up new geocode source screen and save geocode source", function() {
            //variables
            var gs_input_name, gs_textarea_desc,gs_save_btn;

            //navigation
            browser.get("/#/setup/geocode_sources/geocode_sources/create");
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to create

            //interaction setup
            gs_input_name = element.all(by.binding("geocode_source.name").get(1));
            gs_textarea_desc = element(by.id("gs_desc"));
            gs_save_btn = element(by.id("gs_save_btn"));

            //interations
            expect(gs_input_name.getAttribute("value")).toEqual("");
            gs_input_name.sendKeys("test_geocode_source");
            gs_textarea_desc.sendKeys("Test gecode source");
            gs_save_btn.click(); //saves geocode_source 
            browser.waitForAngular(); //navigation to list page

            //expectations
            expect(gs_input_name.getAttribute("value")).toEqual("test_geocode_source");
        });

        it("should find created geocode_source in the list generated", function() {
            //variables
            var gcName;

            //navigation
            browser.get("/#/setup/geocode_sources");
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //interaction setup
            gcName = element(by.repeater("gs in geocode_sources").row(0).column("gs.name"));

            //expectations
            expect(gcName.getText()).toEqual("ministry");
        });

        it("should go to edit view of created geocode source", function() {
            //variables
            var gcRow, view_btn, gs_input_name;

            //interation setup
            gcRow = element(by.repeater("gs in geocode_sources").row(0));
            view_btn = gcRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail page

            //expectations
            gs_input_name = element(by.name("name"));
            gs_input_name.getAttribute("value").then(function (text) {
                expect(text).toEqual("ministry");
            });
        });

        it("should edit geocode source, save and check if updated", function() {
            //variables
            var gs_input_name, gs_textarea_desc, gs_save_btn, gcNameEl;

            //setup interaction
            gs_input_name = element(by.name("name"));
            gs_input_name.getAttribute("value").then(function (text) {
                expect(text).toEqual("ministry");
            });
            gs_textarea_desc = element(by.name("description"));
            gs_save_btn = element(by.buttonText("Save"));

            //interaction
            gs_input_name.clear().then(function () {
                gs_input_name.sendKeys("ministry");
            });
            gs_textarea_desc.clear().then(function () {
                gs_textarea_desc.sendKeys("Source originating from the ministry");
            });
            expect(gs_save_btn.getText()).toEqual("Save");
            gs_save_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();//navigates to list page
            
            gcNameEl = element.all(by.repeater("gs in geocode_sources").row(0).column("gs.name"));
            expect(gcNameEl.getText()).toEqual(["ministry"]);
        });

        //Only to be added if deleted fields can be recreated
        xit("should delete geocode source from edit view",function () {
            var gs_del_btn,view_btn,del_btn,gcRow,gcName;

            //interation setup
            gcRow = element(by.repeater("gc in geocode_sources").row(0));
            view_btn = gcRow.element(by.cssContainingText(".btn","View"));

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
            expect(del_btn.getText()).toEqual("Delete");
            del_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();//goes back to list page
            gcName = element(by.repeater("gc in geocode_sources").row(0).column("gs.name"));

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/geocode_sources");
            expect(gcName.getText()).toEqual("test2_geocode_name");
        });

        xit("logout user after tests",function () {
            //variables
            var profileLink,logoutLink, title;

            profileLink = element(by.binding("name"));
            profileLink.click();
            logoutLink = element(by.partialLinkText("Log Out"));
            logoutLink.click();

            //expectations
            title = element(by.css("h2"));
            expect(title.getText()).toEqual("Master Facility List V 2.0");
        });
    });
})();
