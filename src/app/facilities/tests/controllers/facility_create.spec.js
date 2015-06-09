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

        it("should have `mfl.facilities.controllers.create.address` defined",
           function(){
                var dt = {
                    $stateParams: {facilityId: 1}
                };
                var ctrl = createController("mfl.facilities.controllers.create.address", dt);
                expect(ctrl).toBeDefined();
            });
        it("should create a facility address : success saving address", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            var res = {county: "testing"};
            spyOn($state, "go");
            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(200, {physical_address:1});
            $httpBackend.expectPOST(SERVER_URL+"api/common/address/")
            .respond(200, {id: 1});
            $httpBackend.expectPATCH(SERVER_URL+"api/facilities/facilities/1/")
            .respond(200, res);
            createController("mfl.facilities.controllers.create.address", dt);
            $scope.saveAddress({name: "test"});
            $httpBackend.flush();
            expect($state.go).toHaveBeenCalledWith("facilities.create.contacts");
        });

        it("should create a facility address: fail, saving saveAddress ", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(200, {physical_address:1});
            $httpBackend.expectPOST(SERVER_URL+"api/common/address/")
            .respond(500, errorRes);
            createController("mfl.facilities.controllers.create.address", dt);
            $scope.saveAddress({name: "test"});
            $httpBackend.flush();
            expect($scope.alert).toBeTruthy();
        });

        it("should create a facility address : fail patching facility address", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            spyOn($state, "go");
            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(200, {physical_address:1});
            $httpBackend.expectPOST(SERVER_URL+"api/common/address/")
            .respond(200, {id: 1});
            $httpBackend.expectPATCH(SERVER_URL+"api/facilities/facilities/1/")
            .respond(500, errorRes);
            createController("mfl.facilities.controllers.create.address", dt);
            $scope.saveAddress({name: "test"});
            $httpBackend.flush();
            expect($state.go).not.toHaveBeenCalledWith("facilities.create.contacts");
        });


        it("should update a facility address : success", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            var form = {name : "Antony"};
            spyOn($state, "go");
            spyOn(formService, "whatChanged").andReturn(form);

            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(200, {physical_address:1});
            $httpBackend.expectPATCH(SERVER_URL+"api/common/address/1/")
            .respond(200, {id: 1});
            createController("mfl.facilities.controllers.create.address", dt);
            $scope.updateAddress(1, form);
            $httpBackend.flush();
            expect($scope.address).toEqual({id:1});
        });

        it("should update a facility address : no form changes", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            var form = {};
            spyOn($state, "go");
            spyOn(formService, "whatChanged").andReturn(form);

            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(200, {physical_address:1});
            $httpBackend.expectPATCH(SERVER_URL+"api/common/address/1/")
            .respond(200, {id: 1});
            createController("mfl.facilities.controllers.create.address", dt);
            $scope.updateAddress(1, form);
            expect($httpBackend.flush).toThrow();
        });


        it("should update a facility address : fail", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            var form = {name : "Antony"};
            spyOn($state, "go");
            spyOn(formService, "whatChanged").andReturn(form);

            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(200, {physical_address:1});
            $httpBackend.expectPATCH(SERVER_URL+"api/common/address/1/")
            .respond(500, errorRes);
            createController("mfl.facilities.controllers.create.address", dt);
            $scope.updateAddress(1, form);
            $httpBackend.flush();
            expect($scope.alert).toBeDefined();
        });

        it("it should get facility: creating fac address : success", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };

            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(200, {physical_address:1});
            $httpBackend.expectGET(SERVER_URL+"api/common/address/1/")
            .respond(200, {id: 1});
            createController("mfl.facilities.controllers.create.address", dt);
            $httpBackend.flush();
            expect($scope.address).toEqual({id:1});
        });

        it("it should get facility: creating fac address : fail", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };

            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(500, errorRes);
            createController("mfl.facilities.controllers.create.address", dt);
            $httpBackend.flush();
            expect($scope.alert).toBeDefined();
        });

        it("it should get facility: creating fac address : no address", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };

            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(200, {});
            createController("mfl.facilities.controllers.create.address", dt);
            $httpBackend.flush();
            expect($scope.address.id).toBeFalsy();
        });


        it("should have `mfl.facilities.controllers.create.contacts` defined",
           function(){
                var dt = {
                    $stateParams: {facilityId: 1}
                };
                var ctrl = createController("mfl.facilities.controllers.create.contacts", dt);
                expect(ctrl).toBeDefined();
            });

        it("should get options data, `contactType`: success, in facility contacts ", function(){
            var res = {county: "testing"};
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            spyOn(testFunc, "callback");
            $httpBackend.expectGET(SERVER_URL+"api/common/contact_types/")
            .respond(200, res);
            createController("mfl.facilities.controllers.create.contacts", dt);
            $scope.getOptionsData.contactType(testFunc.callback);
            $httpBackend.flush();
            expect(testFunc.callback).toHaveBeenCalled();
        });

        it("should get options data, `contactType`: fail, in facility contacts ", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            spyOn(testFunc, "callback");
            $httpBackend.expectGET(SERVER_URL+"api/common/contact_types/")
            .respond(500, errorRes);
            createController("mfl.facilities.controllers.create.contacts", dt);
            $scope.getOptionsData.contactType(testFunc.callback);
            $httpBackend.flush();
            expect(testFunc.callback).toHaveBeenCalledWith([]);
            expect($scope.alert).toBeTruthy();
        });

        it("should create a facility contact : success", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            var form = {name : "Antony"};
            spyOn($state, "go");
            spyOn(formService, "whatChanged").andReturn(form);
            $httpBackend.expectPOST(SERVER_URL+"api/common/contacts/")
            .respond(200, {id: 1});
            $httpBackend.expectPOST(SERVER_URL+"api/facilities/contacts/")
            .respond(200, {});
            createController("mfl.facilities.controllers.create.contacts", dt);
            $scope.saveContact(1, form);
            $httpBackend.flush();
            expect($scope.contact).toEqual({name:"", contact_type:""});
        });


        it("should create a facility contact : fail, when saving contact", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            var form = {name : "Antony"};
            spyOn($state, "go");
            spyOn(formService, "whatChanged").andReturn(form);
            $httpBackend.expectPOST(SERVER_URL+"api/common/contacts/")
            .respond(500, errorRes);
            createController("mfl.facilities.controllers.create.contacts", dt);
            $scope.saveContact(1, form);
            $httpBackend.flush();
            expect($scope.alert).toBeTruthy();
        });


        it("should create a facility contact : fail, when saving facility contact", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            var form = {name : "Antony"};
            spyOn($state, "go");
            spyOn(formService, "whatChanged").andReturn(form);
            $httpBackend.expectPOST(SERVER_URL+"api/common/contacts/")
            .respond(200, {id:1});
            $httpBackend.expectPOST(SERVER_URL+"api/facilities/contacts/")
            .respond(500, errorRes);
            createController("mfl.facilities.controllers.create.contacts", dt);
            $scope.saveContact(1, form);
            $httpBackend.flush();
            expect($scope.alert).toBeTruthy();
        });
    });
})(describe);
