(function(describe){
    "use strict";
    describe("Facility create controllers test suite", function(){
        var createController, $scope, $stateParams, $httpBackend, $state, facilitiesApi;
        var SERVER_URL;

        beforeEach(function(){
            module("mflAdminApp");
            inject(["$rootScope", "$controller", "$stateParams", "$httpBackend",
                   "$state", "mfl.facilities.wrappers","SERVER_URL",
                   function($rootScope, $controller,_$stateParams,
                    _$httpBackend, _$state, _facilityApi, frm, _SERVER_URL){
                $scope = $rootScope.$new();
                SERVER_URL = _SERVER_URL;
                $httpBackend = _$httpBackend;
                $stateParams = _$stateParams;
                $state = _$state;
                facilitiesApi = _facilityApi;
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

        it("should have `mfl.facilities.controllers.create.basic` defined",
           function(){
                var ctrl = createController("mfl.facilities.controllers.create.basic", {});
                expect(ctrl).toBeDefined();
            });
    });
})(describe);
