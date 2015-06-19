(function (angular) {
    "use strict";
    angular.module("mfl.common.content.slide.in.directive", [])

    .directive("contentSlideIn", [function () {
        // Directive is hooked outside the AngularJS context.
        function link( $scope, element, attributes ) {
            // The expression to watch.
            var expression = attributes.contentSlideIn;
            // The optional slide duration.
            var duration = ( attributes.slideShowDuration || "fast" );
            // I check to see the default display of the
            // element based on the link-time value of the
            // model we are watching.
            if ( ! $scope.$eval(expression)) {
                element.hide();
            }
            $scope.$watch(
                expression,
                function( newValue, oldValue ) {
                    // Ignore first-run values since we've
                    // already defaulted the element state.
                    if ( newValue === oldValue ) {
                        return;
                    }
                    // Show element.
                    if ( newValue ) {
                        element
                            .stop( true, true )
                            .slideDown( duration )
                        ;
                    // Hide element.
                    } else {
                        element
                            .stop( true, true )
                            .slideUp( duration )
                        ;
                    }
                }
            );
        }
        // Return the directive configuration.
        return({
            link: link,
            restrict: "A"
        });
    }]);
})(angular);
