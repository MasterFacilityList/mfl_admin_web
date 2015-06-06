(function (angular) {
    "use strict";

    angular.module("mfl.users.controllers.profile", [
        "mfl.users.services",
        "mfl.common.forms",
        "mfl.auth.services"
    ])

    .controller("mfl.users.controllers.profile.base", ["$scope",
        function ($scope) {
            $scope.title = "Profile";
        }
    ])

    .controller("mfl.users.controllers.profile.basic",
        ["$scope", "$log", "$window", "mfl.users.services.profile", "mfl.common.forms.changes",
        function ($scope, $log, $window, profileService, formService) {
            $scope.title = [
                {
                    icon: "fa-user",
                    name: "User Details"
                }
            ];
            profileService.getProfile()
                .success(function (data) {
                    $scope.profile = data;
                })
                .error(function (data) {
                    $log.error(data);
                });

            $scope.save = function (frm) {
                var storage = $window.localStorage;
                var changed = formService.whatChanged(frm);
                var store_key = "auth.user";

                if(! _.isEmpty(changed)) {
                    profileService.updateProfile(changed)
                        .success(function (data) {
                            storage.setItem(store_key, JSON.stringify(data));
                        })
                        .error(function (data) {
                            $log.error(data);
                        });
                }
            };
        }
    ])

    .controller("mfl.users.controllers.profile.password",
        ["$scope", "$log", "mfl.users.services.profile", "mfl.auth.services.login",
        function ($scope, $log, profileService, loginService) {
            $scope.title = [
                {
                    icon: "fa-lock",
                    name: "User Password"
                }
            ];
            $scope.pwds = {
                "old_pwd": "",
                "new_pwd": "",
                "confirm_pwd": ""
            };

            $scope.save = function (old, pwd1, pwd2) {
                profileService.updatePassword(old, pwd1, pwd2).then(
                    function () {
                        loginService.logout();
                    },
                    function (data) {
                        $log.error(data);
                    }
                );
            };
        }
    ]);

})(angular);
