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

        it("should go to users home page", function () {
            expect($state.href("users")).toEqual("#/users/");
        });

        it("should go to users listing page", function () {
            expect($state.href("users.user_list")).toEqual("#/users/list/");
        });

        it("should go to users basic details editing page", function () {
            expect($state.href("users.user_list.user_edit.basic", {"user_id": 3}))
                .toEqual("#/users/list/edit/3/basic/");
        });

        it("should go to county assignment page", function () {
            expect($state.href("users.user_list.user_edit.counties", {"user_id": 3}))
                .toEqual("#/users/list/edit/3/counties/");
        });

        it("should go to users delete page", function () {
            expect($state.href("users.user_list.user_delete", {"user_id": 3}))
                .toEqual("#/users/list/delete/3/");
        });

    });
})();
