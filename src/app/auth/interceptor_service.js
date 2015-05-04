"use strict";

angular.module("mflApp.interceptors", [])

    .factory("mflApp.interceptors.http", ["$q", "$rootScope",
        function ($q, $rootScope) {
            var error_happend = false;
            return {
                "responseError": function (rejection) {
                    if (rejection.status === 403) {
                        error_happend = true;
                        $rootScope.$broadcast("http.auth.forbidden");
                    } else if (rejection.status === 401) {
                        error_happend = true;
                        $rootScope.$broadcast("http.auth.unauthorized");
                    } else if (rejection.status >= 500) {
                        error_happend = true;
                        $rootScope.$broadcast("http.server.error");
                    }
                    return $q.reject(rejection);
                },
                "response": function(response) {
                    if (error_happend) {
                        error_happend = false;
                        $rootScope.$broadcast("http.error.resolved");
                        console.log("http.error.resolved");
                    }
                    return response;
                }
            };
        }
    ]);
