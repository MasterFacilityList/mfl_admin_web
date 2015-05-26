"use strict";

angular.module("mfl.auth.services", ["mfl.common.services"])

    .service("mfl.auth.services.login", ["mfl.common.providers.requests",
        "mfl.common.services.localStorage",
        function (requests, forageService) {
            var url = {
                login : "api/rest-auth/login/",
                logout : "api/rest-auth/logout/",
                curr_user : "api/rest-auth/user/"
            };
            var store_keys = {
                user : "auth.user",
                is_logged_in : "auth.logged"
            };
            this.login = function (user) {
                return requests.callApi("POST", url.login, user);
            };
            this.currentUser = function () {
                return requests.callApi("GET", url.curr_user);
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
                forageService.removeItem(store_keys.user);
                forageService.removeItem(store_keys.logged_in);
                forageService.clear();
                return requests.callApi("POST", url.logout);
            };
        }
    ]);
