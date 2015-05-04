"use strict";

angular.module("mfl.auth.services", [])

    .service("mfl.auth.services.login", ["mfl.common.providers.requests",
        function (requests) {
            var url = {
                login : "api/rest-auth/login/"
            };
            this.login = function (user) {
                return requests.callApi("POST", url.login, user);
            };
        }
    ]);
