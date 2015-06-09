(function () {
    "use strict";


    describe("Testing the auth login controller: ", function () {
        var controller, data, root, scope, SERVER_URL, httpBackend, state;

        beforeEach(function () {
            module("ui.router");
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.auth.controllers");

            inject(["$rootScope", "$controller", "$httpBackend", "SERVER_URL",
                "mfl.auth.services.login", "$state",
                function ($rootScope, $controller, $httpBackend, url, loginService, $state) {
                    root = $rootScope,
                    scope = root.$new();
                    SERVER_URL = url;
                    state = $state;
                    httpBackend = $httpBackend;
                    loginService = loginService;
                    data = {
                        $scope : scope,
                        $state : $state,
                        loginService : loginService,
                        SERVER_URL : url
                    };
                    controller = function () {
                        return $controller("mfl.auth.controllers.login", data);
                    };
                }
            ]);
        });

        it("should test auth login controller",
        inject(["$state", function ($state) {
            controller("mfl.auth.controllers.login");
            spyOn($state, "go");
            expect(scope.test).toEqual("Login");
        }]));

        it("should call backend and login and save user credentials: success",
        inject(["$httpBackend", "$controller", "$rootScope", "$state", "mfl.auth.services.login",
            function ($httpBackend, $controller, $rootScope, $state, srvc) {
                var obj = {username : "owagaantony@gmail.com", password: "owaga"};
                var s = $rootScope.$new();
                $httpBackend.expectPOST(SERVER_URL + "o/token/").respond(200);
                $httpBackend.expectGET(SERVER_URL + "api/rest-auth/user/")
                    .respond(200, {email: ""});

                spyOn(srvc, "login").andCallThrough();
                spyOn($state, "go");
                $controller("mfl.auth.controllers.login", {
                    "$scope": s,
                    "$state": $state,
                    "mfl.auth.services.login": srvc
                });

                s.submitUser(obj);

                expect(srvc.login).toHaveBeenCalledWith(obj);
                $httpBackend.flush();

                // expect(scope.login_err).toEqual("");
                // expect(scope.login_err_html).toEqual("");
            }
        ]));

        it("should call backend and login and save user credentials: fail",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.auth.controllers.login");
            var obj = {username : "owagaantony@gmail.com", password: "owaga"};
            scope.submitUser(obj);
            $httpBackend.expectPOST(SERVER_URL + "o/token/").respond(200, obj);
            $httpBackend.expectGET(SERVER_URL + "api/rest-auth/user/").respond(400, {email: ""});
            $httpBackend.flush();
            expect(scope.login_err).not.toEqual("");
        }]));

        it("should call backend and login a user: success",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.auth.controllers.login");
            var obj = {date : ""};
            scope.submitUser(obj);
            $httpBackend.expectPOST(SERVER_URL + "o/token/").respond(400, {email: ""});
            $httpBackend.flush();
        }]));
    });

    describe("Test logout controller", function () {

        var controller, credz, httpBackend, state, payload;

        beforeEach(function () {
            module("ui.router");
            module("mflAdminAppConfig");
            module("mfl.auth.oauth2");
            module("mfl.auth.services");
            module("mfl.auth.controllers");

            inject(["$controller", "$httpBackend", "CREDZ", "$window",
                "mfl.auth.services.login", "$state", "api.oauth2",
                function ($controller, $httpBackend, CREDZ, $window, loginService, $state, oauth2) {
                    credz = CREDZ;
                    state = $state;
                    httpBackend = $httpBackend;
                    loginService = loginService;
                    var data = {
                        $state : $state,
                        "mfl.auth.controllers.logout" : loginService
                    };
                    spyOn(oauth2, "getToken").andReturn({"access_token": "token"});
                    payload =
                        "token=" + "token" +
                        "&client_id=" + credz.client_id +
                        "&client_secret=" + credz.client_secret;
                    controller = function () {
                        return $controller("mfl.auth.controllers.logout", data);
                    };
                }
            ]);
        });

        it("should logout a user on successful revoke of token", function () {
            httpBackend
                .expectPOST(credz.revoke_url, payload)
                .respond(200, {});
            spyOn(state, "go");
            controller();
            httpBackend.flush();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
            expect(state.go).toHaveBeenCalledWith("login");
        });

        it("should logout a user on failed revoke of token", function () {
            httpBackend.expectPOST(credz.revoke_url, payload).respond(500, {"error": "a"});
            spyOn(state, "go");
            controller();
            httpBackend.flush();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
            expect(state.go).toHaveBeenCalledWith("login");
        });
    });

    describe("Test reset pwd controller", function () {

    });

    describe("Test reset pwd confirm controller", function () {});

})();
