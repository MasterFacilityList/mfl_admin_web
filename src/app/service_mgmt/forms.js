(function (angular) {

    angular.module("mfl.service_mgmt.forms", [])

    .service("mfl.service_mgmt.forms.changes", [function () {

        this.whatChanged = function (frm) {
            var vals = {};

            if (frm.$dirty === true) {
                for (var f in frm) {
                    if (_.isUndefined(frm[f])) {
                        continue;
                    }
                    if (frm[f].$dirty === true) {
                        vals[f] = frm[f].$modelValue.trim();
                    }
                }
            }

            return vals;
        };

    }]);

})(angular);

