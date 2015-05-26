(function () {
    "use strict";

    describe("Test forms module", function () {

        beforeEach(function () {
            module("mfl.service_mgmt.forms");
        });

        it("should do nothing if form is undefined", function () {
            inject(["mfl.service_mgmt.forms.changes", function (changes) {
                expect(changes.whatChanged()).toEqual({});
            }]);
        });

        it("should skip clean forms", function () {
            inject(["mfl.service_mgmt.forms.changes", function (changes) {
                expect(changes.whatChanged({"$dirty": false, "name": "val"})).toEqual({});
            }]);
        });

        it("should do nothing for empty dirty forms", function () {
            inject(["mfl.service_mgmt.forms.changes", function (changes) {
                expect(changes.whatChanged({"$dirty": false})).toEqual({});
            }]);
        });

        it("should return changed values in dirty forms", function () {
            inject(["mfl.service_mgmt.forms.changes", function (changes) {
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