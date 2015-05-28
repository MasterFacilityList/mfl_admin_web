(function () {
    "use strict";

    describe("tests for auth routes:", function() {

        var $state;//initialize dependencies

        beforeEach(function() {
            module("mfl.auth.routes");
            module("ui.router");

            inject(function ( _$state_) {
                $state = _$state_;
            });
        });
        it("should go to /login url", function () {
            expect($state.href("login", { id: 1 })).toEqual("#/login");
        });
    });
})();
