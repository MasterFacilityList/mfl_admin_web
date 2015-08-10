(function () {
    "use strict";
    describe("Filters: testing mfl common filters", function () {
        var contact_type_filter,titlecase_filter,bool_filter,date_filter,
        facility_type;
        beforeEach(function () {
            module("mfl.common.filters");
            inject(["$filter", function ($filter) {
                contact_type_filter = $filter("contact_type");
                titlecase_filter = $filter("titlecase");
                bool_filter = $filter("boolFilter");
                date_filter = $filter("dateFilter");
                facility_type = $filter("facilityType");
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
        it("dateFilter should be defined", function () {
            expect(date_filter).toBeDefined();
        });
        it("should give Expected output", function () {
            var now = new Date();
            var ans = date_filter(now, "EEE, dd MMM yyyy hh:mm a");
            // Tue, 18 Nov 2014 03:09 PM
            expect(date_filter(now.toISOString())).toBe(ans);
        });
        it( "Should test titlecase filter",function() {
            var result;
            result = titlecase_filter( "i am a test" );
            expect( result ).toEqual( "I Am A Test" );

            result = titlecase_filter( "I AM A TEST" );
            expect( result ).toEqual( "I Am A Test" );

            result = titlecase_filter( "" );
            expect( result ).toEqual( "" );

            result = titlecase_filter( );
            expect( result ).toEqual( "" );

            result = titlecase_filter( 10 );
            expect( result ).toEqual( "10" );

            result = titlecase_filter( true );
            expect( result ).toEqual( "True" );

            result = titlecase_filter( false );
            expect( result ).toEqual( "False" );

            result = titlecase_filter( null );
            expect( result ).toEqual( "" );
        });
        it("should have the boolean filter return 'Yes' given 'true'", inject(function () {
            var string = true, result;
            result = bool_filter(string, "boolean");
            expect(result).toEqual("Yes");
        }));
        it("should have the boolean filter return 'No' given 'false'", inject(function () {
            var string = false, result;
            result = bool_filter(string, "boolean");
            expect(result).toEqual("No");
        }));
        it("should have the boolean filter return undefined given ''", inject(function () {
            var string = "", result;
            result = bool_filter(string, "boolean");
            expect(result).toEqual("");
        }));
        it("facilityType should be defined", function () {
            expect(facility_type).toBeDefined();
        });
        it("should test that list variable is defined", function () {
            var list, input, output;
            list = [
                {
                    id : "5",
                    name : "subdistrict-hospital",
                    sub_division : "hospital"
                },
                {
                    id : "6",
                    name : "hospital",
                    sub_division : null
                }
            ];
            input  = "6";
            output = [list[0]];
            expect(facility_type(list, input)).toEqual(output);
        });
        it("should test that list variable is undefined", function () {
            var list, input;
            list = [
                {
                    id : "5",
                    name : "subdistrict-hospital",
                    sub_division : "hospital"
                },
                {
                    id : "7",
                    name : "hospital",
                    sub_division : null
                }
            ];
            input  = "6";
            expect(facility_type(list, input)).toEqual(undefined);
        });
        it("should return original object selected", function () {
            var list, input;
            list = [
                {
                    id : "5",
                    name : "subdistrict-hospital",
                    sub_division : "hospital"
                },
                {
                    id : "6",
                    name : "provisional-hospital",
                    sub_division : null
                }
            ];
            input = "6";
            var arr = [
                {
                    id : "6",
                    name : "provisional-hospital",
                    sub_division : null
                }
            ];
            var soltn = facility_type(list, input);
            expect(arr).toEqual(soltn);
        });
    });
})();
