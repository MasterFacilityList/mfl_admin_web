(function () {
    "use strict";

    describe("Service_mgmt test for base controller", function () {

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.service_mgmt.controllers");
            module("ui.router");
        });

        it("should test header controller", function () {
            inject(["$controller", "$rootScope", "mfl.auth.services.login",
                function ($controller, $rootScope, loginService) {
                    var data = {
                        "title":"tooltip",
                        "checked":false
                    };
                    var scope = $rootScope.$new();
                    $controller("mfl.service_mgmt.controllers.main", {
                        "$scope": scope,
                        "mfl.auth.services.login": loginService
                    });

                    expect(scope.tooltip).toEqual(data);
                }
            ]);
        });

    });
})();
