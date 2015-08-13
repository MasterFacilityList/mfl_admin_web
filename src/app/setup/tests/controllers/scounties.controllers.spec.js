(function(_){
    "use strict";
    describe("sub_counties controllers test suite", function(){
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
                    return $controller("mfl.setup.controller.sub_counties."+
                                       name, _.extend(data, params));

                };
            }]);
        });

        afterEach(function(){
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("should have `mfl.setup.controller.sub_counties.list` defined",
           function(){
                var ctrl = createController("list", {});
                expect(ctrl).toBeDefined();
            });
        it("should have edit ctrl defined and calls are done successfully | create  succeeds",
        inject(["$rootScope",function($rootScope){
            var data = {
                "$scope": $rootScope.$new()
            };
            var frm = {
                name:"HOSPITAL",
                county:"1"
            };
            $httpBackend.expectGET(SERVER_URL+"api/common/counties/?fields=id,name&"+
            "page_size=100").respond(200);
            createController("edit", data);
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.resetExpectations();
            $httpBackend.expectPOST(SERVER_URL+"api/common/sub_counties/").respond(201);
            data.$scope.saveFrm(frm);
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        }])
        );
        it("should have edit ctrl defined and calls are done successfully | create  fails",
        inject(["$rootScope",function($rootScope){
            var data = {
                "$scope": $rootScope.$new()
            };
            var frm = {
                name:"HOSPITAL",
                county:"1"
            };
            $httpBackend.expectGET(SERVER_URL+"api/common/counties/?fields=id,name&"+
            "page_size=100").respond(200);
            createController("edit", data);
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.resetExpectations();
            $httpBackend.expectPOST(SERVER_URL+"api/common/sub_counties/").respond(500);
            data.$scope.saveFrm(frm);
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        }])
        );
        it("should have edit ctrl defined and calls are done successfully | edit succeeds",
        inject(["$rootScope","mfl.common.forms.changes",function($rootScope, formChanges){
            var data = {
                "$scope": $rootScope.$new(),
                "mfl.common.forms.changes" : formChanges,
                "$stateParams": {scount_id:1}
            };
            var frm = {
                name:"HOSPITAL",
                county:"1"
            };
            $httpBackend.expectGET(SERVER_URL+"api/common/sub_counties/1/").respond(200);
            $httpBackend.expectGET(SERVER_URL+"api/common/counties/?fields=id,name&"+
            "page_size=100").respond(200);
            createController("edit", data);
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.resetExpectations();
            $httpBackend.expectPATCH(SERVER_URL+"api/common/sub_counties/1/")
            .respond(200, {"id": 1});
            spyOn(formChanges, "whatChanged").andReturn({name:"HOSPITAL"});
            data.$scope.saveFrm(frm);
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        }])
        );
        it("should have edit ctrl defined and calls are done successfully | edit fails",
        inject(["$rootScope","mfl.common.forms.changes",function($rootScope, formChanges){
            var data = {
                "$scope": $rootScope.$new(),
                "mfl.common.forms.changes" : formChanges,
                "$stateParams": {scount_id:1}
            };
            var frm = {
                name:"HOSPITAL",
                county:"1"
            };
            $httpBackend.expectGET(SERVER_URL+"api/common/sub_counties/1/").respond(200);
            $httpBackend.expectGET(SERVER_URL+"api/common/counties/?fields=id,name&"+
            "page_size=100").respond(200);
            createController("edit", data);
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.resetExpectations();
            $httpBackend.expectPATCH(SERVER_URL+"api/common/sub_counties/1/").respond(500);
            spyOn(formChanges, "whatChanged").andReturn({name:"HOSPITAL"});
            data.$scope.saveFrm(frm);
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        }])
        );
        it("should have edit ctrl defined and calls are done successfully | edit no changes",
        inject(["$rootScope","mfl.common.forms.changes",function($rootScope, formChanges){
            var data = {
                "$scope": $rootScope.$new(),
                "mfl.common.forms.changes" : formChanges,
                "$stateParams": {scount_id:1}
            };
            var frm = {
                name:"HOSPITAL",
                county:"1"
            };
            $httpBackend.expectGET(SERVER_URL+"api/common/sub_counties/1/").respond(200);
            $httpBackend.expectGET(SERVER_URL+"api/common/counties/?fields=id,name&"+
            "page_size=100").respond(200);
            createController("edit", data);
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
            spyOn(formChanges, "whatChanged").andReturn({});
            data.$scope.saveFrm(frm);
        }])
        );
        it("should have edit ctrl defined but calls are fail",
        inject(["$rootScope",function($rootScope){
            var data = {
                "$scope": $rootScope.$new(),
                "$stateParams": {scount_id:1}
            };
            $httpBackend.expectGET(SERVER_URL+"api/common/sub_counties/1/").respond(500);
            createController("edit", data);
            $httpBackend.expectGET(SERVER_URL+"api/common/counties/?fields=id,name&"+
            "page_size=100").respond(500);
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        }])
        );
    });
})(window._);
