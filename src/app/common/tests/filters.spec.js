(function () {
    "use strict";
    describe("Filters: testing mfl common filters", function () {
        var contact_type_filter;
        beforeEach(function () {
            module("mfl.common.filters");
            inject(["$filter", function ($filter) {
                contact_type_filter = $filter("contact_type");
            }]);
        });
        it("Should have contact_type filter defined", function(){
            expect(contact_type_filter).toBeDefined();
        });
        it("Should return contact type given a list of contact_type id",
        function () {
            var cont_types, solution, cont_type_id;
            cont_type_id = "78240cf9-7bcd-405d-a21d-ad41be2641a2";
            solution = "POSTAL";
            cont_types = [
                {
                    "id": "78240cf9-7bcd-405d-a21d-ad41be2641a2",
                    "name": "POSTAL"
                },
                {
                    "id": "d6b557dc-b073-42f2-8afa-475eaabc92b9",
                    "name": "FAX"
                }
            ];
            expect(contact_type_filter(
                cont_type_id, cont_types)).toEqual(solution);
        });
    });
})();
