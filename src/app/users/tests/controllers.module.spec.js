(function () {
    "use strict";

    describe("Test user controllers module load", function () {
        it("should load user controller module successfully", function () {
            module("mfl.users.controllers");
        });

        it("should test $scope.test === 'Manage users'", function () {
            module("mfl.users.controllers");
            module("mflAdminAppConfig");
            inject(["$controller", "$rootScope", function ($controller, $rootScope) {
                var scope = $rootScope.$new();
                $controller("mfl.users.controllers.home", {"$scope": scope});
                var test = "Manage users";
                expect(scope.test).toEqual(test);
            }]);
        });
    });
})();
