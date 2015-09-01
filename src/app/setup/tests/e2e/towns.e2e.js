
(function () {
    "use strict";

    describe("mflAdminApp scenario tests for towns:", function() {

        //variable required in test
        var getRandomString = function (characterLength) {
            var randomText = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < characterLength; i++){
                randomText += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return randomText;
        };
        var town = getRandomString(25);

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
        it("should open up new town screen and save town",
        function() {
            //variables
            var town_input_name,
                town_save_btn;

            //navigation
            browser.get("/#/setup/towns/create");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(3000);

            //interaction setup

            town_input_name = element(by.name("name"));
            town_save_btn = element(by.buttonText("Save"));

            //interations
            town_input_name.sendKeys(town);
            town_save_btn.click(); //saves town
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/towns");
        });

        it("should find created town in the list generated", function() {
            //variables
            var townName;

            //navigation
            browser.get("/#/setup/towns");
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //interaction setup
            townName = element(by.repeater("town in towns")
                .row(0).column("town.name"));

            //expectations
            expect(townName.getText()).toEqual(town);
        });

        it("should go to edit view of created town", function() {
            //variables
            var townRow, view_btn, town_input_name;

            //interation setup
            townRow = element(by.repeater("town in towns").row(0));
            view_btn = townRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail page

            //expectations
            town_input_name = element(by.name("name"));
            town_input_name.getAttribute("value").then(function (text) {
                expect(text).toEqual(town);
            });
        });

        it("should edit town, save and check if updated", function() {
            //variables
            var town_input_name,
                town_save_btn,townNameEl;

            //setup interaction
            town_input_name = element(by.name("name"));
            town_save_btn = element(by.buttonText("Save"));

            //interaction
            town_input_name.clear().then(function () {
                town_input_name.sendKeys(town);
            });
            expect(town_save_btn.getText()).toEqual("Save");
            town_save_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();//navigates to list page
            
            townNameEl = element.all(by.repeater("town in towns")
                                             .row(0).column("town.name"));
            expect(townNameEl.getText()).toEqual([town]);
        });

        //Only to be added if deleted fields can be recreated
        it("should delete town from edit view",function () {
            var town_del_btn,view_btn,del_btn,townRow;

            //navigation
            browser.get("/#/setup/towns");
            browser.driver.sleep(1500);
            browser.waitForAngular(); //navigation to list page

            //interation setup
            townRow = element(by.repeater("town in towns").row(0));
            view_btn = townRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail

            //interaction setup
            town_del_btn = element(by.cssContainingText(".btn-danger","Delete"));

            //interaction
            town_del_btn.click();
            browser.waitForAngular(); //navigation to delete page

            del_btn = element(by.id("del_btn"));
            del_btn.click();
            browser.driver.sleep(1500);
            browser.waitForAngular();//goes back to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/towns");
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