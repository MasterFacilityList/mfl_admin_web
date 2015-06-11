(function (angular) {
    "use strict";
    angular.module("mfl.common.directives.delete", ["ui.router"])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("mfl_delete", {
            url: "/delete/",
            views: {
                "main": {
                    controller: "MflDeleteController",
                    templateUrl: "common/tpls/delete.tpl.html"
                },
                "header@mfl_delete": {
                    controller: "mfl.common.controllers.header",
                    templateUrl: "common/tpls/header.tpl.html"
                }
            },
            data : { pageTitle: "Service Management" }
        });
    }])

    .controller("MflDeleteController", ["$scope", "$state","$log",
    "$window", "deleteService",
    function($scope, $state, $log, $window, deleteService){
        var sett = deleteService.getConfig();
        $scope.onSuccess = function(){
            $state.go(sett.onSuccessUrl, sett.successUrlParams);
        };
        $scope.onError = function(error){
            $log.warn(error);
        };
        $scope.remove = function(){
            var api = angular.injector(["ng","mflAdminApp"]).get(sett.api);
            api[sett.apiKey].remove(sett.resourceId).then(
                $scope.onSuccess, $scope.onError);
        };

        $scope.cancel = function(){
            try{
                $state.go($scope.onCanceUrl, $scope.onCancelUrlParams);
            }catch(errr){
                $window.history.back();
            }
        };
    }])

    .service("deleteService", [function(){
        var deleteConfig = {};
        return {
            addConfig: function(config){
                deleteConfig = config;
            },
            getConfig: function(){
                return deleteConfig;
            }
        };
    }])

    .directive("mflDelete", ["$state","deleteService",
    function ($state, deleteService) {
        return {
            restrict: "EA",
            replace: true,
            scope: {
                api: "@api",
                apiKey: "@",
                resourceId: "@",
                resouceName: "@",
                onSuccessUrl: "@",
                onSuccessUrlParams: "@",
                onCancelUrl: "@",
                onCanceUrlParams: "@"
            },
            controller: "MflDeleteController",
            link: function ($scope, $element) {
                $element.on("click", function(event){
                    event.preventDefault();
                    deleteService.addConfig({
                        api: $scope.api,
                        apiKey: $scope.apiKey,
                        resourceId: $scope.resourceId,
                        resourceName: $scope.resourceName,
                        onSuccessUrl: $scope.onSuccessUrl,
                        onSuccessUrlParams: $scope.onSuccessUrlParams,
                        onCancelUrl: $scope.onCanceUrl,
                        onCancelUrlParams: $scope.onCancelUrlParams
                    });
                    $state.go("mfl_delete");
                });
            }
        };
    }]);
})(angular);
