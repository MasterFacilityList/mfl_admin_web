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

    .controller("mfl.users.controllers.profile.contacts",
        ["$scope", "$log", "mfl.users.services.wrappers", "mfl.auth.services.login",
        function ($scope, $log, wrappers, loginService) {
            $scope.title = "Contacts";
            $scope.user_id = loginService.getUser().id;

            wrappers.contact_types.list()
                .success(function (data) {
                    $scope.contact_types = data;
                })
                .error(function (data) {
                    $log.error(data);
                });

            wrappers.user_contacts.filter({"user": $scope.user_id})
                .success(function(data) {
                    $scope.contacts = data;
                })
                .error(function (data) {
                    $log.error(data);
                });

            $scope.remove = function () {};
            $scope.add = function () {
                var payload = {
                    "user": $scope.user_id,
                    "contact_type": $scope.contact.contact_type,
                    "contact": $scope.contact.contact
                };
                wrappers.user_contacts.add(payload)
                    .success(function (data) {
                        $scope.contacts.push(data);
                    })
                    .error(function (data) {
                        $log.error(data);
                    });
            };
        }
    ])

    .controller("mfl.users.controllers.profile.basic",
        ["$scope", "$log", "$window", "mfl.users.services.profile", "mfl.common.forms.changes",
        function ($scope, $log, $window, profileService, formService) {
            $scope.title = [
                {
                    icon: "fa-user",
                    name: "Basic Details"
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
                    name: "Password"
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
