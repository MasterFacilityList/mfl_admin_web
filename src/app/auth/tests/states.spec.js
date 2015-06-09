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

        it("should go to reset password page", function () {
            expect($state.href("reset_pwd")).toEqual("#/reset_pwd");
        });

        it("should go to reset password page", function () {
            expect($state.href("reset_pwd_confirm", {uid: "2", token: "3"}))
                .toEqual("#/reset_pwd_confirm?uid=2&token=3");
        });
    });
})();
