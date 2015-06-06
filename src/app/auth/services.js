(function (angular, _) {
    "use strict";

    angular.module("mfl.auth.services", [
        "sil.api.wrapper",
        "mfl.auth.oauth2"
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
        ["$rootScope", "mfl.auth.services.login", "$state", "HOME_PAGE_NAME",
        function ($rootScope, loginService, $state, HOME_PAGE_NAME) {
            var cancel_listen;
            var start = function () {
                cancel_listen = $rootScope.$on("$stateChangeStart", function (evt, toState) {
                    if (loginService.isLoggedIn()) {
                        if (toState.name === "login") {
                            evt.preventDefault();
                            $state.go(HOME_PAGE_NAME);
                        }
                        return;
                    }

                    if (_.contains(["login", "logout", ""], toState.name)) {
                        return;
                    }

                    evt.preventDefault();
                    $state.go("login", {"next": toState.name});
                });
            };

            var stop = function () {
                try {
                    cancel_listen();
                } catch (e) {
                }
            };

            return {
                "startListening": start,
                "stopListening": stop
            };
        }
    ]);

})(angular, _);
