(function(angular, _){
    "use strict";

    angular.module("mfl.setup.controllers.documents", ["mfl.setup.api"])

    .controller("mfl.setup.controllers.documents.list", ["$scope", function ($scope) {
        $scope.title = {
            icon: "",
            name: "Manage Documents"
        };

        $scope.filters =  {
            "fields": "id,name,description,fyl"
        };
        $scope.action = [
            {
                func : "ui-sref='setup.documents.create'" +
                       " requires-user-feature='is_staff'" +
                       " requires-permission='common.view_documentupload'",
                class: "btn btn-primary",
                tipmsg: "Add document",
                wording: "Add Document"
            }
        ];
    }])

    .controller("mfl.setup.controllers.documents.edit",
        ["$scope", "adminApi", "$stateParams", "$state", "$window",
        function ($scope, adminApi, $stateParams, $state, $window) {
            $scope.state = !_.isUndefined($stateParams.document_id);
            $scope.title = {
                icon: "",
                name: "Manage Documents"
            };
            $scope.action = [
                {
                    func: "ng-show='state' ui-sref='setup.documents.edit.delete({"+
                        "document_id:document.id})'" +
                       " requires-user-feature='is_staff'" +
                       " requires-permission='common.delete_documentupload'",
                    class: "btn btn-danger",
                    wording: "Delete",
                    tipmsg: "Delete Document"
                }
            ];
            $scope.wrapper = adminApi.documents;
            $scope.document = {
                "id": "",
                "name": "",
                "description": "",
                "file_url": "",
                "file": null
            };

            var success_fxn = function() {$state.go("setup.documents");};
            var error_fxn = function(config) {$scope.errors = _.omit(config.data, "error_msg");};

            var is_update = !!$stateParams.document_id;

            if (is_update) {
                adminApi.documents.get($stateParams.document_id)
                .then(function (config) {
                    $scope.document = {
                        "id": config.data.id,
                        "name": config.data.name,
                        "description": config.data.description,
                        "file_url": config.data.fyl,
                        "file": null
                    };
                    $scope.deleteText = $scope.document.name;
                }, error_fxn);
            }
            var validateFile = function (frm_field, fyl_obj) {
                var max_size = (100 * 1024 * 1024);  // 100MB
                var min_size = (1 * 1024);  // 1KB
                if (angular.isObject(fyl_obj)) {
                    var errors = [];
                    if (fyl_obj.size > max_size) {
                        errors.push("The file is too big");
                    }
                    if (fyl_obj.size < min_size) {
                        errors.push("The file is too small");
                    }
                    if (_.isEmpty(errors)) {
                        return true;
                    }

                    $scope.errors = {};
                    $scope.errors[frm_field.$name] = errors;
                    return false;
                }
                $scope.errors = {};
                $scope.errors[frm_field.$name] = ["This field is required"];
                return false;
            };
            $scope.fileUpdated = function (elem, fyl) {
                $scope.document.file = fyl;
                validateFile(elem, fyl);
            };

            $scope.save = function (frm) {
                var f = $window.$("input[type='file'][name='fyl']")[0].files[0];
                var payload = {
                    "name": $scope.document.name,
                    "description": $scope.document.description
                };

                if (is_update && !f) {
                    // use json if the file is not updated
                    adminApi.documents.update($scope.document.id, payload)
                    .then(success_fxn, error_fxn);
                } else {
                    // use multipart form for everything else
                    if (validateFile(frm.fyl, f)) {
                        var url = adminApi.documents.makeUrl(adminApi.documents.apiBaseUrl);
                        if ($scope.document.id) {
                            url += $scope.document.id + "/";
                        }
                        adminApi.uploadFile(url, f, "fyl", payload, is_update)
                        .then(success_fxn, error_fxn);
                    }
                }
            };

            $scope.remove = function () {
                adminApi.documents.remove($scope.document.id)
                .then(success_fxn, error_fxn);
            };
            $scope.cancel = function () {
                $state.go("setup.documents.edit", {"document_id": $scope.document.id});
            };
        }]
    );

})(window.angular, window._);
