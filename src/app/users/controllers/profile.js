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
            $scope.title = [
                {
                    icon: "fa-envelope",
                    name: "Manage Users Contacts"
                }
            ];
            $scope.user_id = loginService.getUser().id;
            $scope.contact = {
                contact_type: "",
                contact: ""
            };

            wrappers.contact_types.list()
                .success(function (data) {
                    $scope.contact_types = data.results;
                })
                .error(function (data) {
                    $log.error(data);
                });

            wrappers.user_contacts.filter({"user": $scope.user_id})
                .success(function(data) {
                    $scope.contacts = data.results;
                })
                .error(function (data) {
                    $log.error(data);
                });

            $scope.remove = function (obj) {
                obj.delete_spinner = true;
                wrappers.user_contacts.remove(obj.id)
                .success(function () {
                    wrappers.contacts.remove(obj.contact)
                    .success(function () {
                        obj.delete_spinner = false;
                        $scope.contacts = _.without($scope.contacts, obj);
                    })
                    .error(function (data) {
                        $log.error(data);
                    });
                })
                .error(function (data) {
                    $log.error(data);
                });
            };

            $scope.add = function () {
                $scope.spinner = true;
                wrappers.contacts.create({
                    "contact_type": $scope.contact.contact_type,
                    "contact": $scope.contact.contact
                })
                .success(function (data) {
                    wrappers.user_contacts.create({
                        "user": $scope.user_id,
                        "contact": data.id
                    })
                    .success(function (data) {
                        $scope.contacts.push(data);
                        $scope.contact = {
                            contact_type: "",
                            contact: ""
                        };
                        $scope.spinner = false;
                    })
                    .error(function (data) {
                        $log.error(data);
                    });
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }
    ])

    .controller("mfl.users.controllers.profile.basic",
        ["$scope", "$log", "$window", "mfl.auth.services.profile", "mfl.common.forms.changes",
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
                $scope.spinner = true;
                var storage = $window.localStorage;
                var changed = formService.whatChanged(frm);
                var store_key = "auth.user";

                if(! _.isEmpty(changed)) {
                    profileService.updateProfile(changed)
                        .success(function (data) {
                            $scope.spinner = false;
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
        ["$scope", "$log", "mfl.auth.services.profile", "mfl.auth.services.login",
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
