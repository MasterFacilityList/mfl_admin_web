"use strict";
angular.module("mflAppConfig", ["ngCookies",
    "sil.grid", "mfl.settings", "mfl.common.providers"])
    .config(["$httpProvider",function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common = {
            "Content-Type":"application/json",
            "Accept" : "application/json, */*"
        };
        //$httpProvider.interceptors.push("sessionInjector");
        /*$httpProvider.interceptors.push(""sessionInjector"");
        $httpProvider.interceptors.push("api.http.interceptor");
        $httpProvider.interceptors.push("api.connection.interceptor");*/

    }])

    //beginning of configuring interceptor
    .config(function($httpProvider) {
        $httpProvider.interceptors.push("myCSRF");
    })

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

    .run(["mfl.auth.services.login", "$state",
        function (authService, $state) {
            if(!authService.isLoggedIn()) {
                $state.go("login");
            }
        }
    ])

    .run(["$rootScope", "$state", "mfl.auth.services.login",
        function ($rootScope, $state, authService) {
            $rootScope.$on("$stateChangeStart", function () {
                if(!authService.isLoggedIn()){
                    $state.go("login");
                }
                else{
                    $rootScope.current_user = authService.getUser();
                    console.log($rootScope.current_user);
                }
            });
        }
    ])

    .config(["silGridConfigProvider", function(silGridConfig){
            silGridConfig.apiMaps = {
                    practitioners: ["mfl.practitioners.wrapper", "practitionersApi"],
                    facilities : ["mfl.facilities.wrapper",
                        "facilitiesApi"],
                    chul: ["mfl.chul.wrapper", "chulApi"],
                    officers: ["mfl.officers.wrapper", "officersApi"],
                    counties: ["mfl.counties.wrapper", "countiesApi"],
                    constituencies: ["mfl.constituencies.wrapper", "constituenciesApi"],
                    wards: ["mfl.wards.wrapper", "wardsApi"],
                    towns: ["mfl.towns.wrapper", "townsApi"],
                    owners: ["mfl.facilities.wrapper", "ownersApi"]
                };
            silGridConfig.appConfig = "mflAppConfig";
        }]);
