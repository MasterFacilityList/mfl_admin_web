"use strict";

angular.module("mfl.auth.permissions", ["mfl.auth.services"])

    // .factory("mfl.auth.permissions.permissionList", ["$rootScope",
    //     function ($rootScope) {
    //         var permissionList = "";
    //         return {
    //             setPermissions : function (permissions) {
    //                 permissionList = permissions;
    //                 $rootScope.$broadcast("permissionsChanged");
    //             },
    //             hasPermission : function (permission) {
    //                 permission = permission.trim();
    //                 var checker = "";
    //                 checker = _.contains(permissionList, permission);
    //                 return checker;
    //             }
    //         };
    //     }
    // ]);

    .service("mfl.auth.permissions.permissionList", ["$rootScope",
        function ($rootScope) {
            var permissionList = "";

            this.setPermissions = function (permissions) {
                permissionList = permissions;
                $rootScope.$broadcast("permissionsChanged");
            };

            this.hasPermission = function (permission) {
                permission = permission.trim();
                var checker = "";
                checker = _.contains(permissionList, permission);
                return checker;
            };
        }
    ]);
