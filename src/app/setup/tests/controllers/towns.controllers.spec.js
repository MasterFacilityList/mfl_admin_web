(function(_){
    "use strict";
    describe("towns controllers test suite", function(){
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

        it("should have `mfl.setup.controller.chuStatus.town` defined", function() {
            var ctrl = createController("mfl.setup.controller.town.list", {});
            expect(ctrl).toBeDefined();
        });

        it("should create a new town", function () {
            $httpBackend
                .expectPOST(SERVER_URL+"api/common/towns/")
                .respond(201);

            createController("mfl.setup.controller.town.create");

            $scope.save();
            $httpBackend.flush();
        });

        it("should catch errors on create a new town", function () {
            $httpBackend
                .expectPOST(SERVER_URL+"api/common/towns/")
                .respond(500);

            createController("mfl.setup.controller.town.create");

            $scope.save();
            $httpBackend.flush();
        });

        it("should delete a town", function () {
            $httpBackend
                .expectGET(SERVER_URL+"api/common/towns/4/")
                .respond(200, {"name": ""});
            $httpBackend
                .expectDELETE(SERVER_URL+"api/common/towns/4/")
                .respond(200, {"name": ""});
            createController("mfl.setup.controller.town.edit", {"$stateParams": {"town_id": 4}});
            $scope.remove();
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();

            expect($scope.town).toEqual({"name": ""});

            $httpBackend
                .expectPATCH(SERVER_URL+"api/common/towns/4/")
                .respond(200);

            $scope.save();
            $httpBackend.flush();
        });

        it("should handle errors on delete a town", function () {
            $httpBackend
                .expectGET(SERVER_URL+"api/common/towns/4/")
                .respond(500, {"name": ""});
            $httpBackend
                .expectDELETE(SERVER_URL+"api/common/towns/4/")
                .respond(500, {"name": ""});
            spyOn($state, "go");
            createController("mfl.setup.controller.town.edit", {"$stateParams": {"town_id": 4}});
            $scope.remove();
            $scope.cancel();
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
            $scope.town = {"name": ""};
            $httpBackend
                .expectPATCH(SERVER_URL+"api/common/towns/4/")
                .respond(500);
            expect($state.go).toHaveBeenCalledWith("login", { next: "/" });
            expect($state.go).toHaveBeenCalledWith("setup.towns", { },
                                                   { reload : true });
            $scope.save();
            $httpBackend.flush();
        });

    });
})(window._);
