(function(){
    "use strict";
    describe("Test `mfl.facilities.services` service ", function(){
        var $scope, $stateParams, $httpBackend, $state, facApi;
        var formService, SERVER_URL;
        beforeEach(function(){
            module("mflAdminApp");
            inject(["$rootScope", "$controller", "$stateParams", "$httpBackend",
                   "$state", "mfl.facilities.wrappers","mfl.common.forms.changes","SERVER_URL",
                   function($rootScope, $controller,_$stateParams,
                    _$httpBackend, _$state, _facApi, frm, _SERVER_URL){
                $scope = $rootScope.$new();
                SERVER_URL = _SERVER_URL;
                $httpBackend = _$httpBackend;
                $stateParams = _$stateParams;
                $state = _$state;
                facApi = _facApi;
                formService = frm;
            }]);
        });

        it("should have `mfl.facilities.services` defined", function(){
            expect(facApi).toBeDefined();

        });

        it("should call setActions: defined stateParams, fetch, success", function(){
            var res = {county: "testing"};
            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(200, res);
            facApi.utils.setActions(
                $scope, {id:1}, facApi.facilities,
                {edit:[]},
                {defaults:[], edit:[]});
            $httpBackend.flush();
            expect($scope.data).toEqual(res);
        });

        it("should call setActions: defined stateParams, fetch, fail", function(){
            var res = {county: "testing"};
            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(500, res);
            facApi.utils.setActions(
                $scope, {id:1}, facApi.facilities,
                {edit:[]},
                {defaults:[], edit:[]});
            $httpBackend.flush();
            expect($scope.data).not.toBeDefined();
        });

        it("should call setActions: UnDefined stateParams, fetch, success", function(){
            var res = {county: "testing"};
            $httpBackend.expectGET(SERVER_URL+"api/facilities/facilities/1/")
            .respond(200, res);
            facApi.utils.setActions(
                $scope, {id:""}, facApi.facilities,
                {edit:[]},
                {defaults:[], edit:[]});
            expect($httpBackend.flush).toThrow();
        });


        it("should call create: success", function(){
            var res = {county: "testing"};
            spyOn($state, "go");
            $httpBackend.expectPOST(SERVER_URL+"api/facilities/facilities/")
            .respond(200, res);
            facApi.utils.create(
                res,facApi.facilities, $scope, $state,"home");
            $httpBackend.flush();
            expect($state.go).toHaveBeenCalledWith("home");
        });

        it("should call create: success", function(){
            var res = {county: "testing"};
            spyOn($state, "go");
            $httpBackend.expectPOST(SERVER_URL+"api/facilities/facilities/")
            .respond(200, res);
            facApi.utils.create(
                res,facApi.facilities, $scope, $state,"home");
            $httpBackend.flush();
            expect($state.go).toHaveBeenCalledWith("home");
        });

        it("should call create: fail", function(){
            var res = {county: "testing"};
            spyOn($state, "go");
            $httpBackend.expectPOST(SERVER_URL+"api/facilities/facilities/")
            .respond(500, res);
            facApi.utils.create(
                res,facApi.facilities, $scope, $state,"home");
            $httpBackend.flush();
            expect($state.go).not.toHaveBeenCalledWith("home");
        });

        it("should call update: success", function(){
            var res = {county: "testing"};
            var frm = {name: "testing"};
            spyOn(formService, "whatChanged").andReturn(frm);
            spyOn($state, "go");
            $httpBackend.expectPATCH(SERVER_URL+"api/facilities/facilities/1/")
            .respond(200, res);
            facApi.utils.update(
                1,{name:"test"},facApi.facilities, $scope, $state,"home", formService);
            $httpBackend.flush();
            expect($state.go).toHaveBeenCalledWith("home");
        });

        it("should call update: fail", function(){
            var res = {county: "testing"};
            var frm = {name: "testing"};
            spyOn(formService, "whatChanged").andReturn(frm);
            spyOn($state, "go");
            $httpBackend.expectPATCH(SERVER_URL+"api/facilities/facilities/1/")
            .respond(500, res);
            facApi.utils.update(
                1,{name:"test"},facApi.facilities, $scope, $state,"home", formService);
            $httpBackend.flush();
            expect($state.go).not.toHaveBeenCalledWith("home");
        });

        it("should call update: no changes", function(){
            var res = {county: "testing"};
            var frm = {};
            spyOn(formService, "whatChanged").andReturn(frm);
            spyOn($state, "go");
            $httpBackend.expectPATCH(SERVER_URL+"api/facilities/facilities/1/")
            .respond(500, res);
            facApi.utils.update(
                1,{name:"test"},facApi.facilities, $scope, $state,"home", formService);
            expect($httpBackend.flush).toThrow();
        });
    });
})();
