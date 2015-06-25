(function () {

    "use strict";

    describe("Test statemodal directive", function () {
        var tpl = "<statemodal><div>hello world</div></statemodal>";

        beforeEach(function () {
            module("mfl.common.directives.statemodal");
            module("templates-app");
        });

        it("should compile", function () {
            inject(["$compile","$rootScope", function ($compile, $rootScope) {
                var scope = $rootScope.$new();
                var element = $compile(tpl)(scope);
                scope.$apply(element);
                expect(element.find("ng-transclude").html()).toContain("hello world");
            }]);
        });
    });
})();
