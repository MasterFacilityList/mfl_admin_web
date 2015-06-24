(function(angular){
    "use strict";

    angular.module("mfl.common.directives.uipopoverclose", ["ui.bootstrap"])

    .config(["$tooltipProvider", function($tooltipProvider) {
        $tooltipProvider.setTriggers({"open": "close"});
    }])

    .directive("popoverToggle",["$timeout",function($timeout) {
        return {
            scope: true,
            link: function(scope, element) {
                scope.toggle = function() {
                    $timeout(function() {
                        element.triggerHandler(scope.openned ? "close" : "open");
                        scope.openned = !scope.openned;
                    });
                };
                return element.on("click", scope.toggle);
            }
        };
    }]);
})(angular);