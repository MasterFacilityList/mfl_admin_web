(function () {
    "use strict";

    describe("Directives: Test the Content Header directive", function() {
        var $compile, $rootScope, directiveTpl;

        beforeEach(function() {
            module("mfl.common.directives.contentheader");

            inject(function (_$compile_, _$rootScope_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
            });
            directiveTpl = "<contentheader></contentheader>";
        });

        it("should create Content Header element",function() {
            var $scope = $rootScope.$new();
            //The passing a template into $compile returns a "linking" function that can
            //be used to take a scope and apply it to the template
            var $element = $compile(directiveTpl)($scope);
            $scope.$digest();
            //Actual test
            expect($element.hasClass("content-header")).toBeTruthy();
        });
    });
})();
