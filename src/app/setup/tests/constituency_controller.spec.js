(function () {
    describe("Testing setup controller: ", function () {
        var controller, root, scope, SERVER_URL, state,httpBackend, data;

        beforeEach(function () {
            module("mflApp");
            module("mfl.setup.api");
            module("mfl.settings");
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
                        const_id : 6,
                        id : 1
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
        it("should test constituency controller", function () {
            controller("mfl.setup.controller.constituency.list");
            var example = "Constituency list";
            expect(scope.test).toEqual(example);
        });
        it("should test constituency ward controller",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.constituency.wards");
            $httpBackend.expectGET(
                SERVER_URL + "api/common/constituencies/6/").respond(200, {});
            $httpBackend.flush();
        }]));
        it("should test constituency ward controller",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.constituency.wards");
            $httpBackend.expectGET(
                SERVER_URL + "api/common/constituencies/6/").respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test constituency controller", function () {
            controller("mfl.setup.controller.contacts.list");
            var example = "Contacts list";
            expect(scope.test).toEqual(example);
        });
        it("should test creating contacts creation",
        inject(["$httpBackend", "$state",function ($httpBackend, $state) {
            controller("mfl.setup.controller.contacts.create");
            spyOn($state, "go");
            expect(scope.create).toBeTruthy();
            var cont_type = {name : "POSTAL"};
            scope.createContacts(cont_type);
            $httpBackend.expectPOST(
                SERVER_URL + "api/common/contact_types/")
                .respond(200, cont_type);
            $httpBackend.flush();
        }]));
        it("should test creating contacts creation",
        inject(["$httpBackend", "$state",function ($httpBackend, $state) {
            controller("mfl.setup.controller.contacts.create");
            spyOn($state, "go");
            expect(scope.create).toBeTruthy();
            var cont_type = {name : "POSTAL"};
            scope.createContacts(cont_type);
            $httpBackend.expectPOST(
                SERVER_URL + "api/common/contact_types/")
                .respond(400, cont_type);
            $httpBackend.flush();
        }]));
        it("should test constituency controller", function () {
            controller("mfl.setup.controller.contacts.view");
            var example = "Contacts view";
            expect(scope.test).toEqual(example);
        });
        it("should test constituency controller",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.contacts.view");
            $httpBackend.expectGET(
                SERVER_URL + "api/common/contact_types/1/")
                .respond(200, {});
            $httpBackend.flush();
        }]));
        it("should test constituency controller",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.contacts.view");
            $httpBackend.expectGET(
                SERVER_URL + "api/common/contact_types/1/")
                .respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test the updateChuApprovers method: success",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.contacts.view");
            var form = {name : "POSTAL"};
            spyOn(formService, "whatChanged").andReturn(form);
            spyOn($state, "go");
            var id = 1;
            var wrapper = scope.updateContacts(id, form);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/common/contact_types/1/").respond(200, wrapper);
            expect(formService.whatChanged).toHaveBeenCalled();
            $httpBackend.flush();
        }]));
        it("should test the updateChuApprovers method: success",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.contacts.view");
            var form = {name : "POSTAL"};
            spyOn(formService, "whatChanged").andReturn(form);
            spyOn($state, "go");
            var id = 1;
            var wrapper = scope.updateContacts(id, form);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/common/contact_types/1/").respond(400, wrapper);
            expect(formService.whatChanged).toHaveBeenCalled();
            $httpBackend.flush();
        }]));
        it("should test the updateChuApprovers method: success",
        inject(["$httpBackend", "mfl.common.forms.changes",
            function ($httpBackend, formService) {
            controller("mfl.setup.controller.contacts.view");
            var form = {};
            spyOn(formService, "whatChanged").andReturn(form);
            var id = 1;
            scope.updateContacts(id, form);
            expect(formService.whatChanged).toHaveBeenCalled();
        }]));
        it("should test deleting a CHUApprover",
        inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
            controller("mfl.setup.controller.contacts.view");
            spyOn($state, "go");
            var id = 1;
            scope.deleteContacts(id);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/common/contact_types/1/").respond(200);
            $httpBackend.flush();
        }]));
        it("should test deleting a CHUApprover: fail",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.contacts.view");
            var id = 1;
            scope.deleteContacts(id);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/common/contact_types/1/").respond(400);
            $httpBackend.flush();
        }]));
    });
})();
