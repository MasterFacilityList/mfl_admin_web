(function () {
    "use strict";

    describe("Test facility list controllers", function () {

        beforeEach(function () {
            module("mfl.facility_mgmt.controllers");
        });

        it("should load facility list controller", function () {
            inject(["$controller", "$rootScope",
                function ($controller, rootScope) {
                    var data = { "$scope": rootScope.$new() };
                    $controller("mfl.facility_mgmt.controllers.facility_list", data);
                }
            ]);
        });

        it("should load facility approved list controller", function () {
            inject(["$controller", "$rootScope",
                function ($controller, rootScope) {
                    var data = { "$scope": rootScope.$new() };
                    $controller("mfl.facility_mgmt.controllers.facility_approve_list", data);
                }
            ]);
        });
    });
})();
