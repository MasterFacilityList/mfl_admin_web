(function () {
    "use strict";

    angular.module("mfl.auth.services", [
        "mfl.common.storage",
        "sil.api.wrapper"
    ])

    .service("mfl.auth.services.login", ["api", "mfl.common.storage.localStorage",
        function (API, storage) {
            var url = {
                login : "api/rest-auth/login/",
                logout : "api/rest-auth/logout/",
                curr_user : "api/rest-auth/user/"
            };
            var store_keys = {
                user : "auth.user",
                is_logged_in : "auth.logged"
            };

            var api = API.getApi();

            this.login = function (user) {
                return api.callApi("POST", api.makeUrl(url.login), user);
            };
            this.currentUser = function () {
                return api.callApi("GET", api.makeUrl(url.curr_user));
            };
            this.saveUser = function(user){
                storage.setItem(store_keys.user, user);
                storage.setItem(store_keys.is_logged_in, true);
            };
            this.getUser = function(){
                return storage.getItem(store_keys.user);
            };
            this.isLoggedIn = function () {
                var logged_in = storage.getItem(store_keys.is_logged_in);
                if(_.isNull(logged_in)) {
                    return false;
                }
                return logged_in;
            };
            this.logout = function () {
                storage.removeItem(store_keys.user);
                storage.removeItem(store_keys.logged_in);
                storage.clear();
                return api.callApi("POST", api.makeUrl(url.logout));
            };
        }
    ]);

})(angular);
