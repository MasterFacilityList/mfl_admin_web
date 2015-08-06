(function () {
    "use strict";

    describe("Test form changes", function () {
        var changes;

        beforeEach(function () {
            module("mfl.common.forms");

            inject(["mfl.common.forms.changes", function (c) {
                changes = c;
            }]);
        });

        it("should do nothing if form is undefined", function () {
            expect(changes.whatChanged()).toEqual({});
        });

        it("should skip clean forms", function () {
            expect(changes.whatChanged({"$dirty": false, "name": "val"})).toEqual({});
        });

        it("should do nothing for empty dirty forms", function () {
            expect(changes.whatChanged({"$dirty": false})).toEqual({});
        });

        it("should return changed values in dirty forms", function () {
            var frm = {
                "$dirty": true,
                "one": {
                    "$dirty": false,
                    "$modelValue": "one_val"
                },
                "two": {
                    "$dirty": true,
                    "$modelValue": "two_val"
                },
                "three": undefined,
                "four": {
                }
            };
            expect(changes.whatChanged(frm)).toEqual({"two": "two_val"});
        });
    });

    describe("Test directives", function () {
        var rootScope, compile;

        beforeEach(function () {
            module("mfl.common.forms");

            inject(["$rootScope", "$compile", function (r, c) {
                rootScope = r;
                compile = c;
            }]);
        });

        describe("Test drferrmsg directive", function () {

            it("should watch errors", function () {
                var tpl = "<drf-err-msg></drf-err-msg>";
                var scope = rootScope.$new();
                var el = compile(tpl)(scope);
                expect(el.html()).not.toContain("dl");

                scope.errors = {name: ["yeah"]};
                scope.$apply();
                expect(el.html()).toContain("dl");
                expect(el.html()).toContain("yeah");

                scope.errors = null;
                scope.$apply();
                expect(el.html()).not.toContain("dl");
            });

            it("should use defined error key", function () {
                var tpl = "<drf-err-msg errors='haha'></drf-err-msg>";
                var scope = rootScope.$new();
                var el = compile(tpl)(scope);
                scope.haha = {name: ["yeah"]};
                scope.$apply();
                expect(el.html()).toContain("dl");
                expect(el.html()).toContain("yeah");
            });
        });

        describe("Test apichecker directive", function () {

            it("should complain if input name is not set", function () {
                var missing_name = function () {
                    var tpl = "<form><input ng-model='desc' api-checker/></form>";
                    compile(tpl)(rootScope.$new());
                };
                var undefined_name = function () {
                    var tpl = "<form><input ng-model='desc' api-checker name/></form>";
                    compile(tpl)(rootScope.$new());
                };
                var empty_name = function () {
                    var tpl = "<form><input ng-model='desc' api-checker name=''/></form>";
                    compile(tpl)(rootScope.$new());
                };
                expect(missing_name).toThrow();
                expect(empty_name).toThrow();
                expect(undefined_name).toThrow();
            });

            it("should not invalidate initial input", function () {
                var tpl = "<form name='frm'>" +
                          "<input ng-model='desc' api-checker name='name'/>" +
                          "</form>";
                var scope = rootScope.$new();
                var el = compile(tpl)(scope);
                el.children("input").val("test");
                el.children("input").trigger("input");
                expect(scope.frm.$dirty).toBe(true);
                expect(scope.frm.$valid).toBe(true);
            });

            it("should use defined error key", function () {
                var tpl = "<form name='frm'>" +
                          "<div class='form-group'>" +
                          "<input ng-model='name' api-checker='haha' name='name'/>" +
                          "</div>" +
                          "</form>";
                var scope = rootScope.$new();
                scope.haha = {name: ["yeah"]};
                compile(tpl)(scope);
                scope.$apply();
                expect(scope.frm.name.$invalid).toBe(true);
            });

            it("should use not care about other people's errors", function () {
                var tpl = "<form name='frm'>" +
                          "<div class='form-group' id='div_name'>" +
                          "<input class='form-control' ng-model='name' api-checker name='name'/>" +
                          "</div>" +
                          "<div class='form-group' id='div_age'>" +
                          "<input ng-model='age' api-checker name='age'/>" +
                          "</div>" +
                          "</form>";
                var scope = rootScope.$new();
                scope.errors = {age: ["yeah"]};
                compile(tpl)(scope);
                scope.$apply();
                expect(scope.frm.name.$invalid).toBe(false);
                expect(scope.frm.age.$invalid).toBe(true);
            });
        });
    });

})();
