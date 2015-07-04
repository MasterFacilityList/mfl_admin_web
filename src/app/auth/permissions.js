(function (angular, _) {
    "use strict";

    angular.module("mfl.auth.permissions", [
        "mfl.auth.services"
    ])

    .service("mfl.auth.permissions.checker",
        ["mfl.auth.services.login", function (loginService) {

            var hasPermission =  function (permission) {
                if ((! angular.isString(permission)) || permission === "") {
                    return false;
                }

                if (! loginService.isLoggedIn()) {
                    return false;
                }

                var user_perms = loginService.getUser().all_permissions;
                return _.contains(user_perms, permission.toLowerCase());
            };

            var hasUserFeature = function (feature) {
                if ((! angular.isString(feature)) || feature === "") {
                    return false;
                }

                if (! loginService.isLoggedIn()) {
                    return false;
                }
                return (loginService.getUser()[feature]) ? true : false;
            };

            return {
                "hasPermission": hasPermission,
                "hasUserFeature": hasUserFeature
            };
        }
    ])

    .directive("requiresPermission", ["mfl.auth.permissions.checker",
        function (permChecker) {
            return {
                $$tlb: true, // https://github.com/angular/angular.js/issues/6042
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
    ])

    .directive("requiresUserFeature", ["mfl.auth.permissions.checker",
        function (permChecker) {
            return {
                $$tlb: true, // http://stackoverflow.com/questions/16072529
                restrict: "A",
                transclude: "element",
                priority: 1600,
                link: function (scope, element, attrs, controller, transclude) {
                    transclude(scope, function (clone) {
                        if (permChecker.hasUserFeature(attrs.requiresUserFeature)) {
                            element.after(clone);
                        }
                    });
                }
            };
        }
    ]);

})(angular, _);
