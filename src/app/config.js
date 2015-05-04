"use strict";
angular.module("mflAppConfig", ["ngCookies","sil.grid", "mfl.settings"])
    .config(["$httpProvider", function ($httpProvider) {
            $httpProvider.defaults.withCredentials = false;
            $httpProvider.defaults.headers.common = {
                "Content-Type": "application/json",
                "Accept": "application/json, */*"
            };
        }])

    .run(["$http", "$cookies",
        function ($http, $cookies) {
            // apparently the angular doesn't do CSRF headers using
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
        .config(["silGridConfigProvider", function(silGridConfig){
                silGridConfig.apiMaps = {
                        practitioners: ["mfl.practitioners.wrapper", "practitionersApi"],
                        owners: ["mfl.facilities.wrapper", "ownersApi"],
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
