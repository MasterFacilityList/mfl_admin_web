(function(window, angular) {

    "use strict";

    var TEMPLATE_URL = "datepicker.tpl.html";

    angular.module(TEMPLATE_URL, []).run(["$templateCache",
        function($templateCache) {
            $templateCache.put(TEMPLATE_URL,
            "<div class=\"input-group input-group-in\">\n" +
            "     <input \n" +
            "        data-mask=\"date\" \n" +
            "        id=\"date\" \n" +
            "        type=\"text\" \n" +
            "        ng-model=\"ngModel\" \n" +
            "        placeholder=\"{{placeholder}}\"\n" +
            "        class=\"form-control margin-bottom-5\" \n" +
            "        datepicker-popup=\"EEE, dd MMM yyyy\" \n" +
            "        datepicker-append-to-body=\"true\"\n" +
            "        autocomplete=\"off\"\n" +
            "        is-open=\"data.start\" \n" +
            "        ng-click=\"data.start = true\">\n" +
            "</div>");
        }
    ]);


    angular.module("datePicker", ["ui.bootstrap.datepicker", TEMPLATE_URL])

    .directive("datePicker",function(){
        return {
            replace:true,
            templateUrl: TEMPLATE_URL,
            scope: {
                ngModel: "=",
                placeholder: "@"
            }
        };
    }
    );
})(window, angular);