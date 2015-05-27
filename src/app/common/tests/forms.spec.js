(function () {
    "use strict";

    describe("Test for form.js", function () {
        beforeEach(function () {
            module("mfl.common.forms");
        });
        it("should have the form service defined",
        inject(["mfl.common.forms.changes", function (formService) {
            expect(formService).toBeDefined();
        }]));
        it("should check if form is empty",
        inject(["mfl.common.forms.changes", function (formService) {
            var empty = {};
            var res = formService.whatChanged(empty);
            expect(res).toEqual(empty);
        }]));

        it("should check if form is not empty",
        inject(["mfl.common.forms.changes", function (formService) {
            var form = {
                name: "",
                $dirty : true,
                email : {
                    $dirty : true
                }
            };
            formService.whatChanged(form);
            console.log(form[3]);
        }]));

        it("should check if form is not empty",
        inject(["mfl.common.forms.changes", function (formService) {
            var form = {
                name: undefined,
                $dirty : true,
                email : {
                    $dirty : true
                }
            };
            formService.whatChanged(form);
        }]));
    });

    describe("Test forms module", function () {

        beforeEach(function () {
            module("mfl.common.forms");
        });

        it("should do nothing if form is undefined", function () {
            inject(["mfl.common.forms.changes", function (changes) {
                expect(changes.whatChanged()).toEqual({});
            }]);
        });

        it("should skip clean forms", function () {
            inject(["mfl.common.forms.changes", function (changes) {
                expect(changes.whatChanged({"$dirty": false, "name": "val"})).toEqual({});
            }]);
        });

        it("should do nothing for empty dirty forms", function () {
            inject(["mfl.common.forms.changes", function (changes) {
                expect(changes.whatChanged({"$dirty": false})).toEqual({});
            }]);
        });

        it("should return changed values in dirty forms", function () {
            inject(["mfl.common.forms.changes", function (changes) {
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
            }]);
        });
    });

})();
