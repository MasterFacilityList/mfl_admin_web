(function (angular, _) {
    "use strict";

    angular.module("mfl.common.filters", [])

    .filter("contact_type", function () {
        return function (cont_typeId, contact_types) {
            var result = _.findWhere(contact_types, {id : cont_typeId});
            return result.name;
        };
    });
})(angular, _);
