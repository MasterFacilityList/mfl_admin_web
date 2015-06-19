(function () {
    "use strict";

    describe("Tests for groups states :", function() {
        var $state;

        beforeEach(function() {
            module("ui.router");
            module("mfl.users.states.groups");

            inject(["$state", function (s) {
                $state = s;
            }]);
        });

        it("should go to groups listing page", function () {
            expect($state.href("groups")).toEqual("#/groups/");
        });

    });
})();
