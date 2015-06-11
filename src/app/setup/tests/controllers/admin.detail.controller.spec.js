(function () {
    describe("Testing admin units details views", function () {
        var controller, data, root, scope, SERVER_URL, httpBackend, state;
        var formService;

        beforeEach(function () {
            module("mflAdminApp");
            module("mflAdminAppConfig");
            module("sil.api.wrapper");
            module("ui.router");
            module("mfl.setup.api");
            module("mfl.setup.facilities.controllers");

            inject(["$rootScope", "$controller", "$httpBackend", "$state",
                "SERVER_URL", "adminApi", "mfl.common.forms.changes",
                function ($rootScope, $controller, $httpBackend, $state, url,
                    adminApi, frm) {
                    root = $rootScope;
                    scope = root.$new();
                    state = $state;
                    httpBackend = $httpBackend;
                    SERVER_URL = url;
                    scope.fakeStateParams = {
                        count_id : 1
                    };
                    adminApi = adminApi;
                    formService = frm;
                    data = {
                        $scope : scope,
                        $state : $state,
                        SERVER_URL : url,
                        formService : frm,
                        $stateParams : scope.fakeStateParams,
                        adminApi : adminApi
                    };
                    controller = function (cntrl) {
                        return $controller(cntrl, data);
                    };
                }
            ]);
        });
        it("should test county detailed view controller: success",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.county.view");
            $httpBackend.expectGET(
                SERVER_URL + "api/common/counties/1/").respond(
                200, {"code": 1});
            $httpBackend.expectGET(
                SERVER_URL + "api/common/constituencies/?county=1").respond(
                200, {"code": 1});
            $httpBackend.expectGET(
                SERVER_URL + "api/common/user_counties/?county=1").respond(
                200, {"email": "owaga@owaga.com"});
            $httpBackend.flush();
        }]));
        it("should test county detailed view controller: success",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.county.view");
            $httpBackend.expectGET(
                SERVER_URL + "api/common/counties/1/").respond(
                400, {"code": 1});
            $httpBackend.expectGET(
                SERVER_URL + "api/common/constituencies/?county=1").respond(
                400, {"code": 1});
            $httpBackend.expectGET(
                SERVER_URL + "api/common/user_counties/?county=1").respond(
                400, {"email": "owaga@owaga.com"});
            $httpBackend.flush();
        }]));
    });
})();
