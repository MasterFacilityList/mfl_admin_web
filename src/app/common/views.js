(function (angular) {

    "use strict";

    angular.module("mfl.common.views", [
    ])

    .controller("mfl.common.views.single", ["$stateParms", function ($stateParms) {

        var createItem = function (wrapper, data) {
            wrapper.create(data)
            .success(function() {})
            .error(function () {});
        };

        var updateItem = function (wrapper, id, data) {
            wrapper.update(id, data)
            .success(function () {})
            .error(function () {});
        };

        var deleteItem = function (wrapper, id) {
            wrapper.remove(id)
            .success(function () {})
            .error(function () {});
        };

        var openItem = function (wrapper, id, scope) {
            return wrapper.get(id)
            .success(function (data) {
                scope.item = data;
            })
            .error(function () {});
        };

        this.bootstrap = function (scope, id_param, wrapper) {
            scope.wrapper = wrapper;
            scope.item_id = id_param ? $stateParms[id_param] : null;
            scope.item = null;

            scope.openItem = function () {
                return openItem(wrapper, scope.item_id);
            };

            scope.deleteItem = function () {
                return deleteItem(wrapper, scope.item_id);
            };

            scope.saveItem = function (data) {
                if (scope.item_id) {
                    return updateItem(wrapper, scope.item_id, data);
                }
                return createItem(wrapper, data);
            };
        };
    }]);

})(window.angular);
