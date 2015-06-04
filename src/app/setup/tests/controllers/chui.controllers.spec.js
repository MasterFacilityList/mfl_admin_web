(function(describe){
    "use strict";
    describe("chu controllers test suite", function(){
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

        it("should have `mfl.setup.controller.chuStatus.list` defined",
           function(){
                var ctrl = createController("mfl.setup.controller.chuStatus.list", {});
                expect(ctrl).toBeDefined();
            });

        it("should have `mfl.setup.controller.chuStatus.view` defined",
           function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var ctrl = createController("mfl.setup.controller.chuStatus.view", dt);
                expect(ctrl).toBeDefined();
            });
        it("should view a chuStatus: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {msg: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/chul/statuses/1/").respond(
                200, res);
                createController("mfl.setup.controller.chuStatus.view", dt);
                $httpBackend.flush();
                expect($scope.chuStatus).toEqual(res);
            });
        it("should navigate to creating new chuStatus", function () {
            var dt = {
                $stateParams : {id: "create"}
            };
            var test_title = [
                {
                    icon: "fa-plus-circle",
                    name: "New Community Unit Status"
                }
            ];
            createController("mfl.setup.controller.chuStatus.view", dt);
            expect($scope.title).toEqual(test_title);
        });

        it("should view a chuStatus: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/chul/statuses/1/").respond(
                500, res);
                createController("mfl.setup.controller.chuStatus.view", dt);
                $httpBackend.flush();
                expect($scope.alert).toEqual(res.error);
            });

        it("should delete chuStatus: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn($state, "go");
                var res = {mgs: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/chul/statuses/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/chul/statuses/1/").respond(
                200, res);
                createController("mfl.setup.controller.chuStatus.view", dt);
                $scope.deleteChuStatus(1);
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.chu_status");
            });

        it("should delete chuStatus: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/chul/statuses/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/chul/statuses/1/").respond(
                500, res);
                createController("mfl.setup.controller.chuStatus.view", dt);
                $scope.deleteChuStatus(1);
                $httpBackend.flush();
                expect($scope.alert).toEqual(res.error);
            });

        it("should update chuStatus: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {msg: "Ok"};
                var form = {name : "Antony"};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/chul/statuses/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/chul/statuses/1/").respond(
                200, res);
                createController("mfl.setup.controller.chuStatus.view", dt);
                $scope.updateChuStatus(1, form);
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.chu_status");
            });

        it("should update chuStatus: fail",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                var form = {name : "Antony"};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/chul/statuses/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/chul/statuses/1/").respond(
                500, res);
                createController("mfl.setup.controller.chuStatus.view", dt);
                $scope.updateChuStatus(1, form);
                $httpBackend.flush();
                expect($state.go).not.toHaveBeenCalledWith("setup.chu_status");
                expect($scope.alert).toEqual(res.error);
            });

        it("should update chuStatus: no changes",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                var form = {};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/chul/statuses/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/chul/statuses/1/").respond(
                500, res);
                createController("mfl.setup.controller.chuStatus.view", dt);
                $scope.updateChuStatus(1, form);
                expect($httpBackend.flush).toThrow();
                expect($state.go).not.toHaveBeenCalledWith("setup.chu_status");
            });

        it("should create chuStatus: success",function(){
                spyOn($state, "go");
                $httpBackend.expectPOST(SERVER_URL+"api/chul/statuses/").respond(
                200, {});
                createController("mfl.setup.controller.chuStatus.view", {});
                $scope.createChuStatus({name: "Testing"});
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.chu_status");
            });

        it("should create chuStatus: fail",function(){
                spyOn($state, "go");
                $httpBackend.expectPOST(SERVER_URL+"api/chul/statuses/").respond(
                500, {error: "error"});
                createController("mfl.setup.controller.chuStatus.view", {});
                $scope.createChuStatus({name: "Testing"});
                $httpBackend.flush();
                expect($scope.alert).toEqual("error");
                expect($state.go).not.toHaveBeenCalledWith("setup.chu_status");
            });


        it("should have `mfl.setup.controller.chuApprover.list` defined",
           function(){
                var ctrl = createController("mfl.setup.controller.chuApprover.list", {});
                expect(ctrl).toBeDefined();
            });

        it("should have `mfl.setup.controller.chuApprover.view` defined",
           function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var ctrl = createController("mfl.setup.controller.chuApprover.view", dt);
                expect(ctrl).toBeDefined();
            });
        it("should view a chuApprover: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {msg: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/chul/approvers/1/").respond(
                200, res);
                createController("mfl.setup.controller.chuApprover.view", dt);
                $httpBackend.flush();
                expect($scope.chuApprovers).toEqual(res);
            });

        it("should view a chuApprover: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/chul/approvers/1/").respond(
                500, res);
                createController("mfl.setup.controller.chuApprover.view", dt);
                $httpBackend.flush();
                expect($scope.alert).toEqual(res.error);
            });

        it("should navigate to creating new chuApprover", function () {
            var dt = {
                $stateParams : {id: "create"}
            };
            var test_title = [
                {
                    icon: "fa-plus-circle",
                    name: "New Community Unit Approver"
                }
            ];
            createController("mfl.setup.controller.chuApprover.view", dt);
            expect($scope.title).toEqual(test_title);
        });

        it("should delete chuApprover: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn($state, "go");
                var res = {mgs: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/chul/approvers/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/chul/approvers/1/").respond(
                200, res);
                createController("mfl.setup.controller.chuApprover.view", dt);
                $scope.deleteChuApprovers(1);
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.chu_approvers");
            });

        it("should delete chuApprover: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/chul/approvers/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/chul/approvers/1/").respond(
                500, res);
                createController("mfl.setup.controller.chuApprover.view", dt);
                $scope.deleteChuApprovers(1);
                $httpBackend.flush();
                expect($scope.alert).toEqual(res.error);
            });

        it("should update chuApprover: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {msg: "Ok"};
                var form = {name : "Antony"};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/chul/approvers/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/chul/approvers/1/").respond(
                200, res);
                createController("mfl.setup.controller.chuApprover.view", dt);
                $scope.updateChuApprovers(1, form);
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.chu_approvers");
            });

        it("should update chuApprover: fail",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                var form = {name : "Antony"};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/chul/approvers/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/chul/approvers/1/").respond(
                500, res);
                createController("mfl.setup.controller.chuApprover.view", dt);
                $scope.updateChuApprovers(1, form);
                $httpBackend.flush();
                expect($state.go).not.toHaveBeenCalledWith("setup.chu_approvers");
                expect($scope.alert).toEqual(res.error);
            });

        it("should update chuApprover: no changes",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                var form = {};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/chul/approvers/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/chul/approvers/1/").respond(
                500, res);
                createController("mfl.setup.controller.chuApprover.view", dt);
                $scope.updateChuApprovers(1, form);
                expect($httpBackend.flush).toThrow();
                expect($state.go).not.toHaveBeenCalledWith("setup.chu_approvers");
            });

        it("should create chuApprover: success",function(){
                spyOn($state, "go");
                $httpBackend.expectPOST(SERVER_URL+"api/chul/approvers/").respond(
                200, {});
                createController("mfl.setup.controller.chuApprover.view", {});
                $scope.createChuApprovers({name: "Testing"});
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.chu_approvers");
            });

        it("should create chuApprover: fail",function(){
                spyOn($state, "go");
                $httpBackend.expectPOST(SERVER_URL+"api/chul/approvers/").respond(
                500, {error: "error"});
                createController("mfl.setup.controller.chuApprover.view", {});
                $scope.createChuApprovers({name: "Testing"});
                $httpBackend.flush();
                expect($scope.alert).toEqual("error");
                expect($state.go).not.toHaveBeenCalledWith("setup.chu_approvers");
            });
    });
})(describe);
