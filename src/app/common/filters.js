(function (angular, _) {
    "use strict";

    angular.module("mfl.common.filters", [])

    .filter("contact_type",[function () {
        return function (cont_typeId, contact_types) {
            var result = _.findWhere(contact_types, {id : cont_typeId});
            return result.name;
        };
    }])
    .filter("titlecase", function() {
        return function(s) {
            s = ( s === undefined || s === null ) ? "" : s;
            return s.toString().toLowerCase().replace( /\b([a-z])/g, function(ch) {
                return ch.toUpperCase();
            });
        };
    })
    .filter("boolean", function() {
        return function(s) {
            if (s === "true") {
                return "Yes";
            }
            if (s === "false") {
                return "No";
            }
            else {
                return s;
            }
        };
    });
})(angular, _);
