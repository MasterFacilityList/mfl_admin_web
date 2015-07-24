(function (angular, _) {
    "use strict";

    angular.module("mfl.common.directives.contentheader", [])

    .directive("actionbar", ["$compile", function ($compile) {
        return {
            restrict: "E",
            replace: true,
            template: "<div class='action-container content-header-extra'></div>",
            link: function (scope, element) {
                var link_to_html = function (link) {
                    return "<a " + link.func + " class='" + link.class +"' " +
                        "tooltip-placement='bottom' tooltip='"+link.tipmsg+"'>" +
                        "<i class='fa " + link.icon + "'></i> "+
                        "" + link.wording + "</a>";
                };

                var html = _.reduce(scope.action, function (memo, val) {
                    val.wording = val.wording || "";
                    return memo + link_to_html(val);
                }, "");
                element.html(html);
                $compile(element)(scope);
            }
        };
    }])

    .directive("contentheader", [function () {
        return {
            restrict:"E",
            replace:true,
            template: "<div class='content-header'>" +
                "<actionbar action='action'></actionbar>" +
                "<h2 class='content-title'>"+
                "<span class='main-title'>"+
                "<i class='sidebar-icon fa {{title.icon}}'> {{title.name}}</i>"+
                "</span></contenttitle></h2>" +
                "</div>"
        };
    }]);

})(window.angular, window._);
