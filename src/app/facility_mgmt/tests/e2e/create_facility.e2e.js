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
            browser.get("/#/facilities/create/basic/?furthest=1");
            browser.driver.sleep(1000);

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
            browser.driver.sleep(1000);
            browser.waitForAngular();

            //expectations
            expect(element(by.css("h4")).getText()).toEqual("Geolocation Details");
        });

        it("should fill in new facility screen | geolocation details",function () {
            browser.refresh();
            browser.driver.sleep(1000);
            browser.waitForAngular();

            var geo_source = element(by.name("source"));
            geo_source.element(by.css(".caret")).click();
            var geo_source_input = geo_source.element(by.css(".ui-select-search"));
            geo_source_input.sendKeys("SARAM");
            enter.perform();

            var geo_method = element(by.model("select_values.method"));
            geo_method.element(by.css(".caret")).click();
            var geo_method_input = geo_method.element(by.css(".ui-select-search"));
            geo_method_input.sendKeys("Taken with GPS Device");
            enter.perform();

            var contactsBtn = element(by.partialButtonText("Facility Contacts"));
            expect(contactsBtn.getText()).toEqual("Facility Contacts");
            contactsBtn.click();

            browser.refresh();
            browser.driver.sleep(1000);
            browser.waitForAngular();

            //interations
            contactsBtn.click();
            browser.driver.sleep(1000);
            browser.waitForAngular();
            //expectations
            expect(element(by.css("h4")).getText()).toEqual("Facility Contact");
        });

        xit("should fill in new facility screen | facility contacts",function () {
            element(by.name("cont_fac.type"))
                .element(by.cssContainingText("option", "MOBILE")).click();

            element(by.model("fac_cont.contact")).sendKeys(facility);

            var contactsBtn = element(by.buttonText("Regulation"));
            expect(contactsBtn.getText()).toEqual("Regulation");
            contactsBtn.click();

            //interations
            browser.driver.sleep(1500);
            browser.waitForAngular();

            //expectations
            expect(element(by.css("h4")).getText()).toEqual("Facility Regulation");
        });

        xit("should fill in new facility screen | facility regulation",function () {
            element(by.model("fac_dept.name")).sendKeys("Radiology Unit");

            element(by.model("fac_dept.regulating_body"))
                .element(by.cssContainingText("option", "Ministry of Health")).click();
            browser.driver.sleep(5000);

            var servicesBtn = element(by.linkText("Facility Services"));
            expect(servicesBtn.getText()).toEqual("Facility Services");
            servicesBtn.click();

            //interations
            browser.driver.sleep(1500);
            browser.waitForAngular();

            //expectations
            expect(element(by.css("h4")).getText()).toEqual("Facility Regulation");
        });

        it("logout user after tests",function () {
            test_utils.logoutUser(browser);
        });
    });
})();
