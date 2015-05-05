"use strict";
angular.module("mflAppConfig", ["mfl.auth.permissions",
    "sil.grid", "mfl.auth.services"])

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
        silGridConfig.appConfig = "mfl.settings";
    }])

    .run(["mfl.auth.services.login","$state",
        function (authService, $state) {
            if(!authService.isLoggedIn()) {
                $state.go("login");
            }

        }
    ])
    .run(["$rootScope","$state","mfl.auth.services.login",
        "mfl.auth.permissions.permissionList",
        function ($rootScope,$state, authService, permissionService) {
            $rootScope.$on("$stateChangeStart", function (event) {
                if(!authService.isLoggedIn()){
                    $state.go("login");
                }
                else{
                    console.log(event);
                    console.log("logged in");
                    $rootScope.current_user = authService.getUser();
                    var permissionList =
                        $rootScope.current_user.all_permissions;
                    permissionService.setPermissions(permissionList);
                    //console.log(permissionList);
                }
            });
        }
    ]);

