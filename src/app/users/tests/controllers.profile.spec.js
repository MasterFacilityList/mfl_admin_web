(function (_) {
    "use strict";

    describe("Test profile controllers", function () {
        var ctrl, httpBackend, server_url, log;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.users.services");
            module("mfl.users.controllers.profile");

            inject(["$controller", "$httpBackend", "$log", "SERVER_URL",
                function ($controller, $httpBackend, $log, url) {
                    httpBackend = $httpBackend;
                    server_url = url;
                    log = $log;
                    ctrl = function (name, data) {
                        return $controller("mfl.users.controllers.profile."+name, data);
                    };
                }
            ]);
        });

        describe("Test base profile controller", function () {

            it("should load base controller", function () {
                inject(["$rootScope", function ($rootScope) {
                    var scope = $rootScope.$new();
                    var data = {
                        "$scope": scope
                    };
                    ctrl("base", data);

                    expect(scope.title).toEqual("Profile");
                }]);
            });
        });

        describe("Test basic profile controller", function () {

            it("should load current user details", function () {
                inject(["$rootScope", function ($rootScope) {
                    var scope = $rootScope.$new();
                    var data = {
                        "$scope": scope
                    };
                    httpBackend
                        .expectGET(server_url+"api/rest-auth/user/")
                        .respond(200, {});

                    ctrl("basic", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    expect(scope.title).toEqual("Basic Profile");
                    expect(scope.profile).toEqual({});
                }]);
            });

            it("should show error on fail to load current user details", function () {
                inject(["$rootScope", function ($rootScope) {
                    var scope = $rootScope.$new();
                    var data = {
                        "$scope": scope,
                        "$log": log
                    };
                    httpBackend
                        .expectGET(server_url+"api/rest-auth/user/")
                        .respond(500, {});

                    spyOn(log, "error");
                    ctrl("basic", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    expect(scope.title).toEqual("Basic Profile");
                    expect(_.isUndefined(scope.profile)).toBe(true);
                    expect(log.error).toHaveBeenCalledWith({});
                }]);
            });

            it("should update current user details", function () {
                inject(["$rootScope", function ($rootScope) {
                    var scope = $rootScope.$new();
                    var data = {
                        "$scope": scope
                    };
                    httpBackend
                        .expectGET(server_url+"api/rest-auth/user/")
                        .respond(200, {});

                    var frm = {
                        "$dirty": true,
                        "first_name": {
                            "$modelValue": "Lefty",
                            "$dirty": true
                        }
                    };

                    ctrl("basic", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    httpBackend.resetExpectations();

                    httpBackend
                        .expectPATCH(server_url+"api/rest-auth/user/", {"first_name": "Lefty"})
                        .respond(200, {});

                    scope.save(frm);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }]);
            });

            it("should not update if no change was made", function () {
                inject(["$rootScope", function ($rootScope) {
                    var scope = $rootScope.$new();
                    var data = {
                        "$scope": scope
                    };
                    httpBackend
                        .expectGET(server_url+"api/rest-auth/user/")
                        .respond(200, {});

                    var frm = {};

                    ctrl("basic", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    httpBackend.resetExpectations();

                    scope.save(frm);

                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                }]);
            });

            it("should show errors on fail to update current user details", function () {
                inject(["$rootScope", function ($rootScope) {
                    var scope = $rootScope.$new();
                    var data = {
                        "$scope": scope,
                        "$log": log
                    };
                    httpBackend
                        .expectGET(server_url+"api/rest-auth/user/")
                        .respond(200, {});

                    var frm = {
                        "$dirty": true,
                        "first_name": {
                            "$modelValue": "Lefty",
                            "$dirty": true
                        }
                    };
                    spyOn(log, "error");

                    ctrl("basic", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();

                    httpBackend.resetExpectations();

                    httpBackend
                        .expectPATCH(server_url+"api/rest-auth/user/", {"first_name": "Lefty"})
                        .respond(500, {});

                    scope.save(frm);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();
                    expect(log.error).toHaveBeenCalledWith({});
                }]);
            });
        });

        describe("Test password profile controller", function () {
            it("should load base controller", function () {
                inject(["$rootScope", function ($rootScope) {
                    var scope = $rootScope.$new();
                    var data = {
                        "$scope": scope
                    };
                    ctrl("password", data);

                    expect(scope.title).toEqual("Password");
                }]);
            });
        });
    });
})(_);
