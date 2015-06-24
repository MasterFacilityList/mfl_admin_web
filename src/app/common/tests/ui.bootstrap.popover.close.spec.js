(function () {
    "use strict";
    describe("Directive: Testing popover toggle directive", function () {
        var tpl = "<button popover-toggle></button>";
        beforeEach(function () {
            module("mfl.common.directives.uipopoverclose");
        });
        it("should compile popover toggle directive", function () {
            bard.inject(this, "$compile","$rootScope");
            var scope = $rootScope.$new();
            var element = $compile(tpl)(scope);
            scope.$apply(element);
        });
        it("should use timeout to toggle popover", function () {
            bard.inject(this, "$compile","$rootScope","$timeout");
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