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
        var controller, rootScope, SERVER_URL, httpBackend, state, log;

        beforeEach(function () {
            module("ui.router");
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.auth.controllers");

            inject(["$rootScope", "$controller", "$httpBackend", "SERVER_URL",
                "$state", "$log",
                function ($rootScope, $controller, $httpBackend, url, $state, $log) {
                    rootScope = $rootScope,
                    SERVER_URL = url;
                    state = $state;
                    httpBackend = $httpBackend;
                    log = $log;

                    controller = function (data) {
                        return $controller("mfl.auth.controllers.reset_pwd", data);
                    };
                }
            ]);
        });

        it("should request for a password reset", function () {
            httpBackend.expectPOST(SERVER_URL + "api/rest-auth/password/reset/", {
                "email": "mail@domain.com"
            }).respond(200);

            spyOn(log, "error");
            spyOn(state, "go");
            var data = {
                "$scope": rootScope.$new(),
                "$state": state,
                "$log": log
            };
            data.$scope.email = "mail@domain.com";

            controller(data);
            data.$scope.reset_pwd();

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            expect(state.go).toHaveBeenCalledWith("login");
            expect(log.error).not.toHaveBeenCalled();
        });

        it("should show an error on fail to request for a password reset", function () {
            httpBackend.expectPOST(SERVER_URL + "api/rest-auth/password/reset/", {
                "email": "mail@domain.com"
            }).respond(500);

            spyOn(state, "go");
            spyOn(log, "error");

            var data = {
                "$scope": rootScope.$new(),
                "$state": state
            };
            data.$scope.email = "mail@domain.com";

            controller(data);
            data.$scope.reset_pwd();

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            expect(log.error).toHaveBeenCalled();
            expect(state.go).not.toHaveBeenCalledWith();
        });
    });

    describe("Test reset pwd confirm controller", function () {
        var controller, rootScope, SERVER_URL, httpBackend, state, log;

        beforeEach(function () {
            module("ui.router");
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.auth.controllers");

            inject(["$rootScope", "$controller", "$httpBackend", "SERVER_URL",
                "$state", "$log",
                function ($rootScope, $controller, $httpBackend, url, $state, $log) {
                    rootScope = $rootScope,
                    SERVER_URL = url;
                    state = $state;
                    httpBackend = $httpBackend;
                    log = $log;

                    controller = function (data) {
                        return $controller("mfl.auth.controllers.reset_pwd_confirm", data);
                    };
                }
            ]);
        });

        it("should reset a password", function () {
            httpBackend.expectPOST(SERVER_URL + "api/rest-auth/password/reset/confirm/", {
                "uid": "123",
                "token": "456",
                "new_password1": "pass",
                "new_password2": "pass"
            }).respond(200);

            spyOn(log, "error");
            spyOn(state, "go");
            var data = {
                "$scope": rootScope.$new(),
                "$state": state,
                "$log": log,
                "$stateParams": {
                    "uid": "123",
                    "token": "456"
                }
            };
            data.$scope.new_password1 = "pass";
            data.$scope.new_password2 = "pass";

            controller(data);
            data.$scope.reset_pwd_confirm();

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            expect(state.go).toHaveBeenCalledWith("login");
            expect(log.error).not.toHaveBeenCalled();
        });

        it("should show an error on fail to reset a password (uid fail)", function () {
            httpBackend.expectPOST(SERVER_URL + "api/rest-auth/password/reset/confirm/", {
                "uid": "123",
                "token": "456",
                "new_password1": "pass",
                "new_password2": "pass"
            }).respond(500, {"uid": "haha"});

            spyOn(log, "error");
            spyOn(state, "go");
            var data = {
                "$scope": rootScope.$new(),
                "$state": state,
                "$log": log,
                "$stateParams": {
                    "uid": "123",
                    "token": "456"
                }
            };
            data.$scope.new_password1 = "pass";
            data.$scope.new_password2 = "pass";

            controller(data);
            data.$scope.reset_pwd_confirm();

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            expect(state.go).not.toHaveBeenCalled();
            expect(log.error).toHaveBeenCalled();
            expect(data.$scope.errors).toEqual({"": ["Invalid password reset token."]});
        });


        it("should show an error on fail to reset a password (token fail)", function () {
            httpBackend.expectPOST(SERVER_URL + "api/rest-auth/password/reset/confirm/", {
                "uid": "123",
                "token": "456",
                "new_password1": "pass",
                "new_password2": "pass"
            }).respond(500, {"token": "haha"});

            spyOn(log, "error");
            spyOn(state, "go");
            var data = {
                "$scope": rootScope.$new(),
                "$state": state,
                "$log": log,
                "$stateParams": {
                    "uid": "123",
                    "token": "456"
                }
            };
            data.$scope.new_password1 = "pass";
            data.$scope.new_password2 = "pass";

            controller(data);
            data.$scope.reset_pwd_confirm();

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            expect(state.go).not.toHaveBeenCalled();
            expect(log.error).toHaveBeenCalled();
            expect(data.$scope.errors).toEqual({"": ["Invalid password reset token."]});
        });

        it("should show an error on fail to validate", function () {
            spyOn(log, "error");
            spyOn(state, "go");
            var data = {
                "$scope": rootScope.$new(),
                "$state": state,
                "$log": log,
                "$stateParams": {
                    "uid": "123",
                    "token": "456"
                }
            };
            data.$scope.new_password1 = "pass";
            data.$scope.new_password2 = "hus";

            controller(data);
            data.$scope.reset_pwd_confirm();

            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            expect(state.go).not.toHaveBeenCalled();
            expect(log.error).toHaveBeenCalled();
            expect(data.$scope.errors).toEqual({
                "new_password1": ["The two passwords do not match"],
                "new_password2": ["The two passwords do not match"]
            });
        });
    });

})();
