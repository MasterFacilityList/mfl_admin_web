"use strict";

(function () {
    describe("Testing passing permissions to RBAC directive", function () {
        var factory;
        beforeEach(function () {
            module("mflApp");
            module("mfl.auth.permissions");

            inject(["mfl.auth.permissions.permissionList",
                function (permService) {
                    factory = permService;
                }
            ]);
        });
        it("should test if permissions Factory is defined",
        inject(["mfl.auth.permissions.permissionList",
            function (permFactory) {
                expect(permFactory).toBeDefined();
            }
        ]));
        it("should define permissions factory methods",
        inject(["mfl.auth.permissions.permissionList",
            function (permService) {
                expect(permService.hasPermission).toBeDefined();
                expect(
                    angular.isFunction (permService.hasPermission)).
                    toBeTruthy();
            }
        ]));
        it("should define permissions factory methods",
        inject(["mfl.auth.permissions.permissionList",
            function (permService) {
                var permission  = "facility.add_facility";
                var permissions = [
                    "facility.add_facility",
                    "facility.approve_facility"
                ];
                spyOn(permService, "setPermissions").andReturn(permissions);
                var response = permService.hasPermission(permission);
                expect(response).toEqual(false);
            }
        ]));
    });
})();
