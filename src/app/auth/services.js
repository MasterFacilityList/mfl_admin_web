(function () {
    "use strict";

    angular.module("mfl.auth.services", [
        "mfl.common.storage",
        "sil.api.wrapper",
        "mfl.auth.oauth2"
    ])

    .service("mfl.auth.services.login", ["api",
        "mfl.common.storage.localStorage", "api.oauth2",
        function (API, storage, oauth2) {
            var url = {
                curr_user : "api/rest-auth/user/"
            };
            var store_keys = {
                user : "auth.user",
                is_logged_in : "auth.logged"
            };

            var api = API.getApi();

            this.login = function (user) {
                return oauth2.fetchToken(user.username, user.password);
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
                var has_token = oauth2.getToken();
                if(_.isNull(logged_in) || _.isNull(has_token)) {
                    return false;
                }
                return logged_in;
            };
            this.logout = function () {
                storage.removeItem(store_keys.user);
                storage.removeItem(store_keys.logged_in);
                storage.clear();
                return oauth2.revokeToken();
            };
        }
    ]);

})(angular);
