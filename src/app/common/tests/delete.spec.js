(function(describe){
    "use strict";
    describe("Delete Directive Test suite", function(){
        var createController, $scope, $stateParams, $httpBackend, $state, adminApi;
        var SERVER_URL, $compile, rootScope, deleteService, $window;

        beforeEach(function(){
            module("mflAdminApp");
            inject(["$rootScope", "$controller", "$stateParams", "$httpBackend",
                   "$state", "adminApi","SERVER_URL","$compile","deleteService",
                   "$window",
                   function($rootScope, $controller,_$stateParams,
                    _$httpBackend, _$state, _adminApi, _SERVER_URL, _$compile,
                    _deleteService, _$window){
                $scope = $rootScope.$new();
                $window = _$window;
                rootScope = $rootScope;
                deleteService = _deleteService;
                SERVER_URL = _SERVER_URL;
                $httpBackend = _$httpBackend;
                $stateParams = _$stateParams;
                $state = _$state;
                $compile = _$compile;
                adminApi = _adminApi;
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
        it("should have `MflDeleteController` defined", function(){
            var ctrl = createController("MflDeleteController");
            expect(ctrl).toBeDefined();
        });

        it("should delete a resource: error", function(){
            spyOn($state, "go");
            deleteService.addConfig({
                api: "adminApi",
                apiKey: "contacts",
                resourceId: 1,
                resourceName: "contacts",
                onSuccessUrl: "contacts_list",
                onCancelUrl: "view_contacts"
            });
            $httpBackend.whenDELETE(SERVER_URL+"api/common/contact_types/1/").respond();
            $httpBackend.expectDELETE(SERVER_URL+"api/common/contact_types/1/")
            .respond(500);
            createController("MflDeleteController");
            $scope.remove();
            expect($state.go).not.toHaveBeenCalled();
        });
        it("should call onSuccess", function(){
            spyOn($state, "go");
            deleteService.addConfig({
                api: "adminApi",
                apiKey: "contacts",
                resourceId: 1,
                resourceName: "contacts",
                onSuccessUrl: "contacts_list",
                onCancelUrl: "view_contacts"
            });
            createController("MflDeleteController");
            $scope.onSuccess();
            expect($state.go).toHaveBeenCalled();
        });
        it("should cancel delete  resource: success", function(){
            spyOn($state, "go");
            deleteService.addConfig({
                api: "adminApi",
                apiKey: "contacts",
                resourceId: 1,
                resourceName: "contacts",
                onSuccessUrl: "contacts_list",
                onCancelUrl: "view_contacts"
            });
            createController("MflDeleteController");
            $scope.cancel();
            expect($state.go).toHaveBeenCalled();
        });

        it("should cancel delete  resource: fail, navigate back", function(){
            spyOn($window.history, "back");
            deleteService.addConfig({
                api: "adminApi",
                apiKey: "contacts",
                resourceId: 1,
                resourceName: "contacts",
                onSuccessUrl: "contacts_list",
                onCancelUrl: $state
            });
            createController("MflDeleteController");
            $scope.cancel();
            expect($window.history.back).toHaveBeenCalled();
        });
        it("should initiate click delete action `mfl-delete `directive", function(){
            var elem = angular.element(
                "<button mfl-delete api='admin' api=key='contacts' resource-id='1'"+
                "resource-name='contact' on-sucess-url='setup.contacts'></button>");
            $compile(elem)($scope);
            rootScope.$digest();
            spyOn($state, "go");
            elem.click();
            expect($state.go).toHaveBeenCalledWith("mfl_delete");
        });

    });
})(describe);
