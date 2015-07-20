(function(angular){
    "use strict";
    angular.module("mfl.setup.keph.controllers",[
        "mfl.setup.api"
    ])
    .controller("mfl.setup.controller.keph.list", ["$scope",
        function ($scope) {
            $scope.title = {
                name: "KEPH"
            };

            $scope.action = [
                {
                    func : "ui-sref='setup.kephs.keph_create'" +
                           " requires-user-feature='is_staff'" +
                           " requires-permission='common.add_keph'",
                    class: "action-btn action-btn-primary action-btn-md",
                    tipmsg: "New KEPH",
                    icon: "fa-plus",
                    wording: ""
                }
            ];
        }]
    );
})(window.angular);
