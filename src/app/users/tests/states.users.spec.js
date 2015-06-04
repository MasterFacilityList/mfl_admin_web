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

        it("should go to users listing page", function () {
            expect($state.href("users")).toEqual("#/users/");
        });

        it("should go to users creation page", function () {
            expect($state.href("users.user_create")).toEqual("#/users/create/");
        });

        it("should go to users basic details creation page", function () {
            expect($state.href("users.user_create.basic")).toEqual("#/users/create/basic/");
        });

        it("should go to user contacts creation page", function () {
            expect($state.href("users.user_create.contacts")).toEqual("#/users/create/contacts/");
        });

        it("should go to user groups assignment creation page", function () {
            expect($state.href("users.user_create.groups")).toEqual("#/users/create/groups/");
        });

        it("should go to users editing page", function () {
            expect($state.href("users.user_edit", {"user_id": 3}))
                .toEqual("#/users/edit/3/");
        });

        it("should go to users basic details editing page", function () {
            expect($state.href("users.user_edit.basic", {"user_id": 3}))
                .toEqual("#/users/edit/3/basic/");
        });

        it("should go to user contacts editing page", function () {
            expect($state.href("users.user_edit.contacts", {"user_id": 3}))
                .toEqual("#/users/edit/3/contacts/");
        });

        it("should go to user groups assignment creation page", function () {
            expect($state.href("users.user_edit.groups", {"user_id": 3}))
                .toEqual("#/users/edit/3/groups/");
        });

        it("should go to users delete page", function () {
            expect($state.href("users.user_delete", {"user_id": 3}))
                .toEqual("#/users/delete/3/");
        });

    });
})();
