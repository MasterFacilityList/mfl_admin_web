(function(_){
    "use strict";
    describe("keph controllers test suite", function(){
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
            $httpBackend.verifyNoOutstandingExpectation();
        });

        it("should have `mfl.setup.controller.keph.list` defined", function() {
            var ctrl = createController("mfl.setup.controller.keph.list", {});
            expect(ctrl).toBeDefined();
        });

        it("should create a new KEPH level", function () {
            $httpBackend
                .expectPOST(SERVER_URL+"api/facilities/keph/")
                .respond(201);

            createController("mfl.setup.controller.keph.create");

            $scope.save();
            $httpBackend.flush();
        });

        it("should catch errors on create a new KEPH level", function () {
            $httpBackend
                .expectPOST(SERVER_URL+"api/facilities/keph/")
                .respond(500);

            createController("mfl.setup.controller.keph.create");

            $scope.save();
            $httpBackend.flush();
        });

        it("should delete a KEPH level", function () {
            $httpBackend
                .expectGET(SERVER_URL+"api/facilities/keph/4/")
                .respond(200, {"name": ""});
            $httpBackend
                .expectDELETE(SERVER_URL+"api/facilities/keph/4/")
                .respond(200, {"name": ""});
            createController("mfl.setup.controller.keph.edit", {"$stateParams": {"keph_id": 4}});
            $scope.remove();
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();

            expect($scope.keph).toEqual({"name": ""});

            $httpBackend
                .expectPATCH(SERVER_URL+"api/facilities/keph/4/")
                .respond(200);

            $scope.save();
            $httpBackend.flush();
        });

        it("should handle errors on delete a KEPH level", function () {
            $httpBackend
                .expectGET(SERVER_URL+"api/facilities/keph/4/")
                .respond(500, {"name": ""});
            $httpBackend
                .expectDELETE(SERVER_URL+"api/facilities/keph/4/")
                .respond(500, {"name": ""});
            spyOn($state, "go");
            createController("mfl.setup.controller.keph.edit", {"$stateParams": {"keph_id": 4}});
            $scope.remove();
            $scope.cancel();
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
            $scope.keph = {"name": ""};
            $httpBackend
                .expectPATCH(SERVER_URL+"api/facilities/keph/4/")
                .respond(500);
            expect($state.go).toHaveBeenCalledWith("login", { next : "dashboard" });
            expect($state.go).toHaveBeenCalledWith("setup.facility_kephs", { },
                                                   { reload : true });
            $scope.save();
            $httpBackend.flush();
        });

    });
})(window._);
