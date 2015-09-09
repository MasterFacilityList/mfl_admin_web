
(function () {
    "use strict";

    describe("mflAdminApp scenario test for sub counties", function () {

        //variables required in test
        var getRandomString = function (characterLength) {
            var randomText = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < characterLength; i++) {
                randomText += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return randomText;
        };
        var sub_county = getRandomString(25);
        it("should log in as superuser and load the dashbaord", function () {
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
        it("should open up new sub county screen and save a sub-county", function () {
            var subcounty_input_name, subcounty_save_btn;

            //navigation
            browser.get("/#/setup/sub_counties/create");
            //navigation to create
            browser.driver.sleep(1000);

            //interaction setup
            subcounty_input_name = element(by.name("name"));
            element(by.tagName("select"))
                .element(by.cssContainingText("option", "NAIROBI")).click();

            subcounty_save_btn = element(by.buttonText("Save"));

            //interations
            subcounty_input_name.sendKeys(sub_county);
            subcounty_save_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();

            //exceptions
            expect(browser.getLocationAbsUrl()).toEqual("/setup/sub_counties");
        });
    });
})();
