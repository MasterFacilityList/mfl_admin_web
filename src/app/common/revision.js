(function (angular) {
    "use strict";

    angular.module("mfl.common.revision", [])

    .controller("mfl.revision.controller", ["$scope", "$log",
        function ($scope, $log) {
            if (! $scope.wrapper) {
                throw new Error("wrapper for revision is undefined");
            }
            $scope.showRevisions = false;

            $scope.hideRevisions = function () {
                $scope.showRevisions = false;
            };

            $scope.fetchRevisions = function () {
                var success_fxn = function (data) {
                    $scope.revisions = data.data.revisions;
                    $scope.showRevisions = true;
                };
                var err_fxn = function (data) {
                    $log.error(data);
                };
                var params = {
                    "fields": "__rev__",
                    "include_audit": true
                };
                $scope.wrapper.get($scope.id, params).then(success_fxn, err_fxn);
            };
        }
    ])

    .directive("mflRevisionView", [function () {
        return {
            "restrict": "E",
            "templateUrl": "common/tpls/revision.list.tpl.html",
            "scope": {
                "wrapper": "=",
                "id": "="
            },
            "controller": "mfl.revision.controller"
        };
    }]);

})(window.angular);
