(function () {
    "use strict";

    describe("Test service management states", function () {
        var state;

        beforeEach(function () {
            module("ui.router");
            module("mfl.service_mgmt.states");

            inject(["$state", function ($state) {
                state = $state;
            }]);
        });

        it("should define service management home url", function () {
            expect(state.href("service_mgmt")).toEqual("#/services/");
        });

        it("should define service list url", function () {
            expect(state.href("service_mgmt.service_list")).toEqual("#/services/services/");
        });

        it("should define service create url", function () {
            expect(state.href("service_mgmt.service_create"))
            .toEqual("#/services/services/create/");
        });

        it("should define service view url", function () {
            expect(state.href("service_mgmt.service_view", {"service_id": "abcd"}))
            .toEqual("#/services/services/abcd/");
        });

        it("should define service edit url", function () {
            expect(state.href("service_mgmt.service_edit", {"service_id": "abcd"}))
            .toEqual("#/services/services/abcd/edit/");
        });

        it("should define service delete url", function () {
            expect(state.href("service_mgmt.service_delete", {"service_id": "abcd"}))
            .toEqual("#/services/services/abcd/delete/");
        });

        it("should define service options edit url", function () {
            expect(state.href("service_mgmt.service_edit.options", {"service_id": "abcd"}))
            .toEqual("#/services/services/abcd/edit/options/");
        });

    });
})();