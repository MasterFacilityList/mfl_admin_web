"use strict";

angular.module("mfl.common.directives")
.directive("actionbar", ["$compile", function ($compile) {  //Generates breadcrumbs
    return {
        restrict: "E",
        replace: true,
        scope:{
            action:"="
        },
        template: "<div class='content-header-extra'></div>",
        link: function ($scope, $element) {
            var action = "";
            _.each($scope.action, function (link) {
                action = action + "<a class='item-ch-extra " + link.color +
                    "' tooltip-placement='bottom' tooltip='"+link.tipmsg+"'><i class=' fa "+
                    link.icon+"'></i></a>";
            });
            $element.html(action);
            $compile($element)($scope);
        }
    };
}]);
