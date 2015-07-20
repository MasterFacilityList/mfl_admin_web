(function(angular){
    "use strict";

    angular.module("mfl.common.directives.statemodal", [])

    .directive("statemodal", [function() {
        return {
            restrict: "E",
            templateUrl: "common/tpls/statemodal.tpl.html",
            transclude: true
        };
    }]);

})(window.angular);
