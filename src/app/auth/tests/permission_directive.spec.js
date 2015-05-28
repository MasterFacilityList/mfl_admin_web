(function () {
    "use strict";

    describe("Test for RBAC directive: ", function () {
        var rootScope;
        var scope;
        var compile;
        beforeEach(function () {
            module("mflApp");
            module("mfl.auth.directives");
            module("mfl.auth.permissions");

            inject(["$rootScope", "$compile",
                "mfl.auth.permissions.permissionList",
                function ($rootScope, $compile, permFactory) {
                    scope = $rootScope.$new();
                    compile = $compile;
                    rootScope = $rootScope;
                    permFactory = permFactory;
                }
            ]);
        });
        it("should allow with defined actions", function () {
            //spyOn(permFactory, "hasPermission").andReturn(true);
            inject(["mfl.auth.permissions.permissionList",
                function (permFactory) {
                    spyOn(permFactory, "hasPermission").andReturn(true);
                    var element = angular.element(
                        "<div id='r'><p has-permission='facility.add_facility'>asd</p></div>"
                    );
                    compile(element)(rootScope);
                    expect(element.html()).toEqual("<!-- hasPermission: " +
                        "facility.add_facility --><p " +
                        "class=\"ng-scope\" has-permission=\"facility." +
                        "add_facility\">asd</p>");
                }
            ]);
        });
        it("should compile", function () {
            var element = angular.element(
                "<div id='r'><p has-permission='facility.add_facility'>asd</p></div>"
            );
            compile(element)(rootScope);
            expect(element.html()).toEqual("<!-- hasPermission: facility." +
                "add_facility -->");
        });
        it("should not do anything without actions", function () {
            var element = angular.element(
                "<div><div id='r'><p has-permission=''>asd</p></div></div>"
            );
            compile(element)(rootScope);
            expect(element.html()).toEqual(
                "<div id=\"r\"><!-- hasPermission:  --></div>");
        });
    });
})();
