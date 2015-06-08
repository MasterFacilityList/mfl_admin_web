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

        it("should go to users home page", function () {
            expect($state.href("groups")).toEqual("#/groups/");
        });

        it("should go to users listing page", function () {
            expect($state.href("groups.group_list")).toEqual("#/groups/groups/");
        });

        it("should go to users creation page", function () {
            expect($state.href("groups.group_create")).toEqual("#/groups/create/");
        });

        it("should go to users editing page", function () {
            expect($state.href("groups.group_edit", {"group_id": 3}))
                .toEqual("#/groups/edit/3/");
        });

        it("should go to users delete page", function () {
            expect($state.href("groups.group_delete", {"group_id": 3}))
                .toEqual("#/groups/delete/3/");
        });

    });
})();
