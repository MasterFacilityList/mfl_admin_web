"use strict";

describe("Testing the auth controller: ", function () {
    var controller, data, root, scope, SERVER_URL, httpBackend, state;
    beforeEach(function () {
        module("mflApp");
        module("mfl.settings");
        module("mfl.auth.controllers");
        module("mfl.auth.services");

        inject(["$rootScope", "$controller", "$httpBackend", "SERVER_URL",
            "mfl.auth.services.login", "$state",
            function ($rootScope, $controller, $httpBackend, url, loginService, $state) {
                root = $rootScope,
                scope = root.$new();
                SERVER_URL = url;
                state = $state;
                httpBackend = $httpBackend;
                loginService = loginService;
                data = {
                    $scope : scope,
                    $state : $state,
                    loginService : loginService,
                    SERVER_URL : url
                };
                controller = function (cntrl) {
                    return $controller(cntrl, data);
                };
            }
        ]);
    });
    it("should test auth login controller",
    inject(["$state", function ($state) {
        controller("mfl.auth.controllers.login");
        spyOn($state, "go");
        expect(scope.test).toEqual("Login");
    }]));
    it("should call backend and login a user: success",
    inject(["$httpBackend", function ($httpBackend) {
        controller("mfl.auth.controllers.login");
        var obj = {username : "owagaantony@gmail.com", password: "owaga"};
        scope.submitUser(obj);
        $httpBackend.expectPOST(
            SERVER_URL + "api/rest-auth/login/").respond(200, obj);
        $httpBackend.flush();
    }]));
    it("should call backend and login and save user credentials: success",
    inject(["$httpBackend", function ($httpBackend) {
        controller("mfl.auth.controllers.login");
        var obj = {username : "owagaantony@gmail.com", password: "owaga"};
        scope.submitUser(obj);
        $httpBackend.expectPOST(
            SERVER_URL + "api/rest-auth/login/").respond(200, obj);
        $httpBackend.expectGET(
            SERVER_URL + "api/rest-auth/user/").respond(200, {email: ""});
        $httpBackend.flush();
    }]));
    it("should call backend and login a user: success",
    inject(["$httpBackend", function ($httpBackend) {
        controller("mfl.auth.controllers.login");
        var obj = {date : ""};
        scope.submitUser(obj);
        $httpBackend.expectPOST(
            SERVER_URL + "api/rest-auth/login/").respond(400, {email: ""});
        $httpBackend.flush();
    }]));
});
