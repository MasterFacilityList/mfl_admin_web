(function () {
    "use strict";

    describe("Tests for users routes :", function() {
        var $state;

        beforeEach(function() {
            module("ui.router");
            module("mfl.users.routes");

            inject(["$state", function (s) {
                $state = s;
            }]);
        });
        it("should go to /users url", function () {
            expect($state.href("users")).toEqual("#/users");
        });
    });
})();
