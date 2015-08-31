(function () {
    "use strict";

    describe("mflAdminApp scenario tests for facility owner categories:", function() {

        //variable required in test
        var facilityOwnerType_desc = "description of facility owner category";
        var getRandomString = function (characterLength) {
            var randomText = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < characterLength; i++){
                randomText += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return randomText;
        };
        var facilityOwnerType = getRandomString(25);

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
        it("should open up new facility owner category screen and save facility owner category",
        function() {
            //variables
            var facilityOwnerType_input_name, facilityOwnerType_textarea_desc,
                facilityOwnerType_save_btn;

            //navigation
            browser.get("/#/setup/facility_owners_types/create");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(3000);

            //interaction setup

            facilityOwnerType_input_name = element(by.name("name"));
            facilityOwnerType_textarea_desc = element(by.name("description"));
            facilityOwnerType_save_btn = element(by.buttonText("Save"));

            //interations
            facilityOwnerType_input_name.sendKeys(facilityOwnerType);
            facilityOwnerType_textarea_desc.sendKeys(facilityOwnerType_desc);
            facilityOwnerType_save_btn.click(); //saves facilityOwnerType
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/facility_owners_types");
        });

        it("should find created facilityOwnerType in the list generated", function() {
            //variables
            var facilityOwnerTypeName;

            //navigation
            browser.get("/#/setup/facility_owners_types");
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //interaction setup
            facilityOwnerTypeName = element(by.repeater("ownerType in facilityOwnerTypes")
                .row(0).column("ownerType.name"));

            //expectations
            expect(facilityOwnerTypeName.getText()).toEqual(facilityOwnerType);
        });

        it("should go to edit view of created facility owner category", function() {
            //variables
            var facilityOwnerTypeRow, view_btn, facilityOwnerType_input_name;

            //interation setup
            facilityOwnerTypeRow = element(by.repeater("ownerType in facilityOwnerTypes").row(0));
            view_btn = facilityOwnerTypeRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail page

            //expectations
            facilityOwnerType_input_name = element(by.name("name"));
            facilityOwnerType_input_name.getAttribute("value").then(function (text) {
                expect(text).toEqual(facilityOwnerType);
            });
        });

        it("should edit facility owner category, save and check if updated", function() {
            //variables
            var facilityOwnerType_input_name, facilityOwnerType_textarea_desc,
                facilityOwnerType_save_btn,facilityOwnerTypeNameEl;

            //setup interaction
            facilityOwnerType_input_name = element(by.name("name"));
            facilityOwnerType_textarea_desc = element(by.name("description"));
            facilityOwnerType_save_btn = element(by.buttonText("Save"));

            //interaction
            facilityOwnerType_input_name.clear().then(function () {
                facilityOwnerType_input_name.sendKeys(facilityOwnerType);
            });
            facilityOwnerType_textarea_desc.clear().then(function () {
                facilityOwnerType_textarea_desc.sendKeys("Describes test facility owner category "+
                                                       "for testing");
            });
            expect(facilityOwnerType_save_btn.getText()).toEqual("Save");
            facilityOwnerType_save_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();//navigates to list page
            
            facilityOwnerTypeNameEl = element.all(by.repeater("ownerType in facilityOwnerTypes")
                                             .row(0).column("ownerType.name"));
            expect(facilityOwnerTypeNameEl.getText()).toEqual([facilityOwnerType]);
        });

        //Only to be added if deleted fields can be recreated
        it("should delete facility owner category from edit view",function () {
            var facilityOwnerType_del_btn,view_btn,del_btn,facilityOwnerTypeRow;

            //navigation
            browser.get("/#/setup/facility_owners_types");
            browser.driver.sleep(1500);
            browser.waitForAngular(); //navigation to list page

            //interation setup
            facilityOwnerTypeRow = element(by.repeater("ownerType in facilityOwnerTypes").row(0));
            view_btn = facilityOwnerTypeRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail

            //interaction setup
            facilityOwnerType_del_btn = element(by.cssContainingText(".btn-danger","Delete"));

            //interaction
            facilityOwnerType_del_btn.click();
            browser.waitForAngular(); //navigation to delete page

            del_btn = element(by.id("del_btn"));
            del_btn.click();
            browser.driver.sleep(1500);
            browser.waitForAngular();//goes back to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/facility_owners_types");
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