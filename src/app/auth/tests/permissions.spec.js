(function (angular) {
    "use strict";

    describe("Testing permissions module :", function () {

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.auth.permissions");
        });

        describe("Testing permission checker service: ", function () {
            var loginService;

            beforeEach(inject(["mfl.auth.services.login",
                function (ls) {
                    loginService = ls;
                }
            ]));

            it("should not allow non-loggedin users", function () {
                spyOn(loginService, "isLoggedIn").andReturn(false);
                inject(["mfl.auth.permissions.checker", function (permChecker) {
                    expect(permChecker.hasPermission("hello")).toBe(false);
                }]);
            });

            it("should not allow loggedin users without permission", function () {
                spyOn(loginService, "isLoggedIn").andReturn(true);
                spyOn(loginService, "getUser").andReturn({all_permissions: []});

                inject(["mfl.auth.permissions.checker", function (permChecker) {
                    expect(permChecker.hasPermission("hello")).toBe(false);
                }]);
            });

            it("should allow loggedin users with permission", function () {
                spyOn(loginService, "isLoggedIn").andReturn(true);
                spyOn(loginService, "getUser").andReturn({all_permissions: ["hello"]});

                inject(["mfl.auth.permissions.checker", function (permChecker) {
                    expect(permChecker.hasPermission("hello")).toBe(true);
                }]);
            });

            it("should allow if permission is not a valid string", function () {
                spyOn(loginService, "isLoggedIn").andReturn(true);
                spyOn(loginService, "getUser").andReturn({all_permissions: []});

                inject(["mfl.auth.permissions.checker", function (permChecker) {
                    expect(permChecker.hasPermission()).toBe(true);
                    expect(permChecker.hasPermission("")).toBe(true);
                    expect(permChecker.hasPermission({})).toBe(true);
                }]);
            });

        });

        describe("Testing require-permission directive :", function () {
            var compile, rootscope, loginService, permChecker;

            beforeEach(inject(["$compile", "$rootScope", "mfl.auth.permissions.checker",
                "mfl.auth.services.login",
                function (c, r, pc, ls) {
                    compile = c;
                    rootscope = r;
                    permChecker = pc;
                    loginService = ls;
                }
            ]));

            it("should not do anything without permission", function () {
                spyOn(loginService, "isLoggedIn").andReturn(true);

                var element = angular.element(
                    "<div><div id='r'><p requires-permission=''>asd</p></div></div>"
                );
                compile(element)(rootscope);
                expect(element.html()).toContain("asd");

                element = angular.element(
                    "<div><div id='r'><p requires-permission>asd</p></div></div>"
                );
                compile(element)(rootscope);
                expect(element.html()).toContain("asd");
            });

            it("should allow element", function () {
                spyOn(loginService, "isLoggedIn").andReturn(true);
                spyOn(loginService, "getUser").andReturn({all_permissions: ["view_counties"]});

                var element = angular.element(
                    "<div id='r'><p requires-permission='view_counties'>asd</p></div>"
                );
                compile(element)(rootscope);
                expect(element.html()).toContain("asd");
            });

            it("should remove element if not logged in", function () {
                var tags = [
                    "requires-permission",
                    "x-requires-permission",
                    "data-requires-permission"
                ];
                tags.forEach(function (tag) {
                    var element = angular.element(
                        "<div><div id='r'><p " + tag + "='view_counties'>YEAH</p></div></div>"
                    );
                    compile(element)(rootscope);
                    expect(element.html()).not.toContain("YEAH");
                });
            });

            it("should remove element if logged in but without permission", function () {
                spyOn(loginService, "isLoggedIn").andReturn(true);
                spyOn(loginService, "getUser").andReturn({all_permissions: []});
                var tags = [
                    "requires-permission", "x-requires-permission", "data-requires-permission"
                ];
                tags.forEach(function (tag) {
                    var element = angular.element(
                        "<div><div id='r'><p " + tag + "='view_counties'>YEAH</p></div></div>"
                    );
                    compile(element)(rootscope);
                    expect(element.html()).not.toContain("YEAH");
                });
            });
        });

        describe("Testing require-user-feature directive :", function () {
            var compile, rootscope, loginService;

            beforeEach(inject(["$compile", "$rootScope", "mfl.auth.services.login",
                function (c, r, ls) {
                    compile = c;
                    rootscope = r;
                    loginService = ls;
                }
            ]));

            it("should remove element without feature", function () {
                spyOn(loginService, "isLoggedIn").andReturn(true);

                var element = angular.element(
                    "<div><div id='r'><p requires-user-feature=''>asd</p></div></div>"
                );
                compile(element)(rootscope);
                expect(element.html()).not.toContain("asd");

                element = angular.element(
                    "<div><div id='r'><p requires-user-feature>asd</p></div></div>"
                );
                compile(element)(rootscope);
                expect(element.html()).not.toContain("asd");
            });

            it("should allow element", function () {
                spyOn(loginService, "isLoggedIn").andReturn(true);
                spyOn(loginService, "getUser").andReturn({county: "meru"});

                var element = angular.element(
                    "<div id='r'><p requires-user-feature='county'>asd</p></div>"
                );
                compile(element)(rootscope);
                expect(element.html()).toContain("asd");
            });

            it("should remove element if not logged in", function () {
                var tags = [
                    "requires-user-feature",
                    "x-requires-user-feature",
                    "data-requires-user-feature"
                ];
                tags.forEach(function (tag) {
                    var element = angular.element(
                        "<div><div id='r'><p " + tag + "='national'>YEAH</p></div></div>"
                    );
                    compile(element)(rootscope);
                    expect(element.html()).not.toContain("YEAH");
                });
            });

            it("should remove element if logged in but without feature", function () {
                spyOn(loginService, "isLoggedIn").andReturn(true);
                spyOn(loginService, "getUser").andReturn({});
                var tags = [
                    "requires-user-feature", "x-requires-user-feature", "data-requires-user-feature"
                ];
                tags.forEach(function (tag) {
                    var element = angular.element(
                        "<div><div id='r'><p " + tag + "='national'>YEAH</p></div></div>"
                    );
                    compile(element)(rootscope);
                    expect(element.html()).not.toContain("YEAH");
                });
            });
        });
    });
})(angular);
