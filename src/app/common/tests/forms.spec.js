(function () {
    describe("Test for form.js", function () {
        beforeEach(function () {
            module("mflApp");
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
})();
