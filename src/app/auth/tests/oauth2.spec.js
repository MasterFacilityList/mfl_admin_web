(function (angular, jQuery, moment) {
    "use strict";

    describe("Test mfl.auth.oauth2 service :", function () {
        var access_token, refresh_token, store_key;

        beforeEach(function () {
            angular.module("xyz", []).constant("CREDZ", {
                "client_id": "a",
                "client_secret": "b",
                "token_url": "http://a.server/o/token/",
                "revoke_url": "http://a.server/o/revoke_token/"
            });
            module("mfl.auth.oauth2");
            module("xyz");
        });

        beforeEach(function () {
            access_token = {
                "access_token": "pcQyIBpcsklNuZlAflBruEmREvpl8a",
                "token_type": "Bearer",
                "expires_in": 36000,
                "refresh_token": "jwBcSt8ms4kJEtcF8Bl6jjrqG7YQb8",
                "scope": "read write"
            };
            refresh_token = {
                "access_token": "typo",
                "token_type": "Bearer",
                "expires_in": 36000,
                "refresh_token": "pypo",
                "scope": "read write"
            };
            store_key = "auth.token";
        });

        afterEach(function () {
            inject(["$window", "$http", function ($window, $http) {
                $window.localStorage.removeItem(store_key);
                delete $http.defaults.headers.common.Authorization;
            }]);
        });

        it("should store get token from storage", function () {
            inject(["$window", "api.oauth2", function ($window, oauth2) {
                access_token.expire_at = moment().add(1, "year");
                $window.localStorage.setItem(store_key, JSON.stringify(access_token));
                var token = oauth2.getToken();
                expect(token.expires_in).toEqual(access_token.expires_in);
                expect(token.scope).toEqual(access_token.scope);
                expect(token.access_token).toEqual(access_token.access_token);
                expect(token.refresh_token).toEqual(access_token.refresh_token);
            }]);
        });

        it("should return null if store is empty", function () {
            inject(["$window", "api.oauth2", function ($window, oauth2) {
                $window.localStorage.removeItem(store_key);
                var token = oauth2.getToken();
                expect(token).toBe(null);
            }]);
        });

        it("should remove expired token from storage", function () {
            inject(["$window", "api.oauth2", function ($window, oauth2) {
                access_token.expire_at = moment().subtract(1, "year");
                $window.localStorage.setItem(store_key, JSON.stringify(access_token));
                var token = oauth2.getToken();
                expect(token).toBe(null);
                expect($window.localStorage.getItem(store_key)).toBe(null);
            }]);
        });

        it("should fetch a token from oauth2 provider and store it", function () {
            inject(["$window", "$httpBackend", "CREDZ", "api.oauth2",
                function ($window, $httpBackend, credz, oauth2) {
                    var payload =
                        "grant_type=" + "password" +
                        "&username=" + "username" +
                        "&password=" + "password" +
                        "&client_id=" + credz.client_id +
                        "&client_secret=" + credz.client_secret;
                    $httpBackend
                        .expectPOST(credz.token_url, payload)
                        .respond(200, access_token);

                    oauth2.fetchToken("username", "password");
                    $httpBackend.flush();
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();

                    var token = JSON.parse($window.localStorage.getItem(store_key));
                    expect(token.expires_in).toEqual(access_token.expires_in);
                    expect(token.scope).toEqual(access_token.scope);
                    expect(token.access_token).toEqual(access_token.access_token);
                    expect(token.refresh_token).toEqual(access_token.refresh_token);
                    expect(moment(token.expire_at)).toBeGreaterThan(moment());
                }
            ]);
        });

        it("should allow another token request on failure", function () {
            inject(["$window", "$httpBackend", "CREDZ", "api.oauth2",
                function ($window, $httpBackend, credz, oauth2) {
                    var payload =
                        "grant_type=" + "password" +
                        "&username=" + "username" +
                        "&password=" + "password" +
                        "&client_id=" + credz.client_id +
                        "&client_secret=" + credz.client_secret;
                    $httpBackend
                        .expectPOST(credz.token_url, payload)
                        .respond(500);

                    var rq1 = oauth2.fetchToken("username", "password");
                    $httpBackend.flush();
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();

                    var rq2 = oauth2.fetchToken();
                    expect(rq1).not.toEqual(rq2);
                }
            ]);
        });

        it("should not issue multiple unresolved requests to fetch a token", function () {
            inject(["api.oauth2", function (oauth2) {
                var rq = oauth2.fetchToken();

                var rq2 = oauth2.fetchToken();
                expect(rq).toEqual(rq2);

                var rq3 = oauth2.refreshToken(access_token);
                expect(rq).toEqual(rq3);
            }]);
        });

        it("should refresh a token from oauth2 provider and store new token", function () {
            inject(["$window", "$httpBackend", "CREDZ", "api.oauth2",
                function ($window, $httpBackend, credz, oauth2) {
                    $window.localStorage.setItem(store_key, JSON.stringify(access_token));

                    var payload =
                        "grant_type=" + "refresh_token" +
                        "&refresh_token=" + access_token.refresh_token +
                        "&client_id=" + credz.client_id +
                        "&client_secret=" + credz.client_secret;

                    $httpBackend
                        .expectPOST(credz.token_url, payload)
                        .respond(200, refresh_token);

                    oauth2.refreshToken(access_token);

                    $httpBackend.flush();
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();

                    var token = JSON.parse($window.localStorage.getItem(store_key));
                    expect(token.expires_in).toEqual(refresh_token.expires_in);
                    expect(token.scope).toEqual(refresh_token.scope);
                    expect(token.access_token).toEqual(refresh_token.access_token);
                    expect(token.refresh_token).toEqual(refresh_token.refresh_token);
                    expect(moment(token.expire_at)).toBeGreaterThan(moment());
                }
            ]);
        });

        it("should set XHR authorization headers after fetching a token", function () {
            inject(["$window", "$httpBackend", "$http", "CREDZ", "api.oauth2",
                function ($window, $httpBackend, $http, credz, oauth2) {
                    var payload =
                        "grant_type=" + "password" +
                        "&username=" + "username" +
                        "&password=" + "password" +
                        "&client_id=" + credz.client_id +
                        "&client_secret=" + credz.client_secret;
                    $httpBackend
                        .expectPOST(credz.token_url, payload)
                        .respond(200, access_token);

                    oauth2.fetchToken("username", "password");
                    $httpBackend.flush();
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();

                    var token = JSON.parse($window.localStorage.getItem(store_key));
                    var header_value = token.token_type + " " + token.access_token;

                    expect($http.defaults.headers.common.Authorization).toEqual(header_value);
                    expect(jQuery.ajaxSettings.headers.Authorization).toEqual(header_value);
                }
            ]);
        });

        it("should set a token refresh timeout", function () {
            inject(["$window", "$httpBackend", "$timeout", "CREDZ", "api.oauth2",
                function ($window, $httpBackend, $timeout, credz, oauth2) {
                    var payload =
                        "grant_type=" + "password" +
                        "&username=" + "username" +
                        "&password=" + "password" +
                        "&client_id=" + credz.client_id +
                        "&client_secret=" + credz.client_secret;
                    $httpBackend
                        .expectPOST(credz.token_url, payload)
                        .respond(200, access_token);

                    oauth2.fetchToken("username", "password");
                    $httpBackend.flush();
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();

                    $httpBackend.resetExpectations();

                    payload =
                        "grant_type=" + "refresh_token" +
                        "&refresh_token=" + access_token.refresh_token +
                        "&client_id=" + credz.client_id +
                        "&client_secret=" + credz.client_secret;

                    $httpBackend
                        .expectPOST(credz.token_url, payload)
                        .respond(200, refresh_token);

                    $timeout.flush();

                    $httpBackend.flush();
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
                }
            ]);
        });

        it("should revoke a token", function () {
            inject(["$window", "$httpBackend", "CREDZ", "api.oauth2",
                function ($window, $httpBackend, credz, oauth2) {
                    $window.localStorage.setItem(store_key, JSON.stringify(access_token));
                    var payload =
                        "token=" + access_token.access_token +
                        "&client_id=" + credz.client_id +
                        "&client_secret=" + credz.client_secret;
                    $httpBackend
                        .expectPOST(credz.revoke_url, payload)
                        .respond(200);

                    oauth2.revokeToken(access_token);

                    $httpBackend.flush();
                    $httpBackend.verifyNoOutstandingRequest();
                    $httpBackend.verifyNoOutstandingExpectation();

                    var token = JSON.parse($window.localStorage.getItem(store_key));
                    expect(token).toBe(null);
                }
            ]);
        });

        it("should not revoke an empty token", function () {
            inject(["$window", "$httpBackend", "CREDZ", "api.oauth2", "$q",
                function ($window, $httpBackend, credz, oauth2) {
                    $window.localStorage.setItem(store_key, JSON.stringify(access_token));

                    oauth2.revokeToken();

                    $httpBackend.verifyNoOutstandingRequest();
                    $httpBackend.verifyNoOutstandingExpectation();

                    var token = JSON.parse($window.localStorage.getItem(store_key));
                    expect(token).toBe(null);
                }
            ]);
        });

        it("should not set XHR authorization headers it token is not defined", function () {
            inject(["$http", "api.oauth2", function ($http, oauth2) {
                oauth2.setXHRToken();
                expect($http.defaults.headers.common.Authorization).toBe(undefined);

                oauth2.setXHRToken(null);
                expect($http.defaults.headers.common.Authorization).toBe(undefined);
            }]);
        });
    });

})(angular, jQuery, moment);
