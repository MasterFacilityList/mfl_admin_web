(function (angular) {

    "use strict";

    angular.module("mfl.common.forms", [])

    .service("mfl.common.forms.changes", [function () {

        this.whatChanged = function (frm) {
            var vals = {};

            if (angular.isDefined(frm)) {
                if (frm.$dirty === true) {
                    for (var f in frm) {
                        if (angular.isDefined(frm[f])) {
                            if (frm[f].$dirty === true) {
                                vals[f] = frm[f].$modelValue;
                            }
                        }
                    }
                }
            }
            return vals;
        };

    }]);

})(window.angular);
