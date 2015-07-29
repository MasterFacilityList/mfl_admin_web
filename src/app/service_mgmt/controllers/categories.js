(function (angular, _) {

    "use strict";

    angular.module("mfl.service_mgmt.controllers.categories", [
        "ui.router",
        "mfl.common.forms",
        "mfl.service_mgmt.services"
    ])

    .controller("mfl.service_mgmt.controllers.category_list", ["$scope", function ($scope) {
        $scope.filters = {
            "fields": "id,name,abbreviation,description,"
        };
    }])

    .controller("mfl.service_mgmt.controllers.category_edit",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.service_mgmt.wrappers", "mfl.common.forms.changes",
        function ($scope, $state, $stateParams, $log, wrappers, forms) {
            $scope.category_id = $stateParams.category_id;

            wrappers.categories.get($scope.category_id).success(function (data) {
                $scope.category = data;
                $scope.deleteText = $scope.category.name;
            }).error(function (data) {
                $log.warn(data);
            });

            $scope.save = function (frm) {
                var changed = forms.whatChanged(frm);

                if (! _.isEmpty(changed)) {
                    wrappers.categories.update($scope.category_id, changed)
                        .success(function () {
                            $state.go(
                                "service_mgmt.category_list",
                                {"category_id": $scope.category_id},
                                {reload: true}
                            );
                        });
                }
            };
            $scope.remove = function () {
                wrappers.categories.remove($scope.category_id).success(function(){
                    $state.go("service_mgmt.category_list",{},{reload:true});
                }).error(function(error){
                    $scope.alert = error.error;
                });
            };
            $scope.cancel = function () {
                $state.go("service_mgmt.category_list.category_edit");
            };
        }
    ])

    .controller("mfl.service_mgmt.controllers.category_create",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.service_mgmt.wrappers",
        function ($scope, $state, $stateParams, $log, wrappers) {
            $scope.category = wrappers.newCategory();

            $scope.save = function () {
                wrappers.categories.create($scope.category)
                .success(function (data) {
                    $state.go(
                        "service_mgmt.category_list",
                        {"category_id": data.id},
                        {reload: true}
                    );
                });
            };
        }
    ]);

})(window.angular, window._);
