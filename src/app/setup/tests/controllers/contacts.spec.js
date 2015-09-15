(function(_){
    "use strict";
    describe("contacts controllers test suite", function(){
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

        it("should have `mfl.setup.controller.contact_types.list` defined",
           function(){
                var ctrl = createController("mfl.setup.controller.contact_types.list", {});
                expect(ctrl).toBeDefined();
            });

        it("should have `mfl.setup.controller.contact_types.view` defined",
           function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var ctrl = createController("mfl.setup.controller.contact_types.view", dt);
                expect(ctrl).toBeDefined();
            });

        it("should edit a contact type: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {msg: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/common/contact_types/1/").respond(
                200, res);
                createController("mfl.setup.controller.contact_types.view", dt);
                $httpBackend.flush();
                expect($scope.contact_types).toEqual(res);
            });

        it("should edit contact types: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/common/contact_types/1/").respond(
                500, res);
                createController("mfl.setup.controller.contact_types.view", dt);
                $scope.remove();
                $scope.cancel();
                $httpBackend.flush();
                expect($scope.alert).toEqual(res.error);
            });

        it("should delete contact type: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn($state, "go");
                var res = {mgs: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/common/contact_types/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/common/contact_types/1/").respond(
                200, res);
                createController("mfl.setup.controller.contact_types.view", dt);

                $scope.remove();
                $scope.cancel();
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.contact_types", {  },
                                                       { reload : true });
            });

        it("should delete contact types: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn($state, "go");
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/common/contact_types/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/common/contact_types/1/").respond(
                500, res);
                createController("mfl.setup.controller.contact_types.view", dt);
                $scope.remove();
                $scope.cancel();
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.contact_types", {  },
                                                       { reload : true });
                expect($scope.alert).toEqual(res.error);
            });

        it("should update contact types: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {msg: "Ok"};
                var form = {name : "Antony"};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/common/contact_types/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/common/contact_types/1/").respond(
                200, res);
                createController("mfl.setup.controller.contact_types.view", dt);
                $scope.updateContacts(1, form);
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.contact_types", {  },
                                                       { reload : true });
            });

        it("should update contact types: fail",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                var form = {name : "Antony"};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/common/contact_types/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/common/contact_types/1/").respond(
                500, res);
                createController("mfl.setup.controller.contact_types.view", dt);
                $scope.updateContacts(1, form);
                $httpBackend.flush();
                expect($state.go).not.toHaveBeenCalledWith("setup.contact_types");
                expect($scope.alert).toEqual(res.error);
            });

        it("should update contact types: no changes",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                var form = {};
                spyOn($state, "go");
                spyOn(formService, "whatChanged").andReturn(form);
                $httpBackend.expectGET(SERVER_URL+"api/common/contact_types/1/").respond(
                200, res);
                $httpBackend.expectPATCH(SERVER_URL+"api/common/contact_types/1/").respond(
                500, res);
                createController("mfl.setup.controller.contact_types.view", dt);
                $scope.updateContacts(1, form);
                expect($httpBackend.flush).toThrow();
                expect($state.go).not.toHaveBeenCalledWith("setup.contact_types");
            });

        it("should create contact types: success",function(){
                spyOn($state, "go");
                $httpBackend.expectPOST(SERVER_URL+"api/common/contact_types/").respond(
                200, {});
                createController("mfl.setup.controller.contact_types.view", {});
                $scope.createContacts({name: "Testing"});
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.contact_types", {  },
                                                       { reload : true });
            });

        it("should create contact type: fail",function(){
                spyOn($state, "go");
                $httpBackend.expectPOST(SERVER_URL+"api/common/contact_types/").respond(
                500, {error: "error"});
                createController("mfl.setup.controller.contact_types.view", {});
                $scope.createContacts({name: "Testing"});
                $httpBackend.flush();
                expect($scope.alert).toEqual("error");
                expect($state.go).not.toHaveBeenCalledWith("setup.contact_types");
            });
        it("should delete a contact type: success",function(){
                var res = {msg: "ok"};
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn($state, "go");
                $httpBackend.expectDELETE(SERVER_URL+"api/common/contact_types/1/").respond(
                200, res);
                createController("mfl.setup.controller.contact_types.view", dt);
                $scope.remove();
                $scope.cancel();
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.contact_types", {  },
                                                       { reload : true });
            });
        it("should delete a contact type: fail",function(){
                var res = {"detail":"Authentication credentials were not provided."};
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn($state, "go");
                $httpBackend.expectDELETE(SERVER_URL+"api/common/contact_types/1/").respond(
                500, res);
                createController("mfl.setup.controller.contact_types.view", dt);
                $scope.remove();
                $scope.cancel();
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.contact_types", {  },
                                                       { reload : true });
            });
    });
})(window._);
