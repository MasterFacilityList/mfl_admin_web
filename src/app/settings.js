(function (angular) {
    "use strict";

    angular.module("mfl.settings", [
        "ngCookies","sil.api.wrapper",
        "mfl.common.providers"
    ])

    .constant("SERVER_URL", "http://localhost:8061/")

    .config(["SERVER_URL", "apiConfigProvider",
        function(SERVER_URL, apiConfig){
            apiConfig.SERVER_URL = SERVER_URL;
        }
    ])

    .run(["$http","$cookies", function ($http, $cookies) {
        // apparently the angular doesn"t do CSRF headers using
        // CORS across different domains thereby this hack
        var csrftoken = $cookies.csrftoken;
        var header_name = "X-CSRFToken";
        $http.defaults.headers.common[header_name] = csrftoken;
        $.ajaxSetup({
            xhrFields: {
                withCredentials: true
            }
        });
    }])

    .config(["$httpProvider",function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common = {
            "Content-Type":"application/json",
            "Accept" : "application/json, */*"
        };

    }]);

})(angular);
