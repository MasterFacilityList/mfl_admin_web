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

            var change_state = function (name, args) {
                var $state = $injector.get("$state");
                $state.go(name, args);
            };

            var page_check = function (evt, toState) {
                if (loginService.isLoggedIn()) {
                    if (toState.name === "login") {
                        evt.preventDefault();
                        change_state(HOME_PAGE_NAME);
                    } else if (! permChecker.hasPermission(toState.permission)) {
                        evt.preventDefault();
                        window.alert("You don't have permission to access the page.");
                    }
                    return;
                }

                if (_.contains(["login", "logout", ""], toState.name)) {
                    return;
                }

                evt.preventDefault();
                change_state("login", {"next": toState.name});
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
    ]);

})(angular, _);
