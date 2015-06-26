(function () {
    "use strict";

    describe("Testing mutlistep service", function () {
        var scope, stateParams, multistepService;
        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.common.services");
            inject(["$rootScope", "$stateParams",
                "mfl.common.services.multistep",
                function ($rootScope, $stateParams, _multistepService) {
                    scope = $rootScope.$new();
                    stateParams = $stateParams;
                    multistepService = _multistepService;
                }
            ]);
        });
        it("It should test if multistepService is defined", function () {
            expect(multistepService).toBeDefined();
        });
        it("It should test if multistepService is defined",
        inject(["$stateParams", function ($stateParams) {
            $stateParams.furthest = 1;
            scope.steps = [
                {
                    count : 1,
                    name : "basic",
                    furthest : false,
                    prev : ["contacts", "groups"]
                },
                {
                    count : 2,
                    name : "contacts",
                    done : false
                }
            ];
            spyOn(multistepService, "setFurthest");
        }]));
    });
})();
