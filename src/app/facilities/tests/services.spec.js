(function () {
    "use strict";

    describe("Test facilities management service", function () {

        var api;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("sil.api.wrapper");
            module("mfl.facilities.services");

            inject(["api", function (a) {
                api = a;
            }]);
        });

        it("should define facilties manageement api wrappers", function () {
            spyOn(api, "setBaseUrl").andReturn({});
            inject(["mfl.facilities.wrappers", function (wrapper) {
                expect(wrapper.facilities).toEqual({});

                expect(api.setBaseUrl.calls.length).toBe(1);
                expect(api.setBaseUrl.calls[0].args[0]).toEqual("api/facilities/facilities/");
            }]);
        });
    });
})();
