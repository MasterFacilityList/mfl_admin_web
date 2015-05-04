"use strict";
angular.module("mflAppConfig", ["ngCookies",
    "sil.grid", "mfl.settings", "mflApp.interceptors"])
    .config(["$httpProvider", function ($httpProvider) {
            $httpProvider.defaults.withCredentials = false;
            $httpProvider.defaults.headers.common = {
                "Content-Type": "application/json",
                "Accept": "application/json, */*"
            };
            /*$httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
            $httpProvider.defaults.xsrfCookieName = "csrftoken";*/
            $httpProvider.interceptors.push(
                "mflApp.interceptors.http");

            //$httpProvider.defaults.withCredentials = true;
        }])

    /*.run(["$http", function ($http) {
        //$http.defaults.withCredentials = false;
        $http.defaults.xsrfHeaderName = "X-CSRFToken";
        $http.defaults.xsrfCookieName = "csrftoken";
    }])*/

    .run(["$http",
        function ($http) {
            /*var csrftoken = $cookies.csrftoken;
            var header_name = "X-CSRFToken";
            $httpProvider.defaults.headers.get['My-Header']= .
            $http.defaults.headers.common[header_name] = csrftoken;*/
            $http.defaults.xsrfHeaderName = "X-CSRFToken";
            $http.defaults.xsrfCookieName = "csrftoken";
            $.ajaxSetup({
                xhrFields: {
                    withCredentials: true
                }
            });
            console.log($http.defaults.headers.common);
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
