(function () {
    "use strict";

    describe("Tests for users states :", function() {
        var $state;

        beforeEach(function() {
            module("ui.router");
            module("mfl.users.states.users");

            inject(["$state", function (s) {
                $state = s;
            }]);
        });

        it("should go to /users url", function () {
            expect($state.href("users")).toEqual("#/users/");
        });

    });
})();
