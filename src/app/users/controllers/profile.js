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
            $scope.title = "Basic Profile";
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
        ["$scope", "mfl.users.services.profile",
        function ($scope, profileService) {
            $scope.title = "Password";

            $scope.save = function (pwd1, pwd2) {
                profileService.updatePassword(pwd1, pwd2)
                    .success(function () {})
                    .error(function () {});
            };
        }
    ]);

})(angular);
