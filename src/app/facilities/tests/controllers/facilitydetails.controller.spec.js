(function () {
    "use strict";
    describe("Testing detailed view of controller", function () {
        var controller, data, root, scope, SERVER_URL;

        beforeEach(function () {
            module("mflAdminApp");
            module("mflAdminAppConfig");

            inject(["$rootScope", "$controller", "SERVER_URL", "$httpBackend",
                function ($rootScope, $controller, url, $httpBackend) {
                    root = $rootScope;
                    scope = root.$new();
                    SERVER_URL = url;
                    scope.fakeStateParams = {
                        facilityId : 6
                    };
                    $httpBackend = $httpBackend;
                    data = {
                        $scope : scope,
                        SERVER_URL : SERVER_URL,
                        $httpBackend : $httpBackend,
                        $stateParams : scope.fakeStateParams
                    };
                    controller = function (cntrl) {
                        return $controller(cntrl, data);
                    };
                }
            ]);
        });
        it("should test controller ",
        inject([
            function () {
                controller("mfl.facilities.controllers.home.detail");
                expect(scope.tooltip).toBeDefined();
            }
        ]));
        it("should test for fetching one facility, success",
        inject(["$httpBackend", function($httpBackend) {
            controller("mfl.facilities.controllers.home.detail");
            var fac_detailed = {
                name : "Endebess"
            };
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/facilities/6/").respond(
                200, fac_detailed);
            $httpBackend.flush();
        }]));
        it("should test for fetching one facility,  fail",
        inject(["$httpBackend", function($httpBackend) {
            controller("mfl.facilities.controllers.home.detail");
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/facilities/6/").respond(
                400, {});
            $httpBackend.flush();
        }]));
    });
})();
