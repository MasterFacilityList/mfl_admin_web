(function () {

    "use strict";

    describe("Auth service test: ", function () {
        var url;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("sil.api.wrapper");
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

        it("should have auth login service defeined",
        inject(["mfl.auth.services.login", function (loginService) {
            expect(loginService).toBeDefined();
        }]));

        it("should have all the methods defined",
        inject(["mfl.auth.services.login", function (loginService) {
            expect(loginService.login).toBeDefined();
            expect(loginService.currentUser).toBeDefined();
            expect(loginService.saveUser).toBeDefined();
            expect(loginService.isLoggedIn).toBeDefined();
            expect(angular.isFunction (loginService.login)).toBeTruthy();
            expect(angular.isFunction (loginService.currentUser)).toBeTruthy();
            expect(angular.isFunction (loginService.saveUser)).toBeTruthy();
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
        it("should call the saveUser function",
            inject(["mfl.auth.services.login", "$window", function (loginService, $window) {
                var user = {
                    username : "owagaantony",
                    email : "owagaantony@gmail.com"
                };
                loginService.saveUser(user);
                expect(JSON.parse($window.localStorage.getItem("auth.user"))).toEqual(user);
            }])
        );
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
})();
