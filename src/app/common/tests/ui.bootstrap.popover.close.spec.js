(function () {
    "use strict";
    describe("Directive: Testing popover toggle directive", function () {
        var tpl = "<button popover-toggle></button>";
        var $timeout, $rootScope, $compile;

        beforeEach(function () {
            module("mfl.common.directives.uipopoverclose");
            inject(["$timeout", "$rootScope", "$compile", function (t, r, c) {
                $timeout = t;
                $rootScope = r;
                $compile = c;
            }]);
        });
        it("should compile popover toggle directive", function () {
            var scope = $rootScope.$new();
            var element = $compile(tpl)(scope);
            scope.$apply(element);
        });
        it("should use timeout to toggle popover", function () {
            var scope = $rootScope.$new();
            var el = $compile(tpl)(scope);
            scope.$digest();
            el.trigger("click");
            $timeout.flush();
            el.trigger("click");
            $timeout.flush();
        });
    });
})();
