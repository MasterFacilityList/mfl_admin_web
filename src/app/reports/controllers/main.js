(function (angular) {

    "use strict";

    angular.module("mfl.reports.controllers.base", [])

    .controller("mfl.reports.controllers.main", ["$scope",
        function($scope){
        $scope.hide_sidebar = false;
    }]);
})(window.angular);
