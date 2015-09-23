(function(angular){
    "use strict";

    angular.module("mfl.chul.controllers.approve", [])

    .controller("mfl.chul.controllers.approve_reject", ["$scope",
        "mfl.chul.services.wrappers", "$stateParams","$state",
        function ($scope, wrappers, $stateParams,$state){
            $scope.spinner = true;
            $scope.wrapper = wrappers.chuls;
            wrappers.chuls.get($stateParams.unit_id)
            .success(function (data) {
                $scope.unit = data;
                //checks if chul has been approved/rejected at least once
                $scope.approve_reject = $scope.unit.is_approved || $scope.unit.is_rejected;
                //status of approval
                $scope.approved = $scope.unit.is_approved;
                //status of rejection
                $scope.rejected = $scope.unit.is_rejected;
                $scope.spinner = false;
            })
            .error(function (data) {
                $scope.spinner = false;
                $scope.error = data;
            });
            $scope.approveChu = function (status,comment) {
                if(status === true){
                    $scope.post = {
                        is_approved: true,
                        approval_comment: comment,
                        is_rejected: false
                    };
                } else{
                    $scope.post = {
                        is_rejected: true,
                        rejection_reason: comment,
                        is_approved: false
                    };
                }
                wrappers.chuls.update($stateParams.unit_id,$scope.post)
                .success(function (data) {
                    $scope.unit = data;
                    $scope.spinner = false;
                    if(status === true){
                        $state.go("chu_approve_list");
                    } else {
                        $state.go("chu_reject_list");
                    }
                })
                .error(function (data) {
                    $scope.spinner = false;
                    $scope.error = data;
                });
            };
        }]
    );

})(window.angular);
