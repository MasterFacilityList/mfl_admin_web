(function(describe){
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

        it("should have `mfl.setup.controller.contacts.list` defined",
           function(){
                var ctrl = createController("mfl.setup.controller.contacts.list", {});
                expect(ctrl).toBeDefined();
            });

        it("should have `mfl.setup.controller.contacts.view` defined",
           function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var ctrl = createController("mfl.setup.controller.contacts.view", dt);
                expect(ctrl).toBeDefined();
            });
        it("should view a contacts: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {msg: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/common/contact_types/1/").respond(
                200, res);
                createController("mfl.setup.controller.contacts.view", dt);
                $httpBackend.flush();
                expect($scope.contacts).toEqual(res);
            });

        it("should view contacts: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/common/contact_types/1/").respond(
                500, res);
                createController("mfl.setup.controller.contacts.view", dt);
                $httpBackend.flush();
                expect($scope.alert).toEqual(res.error);
            });

        it("should delete contacts: success",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                spyOn($state, "go");
                var res = {mgs: "ok"};
                $httpBackend.expectGET(SERVER_URL+"api/common/contact_types/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/common/contact_types/1/").respond(
                200, res);
                createController("mfl.setup.controller.contacts.view", dt);
                $scope.deleteContacts(1);
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.contacts");
            });

        it("should delete contacts: error",function(){
                var dt = {
                    $stateParams: {id: 1}
                };
                var res = {error: "error"};
                $httpBackend.expectGET(SERVER_URL+"api/common/contact_types/1/").respond(
                200, res);
                $httpBackend.expectDELETE(SERVER_URL+"api/common/contact_types/1/").respond(
                500, res);
                createController("mfl.setup.controller.contacts.view", dt);
                $scope.deleteContacts(1);
                $httpBackend.flush();
                expect($scope.alert).toEqual(res.error);
            });

        it("should update contacts: success",function(){
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
                createController("mfl.setup.controller.contacts.view", dt);
                $scope.updateContacts(1, form);
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.contacts");
            });

        it("should update contacts: fail",function(){
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
                createController("mfl.setup.controller.contacts.view", dt);
                $scope.updateContacts(1, form);
                $httpBackend.flush();
                expect($state.go).not.toHaveBeenCalledWith("setup.contacts");
                expect($scope.alert).toEqual(res.error);
            });

        it("should update contacts: no changes",function(){
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
                createController("mfl.setup.controller.contacts.view", dt);
                $scope.updateContacts(1, form);
                expect($httpBackend.flush).toThrow();
                expect($state.go).not.toHaveBeenCalledWith("setup.contacts");
            });
        it("should have `mfl.setup.controller.contacts.create` defined",
           function(){
                var ctrl = createController("mfl.setup.controller.contacts.create");
                expect(ctrl).toBeDefined();
            });

        it("should create contacts: success",function(){
                spyOn($state, "go");
                $httpBackend.expectPOST(SERVER_URL+"api/common/contact_types/").respond(
                200, {});
                createController("mfl.setup.controller.contacts.create", {});
                $scope.createContacts({name: "Testing"});
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith("setup.contacts");
            });

        it("should create contacts: fail",function(){
                spyOn($state, "go");
                $httpBackend.expectPOST(SERVER_URL+"api/common/contact_types/").respond(
                500, {error: "error"});
                createController("mfl.setup.controller.contacts.create", {});
                $scope.createContacts({name: "Testing"});
                $httpBackend.flush();
                expect($scope.alert).toEqual("error");
                expect($state.go).not.toHaveBeenCalledWith("setup.contacts");
            });
    });
})(describe);
