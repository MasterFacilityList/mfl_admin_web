(function (angular) {
    "use strict";

    describe("Test export module", function () {
        var rootScope, wndw, tpl, wrapper;

        beforeEach(function () {
            module("mfl.common.export");
            module("mflAdminAppConfig");
            module("sil.grid");

            tpl = "<mfl-export></mfl-export>";

            angular.module("xyz", [])
            .service("xyz.service", ["api", function (api) {
                wrapper = api.setBaseUrl("/api/endpoint/");
                this.wrapper = wrapper;
            }])
            .config(["silGridConfigProvider", function(silGridConfig) {
                silGridConfig.apiMaps = {
                    xyz: ["xyz", "xyz.service"]
                };
            }])
            .run(["$templateCache", function (tc) {
                tc.put("tpl.html", tpl);
            }]);
            module("xyz");

            module(["$provide", function($provide){
                wndw = {
                    location: {href: ""},
                    localStorage: window.localStorage,
                    attachEvent: angular.noop
                };
                $provide.value("$window", wndw);
            }]);

            inject(["$rootScope", function ($rootScope) {
                rootScope = $rootScope;
            }]);
        });

        describe("test export service", function () {
            var oauth2, api, wrapper, httpBackend, server_url;

            beforeEach(inject(["api.oauth2", "api", "$httpBackend", "SERVER_URL",
                function (o, a, h, s) {
                    oauth2 = o;
                    o.getToken = function () {
                        return {"access_token": "123"};
                    };
                    api = a;
                    httpBackend = h;
                    server_url = s;
                    wrapper = api.setBaseUrl("api/ha/");
                }
            ]));

            it("should export to excel", function () {
                inject(["mfl.common.export.service", function (exportService) {
                    exportService.excelExport(wrapper);
                    expect(wndw.location.href).toEqual(
                        server_url+"api/ha/?format=excel&access_token=123&page_size=10000"
                    );
                }]);
            });

            it("should export including extra params", function () {
                inject(["mfl.common.export.service", function (exportService) {
                    exportService.excelExport(wrapper, {"a": "b"}, 7);
                    expect(wndw.location.href).toEqual(
                        server_url+"api/ha/?format=excel&access_token=123&page_size=7&a=b"
                    );
                }]);
            });

        });

        describe("test export controller", function () {

            it("should define export function", function () {
                inject(["$controller", function ($controller) {
                    var scope = rootScope.$new();
                    var exportService = {
                        excelExport: jasmine.createSpy()
                    };
                    $controller("mfl.common.export.controller", {
                        "$scope": scope,
                        "mfl.common.export.service": exportService
                    });
                    expect(angular.isFunction(scope.exportToExcel)).toBe(true);
                    scope.exportToExcel();
                }]);
            });
        });

        describe("test export directive", function () {

            var $compile;

            beforeEach(inject(["$compile", function (c) {
                $compile = c;
            }]));

            it("should require sil-grid", function () {
                var fxn = function () {
                    $compile(tpl)(rootScope.$new());
                };
                expect(fxn).toThrow();
            });

            it("should compile", function () {
                var tpl = "<sil-grid template='tpl.html' grid-for='xyz' " +
                          "data='test_xyz' api-key='wrapper'></sil-grid>";
                var scope = rootScope.$new();
                var element = $compile(tpl)(scope);
                scope.$apply();
                var isolateScope = element.isolateScope();
                expect(isolateScope.wrapper).toEqual(wrapper);
            });
        });
    });

})(window.angular);
