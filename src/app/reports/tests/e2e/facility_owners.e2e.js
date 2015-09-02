(function () {
    "use strict";

    describe("mflAdminApp scenario tests for facility owner report:", function() {

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

        it("should open up facility owner reports", function() {

            //navigation
            browser.get("/#/reports/facility_owners");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(3000);

            //expectations
            expect(element(by.repeater("owner in owner_facilities")).isPresent()).toBe(true);
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