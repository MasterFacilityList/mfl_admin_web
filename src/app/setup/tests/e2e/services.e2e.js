(function () {
    "use strict";

    xdescribe("mflAdminApp scenario tests for services:", function() {

        //variable required in test
        var test_utils = require("../../../common/tests/utils.e2e.js");
        var service = test_utils.getRandomString(25);

        it("should log in and load the dashboard", function() {
            test_utils.loginUser(
                browser,
                browser.params.users.national_admin.username,
                browser.params.users.national_admin.password
            );
        });

        //Creating without ability to delete hinders test from being included
        it("should open up new service screen and save service",
        function() {
            //variables
            var service_input_name, service_input_options, service_save_btn;

            //navigation
            browser.get("/#/setup/services/services/create/basic/?furthest=1");
            browser.waitForAngular(); //navigation to create
            browser.driver.sleep(3000);

            //interaction setup
            service_input_name = element(by.name("name"));
            service_input_options = element(by.name("has_options"));
            service_save_btn = element(by.buttonText("Save"));

            service_input_name.sendKeys(service);
            service_input_options.click();
            //workaround for clicking selects in protractor
            element(by.model("service.category"))
                .element(by.cssContainingText("option", "Ambulance Services")).click();
            element(by.model("service.group"))
                .element(by.cssContainingText("option", "Keph Level based options")).click();

            service_save_btn.click(); //saves service
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/services/services/");
        });

        it("should find created service in the list generated", function() {
            //variables
            var serviceName;

            //navigation
            browser.get("/#/setup/services/services/");
            browser.driver.sleep(1000);
            browser.waitForAngular(); //navigation to list page

            //interaction setup
            serviceName = element(by.repeater("service in services")
                .row(0).column("service.name"));

            //expectations
            expect(serviceName.getText()).toEqual(service);
        });

        it("should go to edit view of created service", function() {
            //variables
            var serviceRow, view_btn, service_input_name;

            //interation setup
            serviceRow = element(by.repeater("service in services").row(0));
            view_btn = serviceRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail page

            //expectations
            service_input_name = element(by.name("name"));
            service_input_name.getAttribute("value").then(function (text) {
                expect(text).toEqual(service);
            });
        });

        it("should edit service, save and check if updated", function() {
            //variables
            var service_input_name,service_save_btn,serviceNameEl;

            //interaction setup
            service_input_name = element(by.name("name"));
            service_save_btn = element(by.buttonText("Save"));

            service_input_name.clear().then(function () {
                service_input_name.sendKeys(service);
            });
            //workaround for clicking selects in protractor
            element(by.model("service.category"))
                .element(by.cssContainingText("option", "Curative Services")).click();
            element(by.model("service.group"))
                .element(by.cssContainingText("option", "Basic Comprehensive Options")).click();

            service_save_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();//navigates to list page

            serviceNameEl = element.all(by.repeater("service in services")
                                             .row(0).column("service.name"));
            expect(serviceNameEl.getText()).toEqual([service]);
        });

        //Only to be added if deleted fields can be recreated
        it("should delete service from edit view",function () {
            var service_del_btn,view_btn,del_btn,serviceRow;

            //navigation
            browser.get("/#/setup/services/services/");
            browser.driver.sleep(1500);
            browser.waitForAngular(); //navigation to list page

            //interation setup
            serviceRow = element(by.repeater("service in services").row(0));
            view_btn = serviceRow.element(by.cssContainingText(".btn","View"));

            //interaction
            view_btn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();  //navigation to detail

            //interaction setup
            service_del_btn = element(by.cssContainingText(".btn-danger","Delete"));

            //interaction
            service_del_btn.click();
            browser.waitForAngular(); //navigation to delete page
            browser.driver.sleep(1000);

            del_btn = element(by.id("del_btn"));
            del_btn.click();
            browser.driver.sleep(1500);
            browser.waitForAngular();//goes back to list page

            //expectations
            expect(browser.getLocationAbsUrl()).toEqual("/setup/services/services/");
        });

        it("logout user after tests",function () {
            test_utils.logoutUser(browser);
        });
    });
})();
