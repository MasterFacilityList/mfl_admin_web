"use strict";

angular.module("mfl.auth.directives", ["mfl.auth.permissions"])

    .directive("hasPermission", ["mfl.auth.permissions.permissionList",
        "$compile", function (authService, $compile) {
            return {
                //restrict : "A",
                transclude : "element",
                link : function (
                    scope, element, attrs, controller, transclude) {
                    //transclude function to clone element when condition met
                    transclude(scope, function (clone) {
                        var value = attrs.hasPermission;
                        var hasPermission = authService.hasPermission(value);
                        if(hasPermission) {
                            $compile(element.after(clone));
                        }
                    });
                }
            };
        }
    ]);
