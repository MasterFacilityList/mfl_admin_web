(function (angular) {

    "use strict";

    angular.module("mfl.common.forms", [])

    .service("mfl.common.forms.changes", [function () {

        this.whatChanged = function (frm) {
            var vals = {};

            if (_.isUndefined(frm)) {
                return vals;
            }

            if (frm.$dirty === true) {
                for (var f in frm) {
                    if (_.isUndefined(frm[f])) {
                        continue;
                    }
                    if (frm[f].$dirty === true) {
                        vals[f] = frm[f].$modelValue;
                    }

                }
            }

            return vals;
        };

    }]);

})(angular);
