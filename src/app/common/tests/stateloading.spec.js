(function () {
    "use strict";
    describe("Directive: Testing state loading directive", function () {
        var tpl = "<state-loader></state-loader>";
        beforeEach(function () {
            module("mfl.common.directives.stateloading");
        });
        it("should compile stateloading directive", function () {
            bard.inject(this, "$compile","$rootScope");
            var scope = $rootScope.$new();
            var element = $compile(tpl)(scope);
            scope.$apply(element);
        });
    });
})();