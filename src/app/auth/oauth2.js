(function (angular, _, jQuery, moment) {
    "use strict";

    angular.module("mfl.auth.oauth2", [])

    .service("api.oauth2",
        ["$window", "$http", "$timeout", "CREDZ",
        function ($window, $http, $timeout, credentials) {
            var store_key = "auth.token";
            var storage = $window.localStorage;
            var token_timeout = 10 * 1000; // 10 seconds
            var request = null;

            var setXHRToken = function (token) {
                var auth_token = token.token_type + " " + token.access_token;
                $http.defaults.headers.common.Authorization = auth_token;
                jQuery.ajaxSetup({
                    headers: {
                        Authorization: auth_token
                    }
                });
            };

            var storeToken = function (token) {
                setXHRToken(token);
                var till = moment().add(token.expires_in, "seconds");
                token.expire_at = till;
                storage.setItem(store_key, JSON.stringify(token));
                // refresh token before it expires
                $timeout(function () {
                    refreshToken(token);
                }, (parseInt(token.expires_in, 10) * 1000) - token_timeout);
                request = null;
            };

            var requestError = function () {
                request = null;
            };

            var tokenRequest = function (payload) {
                if (! _.isNull(request)) {
                    return request;
                }
                request = $http({
                    url:  credentials.token_url,
                    data: payload,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).success(storeToken).error(requestError);
                return request;
            };

            var revokeToken = function (token) {
                var payload =
                    "token=" + token.access_token +
                    "&client_id=" + credentials.client_id +
                    "&client_secret=" + credentials.client_secret;

                storage.removeItem(store_key);
                return $http({
                    url: credentials.revoke_url,
                    data: payload,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization" : token.token_type + " " + token.access_token
                    }
                });
            };

            var refreshToken = function (token) {
                var payload =
                    "grant_type=" + "refresh_token" +
                    "&refresh_token=" + token.refresh_token +
                    "&client_id=" + credentials.client_id +
                    "&client_secret=" + credentials.client_secret;

                return tokenRequest(payload);
            };

            var fetchToken = function (username, password) {
                var payload =
                    "grant_type=" + "password" +
                    "&username=" + username +
                    "&password=" + password +
                    "&client_id=" + credentials.client_id +
                    "&client_secret=" + credentials.client_secret;

                return tokenRequest(payload);
            };

            var getToken = function () {
                var token = JSON.parse(storage.getItem(store_key));
                if (! _.isNull(token)) {
                    if (moment(token.expire_at) > moment().add(token_timeout, "ms")) {
                        return token;
                    }
                    storage.removeItem(store_key);
                }

                return null;
            };

            return {
                "getToken": getToken,
                "fetchToken": fetchToken,
                "refreshToken": refreshToken,
                "setXHRToken": setXHRToken,
                "storeToken": storeToken,
                "revokeToken": revokeToken
            };
        }
    ]);

})(angular, _, jQuery, moment);
