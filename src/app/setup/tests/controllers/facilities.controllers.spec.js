(function(_){
    "use strict";
    describe("facilities setup controllers test suite", function(){
        var createController, $scope, $stateParams, $httpBackend, $state, adminApi;
        var formService, SERVER_URL;

        beforeEach(function(){
            module("mflAdminApp");
            inject(["$rootScope", "$controller", "$stateParams", "$httpBackend",
                   "$state", "adminApi","mfl.common.forms.changes","SERVER_URL",
                   function($rootScope, $controller,_$stateParams,
                    _$httpBackend, _$state, _adminApi, frm, _SERVER_URL){
                $scope = $rootScope.$new();
                SERVER_URL = _SERVER_URL;
                $httpBackend = _$httpBackend;
                $stateParams = _$stateParams;
                $state = _$state;
                adminApi = _adminApi;
                formService = frm;
                var data = {
                    $scope: $scope
                };
                createController = function(ctrl, params){
                    return $controller(ctrl, _.extend(data, params));

                };
            }]);
        });

        afterEach(function(){
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("should have `mfl.setup.controller.facilityOwnerType.list` defined",
           function(){
                var ctrl = createController("mfl.setup.controller.facilityOwnerType.list", {});
                expect(ctrl).toBeDefined();
            });

        it("should have `mfl.setup.controller.facilityOwnerType.view` defined",
           function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var ctrl = createController("mfl.setup.controller.facilityOwnerType.view", dt);
                expect(ctrl).toBeDefined();
            });
        it("should navigate to creating new owner category", function () {
            var dt = {
                $stateParams : {id: "create"}
            };
            var test_title = {
                icon: "fa-plus-circle",
                name: "New Facility Owner Categories"
            };
            createController(
                "mfl.setup.controller.facilityOwnerType.view", dt);
            expect($scope.title).toEqual(test_title);
        });
        it("should view a facilityOwnerType: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {msg: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owner_types/1/").respond(
                200, res);
                createController("mfl.setup.controller.facilityOwnerType.view", dt);
                $httpBackend.flush();
                expect($scope.facilityOwnerTypes).toEqual(res);
            });

        it("should view a facilityOwnerType: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owner_types/1/").respond(
                500, res);
                createController("mfl.setup.controller.facilityOwnerType.view", dt);
                $httpBackend.flush();
                expect($scope.alert).toEqual(res.error);
            });

        it("should delete facilityOwnerType: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn($state, "go");
                var res = {mgs: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owner_types/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/facilities/owner_types/1/").respond(
                200, res);
                createController("mfl.setup.controller.facilityOwnerType.view", dt);
                $scope.remove();
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("login",
                                                       {next:"dashboard"});
                expect($state.go).toHaveBeenCalledWith("setup.facility_owner_types",
                                                       {},{reload:true});
            });

        it("should delete facilityOwnerType: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                spyOn($state, "go");
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owner_types/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/facilities/owner_types/1/").respond(
                500, res);
                createController("mfl.setup.controller.facilityOwnerType.view", dt);
                $scope.remove();
                $scope.cancel();
                expect($state.go).toHaveBeenCalledWith("setup.facility_owner_types.view");
                $httpBackend.flush();
                expect($scope.alert).toEqual(res.error);
            });

        it("should update facilityOwnerType: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {msg: "Ok"};
                var form = {name : "Antony"};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owner_types/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/facilities/owner_types/1/").respond(
                200, res);
                createController("mfl.setup.controller.facilityOwnerType.view", dt);
                $scope.updateFacilityOwnerTypes(1, form);
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.facility_owner_types");
            });

        it("should update facilityOwnerType: fail",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                var form = {name : "Antony"};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owner_types/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/facilities/owner_types/1/").respond(
                500, res);
                createController("mfl.setup.controller.facilityOwnerType.view", dt);
                $scope.updateFacilityOwnerTypes(1, form);
                $httpBackend.flush();
                expect($state.go).not.toHaveBeenCalledWith("setup.facility_owner_types");
                expect($scope.alert).toEqual(res.error);
            });

        it("should update facilityOwnerType: no changes",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                var form = {};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owner_types/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/facilities/owner_types/1/").respond(
                500, res);
                createController("mfl.setup.controller.facilityOwnerType.view", dt);
                $scope.updateFacilityOwnerTypes(1, form);
                expect($httpBackend.flush).toThrow();
                expect($state.go).not.toHaveBeenCalledWith("setup.facility_owner_types");
            });

        it("should create facilityOwnerType: success",function(){
                spyOn($state, "go");
                $httpBackend.expectPOST(SERVER_URL+"api/facilities/owner_types/").respond(
                200, {});
                createController("mfl.setup.controller.facilityOwnerType.view", {});
                $scope.createFacilityOwnerTypes({name: "Testing"});
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.facility_owner_types");
            });

        it("should create facilityOwnerType: fail",function(){
                spyOn($state, "go");
                $httpBackend.expectPOST(SERVER_URL+"api/facilities/owner_types/").respond(
                500, {error: "error"});
                createController("mfl.setup.controller.facilityOwnerType.view", {});
                $scope.createFacilityOwnerTypes({name: "Testing"});
                $httpBackend.flush();
                expect($scope.alert).toEqual("error");
                expect($state.go).not.toHaveBeenCalledWith("setup.facility_owner_types");
            });


        it("should have `mfl.setup.controller.facilityOwner.list` defined",
           function(){
                var ctrl = createController("mfl.setup.controller.facilityOwner.list", {});
                expect(ctrl).toBeDefined();
            });

        it("should have `mfl.setup.controller.facilityOwner.view` defined",
           function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var ctrl = createController("mfl.setup.controller.facilityOwner.view", dt);
                expect(ctrl).toBeDefined();
            });
        it("should view a facilityOwner: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {name: "State Coorporation"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owners/1/").respond(
                200, res);

                createController("mfl.setup.controller.facilityOwner.view", dt);
                $httpBackend.flush();
                expect($scope.facilityOwners).toEqual(res);
            });
        it("should navigate to creating new chuStatus", function () {
            var dt = {
                $stateParams : {id: "create"}
            };
            var test_title = {
                icon: "fa-plus-circle",
                name: "New Facility Owner"
            };
            createController("mfl.setup.controller.facilityOwner.view", dt);
            expect($scope.title).toEqual(test_title);
        });
        it("should navigate to creating new facilityJobTitle", function () {
            var dt = {
                $stateParams : {id: "create"}
            };
            var test_title = {
                icon: "fa-plus-circle",
                name: "New Job Title"
            };
            createController("mfl.setup.controller.facilityJobTitle.view", dt);
            expect($scope.title).toEqual(test_title);
        });
        it("should view a facilityOwner: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owners/1/").respond(
                500, res);
                createController("mfl.setup.controller.facilityOwner.view", dt);
                $httpBackend.flush();
                expect($scope.alert).toEqual(res.error);
            });

        it("should view a facilityOwner: error fetching ownerTypes",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owner_types/").respond(
                500, res);
                createController("mfl.setup.controller.facilityOwner.view", dt);
                $httpBackend.flush();
                expect($scope.alert).toEqual(res.error);
            });

        it("should delete facilityOwner: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn($state, "go");
                var res = {mgs: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owners/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/facilities/owners/1/").respond(
                200, res);
                createController("mfl.setup.controller.facilityOwner.view", dt);
                $scope.remove();
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("login",
                                                       {next:"dashboard"});
                expect($state.go).toHaveBeenCalledWith("setup.facility_owners",
                                                       {},{reload:true});
            });

        it("should delete facilityOwner: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn($state, "go");
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owners/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/facilities/owners/1/").respond(
                500, res);
                createController("mfl.setup.controller.facilityOwner.view", dt);
                $scope.remove();
                $scope.cancel();
                expect($state.go).toHaveBeenCalledWith("setup.facility_owners.view");
                $httpBackend.flush();
                expect($scope.alert).toEqual(res.error);
            });
        it("should update facilityOwner: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {msg: "Ok"};
                var form = {name : "Antony"};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owners/1/").respond(
                200, res);
                createController("mfl.setup.controller.facilityOwner.view", dt);
                $httpBackend.flush();
                $httpBackend.expectPATCH(SERVER_URL+"api/facilities/owners/1/").respond(
                200, res);
                $scope.updateFacilityOwner(1, form);
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.facility_owners");
            });

        it("should update facilityOwner: fail",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                var form = {name : "Antony"};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owners/1/").respond(
                200, res);
                createController("mfl.setup.controller.facilityOwner.view", dt);
                $httpBackend.flush();
                $httpBackend.expectPATCH(SERVER_URL+"api/facilities/owners/1/").respond(
                500, res);
                $scope.updateFacilityOwner(1, form);
                $httpBackend.flush();
                expect($state.go).not.toHaveBeenCalledWith("facility_owners");
                expect($scope.alert).toEqual(res.error);
            });

        it("should update facilityOwner: no changes",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                var form = {};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owners/1/").respond(
                200, res);
                createController("mfl.setup.controller.facilityOwner.view", dt);
                $httpBackend.flush();
                $httpBackend.expectPATCH(SERVER_URL+"api/facilities/owners/1/").respond(
                500, res);
                $scope.updateFacilityOwner(1, form);
                expect($httpBackend.flush).toThrow();
                expect($state.go).not.toHaveBeenCalledWith("setup.facility_owners");
            });

        it("should create facilityOwner: success",function(){
                spyOn($state, "go");
                $httpBackend.expectGET(SERVER_URL+"api/facilities/owner_types/").respond(
                200, {resutls: {msg:"ok"}});
                createController("mfl.setup.controller.facilityOwner.view", {});
                $httpBackend.flush();
                $httpBackend.expectPOST(SERVER_URL+"api/facilities/owners/").respond(
                200, {});
                $scope.createFacilityOwner({name: "Testing"});
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.facility_owners");
            });

        it("should create facilityOwner: fail",function(){
                spyOn($state, "go");
                $httpBackend.expectPOST(SERVER_URL+"api/facilities/owners/").respond(
                500, {error: "error"});
                createController("mfl.setup.controller.facilityOwner.view", {});
                $scope.createFacilityOwner({name: "Testing"});
                $httpBackend.flush();
                expect($scope.alert).toEqual("error");
                expect($state.go).not.toHaveBeenCalledWith("setup.facility_owners");
            });

        it("should have `mfl.setup.controller.facilityJobTitle.list` defined",
           function(){
                var ctrl = createController("mfl.setup.controller.facilityJobTitle.list", {});
                expect(ctrl).toBeDefined();
            });

        it("should have `mfl.setup.controller.facilityJobTitle.view` defined",
           function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var ctrl = createController("mfl.setup.controller.facilityJobTitle.view", dt);
                expect(ctrl).toBeDefined();
            });
        it("should view a facilityJobTitle: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {msg: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/job_titles/1/").respond(
                200, res);
                createController("mfl.setup.controller.facilityJobTitle.view", dt);
                $httpBackend.flush();
                expect($scope.facilityJobTitles).toEqual(res);
            });

        it("should view a facilityJobTitle: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn($state, "go");
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/job_titles/1/").respond(
                500, res);
                createController("mfl.setup.controller.facilityJobTitle.view", dt);
                $scope.remove();
                $scope.cancel();
                expect($state.go).not.toHaveBeenCalledWith("setup.facility_job_titlesq");
                $httpBackend.flush();
                expect($scope.alert).toEqual(res.error);
            });

        it("should delete facilityJobTitle: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn($state, "go");
                var res = {mgs: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/job_titles/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/facilities/job_titles/1/").respond(
                200, res);
                createController("mfl.setup.controller.facilityJobTitle.view", dt);
                $scope.remove();
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("login",
                                                       {next:"dashboard"});
                expect($state.go).toHaveBeenCalledWith("setup.facility_job_titles",{},
                                                       {reload:true});
            });

        it("should delete facilityJobTitle: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn($state, "go");
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/job_titles/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/facilities/job_titles/1/").respond(
                500, res);
                createController("mfl.setup.controller.facilityJobTitle.view", dt);
                $scope.remove();
//                expect($scope.alert).toEqual(res.error);
                $scope.cancel();
                expect($state.go).toHaveBeenCalledWith("setup.facility_job_titles.view");
                $httpBackend.flush();
            });

        it("should update facilityJobTitle: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {msg: "Ok"};
                var form = {name : "Antony"};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/job_titles/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/facilities/job_titles/1/").respond(
                200, res);
                createController("mfl.setup.controller.facilityJobTitle.view", dt);
                $scope.updateFacilityJobTitle(1, form);
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.facility_job_titles");
            });

        it("should update facilityJobTitle: fail",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                var form = {name : "Antony"};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/job_titles/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/facilities/job_titles/1/").respond(
                500, res);
                createController("mfl.setup.controller.facilityJobTitle.view", dt);
                $scope.updateFacilityJobTitle(1, form);
                $httpBackend.flush();
                expect($state.go).not.toHaveBeenCalledWith("setup.facility_job_titles");
                expect($scope.alert).toEqual(res.error);
            });
        it("should update facilityJobTitle: fail: no changes",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                var form = {};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/job_titles/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/facilities/job_titles/1/").respond(
                500, res);
                createController("mfl.setup.controller.facilityJobTitle.view", dt);
                $scope.updateFacilityJobTitle(1, form);
                expect($httpBackend.flush).toThrow();
                expect($state.go).not.toHaveBeenCalledWith("setup.facility_job_titles");
            });

        it("should create facilityJobTitle: success",function(){
                spyOn($state, "go");
                $httpBackend.expectPOST(SERVER_URL+"api/facilities/job_titles/").respond(
                200, {});
                createController("mfl.setup.controller.facilityJobTitle.view", {});
                $scope.createFacilityJobTitle({name: "Testing"});
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.facility_job_titles");
            });

        it("should create chuStatus: fail",function(){
                spyOn($state, "go");
                $httpBackend.expectPOST(SERVER_URL+"api/facilities/job_titles/").respond(
                500, {error: "error"});
                createController("mfl.setup.controller.facilityJobTitle.view", {});
                $scope.createFacilityJobTitle({name: "Testing"});
                $httpBackend.flush();
                expect($scope.alert).toEqual("error");
                expect($state.go).not.toHaveBeenCalledWith("setup.facility_job_titles");
            });


        it("should have `mfl.setup.controller.facilityRegulatoryBody.list` defined",
           function(){
                var ctrl = createController("mfl.setup.controller.facilityRegulatoryBody.list", {});
                expect(ctrl).toBeDefined();
            });
        it("should view a facilityRegulatoryBody: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {msg: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/regulating_bodies/1/").respond(
                200, res);
                createController("mfl.setup.controller.facilityRegulatoryBody.edit", dt);
                $httpBackend.flush();
                expect($scope.facilityRegulatoryBodies).toEqual(res);
            });

        it("should view a facilityRegulatoryBody: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/regulating_bodies/1/").respond(
                500, res);
                createController("mfl.setup.controller.facilityRegulatoryBody.edit", dt);
                $httpBackend.flush();
                expect($scope.alert).toEqual(res.error);
            });

        it("should delete facilityRegulatoryBody: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn($state, "go");
                var res = {mgs: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/regulating_bodies/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/facilities/regulating_bodies/1/").respond(
                200, res);
                createController("mfl.setup.controller.facilityRegulatoryBody.edit", dt);
                $scope.remove();
                $httpBackend.flush();
            });

        it("should delete facilityRegulatoryBody: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn($state, "go");
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/regulating_bodies/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/facilities/regulating_bodies/1/").respond(
                500, res);
                createController("mfl.setup.controller.facilityRegulatoryBody.edit", dt);
                $scope.remove();
                $scope.cancel();
                expect($state.go)
                    .toHaveBeenCalledWith("setup.facility_regulatory_bodies.edit");
                $httpBackend.flush();
                expect($scope.alert).toEqual(res.error);
            });

        it("should update facilityRegulatoryBody: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {msg: "Ok"};
                var form = {name : "Antony"};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/regulating_bodies/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/facilities/regulating_bodies/1/").respond(
                200, res);
                createController("mfl.setup.controller.facilityRegulatoryBody.edit", dt);
                $scope.updateFacilityRegulatoryBody(1, form);
                $httpBackend.flush();
            });

        it("should update facilityRegulatoryBody: fail",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                var form = {name : "Antony"};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/regulating_bodies/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/facilities/regulating_bodies/1/").respond(
                500, res);
                createController("mfl.setup.controller.facilityRegulatoryBody.edit", dt);
                $scope.updateFacilityRegulatoryBody(1, form);
                $httpBackend.flush();
                expect($state.go).not.toHaveBeenCalledWith("setup.facility_regulatory_bodies");
                expect($scope.alert).toEqual(res.error);
            });
        it("should update facilityRegulatoryBody: fail: no changes",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                var form = {};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/regulating_bodies/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/facilities/regulating_bodies/1/").respond(
                500, res);
                createController("mfl.setup.controller.facilityRegulatoryBody.edit", dt);
                $scope.updateFacilityRegulatoryBody(1, form);
                expect($httpBackend.flush).toThrow();
                expect($state.go).not.toHaveBeenCalledWith("setup.facility_regulatory_bodies");
            });
    });
})(window._);
