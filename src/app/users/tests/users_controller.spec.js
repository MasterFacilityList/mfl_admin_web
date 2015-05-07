"use strict";

describe("Test users controllers :", function () {
    var controller, data, root, scope;

    beforeEach(function () {
        module("mflApp");

        inject(["$rootScope", "$controller",
            function ($rootScope, $controller) {
                root = $rootScope;
                scope = root.$new();
                data = {
                    $scope : scope
                };
                controller = function (cntrl) {
                    return $controller(cntrl, data);
                };
            }
        ]);
    });
    it("should test $scope.test === 'Manage users'", function () {
        controller("mfl.users.controllers.home");
        var test = "Manage users";
        expect(scope.test).toEqual(test);
    });
    it("should test $scope.test === 'users'", function () {
        controller("mfl.users.controllers.users");
        var test = "Users";
        expect(scope.test).toEqual(test);
    });
    it("should test new_user controller: ", function () {
        controller("mfl.users.controllers.new_user");
        var arg = "Antony";
        var arg_two = "Antony";
        scope.confirm = false;
        scope.conifrmPassword(arg, arg_two);
        expect(scope.confirm).toBeFalsy();
        var arg_three = "Antony";
        var arg_four = "Owaga";
        scope.conifrmPassword(arg_three, arg_four);
        expect(scope.confirm).toBeTruthy();
    });
    it("should test adding contacts to user", function () {
        controller("mfl.users.controllers.new_user");
        var usr_cont = [
            {contact_type : "", contact : ""},
            {contact_type : "", contact : ""}
        ];
        scope.addContact();
        expect(scope.user_contacts).toEqual(usr_cont);
    });
    it("should test removing contacts from user", function () {
        controller("mfl.users.controllers.new_user");
        var cont_obj = {contact_type : "", contact : ""};
        var compr_obj = [cont_obj];
        scope.user_contacts = [
            {contact_type : "", contact : ""},
            cont_obj
        ];
        scope.removeContact(cont_obj);
        expect(scope.user_contacts).toEqual(compr_obj);
    });

});
