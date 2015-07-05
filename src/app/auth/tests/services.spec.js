(function (angular) {

    "use strict";

    describe("Test auth login service: ", function () {
        var url;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("api.wrapper");
            module("mfl.auth.services");
        });

        beforeEach(inject(["SERVER_URL", function (s) {
                url = s;
            }
        ]));

        afterEach(function () {
            inject(["$window", function ($window) {
                $window.localStorage.removeItem("auth.user");
            }]);
        });

        it("should have auth login service defined",
        inject(["mfl.auth.services.login", function (loginService) {
            expect(loginService).toBeDefined();
        }]));

        it("should have all the methods defined",
        inject(["mfl.auth.services.login", function (loginService) {
            expect(angular.isFunction (loginService.login)).toBeTruthy();
            expect(angular.isFunction (loginService.currentUser)).toBeTruthy();
            expect(angular.isFunction (loginService.isLoggedIn)).toBeTruthy();
        }]));
        it("should send user details to login Api: successfully",
        inject(["api.oauth2", "mfl.auth.services.login",
            function (oauth2, loginService) {
            var test_data = {
                username: "owagaantony@gmail.com",
                password: "owaga"
            };
            spyOn(oauth2, "fetchToken").andReturn({});

            var response = loginService.login(test_data);

            expect(response).toEqual({});
        }]));
        it("should send user details to login Api: successfully",
        inject(["$httpBackend","mfl.auth.services.login",
            function ($httpBackend, loginService) {
            var test_data = {
                email: "owagaantony@gmail.com",
                username: "owaga"
            };
            var test_response = JSON.stringify(test_data);
            $httpBackend.expect(
                "GET",url + "api/rest-auth/user/").respond(
                200, test_response);
            var response = loginService.currentUser();
            response.then(function (data) {
                expect(data.data).toEqual(test_data);
            });
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        }]));

        it("should call isLoggedIn method",
        inject(["mfl.auth.services.login", "api.oauth2", "$window",
            function (loginService, oauth2, $window) {
                $window.localStorage.setItem("auth.user", "{}");
                spyOn(oauth2, "getToken").andReturn({});
                var response = loginService.isLoggedIn();
                expect(response).toEqual(true);
            }
        ]));
        it("should call isLoggedIn method: logged in is null",
        inject(["mfl.auth.services.login", "api.oauth2",
            function (loginService, oauth2) {
                spyOn(oauth2, "getToken").andReturn({});
                var response = loginService.isLoggedIn();
                expect(response).toEqual(false);
            }
        ]));
        it("should call isLoggedIn method: getToken is null",
        inject(["mfl.auth.services.login", "api.oauth2", "$window",
            function (loginService, oauth2, $window) {
                $window.localStorage.setItem("auth.user", "{}");
                spyOn(oauth2, "getToken").andReturn(null);
                var response = loginService.isLoggedIn();
                expect(response).toEqual(false);
            }
        ]));
        it("should call isLoggedIn method: getToken and isLoggedIn are null",
        inject(["mfl.auth.services.login", "api.oauth2", "$window",
            function (loginService, oauth2) {
                spyOn(oauth2, "getToken").andReturn(null);
                var response = loginService.isLoggedIn();
                expect(response).toEqual(false);
            }
        ]));
        it("should test getUser method",
        inject(["mfl.auth.services.login", "$window",
            function (loginService, $window) {
                var user = {username: "antony", password : "owaga"};
                $window.localStorage.setItem("auth.user", JSON.stringify(user));
                var result = loginService.getUser();
                expect(result).toEqual(user);
            }
        ]));

        it("should send user details to login Api: successfully",
        inject(["api.oauth2", "mfl.auth.services.login",
            function (oauth2, loginService) {
            var test_data = {
                username: "owagaantony@gmail.com",
                password: "owaga"
            };
            spyOn(oauth2, "fetchToken").andReturn({});

            var response = loginService.login(test_data);

            expect(response).toEqual({});
        }]));

        it("should test logout method",
        inject(["mfl.auth.services.login", "$window", "api.oauth2",
            function (loginService, $window, oauth2) {
                $window.localStorage.setItem("auth.user", "{}");
                spyOn(oauth2, "revokeToken").andReturn({});
                var response = loginService.logout();
                expect(response).toEqual({});
                expect(oauth2.revokeToken).toHaveBeenCalled();
                expect(JSON.parse($window.localStorage.getItem("auth.user"))).toBe(null);
            }
        ]));
    });

    describe("Test auth statecheck service: ", function () {
        var statecheck, rootScope, loginService, permChecker, state, homestate;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.auth.states");
            module("mfl.auth.permissions");
            module("ui.router");

            angular.module("test_states", ["ui.router"])
            .config(["$stateProvider", function ($stateProvider) {
                $stateProvider
                .state("testperm", {
                    permission: "perm"
                })
                .state("testfeature", {
                    userFeature: "feat"
                })
                .state("testboth", {
                    userFeature: "feat",
                    permission: "perm"
                })
                .state("none", {});
            }]);

            module("test_states");

            inject(["$state", "mfl.auth.services.statecheck", "mfl.auth.permissions.checker",
                "mfl.auth.services.login", "$rootScope", "HOME_PAGE_NAME",
                function (s, sc, pc, ls, rs, hs) {
                    statecheck = sc;
                    loginService = ls;
                    permChecker = pc;
                    rootScope = rs;
                    state = s;
                    homestate = hs;
                }
            ]);
        });

        afterEach(function () {
            statecheck.stopListening();
        });

        it("should listen to state changes", function () {
            spyOn(rootScope, "$on").andCallThrough();
            statecheck.startListening();
            expect(rootScope.$on).toHaveBeenCalled();
            expect(rootScope.$on.calls[0].args[0]).toEqual("$stateChangeStart");
            expect(angular.isFunction(
                rootScope.$on.calls[0].args[1])).toBe(true);
        });

        it("should allow loggedin users to access states", function () {
            spyOn(loginService, "isLoggedIn").andReturn(true);
            statecheck.startListening();
            expect(state.go("none").$$state.status).toBe(0);
            expect(state.go("none").$$state.value).toBe(undefined);
        });

        it("should redirect loggedin users from login state to home", function () {
            spyOn(loginService, "isLoggedIn").andReturn(true);
            spyOn(state, "go").andCallThrough();

            statecheck.startListening();

            state.go("login");

            var last_call = state.go.calls[state.go.calls.length-1];
            expect(last_call.args[0]).toEqual(homestate);
        });

        it("should stop users without permission from going to a state", function () {
            spyOn(loginService, "isLoggedIn").andReturn(true);
            spyOn(state, "go").andCallThrough();
            spyOn(permChecker, "hasPermission").andReturn(false);

            statecheck.startListening();

            expect(state.go("testperm").$$state.status).toEqual(2);
        });

        it("should stop users without feature from going to a state", function () {
            spyOn(loginService, "isLoggedIn").andReturn(true);
            spyOn(state, "go").andCallThrough();
            spyOn(permChecker, "hasUserFeature").andReturn(false);

            statecheck.startListening();

            expect(state.go("testfeature").$$state.status).toEqual(2);
        });

        it("should allow loggedin users to logout", function () {
            spyOn(loginService, "isLoggedIn").andReturn(true);
            spyOn(state, "go").andCallThrough();

            statecheck.startListening();

            state.go("logout");

            var last_call = state.go.calls[state.go.calls.length-1];
            expect(last_call.args[0]).toEqual("logout");
        });

        it("should allow non-loggedin users to logout", function () {
            spyOn(loginService, "isLoggedIn").andReturn(false);
            spyOn(state, "go").andCallThrough();

            statecheck.startListening();

            state.go("logout");

            var last_call = state.go.calls[state.go.calls.length-1];
            expect(last_call.args[0]).toEqual("logout");
        });

        it("should redirect non-loggedin users to login state", function () {
            spyOn(loginService, "isLoggedIn").andReturn(false);
            spyOn(state, "go").andCallThrough();

            statecheck.startListening();

            state.go("none");

            var last_call = state.go.calls[state.go.calls.length-1];
            expect(last_call.args[0]).toEqual("login");
            expect(last_call.args[1]).toEqual({"next": "none"});
        });

        it("should be able to stop listening", function () {
            spyOn(loginService, "isLoggedIn").andReturn(true);
            spyOn(state, "go").andCallThrough();

            statecheck.startListening();
            statecheck.stopListening();

            state.go("none");

            var last_call = state.go.calls[state.go.calls.length-1];
            expect(last_call.args[0]).toEqual("none");
        });

        it("should fail silently if stop is called repeatedly", function () {
            statecheck.startListening();
            statecheck.stopListening();

            expect(statecheck.stopListening).not.toThrow();
        });

        it("should redirect to specified state", function () {
            spyOn(loginService, "isLoggedIn").andReturn(true);
            spyOn(state, "go");

            statecheck.startListening();
            var toState = {
                name: "parent",
                redirectTo: "child"
            };
            var toParams = {};
            rootScope.$broadcast("$stateChangeStart", toState, toParams);

            expect(state.go).toHaveBeenCalledWith("child", toParams);
        });

        it("should roadblock user until password is changed", function () {
            spyOn(loginService, "isLoggedIn").andReturn(true);
            spyOn(loginService, "getUser").andReturn({requires_password_change: true});
            spyOn(state, "go");

            statecheck.startListening();
            var toState = {
                name: "homepage"
            };
            rootScope.$broadcast("$stateChangeStart", toState);

            expect(state.go).toHaveBeenCalledWith("profile.password", {required: true});
        });

        it("should not roadblock user if page is password change", function () {
            spyOn(loginService, "isLoggedIn").andReturn(true);
            spyOn(loginService, "getUser").andReturn({requires_password_change: true});
            spyOn(state, "go");

            statecheck.startListening();
            var toState = {
                name: "profile.password"
            };
            rootScope.$broadcast("$stateChangeStart", toState);

            expect(state.go).not.toHaveBeenCalled();
        });
    });

    describe("Test profile service", function () {
        var httpBackend, profileService, server_url, rootScope;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("api.wrapper");
            module("mfl.auth.services");

            inject(["$httpBackend", "$rootScope", "mfl.auth.services.profile", "SERVER_URL",
                function ($httpBackend, $rootScope, profileservice, url) {
                    httpBackend = $httpBackend;
                    profileService = profileservice;
                    server_url = url;
                    rootScope = $rootScope;
                }
            ]);
        });

        it("should fetch current user information", function () {
            httpBackend
                .expectGET(server_url+"api/rest-auth/user/")
                .respond(200, {});

            profileService.getProfile()
                .success(function (data) {
                    expect(data).toEqual({});
                });

            httpBackend.flush();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();

        });

        it("should update current user information", function () {
            httpBackend
                .expectPATCH(server_url+"api/rest-auth/user/", "ASD")
                .respond(200, {});

            profileService.updateProfile("ASD")
                .success(function (data) {
                    expect(data).toEqual({});
                });

            httpBackend.flush();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();

        });

        it("should update current user's password", function () {
            httpBackend
                .expectPOST(server_url+"api/rest-auth/password/change/", {
                    "old_password": "b",
                    "new_password1": "a",
                    "new_password2": "a"
                })
                .respond(200, {});

            profileService.updatePassword("b", "a", "a")
                .success(function (data) {
                    expect(data).toEqual({});
                });

            httpBackend.flush();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it("should reject password change request if they don't match", function () {
            profileService.updatePassword("c", "a", "b")
                .then(null, function (data) {
                    expect(data).toEqual({
                        "detail": "The two passwords do not match"
                    });
                });

            rootScope.$apply();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();

        });

        it("should reject password change request if new and old passwords match", function () {
            profileService.updatePassword("a", "a", "a")
                .then(null, function (data) {
                    expect(data).toEqual({
                        "detail": "The current password is the same as the old password"
                    });
                });

            rootScope.$apply();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it("should send a password reset request", function () {
            var data = {
                "email": "mail@domain.com"
            };
            httpBackend.expectPOST(server_url + "api/rest-auth/password/reset/", data).respond(200);

            profileService.resetPassword("mail@domain.com");

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();
        });

        it("should reject password reset request if both passwords don't match", function () {
            profileService.resetPasswordConfirm(1, 2, "b", "a")
                .then(null, function (data) {
                    expect(data).toEqual({
                        "detail": "The two passwords do not match"
                    });
                });

            rootScope.$apply();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it("should reset a user's password", function () {
            var data = {
                "uid": 1,
                "token": 2,
                "new_password1": "b",
                "new_password2": "b"
            };

            httpBackend
                .expectPOST(server_url+"api/rest-auth/password/reset/confirm/", data)
                .respond(200);
            profileService.resetPasswordConfirm(1, 2, "b", "b");

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();
        });
    });
})(angular);
