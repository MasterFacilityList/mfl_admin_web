(function (angular, _) {
    "use strict";

    angular.module("mfl.auth.permissions", [
        "mfl.auth.services"
    ])

    .service("mfl.auth.permissions.checker",
        ["mfl.auth.services.login", function (loginService) {

            var hasPermission =  function (permission) {
                if (! angular.isString(permission) || permission === "") {
                    return true;
                }

                if (! loginService.isLoggedIn()) {
                    return false;
                }

                var user_perms = loginService.getUser().all_permissions;
                return _.contains(user_perms, permission.toLowerCase());
            };

            return {
                "hasPermission": hasPermission
            };
        }
    ])

    .directive("requiresPermission", ["mfl.auth.permissions.checker",
        function (permChecker) {
            return {
                restrict: "A",
                transclude: "element",
                priority: 1500, // highest yet : higher than ng-switch (1200)
                link: function (scope, element, attrs, controller, transclude) {
                    transclude(scope, function (clone) {
                        var permission = attrs.requiresPermission;
                        if (permChecker.hasPermission(permission)) {
                            element.after(clone);
                        }
                    });
                }
            };
        }
    ]);

})(angular, _);
