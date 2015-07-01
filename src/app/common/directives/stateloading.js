(function(angular){
    "use strict";

    angular.module("mfl.common.directives.stateloading", [])

    .directive("stateLoading",["$rootScope",function($rootScope){
        return {
            restrict:"E",
            template:"<span ng-if='isRouteLoading'>Loading..."+
            "<i class='fa fa-spin fa-circle-o-notch fa-2x'></i></span>",
            link:function(scope){
                scope.isRouteLoading = false;

                $rootScope.$on("$routeChangeStart", function(){
                    scope.isRouteLoading = true;
                });

                $rootScope.$on("$routeChangeSuccess", function(){
                    scope.isRouteLoading = false;
                });
            }
        };
    }]);
})(angular);