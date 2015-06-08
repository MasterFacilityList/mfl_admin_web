(function () {
    "use strict";
    describe("Testing detailed view of controller", function () {
        var controller, data, root, scope, SERVER_URL, httpBackend, state;

        beforeEach(function () {
            module("mflAdmin");
            module("mflAdminAppConfig");
            module("mfl.facilities.wrappers");
            module("ui.router");
            module("mfl.facilities.controllers.home");

            inject(["$rootScope", "$controller", "$httpBackend", "$stateParams", "SERVER_URL",
                function ($rootScope, $controller, $httpBackend, $stateParams, url) {
                    root = $rootScope;
                    scope = root.$new();
                    state = $state;
                    httpBackend = $httpBackend;
                    SERVER_URL = url;
                    scope.fakeStateParams = {
                        id : 1
                    };
                    data = {
                        $scope : scope,
                        $state : $state,
                        SERVER_URL : url,
                        $stateParams : scope.fakeStateParams
                    };
                    controller = function (cntrl) {
                        return $controller(cntrl, data);
                    };
                }
            ]);
        });
        it("should test getting details of one facility: successfully ",
        inject(["$httpBackend",
            function ($httpBackend) {
                controller("mfl.facilities.controllers.home.detail");
                var fac_details = {
                    name: "Endebess District Hospital",
                    number_of_beds: 20
                };
                $httpBackend.expectGET(
                    SERVER_URL + "api/facilities/facilities/1").respond(200, fac_details);
                $httpBackend.flush();
            }
        ]));
    });
})();
