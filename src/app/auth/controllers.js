(function () {
    "use strict";

    angular.module("mfl.auth.controllers", [
        "ui.router"
    ])

    .controller("mfl.auth.controllers.login", ["$scope", "$state", "mfl.auth.services.login",
        function ($scope, $state, loginService) {
            $scope.test = "Login";
            $scope.login_err = "";
            $scope.submitUser = function(obj) {
                loginService.login(obj)
                    .success(function () {
                        loginService.currentUser()
                            .success(function (curr_usr) {
                                loginService.saveUser(curr_usr);
                                // $state.go("home");
                            })
                            .error(function (e) {
                                console.log(e);
                            });
                    })
                    .error(function (e) {
                        $scope.login_err = e.error;
                        console.log($scope.login_err);
                    });
            };
        }
    ]);

})(angular);
