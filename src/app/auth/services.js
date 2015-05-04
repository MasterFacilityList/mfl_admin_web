"use strict";

angular.module("mfl.auth.services", [])

    .service("mfl.auth.services.login", ["mfl.common.providers.requests",
        "mfl.common.services.localForage",
        function (requests, forageService) {
            var url = {
                login : "api/rest-auth/login/",
                logout : "api/rest-auth/logout/"
            };
            var store_keys = {
                user : "auth.user",
                is_logged_in : "auth.logged"
            };
            this.login = function (user) {
                return requests.callApi("POST", url.login, user);
            };
            this.saveUser = function(user){
                forageService.setItem(store_keys.user, user);
                forageService.setItem(store_keys.is_logged_in, true);
                return;
            };
            this.getUser = function(){
                return forageService.getItem(store_keys.user);
            };
            this.logout = function () {
                forageService.removeItem(store_keys.user);
                forageService.removeItem(store_keys.logged_in);
                forageService.clear();
                return requests.callApi("POST", url.logout);
            };
        }
    ]);
