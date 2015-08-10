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
    .filter("dateFilter", ["$filter", function ($filter) {
        return function (input) {
            return $filter("date")(input, "EEE, dd MMM yyyy hh:mm a");
        };
    }])
    .filter("boolFilter", function() {
        return function(s) {
            if (s === true) {
                return "Yes";
            }
            else if (s === false) {
                return "No";
            }
            return s;
        };
    })
    .filter("facilityType", function () {
        return function (list, input) {
            var rslt = _.findWhere(list, {"id" : input});
            if(!rslt) {
                return;
            }
            var output = _.where(list, {"sub_division" : rslt.name});
            return output;
        };
    });
})(window.angular, window._);
