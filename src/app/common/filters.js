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
        return function (input) {
            var smallWords = /^(a|an|am|and|as|at|but|by|for|in|nor|of|on|or|per|the|to?\.?|via)$/i;
            input = ( input === undefined || input === null ) ? "" : input;
            input = (input.toString()).toLowerCase();
            return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g,
                function(match, index, title) {
                if (index > 0 && index + match.length !== title.length &&
                    match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                    (title.charAt(index + match.length) !== "-" ||
                     title.charAt(index - 1) === "-") &&
                    title.charAt(index - 1).search(/[^\s-]/) < 0) {
                    return match.toLowerCase();
                }

                return match.charAt(0).toUpperCase() + match.substr(1);
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
    .filter("optionName", function () {
        return function (input, list) {
            var rslt = _.findWhere(list, {"id" : input});
            return rslt.display_text;
        };
    })
    .filter("facilityType", function () {
        return function (list, input) {
            var rslt = _.findWhere(list, {"id" : input});
            if(!rslt) {
                return;
            }
            var output = _.where(list, {"sub_division" : rslt.name});
            if(output.length === 0) {
                var arr = [];
                arr.push(rslt);
                return arr;
            }else{
                return output;
            }
        };
    });
})(window.angular, window._);
