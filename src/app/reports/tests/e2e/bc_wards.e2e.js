(function () {
    "use strict";

    describe("mflAdminApp scenario tests for beds and cots by ward report:", function() {

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

        it("should open up beds and cots wards reports", function() {

            //navigation
            browser.get("/#/reports/beds_cots_wards");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(2000);

            //expectations
            var ward = element(by.repeater("ward in ward_bc").row(1));
            expect(ward.isPresent()).toBe(true);
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