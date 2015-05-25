"use strict";

(function () {
    describe("Test for homeApp controllers: ", function () {
        var controller, data, root, scope, SERVER_URL, httpBackend;
        beforeEach(function () {
            module("mflApp");
            module("mfl.settings");
            module("mfl.home.services");
            module("mfl.auth.services");

            inject(["$rootScope", "$controller", "$httpBackend", "SERVER_URL",
                "mfl.home.services.home", "mfl.auth.services.login",
                function ($rootScope, $controller, $httpBackend, url, homeService, logoutService) {
                    root = $rootScope,
                    scope = root.$new();
                    SERVER_URL = url;
                    httpBackend = $httpBackend;
                    homeService = homeService;
                    logoutService = logoutService;
                    data = {
                        $scope : scope,
                        homeService : homeService,
                        logoutService : logoutService,
                        SERVER_URL : url
                    };
                    controller = function (cntrl) {
                        return $controller(cntrl, data);
                    };
                }
            ]);
        });
        it("should test home controller", function () {
            controller("mfl.home.controllers.home");
            expect(scope.test).toEqual("hello");
        });
        it("should get list of latest 4 facilities: succeed",
            inject(["$httpBackend",function ($httpBackend) {
                controller("mfl.home.controllers.home");
                var fac = "";
                $httpBackend.expectGET(
                    SERVER_URL + "api/facilities/facilities/?page_size=4").respond(
                    200, fac);
                $httpBackend.flush();
            }
        ]));
        it("should get list of latest 4 facilities: fail",
            inject(["$httpBackend",function ($httpBackend) {
                controller("mfl.home.controllers.home");
                $httpBackend.expectGET(
                    SERVER_URL + "api/facilities/facilities/?page_size=4").respond(
                    400, {});
                $httpBackend.flush();
            }
        ]));
        it("should logout user : success",
            inject(["$httpBackend", "$state", function ($httpBackend, $state) {
                controller("mfl.home.controllers.home");
                spyOn($state, "go");
                scope.logout();
                $httpBackend.expectPOST(SERVER_URL + "api/rest-auth/logout/").
                    respond(200, "");
                $httpBackend.flush();
            }
        ]));
        it("should logout user : fail",
            inject(["$httpBackend", "$state", function ($httpBackend, $state) {
                controller("mfl.home.controllers.home");
                spyOn($state, "go");
                scope.logout();
                $httpBackend.expectPOST(SERVER_URL + "api/rest-auth/logout/").
                    respond(400, {name: ""});
                $httpBackend.flush();
            }
        ]));
    });
})();
