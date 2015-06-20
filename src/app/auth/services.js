(function (angular, _) {
    "use strict";

    angular.module("mfl.auth.services", [
        "sil.api.wrapper",
        "mfl.auth.oauth2",
        "mfl.auth.permissions",
        "ui.router"
    ])

    .service("mfl.auth.services.login", ["api", "$window", "$q", "api.oauth2",
        function (API, $window, $q, oauth2) {
            var url = {
                curr_user : "api/rest-auth/user/"
            };
            var store_key = "auth.user";
            var api = API.getApi();
            var storage = $window.localStorage;

            this.login = function (user) {
                return oauth2.fetchToken(user.username, user.password);
            };

            this.currentUser = function () {
                return api.callApi("GET", api.makeUrl(url.curr_user))
                    .success(function (data) {
                        storage.setItem(store_key, JSON.stringify(data));
                    });
            };

            this.getUser = function(){
                return JSON.parse(storage.getItem(store_key));
            };

            this.isLoggedIn = function () {
                var user = this.getUser();
                var has_token = oauth2.getToken();
                return (! _.isNull(user)) && (! _.isNull(has_token));
            };

            this.logout = function () {
                storage.removeItem(store_key);
                return oauth2.revokeToken(oauth2.getToken());
            };
        }
    ])

    .service("mfl.auth.services.statecheck",
        ["$rootScope", "$injector", "mfl.auth.services.login",
        "mfl.auth.permissions.checker", "HOME_PAGE_NAME",
        function ($rootScope, $injector, loginService, permChecker, HOME_PAGE_NAME) {
            var cancel_listen;

            var change_state = function (evt, name, args) {
                var $state = $injector.get("$state");
                evt.preventDefault();
                return $state.go(name, args);
            };

            var page_check = function (evt, toState, toParams) {
                if (loginService.isLoggedIn()) {
                    if (toState.redirectTo) {
                        change_state(evt, toState.redirectTo, toParams);
                    } else if (toState.requireUser === false) {
                        change_state(evt, HOME_PAGE_NAME);
                    } else if (! permChecker.hasPermission(toState.permission)) {
                        change_state(evt, "common_403");
                    }
                    return;
                }

                if ((toState.requireUser === false) || (toState.name === "logout")) {
                    return;
                }

                change_state(evt, "login", {"next": toState.name});
            };

            var start = function () {
                cancel_listen = $rootScope.$on("$stateChangeStart", page_check);
            };

            var stop = function () {
                try {
                    cancel_listen();
                } catch (e) {
                }
            };

            return {
                "startListening": start,
                "stopListening":  stop
            };
        }
    ])

    .service("mfl.auth.services.profile", ["$q", "api", function ($q, API) {
        var urls = {
            user_profile: "api/rest-auth/user/",
            password_change: "api/rest-auth/password/change/",
            reset_password: "api/rest-auth/password/reset/",
            reset_password_confirm: "api/rest-auth/password/reset/confirm/"
        };
        var api = API.getApi();

        var getProfile = function () {
            return api.callApi("GET", api.makeUrl(urls.user_profile));
        };
        var updateProfile = function (data) {
            return api.callApi("PATCH", api.makeUrl(urls.user_profile), data);
        };
        var updatePassword = function (old, pwd1, pwd2) {
            if (pwd1 !== pwd2) {
                return $q.reject({"detail": "The two passwords do not match"});
            }
            if (old === pwd1) {
                return $q.reject({
                    "detail": "The current password is the same as the old password"
                });
            }
            return api.callApi("POST", api.makeUrl(urls.password_change), {
                "old_password": old,
                "new_password1": pwd1,
                "new_password2": pwd2
            });
        };

        var resetPassword = function (email) {
            var data = {"email": email};
            return api.callApi("POST", api.makeUrl(urls.reset_password), data);
        };

        var resetPasswordConfirm = function (uid, token, pwd1, pwd2) {
            if (pwd1 !== pwd2) {
                return $q.reject({"detail": "The two passwords do not match"});
            }
            var data = {
                "uid": uid,
                "token": token,
                "new_password1": pwd1,
                "new_password2": pwd2
            };
            return api.callApi("POST", api.makeUrl(urls.reset_password_confirm), data);
        };

        return {
            "getProfile": getProfile,
            "updateProfile": updateProfile,
            "updatePassword": updatePassword,
            "resetPassword": resetPassword,
            "resetPasswordConfirm": resetPasswordConfirm
        };
    }]);

})(angular, _);
