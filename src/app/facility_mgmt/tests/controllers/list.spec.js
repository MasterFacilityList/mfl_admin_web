(function () {
    "use strict";

    ddescribe("Test facility list controllers", function () {

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

        it("should load regulator sync list controller", function () {
            inject(["$controller", "$rootScope",
                function ($controller, rootScope) {
                    var data = {
                        "$scope": rootScope.$new(),
                        "mfl.auth.services.login": {
                            "getUser": jasmine.createSpy().andReturn({
                                "user_counties": [{"county_code": 45}, {"county_code": 2}]
                            })
                        }
                    };
                    $controller("mfl.facility_mgmt.controllers.regulator_sync", data);
                    expect(data.$scope.filters.county).toEqual([45, 2]);
                }
            ]);
        });
    });
})();
