(function (angular, _) {

    "use strict";

    angular.module("mfl.service_mgmt.controllers.categories", [
        "ui.router",
        "mfl.common.forms",
        "mfl.service_mgmt.services",
        "angular-toasty"
    ])

    .controller("mfl.service_mgmt.controllers.category_list", ["$scope", function ($scope) {
        $scope.filters = {
            "fields": "id,name,abbreviation,description,"
        };
    }])

    .controller("mfl.service_mgmt.controllers.category_edit",
        ["$scope", "$state", "$stateParams", "$log",
        "mfl.service_mgmt.wrappers", "mfl.common.forms.changes","toasty",
        function ($scope, $state, $stateParams, $log, wrappers, forms,toasty) {
            $scope.category_id = $stateParams.category_id;
            $scope.wrapper = wrappers.categories;

            $scope.filters = {category:$scope.category_id};
            $scope.edit_view = true;
            wrappers.categories.get($scope.category_id).success(function (data) {
                $scope.category = data;
                $scope.deleteText = $scope.category.name;
            }).error(function (data) {
                $scope.errors = data;
            });
            wrappers.categories.filter({"fields":"id,name", "page_size": 100})
                .success(function (data) {
                    $scope.parents = _.without(
                        data.results, _.findWhere(data.results, {"id": $scope.category_id})
                    );
                })
                .error(function (data) {
                    $scope.errors = data;
                });

            $scope.save = function (frm) {
                var changed = forms.whatChanged(frm);

                if (! _.isEmpty(changed)) {
                    wrappers.categories.update($scope.category_id, changed)
                        .success(function () {
                            toasty.success({
                                title: "Category Updated",
                                msg: "Category has been updated"
                            });
                            $state.go(
                                "service_mgmt.category_list",
                                {"category_id": $scope.category_id},
                                {reload: true}
                            );
                        }).error(function(data){
                            $scope.errors = data;
                        });
                }
            };
            $scope.remove = function () {
                wrappers.categories.remove($scope.category_id).success(function(){
                    toasty.success({
                        title: "Category Deleted",
                        msg: "Category has been deleted"
                    });
                    $state.go("service_mgmt.category_list",{},{reload:true});
                }).error(function(data){
                    $scope.errors = data;
                });
            };
            $scope.cancel = function () {
                $state.go("service_mgmt.category_list.category_edit");
            };
        }
    ])

    .controller("mfl.service_mgmt.controllers.category_create",
        ["$scope", "$state", "$log",
        "mfl.service_mgmt.wrappers","toasty",
        function ($scope, $state, $log, wrappers, toasty) {
            $scope.category = wrappers.newCategory();
            wrappers.categories.filter({"fields":"id,name", "page_size": 100})
                .success(function (data) {
                    $scope.parents = data.results;
                })
                .error(function (data) {
                    $scope.errors = data;
                });

            $scope.save = function () {
                wrappers.categories.create($scope.category)
                .success(function (data) {
                    toasty.success({
                        title: "Category Added",
                        msg: "Category has been added"
                    });
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
