(function (angular, _) {
    "use strict";

    angular.module("mfl.auth.services", [
        "mfl.common.services",
        "sil.api.wrapper"
    ])

    .service("mfl.auth.services.login", ["api", "mfl.common.services.localStorage",
        function (api, forageService) {
            var urls = {
                login : "api/rest-auth/login/",
                logout : "api/rest-auth/logout/",
                curr_user : "api/rest-auth/user/"
            };
            var store_keys = {
                user : "auth.user",
                is_logged_in : "auth.logged"
            };
            var api_wrapper = api.getApi();

            var callApi = function (method, url_stub, data) {
                var url = api_wrapper.makeUrl(urls.login);
                return api_wrapper.callApi(method, url, data);
            };
            this.login = function (user) {
                return callApi("POST", urls.login, user);
            };
            this.currentUser = function () {
                return callApi("GET", urls.curr_user);
            };
            this.saveUser = function(user){
                forageService.setItem(store_keys.user, user);
                forageService.setItem(store_keys.is_logged_in, true);
            };
            this.getUser = function(){
                return forageService.getItem(store_keys.user);
            };
            this.isLoggedIn = function () {
                var logged_in = forageService.getItem(store_keys.is_logged_in);
                if(_.isNull(logged_in)) {
                    return false;
                }
                return logged_in;
            };
            this.logout = function () {
                forageService.clear();
                return callApi("POST", urls.logout);
            };
        }
    ]);

})(angular, _);
