(function () {

    "use strict";

    describe("Auth service test: ", function () {
        var url;
        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.common.storage");
            module("sil.api.wrapper");
            module("mfl.auth.services");
        });
        beforeEach(inject(["SERVER_URL",
            function (s) {
                url = s;
            }
        ]));
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
        inject(["$httpBackend","mfl.auth.services.login",
            function ($httpBackend, loginService) {
            var test_data = {
                username: "owagaantony@gmail.com",
                password: "owaga"
            };
            var test_response = JSON.stringify(test_data);
            $httpBackend.expect(
                "POST", url +"api/rest-auth/login/").respond(
                200, test_response);
            var response = loginService.login();
            response.then(function (data) {
                expect(data.data).toEqual(test_data);
            });
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
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
        inject(["mfl.auth.services.login",
            "mfl.common.storage.localStorage",
            function (loginService, localStorageService) {
            spyOn(localStorageService, "setItem");

            var user = {
                username : "owagaantony",
                email : "owagaantony@gmail.com"
            };
            loginService.saveUser(user);

            expect(localStorageService.setItem.calls.length).toEqual(2);
            expect(
                localStorageService.setItem.calls[0].args.length
            ).toEqual(2);
            expect(localStorageService.setItem.calls[0].args[0]).toEqual(
                "auth.user"
            );
            expect(
                JSON.stringify(
                    localStorageService.setItem.calls[0].args[1])).toEqual(
                    JSON.stringify(user)
            );

            expect(localStorageService.setItem.calls[1].args[0]).toEqual(
                "auth.logged"
            );
            expect(localStorageService.setItem.calls[1].args[1]).toBe(true);
        }]));
        it("should call isLoggedIn method",
        inject(["mfl.auth.services.login", "mfl.common.storage.localStorage",
            function (loginService, localStorageService) {
                spyOn(localStorageService, "getItem").andReturn(true);
                var response = loginService.isLoggedIn();
                expect(response).toEqual(true);
            }
        ]));
        it("should call isLoggedIn method: returning false",
        inject(["mfl.auth.services.login", "mfl.common.storage.localStorage",
            function (loginService, localStorageService) {
                var rslt  = null;
                spyOn(localStorageService, "getItem").andReturn(rslt);
                var response = loginService.isLoggedIn();
                expect(response).toEqual(false);
            }
        ]));
        it("should test getUser method",
        inject(["mfl.auth.services.login", "mfl.common.storage.localStorage",
            function (loginService, localStorageService) {
                var user = {username: "antony", password : "owaga"};
                spyOn(localStorageService, "getItem").andReturn(user);
                var result = loginService.getUser();
                expect(result).toEqual(user);
            }
        ]));

        it("should test getUser method",
        inject(["mfl.auth.services.login", "mfl.common.storage.localStorage",
            "$httpBackend",
            function (loginService, localStorageService, $httpBackend) {
                spyOn(localStorageService, "removeItem");
                spyOn(localStorageService, "clear");
                loginService.logout();
                $httpBackend.expect(
                    "POST", url +"api/rest-auth/logout/").respond(
                    200, {});
                $httpBackend.flush();
            }
        ]));
    });
})();
