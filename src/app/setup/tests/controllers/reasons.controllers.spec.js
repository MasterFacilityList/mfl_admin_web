(function(_){
    "use strict";
    describe("reasons controllers test suite", function(){
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
                createController = function(name, params){
                    return $controller("mfl.setup.controller.change_reasons."+
                                       name, _.extend(data, params));

                };
            }]);
        });

        afterEach(function(){
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("should have `mfl.setup.controller.change_reasons.list` defined",
           function(){
                var ctrl = createController("list", {});
                expect(ctrl).toBeDefined();
            });
        it("should have `mfl.setup.controller.change_reasons.view` defined",
           function(){
                var ctrl = createController("view", {});
                expect(ctrl).toBeDefined();
            });
        it("should have post new reason with success",
            inject(["$rootScope",function($rootScope){
                var data = {
                    "$scope": $rootScope.$new()
                };
                var frm = {
                    reason:"IamAReason",
                    description:"I am a reason"
                };
                $httpBackend.expectPOST(SERVER_URL+"api/facilities/level_change_reasons/")
                .respond(201);
                createController("view",data);
                data.$scope.saveFrm(frm);
                $httpBackend.flush();
            }])
        );
        it("should have post new reason but fail",
            inject(["$rootScope",function($rootScope){
                var data = {
                    "$scope": $rootScope.$new()
                };
                var frm = {
                    reason:"IamAReason",
                    description:"I am a reason"
                };
                $httpBackend.expectPOST(SERVER_URL+"api/facilities/level_change_reasons/")
                .respond(500);
                createController("view",data);
                data.$scope.saveFrm(frm);
                $httpBackend.flush();
            }])
        );
        it("should fail to load existing reason",
            inject(["$rootScope","mfl.common.forms.changes",function($rootScope,formChanges){
                var data = {
                    "$scope": $rootScope.$new(),
                    "mfl.common.forms.changes" : formChanges,
                    "$stateParams": {reason_id: 1}
                };
                $httpBackend.expectGET(SERVER_URL+"api/facilities/level_change_reasons/1/")
                .respond(500);
                createController("view",data);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingRequest();
                $httpBackend.verifyNoOutstandingExpectation();
            }])
        );
        it("should have patch reason with form changes succeeded patch",
            inject(["$rootScope","mfl.common.forms.changes",function($rootScope,formChanges){
                var data = {
                    "$scope": $rootScope.$new(),
                    "mfl.common.forms.changes" : formChanges,
                    "$stateParams": {reason_id: 1}
                };
                var frm = {
                    reason:"IamAReason",
                    description:"I am a reason"
                };
                $httpBackend.expectGET(SERVER_URL+"api/facilities/level_change_reasons/1/")
                .respond(200);
                createController("view",data);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingRequest();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.resetExpectations();
                spyOn(formChanges, "whatChanged").andReturn({reason:"IamAReason"});
                $httpBackend.expectPATCH(SERVER_URL+"api/facilities/level_change_reasons/1/")
                .respond(200, {"id": 1});
                data.$scope.saveFrm(frm);
                $httpBackend.flush();
            }])
        );
        it("should have patch reason with form changes failed patch",
            inject(["$rootScope","mfl.common.forms.changes",function($rootScope,formChanges){
                var data = {
                    "$scope": $rootScope.$new(),
                    "mfl.common.forms.changes" : formChanges,
                    "$stateParams": {reason_id: 1}
                };
                var frm = {
                    reason:"IamAReason",
                    description:"I am a reason"
                };
                $httpBackend.expectGET(SERVER_URL+"api/facilities/level_change_reasons/1/")
                .respond(200);
                createController("view",data);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingRequest();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.resetExpectations();
                spyOn(formChanges, "whatChanged").andReturn({reason:"IamAReason"});
                $httpBackend.expectPATCH(SERVER_URL+"api/facilities/level_change_reasons/1/")
                .respond(500);
                data.$scope.saveFrm(frm);
                $httpBackend.flush();
            }])
        );
        it("should have patch reason without form changes",
            inject(["$rootScope","mfl.common.forms.changes",function($rootScope,formChanges){
                var data = {
                    "$scope": $rootScope.$new(),
                    "mfl.common.forms.changes" : formChanges,
                    "$stateParams": {reason_id: 1}
                };
                var frm = {
                    reason:"IamAReason",
                    description:"I am a reason"
                };
                $httpBackend.expectGET(SERVER_URL+"api/facilities/level_change_reasons/1/")
                .respond(200);
                createController("view",data);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingRequest();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.resetExpectations();
                spyOn(formChanges, "whatChanged").andReturn({});
                data.$scope.saveFrm(frm);
            }])
        );
        it("should delete a reason: success",function(){
                var res = {msg: "ok"};
                var dt = {
                    $stateParams: {reason_id: 1}
                };
                spyOn($state, "go");
                $httpBackend.expectDELETE(SERVER_URL+"api/facilities/level_change_reasons/1/")
                .respond(200, res);
                createController("view", dt);
                $scope.remove();
                $scope.cancel();
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.facility_reasons");
            });
        it("should delete a contact:reason fail",function(){
                var res = {"detail":"Authentication credentials were not provided."};
                var dt = {
                    $stateParams: {reason_id: 1}
                };
                spyOn($state, "go");
                $httpBackend.expectDELETE(SERVER_URL+"api/facilities/level_change_reasons/1/")
                .respond(500, res);
                createController("view", dt);
                $scope.remove();
                $scope.cancel();
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.facility_reasons");
            });

    });
})(window._);
