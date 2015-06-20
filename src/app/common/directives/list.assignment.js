(function (angular) {
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

            //setting params to change classes on click
            scope.clickedRole = function(item){
                item.selected = !item.selected;
            };
            scope.setRole = function(set_item){
                set_item.set_selected = !set_item.set_selected;
            };
            //adding permissions to the role
            scope.addRoles = function () {
                var selected_roles = _.where(
                    scope.filtered_items, {"selected": true}
                );
                _.each(selected_roles, function (a_role) {
                    a_role.set_selected = false;
                    scope.assigneditems.push(a_role);
                    scope.filtered_items = _.without(scope.filtered_items, a_role);
                });
            };
            //end of adding permissions to a role
            //reverting permissions to the role
            scope.revertRoles = function () {
                var reverted_roles = _.where(
                    scope.assigneditems, {"set_selected": true}
                );
                _.each(reverted_roles, function (a_set_role) {
                    a_set_role.selected = false;
                    scope.filtered_items.push(a_set_role);
                    scope.assigneditems = _.without(scope.assigneditems, a_set_role);
                });
            };
            //end of reverting permissions to a role
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
                var read_perm = tAttrs.readPerm || "";
                tElem.find("#lst-available").attr("requires-permission", write_perm);
                tElem.find("#lst-divider").attr("requires-permission", write_perm);
                tElem.find("#lst-assigned").attr("requires-permission", read_perm);
                return link_fxn;
            }
        };
    }]);
})(angular);
