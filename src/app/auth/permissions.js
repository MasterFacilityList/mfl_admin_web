(function (angular, _) {
    "use strict";

    angular.module("mfl.auth.permissions", [
        "mfl.auth.services"
    ])

    .service("mfl.auth.permissions.checker",
        ["mfl.auth.services.login", function (loginService) {
            var LIST_SPLITTER = ",";

            var checkList = function (lst, check_fxn) {
                var items, user;

                if ((! angular.isString(lst)) || lst === "") {
                    return false;
                }

                if (! loginService.isLoggedIn()) {
                    return false;
                }

                items = lst.split(LIST_SPLITTER);
                user = loginService.getUser();

                for (var i = 0; i < items.length; i++) {
                    if (! check_fxn(items[i], user)) {
                        return false;
                    }
                }
                return true;
            };

            var hasPermission =  function (permission) {
                return checkList(permission, function (p, u) {
                    return _.contains(u.all_permissions, p.toLowerCase());
                });
            };

            var hasUserFeature = function (feature) {
                return checkList(feature, function (f, u) {
                    return (u[f]) ? true : false;
                });
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
                priority: 1600,  // higher than requires-permission
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

})(window.angular, window._);
