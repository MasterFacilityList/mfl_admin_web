(function (angular) {
    "use strict";

    angular.module("mfl.users.controllers", [
        "mfl.users.controllers.profile",
        "mfl.users.controllers.users",
        "mfl.users.controllers.roles"
    ])

    .controller("mfl.users.controllers.home", ["$scope", "mfl.auth.services.login",
        function ($scope, loginService) {
            $scope.user = loginService.getUser();
            $scope.test = "Manage users";
            $scope.title = [
                {
                    icon: "fa-user",
                    name: "Manage users"
                }
            ];
            $scope.action = [
                {
                    func : "onclick=window.history.back()",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go back",
                    icon: "fa-arrow-left"
                }
            ];
        }
    ]);

})(angular);
