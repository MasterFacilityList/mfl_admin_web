(function(_){
    "use strict";
    describe("constituency controllers test suite", function(){
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
                    return $controller("mfl.setup.controller.constituency."+
                    name, _.extend(data, params));
                };
            }]);
        });

        afterEach(function(){
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it("should have `mfl.setup.controller.constituency.list` defined",
           function(){
                var ctrl = createController("list", {});
                expect(ctrl).toBeDefined();
            });
        it("should have `mfl.setup.controller.constituency.create` defined",
           function(){
                var ctrl = createController("create", {});
                expect(ctrl).toBeDefined();
            });
        it("should have create ctrl defined, fetches counties and posts successfully",
           inject(["$rootScope",function($rootScope){
                var data = {
                    "$scope": $rootScope.$new()
                };
                var frm = {
                    name:"MATHARE",
                    code:3
                };
                $httpBackend.expectGET(SERVER_URL+"api/common/counties/?fields=id,name"+
                "&page_size=100").respond(200);
                createController("create", data);
                $httpBackend.flush();
                $httpBackend.expectPOST(SERVER_URL+"api/common/constituencies/").respond(201);
                data.$scope.saveFrm(frm);
                $httpBackend.flush();
            }])
            );
        it("should have create ctrl defined, fetches counties but fails to posts",
           inject(["$rootScope",function($rootScope){
                var data = {
                    "$scope": $rootScope.$new()
                };
                var frm = {
                    name:"MATHARE",
                    code:3
                };
                $httpBackend.expectGET(SERVER_URL+"api/common/counties/?fields=id,name"+
                "&page_size=100").respond(200);
                createController("create", data);
                $httpBackend.flush();
                $httpBackend.expectPOST(SERVER_URL+"api/common/constituencies/")
                .respond(500);
                data.$scope.saveFrm(frm);
                $httpBackend.flush();
            }])
            );
        it("should have edit ctrl defined and can patch successfully",
            inject(["$rootScope","mfl.common.forms.changes",function($rootScope,formChanges){
                var data = {
                    "$scope": $rootScope.$new(),
                    "mfl.common.forms.changes" : formChanges,
                    "$stateParams": {const_id: 1}
                };
                var frm = {
                    name:"MATHARE",
                    code:3
                };
                $httpBackend.expectGET(SERVER_URL+"api/common/constituencies/1/")
                .respond(200);
                $httpBackend.expectGET(SERVER_URL+"api/common/counties/?fields=id,name"+
                "&page_size=100").respond(200);
                createController("details", data);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingRequest();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.resetExpectations();
                spyOn(formChanges, "whatChanged").andReturn({name:"MATHARE"});
                $httpBackend.expectPATCH(SERVER_URL+"api/common/constituencies/1/")
                .respond(200, {"id": 1});
                data.$scope.saveFrm(frm);
                $httpBackend.flush();
            }])
            );
        it("should have edit ctrl defined but can fails to patch",
            inject(["$rootScope","mfl.common.forms.changes",function($rootScope,formChanges){
                var data = {
                    "$scope": $rootScope.$new(),
                    "mfl.common.forms.changes" : formChanges,
                    "$stateParams": {const_id: 1}
                };
                var frm = {
                    name:"MATHARE",
                    code:3
                };
                $httpBackend.expectGET(SERVER_URL+"api/common/constituencies/1/")
                .respond(200);
                $httpBackend.expectGET(SERVER_URL+"api/common/counties/?fields=id,name"+
                "&page_size=100")
                .respond(200);
                createController("details", data);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingRequest();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.resetExpectations();
                spyOn(formChanges, "whatChanged").andReturn({name:"MATHARE"});
                $httpBackend.expectPATCH(SERVER_URL+"api/common/constituencies/1/").respond(500);
                data.$scope.saveFrm(frm);
                $httpBackend.flush();
            }])
            );
        it("should try to save form but no changes were made",
            inject(["$rootScope","mfl.common.forms.changes",function($rootScope,formChanges){
                var data = {
                    "$scope": $rootScope.$new(),
                    "mfl.common.forms.changes" : formChanges,
                    "$stateParams": {const_id: 1}
                };
                var frm = {
                    name:"MATHARE",
                    code:3
                };
                $httpBackend.expectGET(SERVER_URL+"api/common/constituencies/1/")
                .respond(200);
                $httpBackend.expectGET(SERVER_URL+"api/common/counties/?fields=id,name"+
                "&page_size=100").respond(200);
                createController("details", data);
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingRequest();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.resetExpectations();
                spyOn(formChanges, "whatChanged").andReturn({});
                data.$scope.saveFrm(frm);
            }])
            );
    });
})(window._);
