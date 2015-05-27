"use strict";

describe("Test roles controllers :", function () {
    var controller, data, root, scope, SERVER_URL, httpBackend, state;

    beforeEach(function () {
        module("mflApp");
        module("mflAppConfig");
        module("mfl.users.wrapper");

        inject(["$rootScope", "$controller", "$httpBackend", "$state",
            "SERVER_URL", "usersApi", "contact_typeApi", "rolesApi",
            "contactsApi", "user_contactsApi", "permissionsApi",
            function ($rootScope, $controller, $httpBackend, $state,
                url, usersApi, contact_typesApi, rolesApi, contactsApi,
                user_contactsApi, permissionsApi) {
                root = $rootScope;
                scope = root.$new();
                state = $state;
                httpBackend = $httpBackend;
                SERVER_URL = url;
                usersApi = usersApi;
                contact_typesApi = contact_typesApi;
                rolesApi = rolesApi;
                contactsApi = contactsApi;
                user_contactsApi = user_contactsApi;
                permissionsApi = permissionsApi;
                scope.fakeStateParams = {
                    user_id : 5
                };
                data = {
                    $scope : scope,
                    $state : $state,
                    usersApi : usersApi,
                    contact_typesApi : contact_typesApi,
                    rolesApi : rolesApi,
                    contactsApi : contactsApi,
                    user_contactsApi : user_contactsApi,
                    permissionsApi : permissionsApi,
                    SERVER_URL : url,
                    $stateParams : scope.fakeStateParams
                    //$state.params : scope.fakestate.params
                };
                controller = function (cntrl) {
                    return $controller(cntrl, data);
                };
            }
        ]);
    });
    it("should test Roles controller", function () {
        controller("mfl.users.controllers.role");
        expect(scope.test).toEqual("Roles");
    });
    it("should test the new_role controller", function () {
        controller("mfl.users.controllers.new_role");
        expect(scope.test).toEqual("New role");
    });
    //test not getting list of permissions
    it("should test listing all permissions: success", inject(["$httpBackend",
        function ($httpBackend) {
            controller("mfl.users.controllers.new_role");
            var data = "";
            $httpBackend.expectGET(
                SERVER_URL + "api/users/permissions/?page_size=1500").respond(200, data);
            $httpBackend.flush();
        }
    ]));
    it("should test listing all permissions: fail", inject(["$httpBackend",
        function ($httpBackend) {
            controller("mfl.users.controllers.new_role");
            var data = "";
            $httpBackend.expectGET(
                SERVER_URL + "api/users/permissions/?page_size=1500").respond(400, data);
        }
    ]));
    it("should test clicked Role", function () {
        controller("mfl.users.controllers.new_role");
        var item = {selected : false};
        scope.clickedPermission(item);
        expect(item.selected).toBeTruthy();
    });
    it("should test clicked Role", function () {
        controller("mfl.users.controllers.new_role");
        var item = {set_selected : false};
        scope.setPermission(item);
        expect(item.set_selected).toBeTruthy();
    });
    it("should test add roles : setting roles", function () {
        controller("mfl.users.controllers.new_role");
        var permission = {
            name : "",
            code_name: "",
            selected : true,
            set_selected : false
        };
        scope.permissions = [
            {
                name : "",
                code_name: "",
                selected : true
            }
        ];
        scope.set_permissions = [];
        scope.addPermissions();
        expect(scope.set_permissions).toContain(permission);
    });
    it("should test add roles : reverting roles", function () {
        controller("mfl.users.controllers.new_role");
        var permissions = {
            name : "",
            code_name: "",
            selected : false,
            set_selected : true
        };
        scope.set_permissions = [
            {
                name : "",
                code_name: "",
                set_selected : true
            }
        ];
        scope.permissions = [];
        scope.revertPermissions();
        expect(scope.permissions).toContain(permissions);
    });
    it("should test add user role function ", inject(["$httpBackend", "$state",
        function ($httpBackend, $state) {
            controller("mfl.users.controllers.new_role");
            spyOn($state, "go");
            scope.set_permissions = [
                {
                    name : "",
                    permissions: "",
                    selected : false,
                    set_selected : true
                }
            ];
            var new_role = {
                name: "Group admin",
                permissions: [
                    {id: "", name : "", code_name : ""}
                ]
            };
            scope.addRole(new_role);
            $httpBackend.expectPOST(
                SERVER_URL + "api/users/groups/").respond(
                200,{});
            $httpBackend.flush();
        }
    ]));
    it("should test add role call : fail", inject(["$httpBackend", "$state",
        function($httpBackend, $state) {
            controller("mfl.users.controllers.new_role");
            spyOn($state, "go");
            scope.addRole({name: ""});
            $httpBackend.expectPOST(
                SERVER_URL + "api/users/groups/").respond(
                400,{});
            $httpBackend.flush();
        }
    ]));
});
