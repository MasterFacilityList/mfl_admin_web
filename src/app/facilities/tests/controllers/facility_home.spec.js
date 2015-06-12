(function(describe){
    "use strict";
    describe("Facility home controllers test suite", function(){
        var createController, $scope, $stateParams, $httpBackend, $state, facilitiesApi;
        var SERVER_URL, formService;

        beforeEach(function(){
            module("mflAdminApp");
            inject(["$rootScope", "$controller", "$stateParams", "$httpBackend",
                   "$state", "mfl.facilities.wrappers","SERVER_URL","mfl.common.forms.changes",
                   function($rootScope, $controller,_$stateParams,
                    _$httpBackend, _$state, _facilityApi, frm, _SERVER_URL, frmService){
                $scope = $rootScope.$new();
                SERVER_URL = _SERVER_URL;
                formService = frmService;
                $httpBackend = _$httpBackend;
                $stateParams = _$stateParams;
                $state = _$state;
                facilitiesApi = _facilityApi;
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

        it("should have `mfl.facilities.controllers.home.base``and 'state.go' defined",
           function(){
                spyOn($state, "go");
                var ctrl = createController("mfl.facilities.controllers.home.base", {});
                expect(ctrl).toBeDefined();
                expect($state.go).toHaveBeenCalledWith("facilities.list");
            });
        it("should have `mfl.facilities.controllers.home.list` defined",
           function(){
                var ctrl = createController("mfl.facilities.controllers.home.list", {});
                expect(ctrl).toBeDefined();
            });

        it("should have `mfl.facilities.controllers.home.facility_status` defined",
           function(){
                var ctrl = createController("mfl.facilities.controllers.home.facility_status", {});
                expect(ctrl).toBeDefined();
            });

        it("should have `mfl.facilities.controllers.home.facility_type` defined",
           function(){
                var ctrl = createController("mfl.facilities.controllers.home.facility_type", {});
                expect(ctrl).toBeDefined();
            });

        it("should update facility Type",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn(facilitiesApi.utils, "setActions");
                spyOn(facilitiesApi.utils, "update");
                createController("mfl.facilities.controllers.home.facility_type.create", dt);
                $scope.updateFacilityType(1, {"name": "testing"});
                expect(facilitiesApi.utils.update).toHaveBeenCalled();
            });

        it("should create facility Type",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn(facilitiesApi.utils, "setActions");
                spyOn(facilitiesApi.utils,   "create");
                createController("mfl.facilities.controllers.home.facility_type.create", dt);
                $scope.createFacilityType({"name": "testing"});
                expect(facilitiesApi.utils.create).toHaveBeenCalled();
            });

        it("should update facility status",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn(facilitiesApi.utils, "setActions");
                spyOn(facilitiesApi.utils, "update");
                createController("mfl.facilities.controllers.home.facility_status.create", dt);
                $scope.updateFacilityStatus(1, {"name": "testing"});
                expect(facilitiesApi.utils.update).toHaveBeenCalled();
            });

        it("should create facility status",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn(facilitiesApi.utils, "setActions");
                spyOn(facilitiesApi.utils,   "create");
                createController("mfl.facilities.controllers.home.facility_status.create", dt);
                $scope.createFacilityStatus({"name": "testing"});
                expect(facilitiesApi.utils.create).toHaveBeenCalled();
            });
    });
})(describe);
