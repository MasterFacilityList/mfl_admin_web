(function () {
    describe("Testing setup controller: ", function () {
        var controller, root, scope, SERVER_URL, state,httpBackend, data;

        beforeEach(function () {
            module("mflApp");
            module("mflAppConfig");
            module("mfl.setup.api");
            module("mfl.common.forms");

            inject(["$rootScope", "$controller", "$httpBackend", "SERVER_URL",
                "adminApi", "$state", "mfl.common.forms.changes",
                function (
                    $rootScope, $controller, $httpBackend, url, adminApi,
                    $state, formService) {
                    root = $rootScope;
                    scope = root.$new();
                    httpBackend = $httpBackend;
                    SERVER_URL = url;
                    state = $state;
                    adminApi = adminApi;
                    formService = formService;
                    scope.fakeStateParams = {
                        id : 6
                    };
                    data = {
                        $scope : scope,
                        $state : $state,
                        SERVER_URL : url,
                        adminApi : adminApi,
                        formService : formService,
                        $stateParams : scope.fakeStateParams
                    };
                    controller = function (cntrl) {
                        return $controller(cntrl, data);
                    };
                }
            ]);
        });
        it("should test admin setup dashboard controller", function () {
            controller("mfl.setup.controller.dashboard");
            var example = "Administrative areas";
            expect(scope.test).toEqual(example);
        });
        it("should test chuStatus controller", function () {
            controller("mfl.setup.controller.chuStatus.list");
            var example = "chuStatus";
            expect(scope.test).toEqual(example);
        });
        it("should test chu view controller", function () {
            controller("mfl.setup.controller.chuStatus.view");
            var example = "chuStatus view";
            expect(scope.test).toEqual(example);
        });
        it("should test chuStatus view with API calls",
        inject(["$httpBackend", "$state",function ($httpBackend, $state) {
            controller("mfl.setup.controller.chuStatus.view");
            spyOn($state, "go");
            $httpBackend.expectGET(
                SERVER_URL + "api/chul/statuses/6/").respond(200, {});
            $httpBackend.flush();
        }]));
        it("should test chuStatus view with API calls : fail",
        inject(["$httpBackend",function ($httpBackend) {
            controller("mfl.setup.controller.chuStatus.view");
            $httpBackend.expectGET(
                SERVER_URL + "api/chul/statuses/6/").respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test the updateChuStatus method",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.chuStatus.view");
            var form = {name : "Antony"};
            spyOn(formService, "whatChanged").andReturn(form);
            spyOn($state, "go");
            var id = 1;
            var wrapper = scope.updateChuStatus(id, form);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/chul/statuses/1/").respond(200, wrapper);
            expect(formService.whatChanged).toHaveBeenCalled();
            $httpBackend.flush();
        }]));
        it("should test the updateChuStatus method: fail",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.chuStatus.view");
            var form = {name : "Antony"};
            spyOn(formService, "whatChanged").andReturn(form);
            spyOn($state, "go");
            var id = 1;
            var wrapper = scope.updateChuStatus(id, form);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/chul/statuses/1/").respond(400, wrapper);
            expect(formService.whatChanged).toHaveBeenCalled();
            $httpBackend.flush();
        }]));
        it("should test the updateChuStatus method",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.chuStatus.view");
            var form = {};
            spyOn(formService, "whatChanged").andReturn(form);
            var id = 1;
            scope.updateChuStatus(id, form);
            expect(formService.whatChanged).toHaveBeenCalled();
        }]));
        it("should test deleting a CHU",
        inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
            controller("mfl.setup.controller.chuStatus.view");
            spyOn($state, "go");
            var id = 1;
            scope.deleteChuStatus(id);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/chul/statuses/1/").respond(200);
            $httpBackend.flush();
        }]));
        it("should test deleting a CHU",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.chuStatus.view");
            var id = 1;
            scope.deleteChuStatus(id);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/chul/statuses/1/").respond(400);
            $httpBackend.flush();
        }]));
        it("should test creating a new chus status",
        inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
            controller("mfl.setup.controller.chuStatus.create");
            spyOn($state, "go");
            expect(scope.create).toBeTruthy();
            var chuStatus = {name : "Fully-functional"};
            scope.createChuStatus(chuStatus);
            $httpBackend.expectPOST(
                SERVER_URL + "api/chul/statuses/").respond(200, chuStatus);
            $httpBackend.flush();
        }]));
        it("should test creating a new chus status",
        inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
            controller("mfl.setup.controller.chuStatus.create");
            spyOn($state, "go");
            expect(scope.create).toBeTruthy();
            var chuStatus = {name : "Fully-functional"};
            scope.createChuStatus(chuStatus);
            $httpBackend.expectPOST(
                SERVER_URL + "api/chul/statuses/").respond(400, chuStatus);
            $httpBackend.flush();
        }]));
        it("should test chuApprover list controller", function () {
            controller("mfl.setup.controller.chuApprover.list");
            var example = "Approver";
            expect(scope.test).toEqual(example);
        });
        it("should test chuApprover list controller", function () {
            controller("mfl.setup.controller.chuApprover.view");
            var example = "View chul Approver";
            expect(scope.test).toEqual(example);
        });
        it("should test chuApprover list controller",
        inject(["$httpBackend",
            function ($httpBackend) {
            controller("mfl.setup.controller.chuApprover.view");
            $httpBackend.expectGET(
                SERVER_URL + "api/chul/approvers/6/").respond(200, {});
            $httpBackend.flush();
        }]));
        it("should test chuApprover list controller",
        inject(["$httpBackend",
            function ($httpBackend) {
            controller("mfl.setup.controller.chuApprover.view");
            $httpBackend.expectGET(
                SERVER_URL + "api/chul/approvers/6/").respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test the updateChuApprovers method: success",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.chuApprover.view");
            var form = {name : "Antony"};
            spyOn(formService, "whatChanged").andReturn(form);
            spyOn($state, "go");
            var id = 1;
            var wrapper = scope.updateChuApprovers(id, form);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/chul/approvers/1/").respond(200, wrapper);
            expect(formService.whatChanged).toHaveBeenCalled();
            $httpBackend.flush();
        }]));
        it("should test the updateChuApprovers method: success",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.chuApprover.view");
            var form = {name : "Antony"};
            spyOn(formService, "whatChanged").andReturn(form);
            spyOn($state, "go");
            var id = 1;
            var wrapper = scope.updateChuApprovers(id, form);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/chul/approvers/1/").respond(400, wrapper);
            expect(formService.whatChanged).toHaveBeenCalled();
            $httpBackend.flush();
        }]));
        it("should test the updateChuApprovers method: success",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.chuApprover.view");
            var form = {};
            spyOn(formService, "whatChanged").andReturn(form);
            var id = 1;
            scope.updateChuApprovers(id, form);
            expect(formService.whatChanged).toHaveBeenCalled();
        }]));
        it("should test deleting a CHUApprover",
        inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
            controller("mfl.setup.controller.chuApprover.view");
            spyOn($state, "go");
            var id = 1;
            scope.deleteChuApprovers(id);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/chul/approvers/1/").respond(200);
            $httpBackend.flush();
        }]));
        it("should test deleting a CHUApprover: fail",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.chuApprover.view");
            var id = 1;
            scope.deleteChuApprovers(id);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/chul/approvers/1/").respond(400);
            $httpBackend.flush();
        }]));
        it("should test creating a new chus status",
        inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
            controller("mfl.setup.controller.chuApprover.create");
            spyOn($state, "go");
            var chuApprover = {name : "Approver"};
            scope.createChuApprovers(chuApprover);
            $httpBackend.expectPOST(
                SERVER_URL + "api/chul/approvers/").respond(200, chuApprover);
            $httpBackend.flush();
        }]));
        it("should test creating a new chus status",
        inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
            controller("mfl.setup.controller.chuApprover.create");
            spyOn($state, "go");
            var chuApprover = {name : "Approver"};
            scope.createChuApprovers(chuApprover);
            $httpBackend.expectPOST(
                SERVER_URL + "api/chul/approvers/").respond(400, chuApprover);
            $httpBackend.flush();
        }]));
    });
})();
