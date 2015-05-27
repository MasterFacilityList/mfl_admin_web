"use strict";

describe("Test facilities controller :", function () {
    var controller, data, root, scope, SERVER_URL, httpBackend, state;

    beforeEach(function () {
        module("mflApp");
        module("mflAppConfig");
        module("mfl.facilities.wrapper");

        inject(["$rootScope", "$controller", "$httpBackend", "$state",
            "SERVER_URL", "facilitiesApi", "ownersApi",
            function ($rootScope, $controller, $httpBackend, $state,
                url, facilitiesApi, ownersApi) {
                root = $rootScope;
                scope = root.$new();
                state = $state;
                httpBackend = $httpBackend;
                facilitiesApi = facilitiesApi;
                ownersApi = ownersApi;
                SERVER_URL = url;
                scope.fakeStateParams = {
                    owner_id : 1
                };
                data = {
                    $scope : scope,
                    $state : $state,
                    facilitiesApi : facilitiesApi,
                    ownersApi : ownersApi,
                    SERVER_URL : url,
                    $stateParams : scope.fakeStateParams
                };
                controller = function (cntrl) {
                    return $controller(cntrl, data);
                };
            }
        ]);
    });
    it("should test new owner controller", function () {
        controller("mfl.facilities.controllers.new_owner");
        expect(scope.test).toEqual("New owner");
    });
    it("should test view owner controller", function () {
        controller("mfl.facilities.controllers.view_owner");
        expect(scope.test).toEqual("View owner");
    });
    it("should make a call to backend and obtain details for one user",
    inject(["$httpBackend", function ($httpBackend) {
        controller("mfl.facilities.controllers.view_owner");
        var owner = "";
        $httpBackend.expectGET(
            SERVER_URL + "api/facilities/owners/1/").respond(200, owner);
        $httpBackend.flush();
    }]));
    it("should make a call to backend and obtain details for one user",
    inject(["$httpBackend", function ($httpBackend) {
        controller("mfl.facilities.controllers.view_owner");
        $httpBackend.expectGET(
            SERVER_URL + "api/facilities/owners/1/").respond(400, {name: ""});
        $httpBackend.flush();
    }]));
    it("should test edit owners controller", function () {
        controller("mfl.facilities.controllers.edit_owner");
        expect(scope.test).toEqual("Edit owner");
    });
    it("should make a call to backend and obtain details for one user",
    inject(["$httpBackend", function ($httpBackend) {
        controller("mfl.facilities.controllers.edit_owner");
        var owner = "";
        $httpBackend.expectGET(
            SERVER_URL + "api/facilities/owners/1/").respond(200, owner);
        $httpBackend.flush();
    }]));
    it("should make a call to backend and obtain details for one user",
    inject(["$httpBackend", function ($httpBackend) {
        controller("mfl.facilities.controllers.edit_owner");
        $httpBackend.expectGET(
            SERVER_URL + "api/facilities/owners/1/").respond(400, {name: ""});
        $httpBackend.flush();
    }]));
});
