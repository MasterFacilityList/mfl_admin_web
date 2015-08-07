(function () {
    "use strict";

    describe("Reports test for main controller", function () {

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.reports.controllers");
            module("ui.router");
        });

        it("should test header controller", function () {
            inject(["$controller", "$rootScope", "mfl.auth.services.login",
                function ($controller, $rootScope, loginService) {
                    var data = false;
                    var scope = $rootScope.$new();
                    $controller("mfl.reports.controllers.main", {
                        "$scope": scope,
                        "mfl.auth.services.login": loginService
                    });

                    expect(scope.hide_sidebar).toEqual(data);
                }
            ]);
        });

    });
})();
