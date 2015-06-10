(function(describe){
    "use strict";
    describe("Facility view controllers test suite", function(){
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

        it("should have `mfl.facilities.controllers.view.base` defined",
           function(){
                var dt = {
                    $stateParams: {facilityId: 1}
                };
                var ctrl = createController("mfl.facilities.controllers.view.base", dt);
                expect(ctrl).toBeDefined();
            });

        it("should retrieve a facility : fail ", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(500, errorRes);
            createController("mfl.facilities.controllers.view.base", dt);
            $httpBackend.flush();
            expect($scope.alert).toBeTruthy();
        });

        it("should retrieve a facility : success ", function(){
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            var res = {name: "KNHH"};
            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(200, res);
            createController("mfl.facilities.controllers.view.base", dt);
            $httpBackend.flush();
            expect($scope.facility).toEqual(res);
        });

        it("should have mfl.facilities.controllers.view.approve` defined",
           function(){
                var dt = {
                    $stateParams: {facilityId: 1}
                };
                var ctrl = createController("mfl.facilities.controllers.view.approve", dt);
                expect(ctrl).toBeDefined();
            });
        it("should approve facility: success",
           function(){
                var dt = {
                    $stateParams: {facilityId: 1}
                };
                var res = {name: "KNHH"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
                .respond(200, res);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/facilitiy_approvals/?facility=1")
                .respond(200, res);
                $httpBackend.expectPOST(SERVER_URL+"api/facilities/facilitiy_approvals/")
                .respond(200, {msg: "ok"});
                createController("mfl.facilities.controllers.view.approve", dt);
                $scope.approveFacility(res);
                $httpBackend.flush();
                expect($scope.facility_approvals).toEqual(res);

            });

        it("should approve facility: fail",
           function(){
                var dt = {
                    $stateParams: {facilityId: 1}
                };
                var res = {name: "KNHH"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
                .respond(200, res);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/facilitiy_approvals/?facility=1")
                .respond(200, res);
                $httpBackend.expectPOST(SERVER_URL+"api/facilities/facilitiy_approvals/")
                .respond(500, errorRes);
                createController("mfl.facilities.controllers.view.approve", dt);
                $scope.approveFacility(res);
                $httpBackend.flush();
                expect($scope.alert).toBeDefined();

            });

        it("should have mfl.facilities.controllers.view.add_unit` defined",
           function(){
                var dt = {
                    $stateParams: {facilityId: 1}
                };
                var ctrl = createController("mfl.facilities.controllers.view.add_unit", dt);
                expect(ctrl).toBeDefined();
            });
        it("should add facility unit: success",
           function(){
                var dt = {
                    $stateParams: {facilityId: 1}
                };
                var res = {name: "KNHH"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
                .respond(200, res);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/facility_units/?facility=1")
                .respond(200, res);
                $httpBackend.expectPOST(SERVER_URL+"api/facilities/facility_units/")
                .respond(200, {msg: "ok"});
                createController("mfl.facilities.controllers.view.add_unit", dt);
                $scope.saveFacilityUnit(res);
                $httpBackend.flush();
                expect($scope.facility_units).toEqual(res);

            });

        it("should add  facility unit: fail",function(){
                var dt = {
                    $stateParams: {facilityId: 1}
                };
                var res = {name: "KNHH"};
                $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
                .respond(200, res);
                $httpBackend.expectGET(SERVER_URL+"api/facilities/facility_units/?facility=1")
                .respond(200, res);
                $httpBackend.expectPOST(SERVER_URL+"api/facilities/facility_units/")
                .respond(500, errorRes);
                createController("mfl.facilities.controllers.view.add_unit", dt);
                $scope.saveFacilityUnit(res);
                $httpBackend.flush();
                expect($scope.alert).toBeDefined();
            });

        it("should get options data, `regulatory body` in facility unit: success ", function(){
            spyOn(testFunc, "callback");
            var dt = {
                $stateParams: {facilityId: 1}
            };
            var res = {results: {name: "KNHH"}};

            $httpBackend.expectGET(SERVER_URL+"api/facilities/regulating_bodies/")
            .respond(200, res);
            createController("mfl.facilities.controllers.view.add_unit", dt);
            $scope.getOptionsData.regulatingBody(testFunc.callback);
            $httpBackend.flush();
            expect(testFunc.callback).toHaveBeenCalledWith(res.results);
        });

        it("should get options data, `regulatory body` in facility unit: fail ", function(){
            spyOn(testFunc, "callback");
            var dt = {
                $stateParams: {facilityId: 1}
            };

            $httpBackend.expectGET(SERVER_URL+"api/facilities/regulating_bodies/")
            .respond(500, errorRes);
            createController("mfl.facilities.controllers.view.add_unit", dt);
            $scope.getOptionsData.regulatingBody(testFunc.callback);
            $httpBackend.flush();
            expect($scope.alert).toBeDefined();
        });

        it("should get options data, `regulation status` in facility unit: success ", function(){
            spyOn(testFunc, "callback");
            var dt = {
                $stateParams: {facilityId: 1}
            };
            var res = {results: {name: "KNHH"}};

            $httpBackend.expectGET(SERVER_URL+"api/facilities/regulation_status/")
            .respond(200, res);
            createController("mfl.facilities.controllers.view.add_unit", dt);
            $scope.getOptionsData.regulationStatus(testFunc.callback);
            $httpBackend.flush();
            expect(testFunc.callback).toHaveBeenCalledWith(res.results);
        });

    });
})(describe);
