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
        it("should test county list controller", function () {
            controller("mfl.setup.controller.county.list");
            var example = "View administrative area";
            expect(scope.test).toEqual(example);
        });
        it("should test county edit controller", function () {
            controller("mfl.setup.controller.county.edit");
            var example = "View administrative area";
            expect(scope.test).toEqual(example);
        });
        it("should test county constituency",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controllers.county.constituency");
            $httpBackend.expectGET(
                SERVER_URL + "api/common/wards/6/").respond(200, {});
            $httpBackend.flush();
        }]));
        it("should test county constituency",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controllers.county.constituency");
            $httpBackend.expectGET(
                SERVER_URL + "api/common/wards/6/").respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test county list controller", function () {
            controller("mfl.setup.controller.ward.list");
            var example = "View administrative area";
            expect(scope.test).toEqual(example);
        });
        it("should test county list controller", function () {
            controller("mfl.setup.controller.town.list");
            var example = "View administrative area";
            expect(scope.test).toEqual(example);
        });
        it("should test county list controller", function () {
            controller("mfl.setup.controller.facilityOwnerType.list");
            var example = "Facility owner";
            expect(scope.test).toEqual(example);
        });
        it("should test county list controller",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityOwnerType.view");
            var example = "Facility_type view";
            expect(scope.test).toEqual(example);
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/owner_types/1/").respond(200, {});
            $httpBackend.flush();
        }]));
        it("should test county list controller",
        inject(["$httpBackend" ,function ($httpBackend) {
            controller("mfl.setup.controller.facilityOwnerType.view");
            var example = "Facility_type view";
            expect(scope.test).toEqual(example);
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/owner_types/1/").respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test the updateChuApprovers method: success",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.facilityOwnerType.view");
            var form = {name : "Other"};
            spyOn(formService, "whatChanged").andReturn(form);
            spyOn($state, "go");
            var id = 1;
            var wrapper = scope.updateFacilityOwnerTypes(id, form);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/facilities/owner_types/1/").respond(200, wrapper);
            expect(formService.whatChanged).toHaveBeenCalled();
            $httpBackend.flush();
        }]));
        it("should test the updateChuApprovers method: success",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.facilityOwnerType.view");
            var form = {name : "Other"};
            spyOn(formService, "whatChanged").andReturn(form);
            spyOn($state, "go");
            var id = 1;
            var wrapper = scope.updateFacilityOwnerTypes(id, form);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/facilities/owner_types/1/").respond(400, wrapper);
            expect(formService.whatChanged).toHaveBeenCalled();
            $httpBackend.flush();
        }]));
        it("should test the updateChuApprovers method: success",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.facilityOwnerType.view");
            var form = {};
            spyOn(formService, "whatChanged").andReturn(form);
            var id = 1;
            scope.updateFacilityOwnerTypes(id, form);
            expect(formService.whatChanged).toHaveBeenCalled();
        }]));
        it("should test deleting a CHUApprover",
        inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
            controller("mfl.setup.controller.facilityOwnerType.view");
            spyOn($state, "go");
            var id = 1;
            scope.deleteFacilityOwnerTypes(id);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/facilities/owner_types/1/").respond(200);
            $httpBackend.flush();
        }]));
        it("should test deleting a CHUApprover: fail",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityOwnerType.view");
            var id = 1;
            scope.deleteFacilityOwnerTypes(id);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/facilities/owner_types/1/").respond(400);
            $httpBackend.flush();
        }]));
        it("should test creation of a facility_owner_type",
        inject(["$httpBackend", "$state",function ($httpBackend, $state) {
            controller("mfl.setup.controller.facilityOwnerType.create");
            spyOn($state, "go");
            var fac_owner_type = {name : "Non Governmental"};
            scope.createFacilityOwnerTypes(fac_owner_type);
            $httpBackend.expectPOST(
                SERVER_URL + "api/facilities/owner_types/")
                .respond(200, fac_owner_type);
            $httpBackend.flush();
        }]));
        it("should test creation of a facility_owner_type",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityOwnerType.create");
            var fac_owner_type = {name : "Non Governmental"};
            scope.createFacilityOwnerTypes(fac_owner_type);
            $httpBackend.expectPOST(
                SERVER_URL + "api/facilities/owner_types/")
                .respond(400, fac_owner_type);
            $httpBackend.flush();
        }]));
        it("should test county list controller", function () {
            controller("mfl.setup.controller.facilityOwner.list");
            var example = "New facility owner";
            expect(scope.test).toEqual(example);
        });
        it("should test county list controller", function () {
            controller("mfl.setup.controller.facilityOwner.view");
            var example = "Facility owner view";
            expect(scope.test).toEqual(example);
        });
        it("should test county list controller",
        inject(["$httpBackend" ,function ($httpBackend) {
            controller("mfl.setup.controller.facilityOwner.view");
            var ownerTypes = {
                results : [
                    {
                        id : 1,
                        name : "Other"
                    }
                ]
            };
            var data = {id : 1, name : "Other"};
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/owner_types/")
                .respond(200, ownerTypes);
            //define data to fulfill insatisfied call
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/owners/1/")
                .respond(200, data);
            $httpBackend.flush();
        }]));
        it("should test county list controller: fail",
        inject(["$httpBackend" ,function ($httpBackend) {
            controller("mfl.setup.controller.facilityOwner.view");
            var ownerTypes = {
                results : [
                    {
                        id : 1,
                        name : "Other"
                    }
                ]
            };
            var data = {id : 1, name : "Other"};
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/owner_types/")
                .respond(200, ownerTypes);
            //define data to fulfill insatisfied call
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/owners/1/")
                .respond(400, data);
            $httpBackend.flush();
        }]));
        it("should test county list controller",
        inject(["$httpBackend" ,function ($httpBackend) {
            controller("mfl.setup.controller.facilityOwner.view");
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/owner_types/")
                .respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test the updateFacilityOwner method: success",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.facilityOwner.view");
            var form = {name : "Other"};
            spyOn(formService, "whatChanged").andReturn(form);
            spyOn($state, "go");
            var id = 1;
            var wrapper = scope.updateFacilityOwner(id, form);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/facilities/owners/1/").respond(200, wrapper);
            expect(formService.whatChanged).toHaveBeenCalled();
            $httpBackend.flush();
        }]));
        it("should test the updateFacilityOwner method: fail",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.facilityOwner.view");
            var form = {name : "Other"};
            spyOn(formService, "whatChanged").andReturn(form);
            spyOn($state, "go");
            var id = 1;
            var wrapper = scope.updateFacilityOwner(id, form);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/facilities/owners/1/").respond(400, wrapper);
            expect(formService.whatChanged).toHaveBeenCalled();
            $httpBackend.flush();
        }]));
        it("should test the updateFacilityOwner method: fail",
        inject(["$httpBackend", "$state","mfl.common.forms.changes",
            function ($httpBackend, $state, formService) {
            controller("mfl.setup.controller.facilityOwner.view");
            var form = {};
            spyOn(formService, "whatChanged").andReturn(form);
            var id = 1;
            scope.updateFacilityOwner(id, form);
            expect(formService.whatChanged).toHaveBeenCalled();
        }]));
        it("should test deleting a CHUApprover",
        inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
            controller("mfl.setup.controller.facilityOwner.view");
            spyOn($state, "go");
            var id = 1;
            scope.deleteFacilityOwner(id);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/facilities/owners/1/").respond(200);
            $httpBackend.flush();
        }]));
        it("should test deleting a CHUApprover",
        inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
            controller("mfl.setup.controller.facilityOwner.view");
            spyOn($state, "go");
            var id = 1;
            scope.deleteFacilityOwner(id);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/facilities/owners/1/").respond(400);
            $httpBackend.flush();
        }]));
        it("should test facility owner creation controller", function () {
            controller("mfl.setup.controller.facilityOwner.create");
            var example = "Facility owner create";
            expect(scope.test).toEqual(example);
        });
        it("should test listing facility owner types",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityOwner.create");
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/owner_types/").respond(200, {});
            $httpBackend.flush();
        }]));
        it("should test listing facility owner types : fail",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityOwner.create");
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/owner_types/").respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test listing facility owner types",
        inject(["$httpBackend", "$state",function ($httpBackend, $state) {
            controller("mfl.setup.controller.facilityOwner.create");
            spyOn($state, "go");
            var owner = {name : "Antony"};
            scope.createFacilityOwner(owner);
            $httpBackend.expectPOST(
                SERVER_URL + "api/facilities/owners/")
                .respond(200, owner);
            $httpBackend.flush();
        }]));
        it("should test listing facility owner types",
        inject(["$httpBackend", "$state",function ($httpBackend, $state) {
            controller("mfl.setup.controller.facilityOwner.create");
            spyOn($state, "go");
            var owner = {name : "Antony"};
            scope.createFacilityOwner(owner);
            $httpBackend.expectPOST(
                SERVER_URL + "api/facilities/owners/")
                .respond(400, owner);
            $httpBackend.flush();
        }]));
        it("should test facility job title listing", function () {
            controller("mfl.setup.controller.facilityJobTitle.list");
            var example = "Facility job title";
            expect(scope.test).toEqual(example);
        });
    });
})();
