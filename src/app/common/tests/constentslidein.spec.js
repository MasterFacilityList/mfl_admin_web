(function () {
    "use strict";

    describe("Testing Directive: contentSlideIn",
        function() {
        var $compile, $rootScope;
        var directiveTpl =
            "<span class=\"hide-content\" content-slide-in=\"isVisible.isNutrition\" " +
            "slide-show-duration=\"1000\"></span>";

        beforeEach(function(){
            module("mfl.common.directives.contentslidein");

            inject(function(_$compile_, _$rootScope_){
                $compile = _$compile_;
                $rootScope = _$rootScope_;
            });
        });

        it("Should create a content slide-in element",
            function(){
                //var $scope = $rootScope.$new();
                var $scope = $rootScope;
                //$scope.isVisible.isNutrition = true;
                var $element = $compile(directiveTpl)($scope);
                $element.attr.contentSlideIn = "isVisible.isNutrition";
                $scope.$digest();

                $element.attr.contentSlideIn = "!isVisible.isNutrition";
                $scope.$digest();

                expect($element.has("content-slide-in")).toBeTruthy();
                expect($element.has("slide-show-duration")).toBeTruthy();
                expect($element.attr("content-slide-in")).toEqual("isVisible.isNutrition");
                expect($element.attr("slide-show-duration")).toEqual("1000");
            });

        it("Should default duration to fast", function(){
            var tpl = "<div content-slide-in='isVisible'></div>";
            var scope = $rootScope.$new();
            scope.isVisible = false;
            $compile(tpl)(scope);
            scope.$apply();
        });

        it("Should show view of the content slide-in", function(){
            var scope = $rootScope.$new();
            scope.isVisible = {isNutrition: false};
            var element = $compile(directiveTpl)(scope);
            scope.$apply();

            scope.isVisible.isNutrition = true;
            scope.$apply();
            expect(element.attr("style")).not.toContain("none");
        });

        it("Should hide view of the content slide-in", function() {
            var scope = $rootScope.$new();
            scope.isVisible = {isNutrition: true};
            var element = $compile(directiveTpl)(scope);
            scope.$apply();

            scope.isVisible.isNutrition = false;
            scope.$apply();

            expect(element.attr("style")).toContain("");
        });
    });
})();
