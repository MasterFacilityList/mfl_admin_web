(function (angular) {
    "use strict";

    angular.module("mfl.common.directives.contentslidein", [])

    .directive("contentSlideIn", [function () {
        function link( $scope, element, attributes ) {
            var expression = attributes.contentSlideIn;
            var duration = ( attributes.slideShowDuration || "fast" );
            if ( ! $scope.$eval(expression)) {
                element.hide();
            }
            $scope.$watch(
                expression,
                function( newValue, oldValue ) {
                    if ( newValue === oldValue ) {
                        return;
                    }
                    if ( newValue ) {
                        element
                            .stop( true, true )
                            .slideDown( duration )
                        ;
                    } else {
                        element
                            .stop( true, true )
                            .slideUp( duration )
                        ;
                    }
                }
            );
        }
        return({
            link: link,
            restrict: "A"
        });
    }]);
})(angular);
