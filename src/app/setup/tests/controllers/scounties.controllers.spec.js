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
                createController = function(ctrl, params){
                    return $controller(ctrl, _.extend(data, params));

                };
            }]);
        });

        afterEach(function(){
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("should have `mfl.setup.controller.sub_counties.list` defined",
           function(){
                var ctrl = createController("mfl.setup.controller.sub_counties.list", {});
                expect(ctrl).toBeDefined();
            });
        it("should have `mfl.setup.controller.sub_counties.details` defined and call made",
           function(){
                var dt = {
                    $stateParams: {scount_id: 1}
                };
                $httpBackend.expectGET(SERVER_URL+"api/common/sub_counties/1/")
                .respond(200);
                createController("mfl.setup.controller.sub_counties.details",dt);
                $httpBackend.flush();
            });
        it("should have sub-county data fetch failed",
           function(){
                var dt = {
                    $stateParams: {scount_id: 1}
                };
                $httpBackend.expectGET(SERVER_URL+"api/common/sub_counties/1/")
                .respond(500);
                createController("mfl.setup.controller.sub_counties.details",dt);
                $httpBackend.flush();
            });
    });
})(window._);
