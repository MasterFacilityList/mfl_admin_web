(function (angular) {
    "use strict";
    angular.module("mfl.common.directives.multistep", [])

    .directive("multiStep", [function () {
        return {
            templateUrl : "common/tpls/list.assignment.tpl.html",
            restrict : "EA"
        };
    }]);
})(angular);
