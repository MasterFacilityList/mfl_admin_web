"use strict";

(function () {
    describe("Test for myCSRF interceptor: ", function () {
        var x_csrf;
        beforeEach(function () {
            module("mfl.common.providers");
            inject(["myCSRF", function (myCSRF) {
                x_csrf = myCSRF;
            }]);
        });
        //it should have its functions defined
        it("should have its functions defined", function () {
            expect(angular.isDefined(x_csrf)).toBe(true);
        });
    });
})();
