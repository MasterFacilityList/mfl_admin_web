(function (angular, _) {

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

    }])

    .directive("drfErrMsg", function () {
        return {
            "restrict": "E",
            "template": "<div class='alert alert-danger' ng-if='err_list'>" +
                        "<dl ng-repeat='(key,err) in err_list'>" +
                        "<dt>{{key}}</dt>" +
                        "<dd ng-repeat='e in err'>{{e}}</dd>" +
                        "</dl></div>",
            "link": function (scope, element, attrs) {
                var api_errs = attrs.errors || "errors";
                scope.$watch(api_errs, function (val) {
                    if (val) {
                        scope.err_list = _.omit(val, "error_msg");
                        if (_.isEmpty(scope.err_list)) {
                            scope.err_list = {
                                "": ["An error occured while processing your request"]
                            };
                        }
                    } else {
                        scope.err_list = null;
                    }
                });
            }
        };
    })

    .directive("apiChecker", [function () {
        return {
            "restrict": "A",
            "require": ["ngModel", "^form"],
            "link": function (scope, element, attrs, ctrls) {
                var ngModel = ctrls[0];
                var api_errs = attrs.apiChecker || "errors";
                var bad_val;

                if (! attrs.name) {
                    throw new Error("name is not specified for the input : "+element.html());
                }
                ngModel.$validators.api = function (v) {
                    if (! scope[api_errs]) {  // api errors not defined
                        return true;
                    }
                    if (scope[api_errs][attrs.name] !== undefined) {
                        return v !== bad_val;
                    }
                    return true;
                };
                scope.$watch(api_errs, function (v) {
                    if (v && v[attrs.name]) {
                        bad_val = ngModel.$modelValue;
                        ngModel.$setValidity("api", false);
                        // TODO : Add hack for pristine/untouched forms w/o viewvalue/modelvalue
                    }
                });
            }
        };
    }]);

})(window.angular, window._);
