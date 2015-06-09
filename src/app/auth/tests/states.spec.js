(function () {
    "use strict";

    describe("Tests for auth states :", function() {
        var $state;

        beforeEach(function() {
            module("mfl.auth.states");
            module("ui.router");

            inject(["$state", function (s) {
                $state = s;
            }]);
        });
        it("should go to /login url", function () {
            expect($state.href("login")).toEqual("#/login");
        });
        it("should go to /logout url", function () {
            expect($state.href("logout")).toEqual("#/logout");
        });
    });
})();
