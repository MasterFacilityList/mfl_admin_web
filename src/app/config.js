"use strict";
angular.module("mflAppConfig", ["ngCookies", "mfl.auth.permissions",
    "sil.grid", "mfl.settings", "mfl.common.providers", "mfl.auth.services"])
    .config(["$httpProvider",function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common = {
            "Content-Type":"application/json",
            "Accept" : "application/json, */*"
        };

    }])

    //beginning of configuring interceptor
    .config(function($httpProvider) {
        $httpProvider.interceptors.push("myCSRF");
    })
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
    }])

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

    .run(["mfl.auth.services.login",
        function (authService) {
            if(!authService.isLoggedIn()) {
                window.location = "/#login";
            }

        }
    ])
    .run(["$rootScope", "mfl.auth.services.login",
        "mfl.auth.permissions.permissionList",
        function ($rootScope, authService, permissionService) {
            $rootScope.$on("$stateChangeStart", function () {
                if(!authService.isLoggedIn()){
                    window.location = "/#login";
                }
                else{
                    $rootScope.current_user = authService.getUser();
                    var permissionList =
                        $rootScope.current_user.all_permissions;
                    permissionService.setPermissions(permissionList);
                    //console.log(permissionList);
                }
            });
        }
    ]);

