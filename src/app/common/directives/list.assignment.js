(function (angular, _) {
    "use strict";

    angular.module("mfl.common.directives.listassignment", [])

    .directive("mflListAssignment", [function () {
        var link_fxn = function (scope, element, attributes) {
            scope.title = attributes.title || "Items";
            scope.uniqueAttr = attributes.uniqueAttr || "id";
            scope.displayAttr = attributes.displayAttr || "name";

            scope.$watch("listeditems", function (new_val) {
                var assigned_ids = _.pluck(scope.assigneditems, scope.uniqueAttr);
                scope.filtered_items = _.filter(new_val, function (item) {
                    return (! _.contains(assigned_ids, item.id));
                });
            });

            scope.clickedItem = function(item){
                item.selected = !item.selected;
            };

            scope.setItem = function(set_item){
                set_item.set_selected = !set_item.set_selected;
            };

            scope.addItems = function () {
                var selected_items = _.where(
                    scope.filtered_items, {"selected": true}
                );
                _.each(selected_items, function (a_item) {
                    a_item.set_selected = false;
                    scope.assigneditems.push(a_item);
                    scope.filtered_items = _.without(scope.filtered_items, a_item);
                });
            };

            scope.revertItems = function () {
                var reverted_items = _.where(
                    scope.assigneditems, {"set_selected": true}
                );
                _.each(reverted_items, function (a_set_item) {
                    a_set_item.selected = false;
                    scope.filtered_items.push(a_set_item);
                    scope.assigneditems = _.without(scope.assigneditems, a_set_item);
                });
            };
        };

        return {
            templateUrl : "common/tpls/list.assignment.tpl.html",
            restrict: "EA",
            scope : {
                listeditems : "=",
                assigneditems : "="
            },
            compile: function (tElem, tAttrs) {
                var write_perm = tAttrs.writePerm || "";
                tElem.find("#lst-available").attr("requires-permission", write_perm);
                tElem.find("#lst-divider").attr("requires-permission", write_perm);
                return link_fxn;
            }
        };
    }]);
})(window.angular, window._);
