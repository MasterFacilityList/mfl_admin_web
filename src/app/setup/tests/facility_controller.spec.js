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
                        count_id : 6,
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
        it("should test viewing facility job titles",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityJobTitle.view");
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/job_titles/1/").respond(200, {});
            $httpBackend.flush();
        }]));
        it("should test viewing facility job titles",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityJobTitle.view");
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/job_titles/1/").respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test the updateFacilityJobTitle method: success",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.facilityJobTitle.view");
            var form = {name : "Doctor in charge"};
            spyOn(formService, "whatChanged").andReturn(form);
            spyOn($state, "go");
            var id = 1;
            var wrapper = scope.updateFacilityJobTitle(id, form);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/facilities/job_titles/1/").respond(200, wrapper);
            expect(formService.whatChanged).toHaveBeenCalled();
            $httpBackend.flush();
        }]));
        it("should test the updateFacilityJobTitle method: fail",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.facilityJobTitle.view");
            var form = {name : "Doctor in charge"};
            spyOn(formService, "whatChanged").andReturn(form);
            spyOn($state, "go");
            var id = 1;
            var wrapper = scope.updateFacilityJobTitle(id, form);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/facilities/job_titles/1/").respond(400, wrapper);
            expect(formService.whatChanged).toHaveBeenCalled();
            $httpBackend.flush();
        }]));
        it("should test the updateFacilityJobTitle method: none dirty form",
        inject(["$httpBackend", "mfl.common.forms.changes",
            function ($httpBackend, formService) {
            controller("mfl.setup.controller.facilityJobTitle.view");
            var form = {};
            spyOn(formService, "whatChanged").andReturn(form);
            var id = 1;
            scope.updateFacilityJobTitle(id, form);
            expect(formService.whatChanged).toHaveBeenCalled();
        }]));
        it("should test deleting a facility job title",
        inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
            controller("mfl.setup.controller.facilityJobTitle.view");
            spyOn($state, "go");
            var id = 1;
            scope.deleteFacilityJobTitle(id);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/facilities/job_titles/1/").respond(200);
            $httpBackend.flush();
        }]));
        it("should test deleting a facility job title : fail",
        inject(["$httpBackend",
            function ($httpBackend) {
            controller("mfl.setup.controller.facilityJobTitle.view");
            var id = 1;
            scope.deleteFacilityJobTitle(id);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/facilities/job_titles/1/").respond(400);
            $httpBackend.flush();
        }]));
        it("should test creation of facility job titles",
        inject(["$httpBackend", "$state", function ($httpBackend, $state) {
            controller("mfl.setup.controller.facilityJobTitle.create");
            spyOn($state, "go");
            var title = {name : "Doctor in charge"};
            scope.createFacilityJobTitle(title);
            $httpBackend.expectPOST(
                SERVER_URL + "api/facilities/job_titles/").respond(200, title);
            $httpBackend.flush();
        }]));
        it("should test creation of facility job titles: fail",
        inject(["$httpBackend", "$state", function ($httpBackend, $state) {
            controller("mfl.setup.controller.facilityJobTitle.create");
            spyOn($state, "go");
            var title = {name : "Doctor in charge"};
            scope.createFacilityJobTitle(title);
            $httpBackend.expectPOST(
                SERVER_URL + "api/facilities/job_titles/").respond(400, title);
            $httpBackend.flush();
        }]));
        it("should test facility regulatory body list controller",
            function () {
                controller("mfl.setup.controller.facilityRegulatoryBody.list");
                var example = "Regulatory body";
                expect(scope.test).toEqual(example);
            }
        );
        it("should test creation of regulatory body",
        inject(["$httpBackend", "$state", function ($httpBackend, $state) {
            controller("mfl.setup.controller.facilityRegulatoryBody.create");
            spyOn($state, "go");
            var body = {name: "Pharmacy & Poisons Board"};
            scope.createfacilityRegulatoryBody(body);
            $httpBackend.expectPOST(
                SERVER_URL + "api/facilities/regulating_bodies/")
                .respond(200, body);
            $httpBackend.flush();
        }]));
        it("should test creation of regulatory body: fail",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.create");
            var body = {name: "Pharmacy & Poisons Board"};
            scope.createfacilityRegulatoryBody(body);
            $httpBackend.expectPOST(
                SERVER_URL + "api/facilities/regulating_bodies/")
                .respond(400, body);
            $httpBackend.flush();
        }]));
        it("should test facility regulatory body viewing",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.view");
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/regulating_bodies/1/")
                .respond(200, {});
            $httpBackend.flush();
        }]));
        it("should test facility regulatory body viewing : fail",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.view");
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/regulating_bodies/1/")
                .respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test the updateFacilityRegulatoryBody method: success",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.facilityRegulatoryBody.view");
            var form = {name : "Doctor in charge"};
            spyOn(formService, "whatChanged").andReturn(form);
            spyOn($state, "go");
            var id = 1;
            var wrapper = scope.updateFacilityRegulatoryBody(id, form);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/facilities/regulating_bodies/1/").respond(200, wrapper);
            expect(formService.whatChanged).toHaveBeenCalled();
            $httpBackend.flush();
        }]));
        it("should test the updateFacilityRegulatoryBody method: fail",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.facilityRegulatoryBody.view");
            var form = {name : "Doctor in charge"};
            spyOn(formService, "whatChanged").andReturn(form);
            spyOn($state, "go");
            var id = 1;
            var wrapper = scope.updateFacilityRegulatoryBody(id, form);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/facilities/regulating_bodies/1/").respond(400, wrapper);
            expect(formService.whatChanged).toHaveBeenCalled();
            $httpBackend.flush();
        }]));
        it("should test the updateFacilityRegulatoryBody: no dirty form",
        inject(["$httpBackend", "mfl.common.forms.changes",
            function ($httpBackend, formService) {
            controller("mfl.setup.controller.facilityRegulatoryBody.view");
            var form = {};
            spyOn(formService, "whatChanged").andReturn(form);
            var id = 1;
            scope.updateFacilityRegulatoryBody(id, form);
            expect(formService.whatChanged).toHaveBeenCalled();
        }]));
        it("should test deleting a facility regulatory body",
        inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
            controller("mfl.setup.controller.facilityRegulatoryBody.view");
            spyOn($state, "go");
            var id = 1;
            scope.deleteFacilityRegulatoryBody(id);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/facilities/regulating_bodies/1/")
                .respond(200);
            $httpBackend.flush();
        }]));
        it("should test deleting a facility regulatory body",
        inject(["$httpBackend",
            function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.view");
            var id = 1;
            scope.deleteFacilityRegulatoryBody(id);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/facilities/regulating_bodies/1/")
                .respond(400);
            $httpBackend.flush();
        }]));
    });
})();
