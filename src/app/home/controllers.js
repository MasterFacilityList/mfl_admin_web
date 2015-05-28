(function (angular) {
    "use strict";

    angular.module("mfl.home.controllers", [])

    .controller("mfl.home.controllers.home", ["$scope",
        "mfl.auth.services.login", "$state", "mfl.home.services.home",
        function ($scope, logoutService, $state, homeService) {
            $scope.test="hello";
            $scope.path = [
                {
                    name: "Home",
                    route: "home"
                }
            ];
            $scope.title = [
                {
                    icon: "fa-home",
                    name: "Home"
                }
            ];
            homeService.getLatestFacilities()
                .success(function (data) {
                    $scope.latest_facilities = data.results;
                })
                .error(function (e) {
                    console.log(e);
                });

            $scope.user = logoutService.getUser();

            $scope.logout = function () {
                logoutService.logout()
                    .success(function () {
                        $state.go("login");
                    })
                    .error(function (e) {
                        console.log(e);
                    });
            };
        }
    ]);

})(angular);
