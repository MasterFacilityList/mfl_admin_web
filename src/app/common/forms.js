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
            "restrict": "EA",
            "template": "<div ng-repeat='(key,err) in err_list'>{{key}}:<p ng-repeat='e in err'>{{e}}</p></div>",
            "controller": ["$scope", function ($scope) {
                $scope.$watch("errors", function (val) {
                    if (val) {
                        $scope.err_list = _.omit(val, "error_msg");
                    }
                });
            }],
            "link": function (scope, element, attrs) {
                scope.formName = attrs.formName;
            }
        };
    })

    .factory("bs3Custom", ["bootstrap3ElementModifier", function (bs3) {
        return {
            "makeInvalid": bs3.makeInvalid,
            "makeValid": bs3.makeValid,
            "makeDefault": bs3.makeDefault,
            "enableValidationStateIcons": false,
            "key": "bs3Custom"
        };
    }]);

})(window.angular, window._);
