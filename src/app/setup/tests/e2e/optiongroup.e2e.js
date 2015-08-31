(function () {
    "use strict";

    describe("mflAdminApp scenario tests for service option groups:", function() {

        //variable required in test
        var getRandomString = function (characterLength) {
            var randomText = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < characterLength; i++){
                randomText += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return randomText;
        };
        var optionGroup = getRandomString(25);

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
        it("should open up new option group screen and save option group",
        function() {
            //variables
            var optionGroup_input_name,optionGroup_input_name2,
                optionGroup_option,optionGroup_save_btn,optionGroup_input_value;

            //navigation
            browser.get("/#/setup/services/optiongroups/create/");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(3000);

            //interaction setup
            optionGroup_input_name = element(by.name("name"));
            optionGroup_input_name2 = element(by.name("display_text"));
            optionGroup_input_value = element(by.name("value"));

            optionGroup_input_name.sendKeys(optionGroup);
            optionGroup_input_name2.sendKeys(optionGroup);
            optionGroup_input_value.sendKeys(optionGroup);
            //workaround for clicking selects in protractor
            optionGroup_option = element(by.css( "select option[value='BOOLEAN']"));
            optionGroup_option.click();
            optionGroup_save_btn = element(by.buttonText("Save"));

            optionGroup_option.click();
            optionGroup_save_btn.click(); //saves optionGroup
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/services/optiongroups/");
        });

        it("should find created option group in the list generated", function() {
            //variables
            var optionGroupName;

            //navigation
            browser.get("/#/setup/services/optiongroups/");
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //interaction setup
            optionGroupName = element(by.repeater("opt_grp in option_groups")
                .row(0).column("opt_grp.name"));

            //expectations
            expect(optionGroupName.getText()).toEqual(optionGroup);
        });

        it("should go to edit view of created option group", function() {
            //variables
            var optionGroupRow, view_btn, optionGroup_input_name;

            //interation setup
            optionGroupRow = element(by.repeater("opt_grp in option_groups").row(0));
            view_btn = optionGroupRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail page

            //expectations
            optionGroup_input_name = element(by.name("display_text"));
            optionGroup_input_name.getAttribute("value").then(function (text) {
                expect(text).toEqual(optionGroup);
            });
        });

        it("should edit option group, save and check if updated", function() {
            //variables
            var optionGroup_input_name,optionGroup_input_name2,
                optionGroup_option,optionGroup_save_btn,optionGroupNameEl;

            //setup interaction
            optionGroup_input_name = element(by.name("name"));
            optionGroup_input_name2 = element(by.name("display_text"));
            optionGroup_save_btn = element(by.buttonText("Save"));
            optionGroup_save_btn = element(by.buttonText("Save"));

            optionGroup_option = element(by.css( "select option[value='BOOLEAN']"));

            //interations
            optionGroup_option.click();
            optionGroup_input_name.clear().then(function () {
                optionGroup_input_name.sendKeys(optionGroup);
            });
            expect(optionGroup_save_btn.getText()).toEqual("Save");
            optionGroup_save_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();//navigates to list page
            
            optionGroupNameEl = element.all(by.repeater("opt_grp in option_groups")
                                             .row(0).column("opt_grp.name"));
            expect(optionGroupNameEl.getText()).toEqual([optionGroup]);
        });

        //Only to be added if deleted fields can be recreated
        xit("should delete option group from edit view",function () {
            var optionGroup_del_btn,view_btn,del_btn,optionGroupRow;

            //navigation
            browser.get("/#/setup/services/optiongroups/");
            browser.driver.sleep(1500);
            browser.waitForAngular(); //navigation to list page

            //interation setup
            optionGroupRow = element(by.repeater("opt_grp in option_groups").row(0));
            view_btn = optionGroupRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail

            //interaction setup
            optionGroup_del_btn = element(by.cssContainingText(".btn-danger","Delete"));

            //interaction
            optionGroup_del_btn.click();
            browser.waitForAngular(); //navigation to delete page

            del_btn = element(by.id("del_btn"));
            del_btn.click();
            browser.driver.sleep(1500);
            browser.waitForAngular();//goes back to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/services/optiongroups/");
        });

        xit("logout user after tests",function () {
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