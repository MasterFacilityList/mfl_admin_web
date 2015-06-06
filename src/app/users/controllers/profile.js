(function (angular) {
    "use strict";

    angular.module("mfl.users.controllers.profile", [
        "mfl.users.services",
        "mfl.common.forms"
    ])

    .controller("mfl.users.controllers.profile.base", ["$scope",
        function ($scope) {
            $scope.title = "Profile";
        }
    ])

    .controller("mfl.users.controllers.profile.basic",
        ["$scope", "$log", "mfl.users.services.profile", "mfl.common.forms.changes",
        function ($scope, $log, profileService, formService) {
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
                var changed = formService.whatChanged(frm);
                if(! _.isEmpty(changed)) {
                    profileService.updateProfile(changed)
                        .success(function () {/* update auth service store */ })
                        .error(function (data) {
                            $log.error(data);
                        });
                }
            };
        }
    ])

    .controller("mfl.users.controllers.profile.password",
        ["$scope", "$log", "mfl.users.services.profile",
        function ($scope, $log, profileService) {
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
                    function () {},
                    function (data) {
                        $log.error(data);
                    }
                );
            };
        }
    ]);

})(angular);
