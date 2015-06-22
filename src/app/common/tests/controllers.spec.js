(function () {
    "use strict";

    describe("Test common controllers ", function () {

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.common.controllers");
            module("ui.router");
        });

        it("should test header controller", function () {
            inject(["$controller", "$rootScope", "mfl.auth.services.login",
                function ($controller, $rootScope, loginService) {
                    var scope = $rootScope.$new();
                    spyOn(loginService, "getUser").andReturn({});

                    $controller("mfl.common.controllers.header", {
                        "$scope": scope,
                        "mfl.auth.services.login": loginService
                    });

                    expect(scope.user).toEqual({});
                    expect(loginService.getUser).toHaveBeenCalled();
                }
            ]);
        });
    });
})();
