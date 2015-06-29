(function () {
    "use strict";

    describe("Test users controllers (old):", function () {
        var controller, data, root, scope, SERVER_URL, httpBackend, state;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.users.services");
            module("api.wrapper");
            module("ui.router");
            module("mfl.users.controllers.users");
            module("mfl.common.services");

            inject(["$rootScope", "$controller", "$httpBackend", "$state",
                "SERVER_URL", "mfl.users.services.wrappers",
                "mfl.common.forms.changes", "mfl.common.services.multistep",
                function ($rootScope, $controller, $httpBackend,
                    $state, url, userApi, formChanges, multistepService) {
                    root = $rootScope;
                    scope = root.$new();
                    state = $state;
                    httpBackend = $httpBackend;
                    userApi = userApi;
                    formChanges = formChanges;
                    multistepService = multistepService;
                    SERVER_URL = url;
                    scope.fakeStateParams = {
                        user_id : 6,
                        furthest : 1
                    };
                    data = {
                        $scope : scope,
                        $state : $state,
                        SERVER_URL : url,
                        userApi : userApi,
                        formChanges : formChanges,
                        multistepService : multistepService,
                        $stateParams : scope.fakeStateParams
                    };
                    controller = function (cntrl) {
                        return $controller(cntrl, data);
                    };
                }
            ]);
        });
        //testing new implementation of new multistep implementation
        it("should test create basic details user.id is empty: fail",
        inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
            $state.params.user_id = "";
            scope.nextState = angular.noop;
            scope.$parent.furthest = 1;
            controller("mfl.users.controllers.user_create.basic");
            expect(scope.$parent.furthest).toEqual(1);
        }]));
        it("should test create basic details user: success",
        inject(["$httpBackend", "$state",
            function ($httpBackend, $state) {
            $state.params.user_id = "18";
            scope.nextState = angular.noop;
            controller("mfl.users.controllers.user_create.basic");
            $httpBackend.expectGET(SERVER_URL +
                "api/users/18/").respond(200, {"name" : "Antony"});
            $httpBackend.flush();
        }]));
        it("should test nextState method",
        inject(["$state", function ($state) {
            $state.current.name = "users.user_create.basic";
            controller("mfl.users.controllers.user_create");
            scope.nextState();
        }]));
        it("should test nextState method",
        inject(["$state", function ($state) {
            spyOn($state, "go");
            controller("mfl.users.controllers.user_create");
            var obj = {"active" : true};
            scope.tabState(obj);
        }]));
        //end of test implementation
        it("should test parent user create controller: tab = 2",
        inject(["$state", function ($state) {
            spyOn($state, "go");
            $state = {
                params : {
                    user_id : 18
                }
            };
            controller("mfl.users.controllers.user_create");
            var val = 2;
            scope.tab = 2;
            scope.tabState(val);
            expect(scope.tab).toEqual(val);
        }]));
        it("should test parent user create controller : tab = 1",
        inject(["$state", function ($state) {
            spyOn($state, "go");
            $state = {
                params : {
                    user_id : 18
                }
            };
            controller("mfl.users.controllers.user_create");
            var val = 1;
            scope.tab = 1;
            scope.tabState(val);
            expect(scope.tab).toEqual(val);
        }]));
        it("should test saving basic user details : success",
        inject(["$httpBackend", "$state", "$controller",
            function ($httpBackend, $state, $controller) {
            $state.params.user_id = "18";
            var form = {
                "$dirty": true,
                "name": {
                    "$modelValue": "ASD",
                    "$dirty": true
                }
            };
            $httpBackend.expectPATCH(SERVER_URL +
                "api/users/18/").respond(200, {"name" : "Antony"});
            scope.nextState = angular.noop;
            scope.$parent.furthest = 1;
            $controller("mfl.users.controllers.user_create.basic",
                {
                    "$state": $state,
                    "$scope": scope
                }
            );
            scope.save(form);
            expect(scope.$parent.furthest).toEqual(2);
            $httpBackend.flush();
        }]));
        it("should test saving basic user details : fail",
        inject(["$state", "$controller",
            function ($state, $controller) {
            spyOn(state, "go");
            $state.params.user_id = "18";
            var form = {};
            scope.$parent.furthest = 2;
            scope.nextState = angular.noop;
            $controller("mfl.users.controllers.user_create.basic",
                {
                    "$state": $state,
                    "$scope": scope
                }
            );
            scope.save(form);
            expect(state.go).toHaveBeenCalledWith("users."+
                    "user_create.contacts", {"user_id": "18", "furthest" : 2});
        }]));
        it("should test saving basic user details : fail on valid form",
        inject(["$httpBackend", "$state", "$controller",
            function ($httpBackend, $state, $controller) {
            $state = {
                params : {
                    user_id : "18"
                }
            };
            var form = {
                "$dirty": true,
                "name": {
                    "$modelValue": "ASD",
                    "$dirty": true
                }
            };
            $httpBackend.expectPATCH(SERVER_URL +
                "api/users/18/").respond(500, {});
            scope.nextState = angular.noop;
            $controller("mfl.users.controllers.user_create.basic",
                {
                    "$state": $state,
                    "$scope": scope
                }
            );
            scope.save(form);
            $httpBackend.flush();
        }]));
        it("should test $scope in create user controller take two",
        inject(["$httpBackend", "$state","$controller",
            function ($httpBackend, $state, $controller) {
            $state = {
                params : {
                    user_id : 18
                }
            };
            $httpBackend.expectGET(
                SERVER_URL + "api/users/18/").respond(200, scope.detail_user);

            $controller("mfl.users.controllers.user_create.details", {
                "$state": $state,
                "$scope": scope
            });

            $httpBackend.flush();

        }]));
        it("should test $scope in create user controller take two: fail",
        inject(["$httpBackend", "$state","$controller",
            function ($httpBackend, $state, $controller) {
            $state = {
                params : {
                    user_id : 18
                }
            };
            $httpBackend.expectGET(
                SERVER_URL + "api/users/18/").respond(400, scope.detail_user);

            $controller("mfl.users.controllers.user_create.details", {
                "$state": $state,
                "$scope": scope
            });

            $httpBackend.flush();

        }]));
        it("should test $state param user id in adding user contacts",
        inject(["$state", function ($state) {
            spyOn($state, "go");
            $state = {
                params : {
                    user_id : 3
                }
            };
            scope.$parent.furthest = 2;
            scope.nextState = angular.noop;
            controller("mfl.users.controllers.user_edit.contacts");
            scope.goToGroups();
            expect(scope.$parent.furthest).toEqual(3);
        }]));
        it("should test $state param user id in adding user contacts",
        inject(["$state", function ($state) {
            spyOn($state, "go");
            $state = {
                params : {
                    user_id : 3
                }
            };
            scope.$parent.furthest = 3;
            scope.nextState = angular.noop;
            controller("mfl.users.controllers.user_edit.contacts");
            scope.goToGroups();
            expect(scope.$parent.furthest).toEqual(3);
        }]));
        it("should test $state param user id in adding user counties",
        inject(["$state", function ($state) {
            $state = {
                params : {
                    user_id : 3
                }
            };
            scope.nextState = angular.noop;
            controller("mfl.users.controllers.user_edit.counties");
        }]));
        it("should update user groups: with furthest less than 4",
        inject(["$httpBackend", "$state", function ($httpBackend, $state) {
            spyOn($state, "go");
            $state = {
                params : {
                    user_id : 1
                }
            };
            scope.$parent.furthest = 3;
            scope.nextState = angular.noop;
            controller("mfl.users.controllers.user_edit.groups");
            scope.user_id = 1;
            scope.user = {
                id: 1,
                groups : [
                    {
                        name: "SCRIO",
                        permissions : [
                            {
                                name : "adding facility"
                            }
                        ]
                    }
                ]
            };
            scope.updateUserGroups();
            expect(scope.$parent.furthest).toEqual(4);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/users/1/").respond(200, scope.user.group);
            $httpBackend.flush();
        }]));
        it("should update user groups: with furthest equal 4",
        inject(["$httpBackend", "$state", function ($httpBackend, $state) {
            spyOn($state, "go");
            $state = {
                params : {
                    user_id : 1
                }
            };
            scope.$parent.furthest = 4;
            scope.nextState = angular.noop;
            controller("mfl.users.controllers.user_edit.groups");
            scope.user_id = 1;
            scope.user = {
                id: 1,
                groups : [
                    {
                        name: "SCRIO",
                        permissions : [
                            {
                                name : "adding facility"
                            }
                        ]
                    }
                ]
            };
            scope.updateUserGroups();
            expect(scope.$parent.furthest).toEqual(4);
            $httpBackend.expectPATCH(
                SERVER_URL + "api/users/1/").respond(200, scope.user.group);
            $httpBackend.flush();
        }]));
    });

    describe("Test users controllers: ", function () {
        var server_url, httpBackend, rootScope, ctrl, log, state;

        beforeEach(function () {
            module("mfl.users.controllers.users");
            module("ui.router");
            module("mflAdminAppConfig");
            module("mfl.common.forms");

            inject(["$controller", "$log", "$httpBackend", "$rootScope", "SERVER_URL", "$state",
                function ($controller, $log, $httpBackend, $rootScope, SERVER_URL, $state) {
                    httpBackend = $httpBackend;
                    rootScope = $rootScope;
                    log = $log;
                    server_url = SERVER_URL;
                    state = $state;
                    ctrl = function (name, data) {
                        return $controller("mfl.users.controllers."+name, data);
                    };
                }
            ]);
        });

        describe("Test user listing controller", function () {

            it("should set scope", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope
                };
                ctrl("user_list", data);
                expect(scope.title).not.toBe(undefined);
                expect(scope.action).not.toBe(undefined);
            });
        });

        describe("Test user edit controller while deleting", function () {

            it("should delete user", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        user_id: 1
                    },
                    "$state": state,
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url + "api/users/1/")
                    .respond(200, {});

                spyOn(state, "go");
                ctrl("user_edit", data);
                scope.cancel();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/users/1/")
                    .respond(204, {});
                scope.remove();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalled();
            });

            it("should show error on delete user failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        user_id: 1
                    },
                    "$state": state,
                    "$scope": scope,
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url + "api/users/1/")
                    .respond(200, {});

                spyOn(state, "go");
                spyOn(log, "error");
                ctrl("user_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/users/1/")
                    .respond(404, {});

                scope.remove();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).not.toHaveBeenCalled();
                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test user create basic controller", function () {

            it("should save a new user", function () {
                var scope = rootScope.$new();
                spyOn(state, "go");

                var data = {
                    "$scope": scope,
                    "$state": state
                };
                data.$scope.user = {
                    "first_name":"qwe",
                    "username":"qwe",
                    "password":"qwe",
                    "confirm_password":"qwe",
                    "last_name":"qwe",
                    "other_names":"qwe",
                    "email":"qwe@mail.com"
                };
                httpBackend
                    .expectPOST(server_url + "api/users/", data.$scope.user)
                    .respond(201, {"id": 3});
                data.$scope.$parent.furthest = 2;
                data.$scope.nextState = angular.noop;
                ctrl("user_create.basic", data);

                data.$scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                expect(state.go).toHaveBeenCalledWith("users."+
                    "user_create.contacts", {"user_id": 3, "furthest" : 2});
            });

            it("should show an error on save a new user", function () {
                var scope = rootScope.$new();
                spyOn(state, "go");
                spyOn(log, "error");

                var data = {
                    "$scope": scope,
                    "$state": state,
                    "$log": log
                };
                data.$scope.user = {
                    "first_name":"qwe",
                    "username":"qwe",
                    "password":"qwe",
                    "confirm_password":"qwe",
                    "last_name":"qwe",
                    "other_names":"qwe",
                    "email":"qwe@mail.com"
                };
                httpBackend
                    .expectPOST(server_url + "api/users/", data.$scope.user)
                    .respond(500, {});
                data.$scope.nextState = angular.noop;
                ctrl("user_create.basic", data);

                data.$scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(state.go).not.toHaveBeenCalled();
                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test user edit main controller", function () {

            it("should load a user", function () {
                var scope = rootScope.$new();

                var data = {
                    "$scope": scope,
                    "$stateParams": {user_id: 3}
                };

                httpBackend
                    .expectGET(server_url + "api/users/3/")
                    .respond(200, {});
                data.$scope.nextState = angular.noop;
                ctrl("user_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(scope.user_id).toEqual(3);
                expect(scope.user).toEqual({});
            });

            it("should show an error if load user fails", function () {
                spyOn(log, "error");

                var scope = rootScope.$new();

                var data = {
                    "$scope": scope,
                    "$stateParams": {user_id: 3},
                    "$log": log
                };

                httpBackend
                    .expectGET(server_url + "api/users/3/")
                    .respond(404, {});
                data.$scope.nextState = angular.noop;
                ctrl("user_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(scope.user).toEqual(undefined);
                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test user edit contacts controller", function () {

            it("should show error on load contact types error", function () {
                spyOn(log, "error");
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(500, {"error": "e"});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;
                data.$scope.$parent.furthest = 2;
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.$parent.furthest).toEqual(2);
                expect(log.error).toHaveBeenCalled();
                expect(_.isUndefined(data.$scope.contact_types)).toBe(true);
                expect(data.$scope.contacts).toEqual([]);
            });

            it("should show error on load contacts error", function () {
                spyOn(log, "error");
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(500, {"error": "e"});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
                expect(data.$scope.contact_types).toEqual([]);
                expect(data.$scope.contacts).toEqual([]);
            });

            it("should load user contacts", function () {
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.contact_types).toEqual([]);
                expect(data.$scope.contacts).toEqual([]);
            });

            it("should remove a contact from the current user", function () {
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: [{"contact": "123", "id": "456"}]});

                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/common/user_contacts/456/")
                    .respond(204);
                httpBackend
                    .expectDELETE(server_url + "api/common/contacts/123/")
                    .respond(204);

                data.$scope.contacts = [{"contact": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.contacts[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.contacts).toEqual([]);
            });

            it("should show an error if delete user_contact failed", function () {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(
                        200, {results: [{"contact": "123","id": "456"}]});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/common/user_contacts/456/")
                    .respond(500);

                data.$scope.contacts = [{"contact": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.contacts[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.contacts)
                .toEqual([{"contact": "123", "id": "456", "delete_spinner" :false}]);
            });

            it("should show an error if delete contact failed", function () {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: [{"contact": "123", "id": "456"}]});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/common/user_contacts/456/")
                    .respond(204);
                httpBackend
                    .expectDELETE(server_url + "api/common/contacts/123/")
                    .respond(500);

                data.$scope.contacts = [{"contact": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.contacts[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.contacts)
                .toEqual([{"contact": "123", "id": "456", "delete_spinner" : false}]);
            });

            it("should add a new contact to the user", function () {
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                data.$scope.contact = {
                    "contact": "ccc",
                    "contact_type": "123"
                };
                httpBackend
                    .expectPOST(server_url + "api/common/contacts/", data.$scope.contact)
                    .respond(201, {"id": 3});

                httpBackend
                    .expectPOST(server_url + "api/common/user_contacts/", {"user": 3, "contact": 3})
                    .respond(201, {"id": 4});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                expect(data.$scope.contacts).toEqual([{"id": 4}]);
            });

            it("should show error if add a new contact fails", function () {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                data.$scope.contact = {
                    "contact": "ccc",
                    "contact_type": "123"
                };
                httpBackend
                    .expectPOST(server_url + "api/common/contacts/", data.$scope.contact)
                    .respond(400, {"error_code": 3});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.contacts).toEqual([]);
                expect(log.error).toHaveBeenCalled();
            });

            it("should show error if associate new contact to user fails", function () {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/common/user_contacts/?user=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                data.$scope.contact = {
                    "contact": "ccc",
                    "contact_type": "123"
                };
                httpBackend
                    .expectPOST(server_url + "api/common/contacts/", data.$scope.contact)
                    .respond(201, {"id": 3});

                httpBackend
                    .expectPOST(server_url + "api/common/user_contacts/", {"user": 3, "contact": 3})
                    .respond(400, {"error_code": 4});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.contacts).toEqual([]);
                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test user edit basic controller", function () {
            var controller;

            beforeEach(function () {
                inject(["$controller", function (c) {
                    controller = c;
                }]);
            });

            it("should update user changes", function () {
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$modelValue": "ASD",
                        "$dirty": true
                    }
                };
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope
                };
                data.$scope.user_id = 3;
                scope.nextState = angular.noop;
                controller("mfl.users.controllers.user_edit.basic", data);

                httpBackend
                    .expectPATCH(server_url + "api/users/3/", {"name": "ASD"})
                    .respond(200);

                data.$scope.save(frm);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should not update user if no changes are made", function () {
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$modelValue": "ASD",
                        "$dirty": false
                    }
                };
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope
                };
                data.$scope.user_id = 3;
                scope.nextState = angular.noop;
                controller("mfl.users.controllers.user_edit.basic", data);

                data.$scope.save(frm);

                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should show error on fail to update user changes", function () {
                spyOn(log, "error");
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$modelValue": "ASD",
                        "$dirty": true
                    }
                };
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope,
                    "$log": log
                };
                data.$scope.user_id = 3;
                scope.nextState = angular.noop;
                controller("mfl.users.controllers.user_edit.basic", data);

                httpBackend
                    .expectPATCH(server_url + "api/users/3/", {"name": "ASD"})
                    .respond(400);

                data.$scope.save(frm);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test user edit groups controller", function () {

            it("should load all groups", function () {
                httpBackend
                    .expectGET(server_url+"api/users/groups/?page_size=100&ordering=name")
                    .respond(200, {"results": []});
                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.$parent.furthest = 3;
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.groups", data);

                expect(data.$scope.$parent.furthest).toEqual(3);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.groups).toEqual([]);
            });

            it("should show an error on fail to load all groups", function () {
                httpBackend
                    .expectGET(server_url+"api/users/groups/?page_size=100&ordering=name")
                    .respond(500, {"error": "e"});
                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                spyOn(log,"error");
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.groups", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.groups).toBe(undefined);
                expect(log.error).toHaveBeenCalled();
            });

            it("should add a group to the user", function () {
                httpBackend
                    .expectGET(server_url+"api/users/groups/?page_size=100&ordering=name")
                    .respond(200, {"results": [{"id": 2, "name": "grp2"}]});
                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;
                data.$scope.user = {
                    "groups": []
                };
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.groups", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPATCH(
                        server_url+"api/users/3/", {"groups": [{"id": 2, "name": "grp2"}]})
                    .respond(200, {"groups": [{"id": 2, "name": "grp2"}]});

                data.$scope.new_grp = "2";
                data.$scope.add("3");
                //testing adding roles using listing directive
                data.$scope.updateUserGroups();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.user).toEqual({"groups": [{"id": 2, "name": "grp2"}]});
            });

            it("should show an error on failure to add a group to the user", function () {
                httpBackend
                    .expectGET(server_url+"api/users/groups/?page_size=100&ordering=name")
                    .respond(200, {"results": [{"id": 2, "name": "grp2"}]});
                spyOn(log, "error");
                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;
                data.$scope.user = {
                    "groups": []
                };
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.groups", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPATCH(
                        server_url+"api/users/3/", {"groups": [{"id": 2, "name": "grp2"}]})
                    .respond(400, {"error": "e"});

                data.$scope.new_grp = "2";
                data.$scope.add("3");

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
                expect(data.$scope.user).toEqual({"groups": []});
            });

            it("should remove a group from the user", function () {
                httpBackend
                    .expectGET(server_url+"api/users/groups/?page_size=100&ordering=name")
                    .respond(200, {"results": [{"id": 2, "name": "grp2"}]});
                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.groups", data);
                data.$scope.user_id = 3;
                data.$scope.user = {
                    "groups": [{"id": 2, "name": "grp2"}]
                };

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPATCH(
                        server_url+"api/users/3/", {"groups": [{"id": 2, "name": "grp2"}]})
                    .respond(200, {"groups": []});

                data.$scope.remove({"id": 2, "name": "grp2"});

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.user).toEqual({"groups": []});
            });
        });

        describe("Test user edit counties controller", function () {

            it("should load all counties and the user's counties", function () {
                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;
                httpBackend
                    .expectGET(server_url+"api/common/counties/?page_size=50&ordering=name")
                    .respond(200, {"results": []});
                httpBackend
                    .expectGET(server_url+"api/common/user_counties/?user=3")
                    .respond(200, {"results": []});
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.counties", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.counties).toEqual([]);
                expect(data.$scope.user_counties).toEqual([]);
            });

            it("should show errors on fail to load counties", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                spyOn(log, "error");
                data.$scope.user_id = 3;
                httpBackend
                    .expectGET(server_url+"api/common/counties/?page_size=50&ordering=name")
                    .respond(500, {"error": "e"});
                httpBackend
                    .expectGET(server_url+"api/common/user_counties/?user=3")
                    .respond(200, {"results": []});
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.counties", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
                expect(data.$scope.counties).toBe(undefined);
                expect(data.$scope.user_counties).toEqual([]);
            });

            it("should show errors on fail to load user's counties", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                spyOn(log, "error");
                data.$scope.user_id = 3;
                httpBackend
                    .expectGET(server_url+"api/common/counties/?page_size=50&ordering=name")
                    .respond(200, {"results": []});

                httpBackend
                    .expectGET(server_url+"api/common/user_counties/?user=3")
                    .respond(500, {"error": "e"});
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.counties", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
                expect(data.$scope.counties).toEqual([]);
                expect(data.$scope.user_counties).toBe(undefined);
            });

            it("should assign a county to a user", function () {
                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;
                httpBackend
                    .expectGET(server_url+"api/common/counties/?page_size=50&ordering=name")
                    .respond(200, {"results": []});
                httpBackend
                    .expectGET(server_url+"api/common/user_counties/?user=3")
                    .respond(200, {"results": []});
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.counties", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(server_url+"api/common/user_counties/", {"user":3,"county":1})
                    .respond(201, {"id": 4});

                data.$scope.add(1);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.user_counties).toEqual([{"id": 4}]);
            });

            it("should show an error when failing to assign a county to a user", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                spyOn(log, "error");
                data.$scope.user_id = 3;
                httpBackend
                    .expectGET(server_url+"api/common/counties/?page_size=50&ordering=name")
                    .respond(200, {"results": []});
                httpBackend
                    .expectGET(server_url+"api/common/user_counties/?user=3")
                    .respond(200, {"results": []});
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.counties", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(server_url+"api/common/user_counties/", {"user":3,"county":1})
                    .respond(401);

                data.$scope.add(1);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
            });

            it("should remove a county from a user", function () {
                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;
                var user_counties = {"results": [{"id": 4}]};

                httpBackend
                    .expectGET(server_url+"api/common/counties/?page_size=50&ordering=name")
                    .respond(200, {"results": []});
                httpBackend
                    .expectGET(server_url+"api/common/user_counties/?user=3")
                    .respond(200, user_counties);
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.counties", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url+"api/common/user_counties/4/")
                    .respond(204);

                data.$scope.removeChild(user_counties.results[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should show error if fails to remove a county from a user", function () {
                spyOn(log, "error");
                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;
                var user_counties = {
                    "results": [
                        {
                            "id": 4,
                            "delete_spinner": false
                        }
                    ]
                };

                httpBackend
                    .expectGET(server_url+"api/common/counties/?page_size=50&ordering=name")
                    .respond(200, {"results": []});
                httpBackend
                    .expectGET(server_url+"api/common/user_counties/?user=3")
                    .respond(200, user_counties);
                data.$scope.nextState = angular.noop;
                ctrl("user_edit.counties", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url+"api/common/user_counties/4/")
                    .respond(404);

                data.$scope.removeChild(user_counties.results[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
                expect(data.$scope.user_counties).toEqual(user_counties.results);
            });
        });

        describe("Test user edit regulatory body controller", function () {

            it("should load all bodies and the user's regulatory body", function () {
                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/regulating_bodies/?page_size=100&ordering=name")
                    .respond(200, {"results": []});
                httpBackend
                    .expectGET(server_url+"api/facilities/regulatory_body_users/?user=3")
                    .respond(200, {"results": []});

                ctrl("user_edit.regulatory_body", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.bodies).toEqual([]);
                expect(data.$scope.user_bodies).toEqual([]);
            });

            it("should show errors on fail to load bodies", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                spyOn(log, "error");
                data.$scope.user_id = 3;
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/regulating_bodies/?page_size=100&ordering=name")
                    .respond(500, {"error": "e"});
                httpBackend
                    .expectGET(server_url+"api/facilities/regulatory_body_users/?user=3")
                    .respond(500, {"results": []});

                ctrl("user_edit.regulatory_body", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
                expect(data.$scope.bodies).toBe(undefined);
                expect(data.$scope.user_bodies).toBe(undefined);
            });

            it("should assign a body to a user", function () {
                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/regulating_bodies/?page_size=100&ordering=name")
                    .respond(200, {"results": []});
                httpBackend
                    .expectGET(server_url+"api/facilities/regulatory_body_users/?user=3")
                    .respond(200, {"results": []});

                ctrl("user_edit.regulatory_body", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(server_url+"api/facilities/regulatory_body_users/",
                        {"regulatory_body":1,"user":3})
                    .respond(201, {"id": 4});

                data.$scope.new_body = 1;
                data.$scope.addBody();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.user_bodies).toEqual([{"id": 4}]);
                expect(data.$scope.new_body).toEqual("");
            });

            it("should show an error when failing to assign a body to a user", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                spyOn(log, "error");
                data.$scope.user_id = 3;
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/regulating_bodies/?page_size=100&ordering=name")
                    .respond(200, {"results": []});
                httpBackend
                    .expectGET(server_url+"api/facilities/regulatory_body_users/?user=3")
                    .respond(200, {"results": []});

                ctrl("user_edit.regulatory_body", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(server_url+"api/facilities/regulatory_body_users/",
                        {"regulatory_body":1,"user":3})
                    .respond(400);

                data.$scope.new_body = 1;
                data.$scope.addBody();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
                expect(data.$scope.user_bodies).toEqual([]);
            });

            it("should remove a body from a user", function () {
                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;
                var user_bodies = {"results": [{"id": 4}]};
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/regulating_bodies/?page_size=100&ordering=name")
                    .respond(200, {"results": []});
                httpBackend
                    .expectGET(server_url+"api/facilities/regulatory_body_users/?user=3")
                    .respond(200, user_bodies);

                ctrl("user_edit.regulatory_body", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url+"api/facilities/regulatory_body_users/4/")
                    .respond(204);

                data.$scope.removeChild(user_bodies.results[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should show error if fails to remove a county from a user", function () {
                spyOn(log, "error");
                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;

                var user_bodies = {"results": [{"id": 4}]};
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/regulating_bodies/?page_size=100&ordering=name")
                    .respond(200, {"results": []});
                httpBackend
                    .expectGET(server_url+"api/facilities/regulatory_body_users/?user=3")
                    .respond(200, user_bodies);

                ctrl("user_edit.regulatory_body", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url+"api/facilities/regulatory_body_users/4/")
                    .respond(500);

                data.$scope.removeChild(user_bodies.results[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
                expect(data.$scope.user_bodies).toEqual(user_bodies.results);
            });
        });

        describe("Test user edit constituency controller", function () {

            it("should load all constituencies and the user's constituency", function () {

                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;
                data.$scope.login_user = {"county": 1};
                httpBackend
                    .expectGET(
                        server_url+"api/common/constituencies/?page_size=20&ordering=name&county=1")
                    .respond(200, {"results": []});
                httpBackend
                    .expectGET(server_url+"api/common/user_constituencies/?user=3")
                    .respond(200, {"results": []});

                ctrl("user_edit.constituency", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.constituencies).toEqual([]);
                expect(data.$scope.user_constituencies).toEqual([]);
            });

            it("should show errors on fail to load constituency", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                spyOn(log, "error");
                data.$scope.login_user = {"county": 1};
                data.$scope.user_id = 3;
                httpBackend
                    .expectGET(
                        server_url+"api/common/constituencies/?page_size=20&ordering=name&county=1")
                    .respond(500);
                httpBackend
                    .expectGET(server_url+"api/common/user_constituencies/?user=3")
                    .respond(500);

                ctrl("user_edit.constituency", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
                expect(data.$scope.constituencies).toBe(undefined);
                expect(data.$scope.user_constituencies).toBe(undefined);
            });

            it("should assign a county to a user", function () {
                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;
                data.$scope.login_user = {"county": 1};
                httpBackend
                    .expectGET(
                        server_url+"api/common/constituencies/?page_size=20&ordering=name&county=1")
                    .respond(200, {"results": []});
                httpBackend
                    .expectGET(server_url+"api/common/user_constituencies/?user=3")
                    .respond(200, {"results": []});

                ctrl("user_edit.constituency", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(
                        server_url+"api/common/user_constituencies/", {"user":3,"constituency":1})
                    .respond(201, {"id": 4});

                data.$scope.add(1);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.user_constituencies).toEqual([{"id": 4}]);
            });

            it("should show an error when failing to assign a county to a user", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                spyOn(log, "error");
                data.$scope.user_id = 3;
                data.$scope.login_user = {"county": 1};
                httpBackend
                    .expectGET(
                        server_url+"api/common/constituencies/?page_size=20&ordering=name&county=1")
                    .respond(200, {"results": []});
                httpBackend
                    .expectGET(server_url+"api/common/user_constituencies/?user=3")
                    .respond(200, {"results": []});
                ctrl("user_edit.constituency", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(
                        server_url+"api/common/user_constituencies/", {"user":3,"constituency":1})
                    .respond(401);

                data.$scope.add(1);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
                expect(data.$scope.user_constituencies).toEqual([]);
            });

            it("should remove a county from a user", function () {
                var data = {
                    "$scope": rootScope.$new()
                };
                data.$scope.user_id = 3;
                var user_constituencies = {"results": [{"id": 4}]};

                data.$scope.login_user = {"county": 1};
                httpBackend
                    .expectGET(
                        server_url+"api/common/constituencies/?page_size=20&ordering=name&county=1")
                    .respond(200, {"results": []});
                httpBackend
                    .expectGET(server_url+"api/common/user_constituencies/?user=3")
                    .respond(200, user_constituencies);

                ctrl("user_edit.constituency", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url+"api/common/user_constituencies/4/")
                    .respond(204);

                data.$scope.removeChild(user_constituencies.results[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should show error if fails to remove a county from a user", function () {
                spyOn(log, "error");
                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log
                };
                data.$scope.user_id = 3;
                var user_constituencies = {
                    "results": [
                        {
                            "id": 4,
                            "delete_spinner": false
                        }
                    ]
                };

                data.$scope.login_user = {"county": 1};
                httpBackend
                    .expectGET(
                        server_url+"api/common/constituencies/?page_size=20&ordering=name&county=1")
                    .respond(200, {"results": []});
                httpBackend
                    .expectGET(server_url+"api/common/user_constituencies/?user=3")
                    .respond(200, user_constituencies);

                ctrl("user_edit.constituency", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url+"api/common/user_constituencies/4/")
                    .respond(404);

                data.$scope.removeChild(user_constituencies.results[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(log.error).toHaveBeenCalled();
                expect(data.$scope.user_constituencies).toEqual(user_constituencies.results);
            });
        });
    });
})();
