(function(describe){
    "use strict";
    describe("Facility create controllers test suite", function(){
        var createController, $scope, $stateParams, $httpBackend, $state;
        var formService, SERVER_URL, facilityApi;
        var errorRes = {
            error:{error_msg:{error: "error"}}
        };
        var testFunc = {callback: function(){}};
        beforeEach(function(){
            module("mflAdminApp");
            inject(["$rootScope", "$controller", "$stateParams", "$httpBackend",
                   "$state","mfl.common.forms.changes","SERVER_URL","mfl.facilities.wrappers",
                   function($rootScope, $controller,_$stateParams,
                    _$httpBackend, _$state, frm, _SERVER_URL, _facilityApi){
                $scope = $rootScope.$new();
                facilityApi = _facilityApi;
                SERVER_URL = _SERVER_URL;
                $httpBackend = _$httpBackend;
                $stateParams = _$stateParams;
                $state = _$state;
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

        it("should have `mfl.facilities.controllers.create.base` defined",
           function(){
                var ctrl = createController("mfl.facilities.controllers.create.base", {});
                expect(ctrl).toBeDefined();
            });
        it("should create a facility : success ", function(){
            var res = {county: "testing"};
            $httpBackend.expectPOST(SERVER_URL+"api/facilities/facilities/")
            .respond(200, res);
            createController("mfl.facilities.controllers.create.base", {});
            $scope.saveFacility({name: "test", county:[{id:1, name:"kiambu"}]});
            $httpBackend.flush();
            expect($scope.facility).toEqual(res);
        });

        it("should create a facility : fail ", function(){
            $httpBackend.expectPOST(SERVER_URL+"api/facilities/facilities/")
            .respond(500, errorRes);
            createController("mfl.facilities.controllers.create.base", {});
            $scope.saveFacility({name: "test", county:[{id:1, name:"kiambu"}]});
            $httpBackend.flush();
            expect($scope.alert).toBeTruthy();
        });

        it("should retrieve a facility : success ", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            var res = {county: "testing"};
            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(200, res);
            createController("mfl.facilities.controllers.create.base", dt);
            $httpBackend.flush();
            expect($scope.facility).toEqual(res);
        });

        it("should retrieve a facility : fail ", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(500, errorRes);
            createController("mfl.facilities.controllers.create.base", dt);
            $httpBackend.flush();
            expect($scope.alert).toBeTruthy();
        });

        it("should get options data, `county`: success ", function(){
            var res = {county: "testing"};
            spyOn(testFunc, "callback");
            $httpBackend.expectGET(SERVER_URL+"api/common/filtering_summaries/?fields=county")
            .respond(200, res);
            createController("mfl.facilities.controllers.create.base", {});
            $scope.getOptionsData.county(testFunc.callback);
            $httpBackend.flush();
            expect(testFunc.callback).toHaveBeenCalledWith(res.county);
        });

        it("should get options data, `county`: fail ", function(){
            spyOn(facilityApi.utils, "getError");
            $httpBackend.expectGET(SERVER_URL+"api/common/filtering_summaries/?fields=county")
            .respond(500, errorRes);
            createController("mfl.facilities.controllers.create.base", {});
            $scope.getOptionsData.county(testFunc.callback);
            $httpBackend.flush();
            expect(facilityApi.utils.getError).toHaveBeenCalled();
        });

        it("should get options data, `facility_type`: success ", function(){
            var res = {facility_type: "testing"};
            spyOn(testFunc, "callback");
            $httpBackend.expectGET(
                SERVER_URL+"api/common/filtering_summaries/?fields=facility_type")
            .respond(200, res);
            createController("mfl.facilities.controllers.create.base", {});
            $scope.getOptionsData.facilityType(testFunc.callback);
            $httpBackend.flush();
            expect(testFunc.callback).toHaveBeenCalledWith(res.facility_type);
        });

        it("should get options data, `county`: fail ", function(){
            spyOn(facilityApi.utils, "getError");
            $httpBackend.expectGET(
                SERVER_URL+"api/common/filtering_summaries/?fields=facility_type")
            .respond(500, errorRes);
            createController("mfl.facilities.controllers.create.base", {});
            $scope.getOptionsData.facilityType(testFunc.callback);
            $httpBackend.flush();
            expect(facilityApi.utils.getError).toHaveBeenCalled();
        });

        it("should get options data, `operation_status`: success ", function(){
            var res = {operation_status: "testing"};
            spyOn(testFunc, "callback");
            $httpBackend.expectGET(
                SERVER_URL+"api/common/filtering_summaries/?fields=operation_status")
            .respond(200, res);
            createController("mfl.facilities.controllers.create.base", {});
            $scope.getOptionsData.operationStatus(testFunc.callback);
            $httpBackend.flush();
            expect(testFunc.callback).toHaveBeenCalledWith(res.operation_status);
        });

        it("should get options data, `county`: fail ", function(){
            spyOn(facilityApi.utils, "getError");
            $httpBackend.expectGET(
                SERVER_URL+"api/common/filtering_summaries/?fields=operation_status")
            .respond(500, errorRes);
            createController("mfl.facilities.controllers.create.base", {});
            $scope.getOptionsData.operationStatus(testFunc.callback);
            $httpBackend.flush();
            expect(facilityApi.utils.getError).toHaveBeenCalled();
        });

        it("should get options data, `owner`: success ", function(){
            var res = {owner: "testing"};
            spyOn(testFunc, "callback");
            $httpBackend.expectGET(
                SERVER_URL+"api/common/filtering_summaries/?fields=owner")
            .respond(200, res);
            createController("mfl.facilities.controllers.create.base", {});
            $scope.getOptionsData.owner(testFunc.callback);
            $httpBackend.flush();
            expect(testFunc.callback).toHaveBeenCalledWith(res.owner);
        });

        it("should get options data, `constituency`: success ", function(){
            var res = {constituency: "testing"};
            spyOn(testFunc, "callback");
            $httpBackend.expectGET(
                SERVER_URL+"api/common/filtering_summaries/?fields=constituency")
            .respond(200, res);
            createController("mfl.facilities.controllers.create.base", {});
            $scope.getOptionsData.constituency(testFunc.callback);
            $httpBackend.flush();
            expect(testFunc.callback).toHaveBeenCalledWith(res.constituency);
        });


        it("should get options data, `ward`: success ", function(){
            var res = {ward: "testing"};
            spyOn(testFunc, "callback");
            $httpBackend.expectGET(
                SERVER_URL+"api/common/filtering_summaries/?fields=ward")
            .respond(200, res);
            createController("mfl.facilities.controllers.create.base", {});
            $scope.getOptionsData.ward(testFunc.callback);
            $httpBackend.flush();
            expect(testFunc.callback).toHaveBeenCalledWith(res.ward);
        });

        it("should trigger event, `county`: success ", function(){
            var res = {results: ["testing"]};
            spyOn(testFunc, "callback");
            $httpBackend.expectGET(
                SERVER_URL+"api/common/constituencies/?county=1")
            .respond(200, res);
            createController("mfl.facilities.controllers.create.base", {});
            $scope.events.county({id: 1});
            $httpBackend.flush();
            expect($scope.filterData.constituency).toEqual(res.results);
        });

        it("should trigger event, `county`: fail ", function(){
            spyOn(testFunc, "callback");
            $httpBackend.expectGET(
                SERVER_URL+"api/common/constituencies/?county=1")
            .respond(500, errorRes);
            createController("mfl.facilities.controllers.create.base", {});
            $scope.events.county({id: 1});
            $httpBackend.flush();
            expect($scope.alert).toBeDefined();
        });

        it("should trigger event, `constituency`: success ", function(){
            var res = {results: ["testing"]};
            spyOn(testFunc, "callback");
            $httpBackend.expectGET(
                SERVER_URL+"api/common/wards/?constituency=1")
            .respond(200, res);
            createController("mfl.facilities.controllers.create.base", {});
            $scope.events.constituency({id: 1});
            $httpBackend.flush();
            expect($scope.filterData.ward).toEqual(res.results);
        });
    });
})(describe);
