(function (angular, _) {
    "use strict";

    angular.module("mfl.users.controllers.profile", [
        "mfl.users.services",
        "mfl.common.forms",
        "mfl.auth.services"
    ])

    .controller("mfl.users.controllers.profile.contacts",
        ["$scope", "$log", "mfl.users.services.wrappers", "mfl.auth.services.login",
        function ($scope, $log, wrappers, loginService) {
            $scope.title = {
                icon: "fa-envelope",
                name: "Contacts"
            };
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
                    $scope.errors = data;
                });

            wrappers.user_contacts.filter({"user": $scope.user_id})
                .success(function(data) {
                    $scope.contacts = data.results;
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.errors = data;
                });

            $scope.removeChild = function (obj) {
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
                        $scope.errors = data;
                    });
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.errors = data;
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
                        $scope.errors = data;
                        $scope.spinner = false;
                    });
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.errors = data;
                    $scope.spinner = false;
                });
            };
        }
    ])

    .controller("mfl.users.controllers.profile.basic",
        ["$scope", "$log", "$window", "mfl.auth.services.profile", "mfl.common.forms.changes",
        function ($scope, $log, $window, profileService, formService) {
            $scope.title = {
                icon: "fa-user",
                name: "Basic Details"
            };

            profileService.getProfile()
                .success(function (data) {
                    $scope.profile = data;
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.errors = data;
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
                            $scope.spinner = false;
                            $log.error(data);
                            $scope.errors = data;
                        });
                }
            };
        }
    ])

    .controller("mfl.users.controllers.profile.password",
        ["$scope", "$log", "$state", "$stateParams", "mfl.auth.services.profile",
        "mfl.auth.services.login",
        function ($scope, $log, $state, $stateParams, profileService, loginService) {
            $scope.title = {
                icon: "fa-lock",
                name: "Password"
            };
            var init_pwds = {
                "old_pwd": "",
                "new_pwd": "",
                "confirm_pwd": ""
            };
            $scope.pwds = init_pwds;
            $scope.change_required = (! _.isUndefined($stateParams.required));

            $scope.save = function (old, pwd1, pwd2) {
                profileService.updatePassword(old, pwd1, pwd2).then(
                    function () {
                        loginService.logout();
                        $state.go("logout", {"change_pwd": "true"});
                    },
                    function (data) {
                        $log.error(data);
                        $scope.pwds = init_pwds;
                        $scope.errors = data.data || data;
                    }
                );
            };
        }
    ]);

})(window.angular, window._);
