"use strict";

angular.module("mfl.auth.directives", ["mfl.auth.permissions"])

    .directive("hasPermission", ["mfl.auth.permissions.permissionList",
        function (authService) {
            return {
                restrict : "A",
                transclude : "element",
                link : function (
                    scope, element, attrs, controller, transclude) {
                    //transclude function to clone element when condition met
                    transclude(scope, function (clone) {
                        var value = attrs.hasPermission;
                        var hasPermission = authService.hasPermission(value);
                        if(hasPermission) {
                            element.after(clone);
                        }
                    });
                }
            };
        }
    ]);
