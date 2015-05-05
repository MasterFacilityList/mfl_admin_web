"use strict";

angular.module("mfl.auth.directives", ["mfl.auth.permissions"])

    .directive("hasPermission", ["mfl.auth.permissions.permissionList",
        function (authService) {
            return {
                link : function (scope, element, attrs) {
                    if(!_.isString(attrs.hasPermission)) {
                        throw "has permissions value must be a string";
                    }
                    var value = attrs.hasPermission.trim();
                    console.log(value);
                    var notPermissionFlag = value[0] === "!";
                    if(notPermissionFlag) {
                        value = value.slice(1).trim();
                    }
                    function toggleVisibilityBasedOnPermissions() {
                        var hasPermission = authService.hasPermission(value);
                        if(hasPermission && !notPermissionFlag ||
                            !hasPermission && notPermissionFlag) {
                            element.show();
                        }
                        else {
                            element.hide();
                        }
                    }
                    toggleVisibilityBasedOnPermissions();
                    scope.$on("permissionsChanged", toggleVisibilityBasedOnPermissions);
                }
            };
        }
    ]);
