(function (angular, _) {
    "use strict";

    angular.module("mfl.users.controllers.users", [
        "mfl.auth.services",
        "mfl.users.services",
        "ui.router",
        "mfl.common.forms"
    ])

    .controller("mfl.users.controllers.user_delete",
        ["$scope", "$log", "$state", "$stateParams", "mfl.users.services.wrappers",
        function ($scope, $log, $state, $stateParams, wrappers) {
            $scope.user_id = $stateParams.user_id;

            wrappers.users.get($scope.user_id)
                .success(function (data) {
                    $scope.user = data;
                })
                .error(function (data) {
                    $log.error(data);
                });

            $scope.remove = function () {
                wrappers.users.remove($scope.user_id)
                    .success(function () {
                        $state.go("users");
                    })
                    .error(function (data) {
                        $log.error(data);
                    });
            };
        }]
    )

    .controller("mfl.users.controllers.user_create", [angular.noop])

    .controller("mfl.users.controllers.user_create.basic",
        ["$scope", "$log", "$state", "mfl.users.services.wrappers",
        function ($scope, $log, $state, wrappers) {

            $scope.save = function () {
                wrappers.users.create($scope.user)
                .success(function (data) {
                    $state.go("users.user_edit.basic", {user_id: data.id});
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )

    .controller("mfl.users.controllers.user_edit",
        ["$scope", "$stateParams", "$log", "mfl.users.services.wrappers",
        function ($scope, $stateParams, $log, wrappers) {
            $scope.user_id = $stateParams.user_id;

            wrappers.users.get($scope.user_id)
                .success(function (data) {
                    $scope.user = data;
                })
                .error(function (data) {
                    $log.error(data);
                });
        }]
    )

    .controller("mfl.users.controllers.user_edit.basic",
        ["$scope", "$log", "mfl.common.forms.changes", "mfl.users.services.wrappers",
        function ($scope, $log, formChanges, wrappers) {

            $scope.save = function (frm) {
                var changes = formChanges.whatChanged(frm);

                if (! _.isEmpty(changes)) {
                    wrappers.users.update($scope.user_id, changes)
                    .success(function () {

                    })
                    .error(function (data) {
                        $log.error(data);
                    });
                }
            };
        }]
    )

    .controller("mfl.users.controllers.user_edit.contacts",
        ["$scope", "$log", "mfl.users.services.wrappers",
        function ($scope, $log, wrappers) {
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
                wrappers.user_contacts.remove(obj.id)
                .success(function () {
                    wrappers.contacts.remove(obj.contact)
                    .success(function () {
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

    .controller("mfl.users.controllers.user_edit.groups", [function () {}]);

})(angular, _);
