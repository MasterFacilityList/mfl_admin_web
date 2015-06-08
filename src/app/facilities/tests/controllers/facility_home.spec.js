(function(describe){
    "use strict";
    describe("Facility home controllers test suite", function(){
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

        it("should have `mfl.facilities.controllers.home.list` defined",
           function(){
                var ctrl = createController("mfl.facilities.controllers.home.list", {});
                expect(ctrl).toBeDefined();
            });
        /*it("should test getting details of one facility: successfully",
        inject(["$httpBackend", function ($httpBackend) {
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            var fac_details = {
                name: "Endebess District Hospital",
                number_of_beds: 20
            };
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/facilities/1").respond(200, fac_details);
            createController(
                "mfl.facilities.controllers.home.detail",dt);

            $httpBackend.flush();
        }]));
        it("should test getting details of one facility: fail",
        inject(["$httpBackend", function ($httpBackend) {
            var dt = {
                    $stateParams: {facilityId: 1}
                };
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/facilities/1").respond(400, {});
            createController("mfl.facilities.controllers.home.detail", dt);
            $httpBackend.flush();
        }]));*/
    });
})(describe);
