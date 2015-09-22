(function(angular, _){
    "use strict";

    angular.module("mfl.setup.controllers.documents", [
        "ngFileUpload"
    ])

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

    .directive("mflFile", [function () {

    }])

    .controller("mfl.setup.controllers.documents.edit",
        ["$scope", "adminApi", "$stateParams", "$state",
        function ($scope, adminApi, $stateParams, $state) {
            $scope.title = {
                icon: "",
                name: "Manage Documents"
            };
            $scope.action = [
                {
                    func: "ui-sref='setup.documents.edit.delete({"+
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

            if ($stateParams.document_id) {
                adminApi.documents.get($stateParams.document_id)
                .success(function (data) {
                    $scope.document = {
                        "id": data.id,
                        "name": data.name,
                        "description": data.description,
                        "file_url": data.fyl,
                        "file": null
                    };
                    $scope.deleteText = $scope.document.name;
                })
                .error(function (data) {
                    $scope.errors = data;
                });
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

                    $scope.errors = {"fyl": errors};
                    return false;
                }
                $scope.errors = {"fyl": ["This field is required"]};
                return false;
            };
            $scope.fileUpdated = function (elem, fyl) {
                $scope.document.file = fyl;
                validateFile(elem, fyl);
            };

            var success_fxn = function() {$state.go("setup.documents");};
            var error_fxn = function(data) {$scope.errors = data;};

            $scope.save = function (frm) {
                var f = window.$("input[type='file'][name='fyl']")[0].files[0];
                var payload = {
                    "name": $scope.document.name,
                    "description": $scope.document.description
                };
                var is_update = !!$scope.document.id;

                if (is_update && !f) {
                    // use json if the file is not updated
                    adminApi.documents.update($scope.document.id, payload)
                    .success(success_fxn).error(error_fxn);
                } else {
                    // use multipart form for everything else
                    if (validateFile(frm.fyl, f)) {
                        var url = adminApi.documents.makeUrl(adminApi.documents.apiBaseUrl);
                        if ($scope.document.id) {
                            url += $scope.document.id + "/";
                        }
                        adminApi.uploadFile(url, f, "fyl", payload, is_update)
                        .success(success_fxn).error(error_fxn);
                    }
                }
            };

            $scope.remove = function () {
                adminApi.documents.remove($scope.document.id)
                .success(success_fxn)
                .error(error_fxn);
            };
            $scope.cancel = function () {
                $state.go("setup.documents.edit", {"document_id": $scope.document.id});
            };
        }]
    );

})(window.angular, window._);
