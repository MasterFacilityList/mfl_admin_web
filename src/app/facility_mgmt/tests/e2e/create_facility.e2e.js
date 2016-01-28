(function () {
    "use strict";

    xdescribe("mflAdminApp scenario tests for creating facility:", function() {

        //variable required in test
        var test_utils = require("../../../common/tests/utils.e2e.js");
        var facility = test_utils.getRandomString(25);
        var enter = browser.actions().sendKeys(protractor.Key.ENTER);

        it("should log in as starehe schrio and load the dashboard", function() {
            test_utils.loginUser(
                browser,
                browser.params.users.schrio.username,
                browser.params.users.schrio.password
            );
        });

        it("should fill in new facility screen | basic details", function() {

            //navigation
            browser.get("/#/facility_list/create/basic/?furthest=1");
            browser.driver.sleep(browser.params.page_timeout);

            var official_name = element(by.name("official_name"));
            official_name.clear().then(function () {
                official_name.sendKeys(facility);
            });

            var name = element(by.name("name"));
            name.clear().then(function () {
                name.sendKeys(facility);
            });

            var facility_type_details = element(by.model("select_values.facility_type_details"));
            facility_type_details.element(by.css(".caret")).click();
            var facility_type_details_input = facility_type_details
                                                .element(by.css(".ui-select-search"));
            facility_type_details_input.sendKeys("Radiology Unit");
            enter.perform();


            var facility_type = element(by.model("select_values.facility_type"));
            facility_type.element(by.css(".caret")).click();
            var facility_type_input = facility_type
                                                .element(by.css(".ui-select-search"));
            facility_type_input.sendKeys("Radiology Unit");
            enter.perform();

            var facility_operation_status = element(by.model("select_values.operation_status"));
            facility_operation_status.element(by.css(".caret")).click();
            var facility_operation_status_input = facility_operation_status
                                                .element(by.css(".ui-select-search"));
            facility_operation_status_input.sendKeys("Not-Operational");
            enter.perform();

            var facility_owner_type = element(by.model("select_values.owner_type"));
            facility_owner_type.element(by.css(".caret")).click();
            var facility_owner_type_input = facility_owner_type
                                                .element(by.css(".ui-select-search"));
            facility_owner_type_input.sendKeys("Ministry of Health");
            enter.perform();

            var facility_owner = element(by.model("select_values.owner"));
            facility_owner.element(by.css(".caret")).click();
            var facility_owner_input = facility_owner
                                                .element(by.css(".ui-select-search"));
            facility_owner_input.sendKeys("Ministry of Health");
            enter.perform();

            var facility_regulatory_body = element(by.model("select_values.regulatory_body"));
            facility_regulatory_body.element(by.css(".caret")).click();
            var facility_regulatory_body_input = facility_regulatory_body
            .element(by.css(".ui-select-search"));
            facility_regulatory_body_input.sendKeys("Ministry of Health");
            enter.perform();

            element(by.name("number_of_beds")).sendKeys("3");
            element(by.name("number_of_cots")).sendKeys("2");

            var facility_ward = element(by.model("select_values.ward"));
            facility_ward.element(by.css(".caret")).click();
            var facility_ward_input = facility_ward
                                                .element(by.css(".ui-select-search"));
            facility_ward_input.sendKeys("HOSPITAL");
            enter.perform();


            element(by.name("officer_name")).sendKeys(facility);
            element(by.name("reg_number")).sendKeys(facility);

            element(by.model("facility.officer_in_charge.title"))
                .element(by.cssContainingText("option", "Doctor In Charge")).click();

            element(by.model("cont.type"))
                .element(by.cssContainingText("option", "MOBILE")).click();

            element(by.name("contact")).sendKeys(facility);

            var geolocationBtn = element(by.partialButtonText("Geolocation"));
            expect(geolocationBtn.getText()).toEqual("Geolocation");
            geolocationBtn.click();

            //interations
            browser.waitForAngular();
            browser.driver.sleep(browser.params.page_timeout);

            //expectations
            expect(element(by.css("h4")).getText()).toEqual("Geolocation Details");
        });

        it("should fill in new facility screen | geolocation details",function () {
            browser.refresh();
            browser.waitForAngular();
            browser.driver.sleep(browser.params.page_timeout);

            var contactsBtn = element(by.partialButtonText("Facility Contacts"));
            expect(contactsBtn.getText()).toEqual("Facility Contacts");
            contactsBtn.click();

            browser.waitForAngular();
            browser.driver.sleep(browser.params.page_timeout);

            //expectations
            expect(element(by.css("h4")).getText()).toEqual("Facility Contact");
        });

        it("should fill in new facility screen | facility contacts",function () {
            element(by.name("cont_fac.type"))
                .element(by.cssContainingText("option", "MOBILE")).click();

            element(by.model("fac_cont.contact")).sendKeys(facility);

            var contactsBtn = element(by.buttonText("Regulation"));
            expect(contactsBtn.getText()).toEqual("Regulation");
            contactsBtn.click();

            //interations
            browser.waitForAngular();
            browser.driver.sleep(browser.params.page_timeout);

            //expectations
            expect(element(by.css("h4")).getText()).toEqual("Facility Regulation");
        });

        it("should fill in new facility screen | facility regulation",function () {
            element(by.linkText("Add")).click();
            element.all(by.name("department_name")).first()
                .element(by.cssContainingText("option", "Optical")).click();

            element(by.linkText("Facility Services")).click();

            //interations
            browser.waitForAngular();
            browser.driver.sleep(browser.params.page_timeout);

            //expectations
            expect(element.all(by.css("h4")).first().getText()).toEqual("Categories");
        });

        it("should fill in new facility screen | facility services",function () {
            element(by.model("category.query")).sendKeys("hiv");
            element(by.cssContainingText("span", "HIV/AIDS Services - Treatment and Care")).click();

            element.all(by.css("input[type='checkbox']")).click();

            browser.waitForAngular();
            browser.driver.sleep(browser.params.page_timeout);

            element(by.buttonText("Submit")).click();
            browser.waitForAngular();
            browser.driver.sleep(browser.params.page_timeout);

            element(by.css("h3")).getText().then(function (x) {
                expect(x.indexOf(" | "+facility.toUpperCase())).not.toEqual(-1);
            });
        });

        it("logout user after tests",function () {
            test_utils.logoutUser(browser);
        });
    });
})();
