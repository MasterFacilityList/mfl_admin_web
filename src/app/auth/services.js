(function () {
    "use strict";

    angular.module("mfl.auth.services", [
        "sil.api.wrapper",
        "mfl.auth.oauth2"
    ])

    .service("mfl.auth.services.login", ["api", "$window", "api.oauth2",
        function (API, $window, oauth2) {
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
                return api.callApi("GET", api.makeUrl(url.curr_user));
            };
            this.saveUser = function(user){
                storage.setItem(store_key, JSON.stringify(user));
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
                return oauth2.revokeToken();
            };
        }
    ]);

})(angular);
