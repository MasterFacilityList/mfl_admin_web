(function (angular, _) {
    "use strict";

    angular.module("mfl.common.directives")
    .directive("mflActive", [function (){
        return function(scope, element, attrs) {
            $(element).click(function(event) {
                if(_.isEmpty(attrs.disabled)){
                    event.preventDefault();
                }
            });
        };

    }]);
})(angular, _);
