(function (angular) {
    "use strict";

    describe("Test service management service", function () {

        var api;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("api.wrapper");
            module("mfl.service_mgmt.services");

            inject(["api", function (a) {
                api = a;
            }]);
        });

        it("should define api wrappers", function () {
            spyOn(api, "setBaseUrl").andReturn({});
            inject(["mfl.service_mgmt.wrappers", function (w) {
                expect(w.services).toEqual({});
                expect(w.categories).toEqual({});
                expect(w.options).toEqual({});
                expect(angular.isArray(w.OPTION_TYPES)).toBe(true);

                expect(api.setBaseUrl.calls.length).toBe(6);
                expect(api.setBaseUrl.calls[0].args[0]).toEqual("api/facilities/services/");
                expect(api.setBaseUrl.calls[1].args[0])
                    .toEqual("api/facilities/service_categories/");
                expect(api.setBaseUrl.calls[2].args[0]).toEqual("api/facilities/options/");
            }]);
        });

        it("should generate a new category", function () {
            inject(["mfl.service_mgmt.wrappers", function (w) {
                var c = w.newCategory();
                expect(c).toEqual({
                    "name": "",
                    "description": "",
                    "abbreviation": ""
                });
            }]);
        });

        it("should generate a new service", function () {
            inject(["mfl.service_mgmt.wrappers", function (w) {
                var c = w.newService();
                expect(c).toEqual({
                    "name": "",
                    "description": "",
                    "abbreviation": "",
                    "category": ""
                });
            }]);
        });

        it("should generate a new option", function () {
            inject(["mfl.service_mgmt.wrappers", function (w) {
                var c = w.newOption();
                expect(c).toEqual({
                    "value": "",
                    "display_text": "",
                    "is_exclusive_option": false,
                    "option_type": ""
                });
            }]);
        });
    });
})(window.angular);
