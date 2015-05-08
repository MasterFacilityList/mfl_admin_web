"use strict";

describe("Test users controllers :", function () {
    var controller, data, root, scope, SERVER_URL, httpBackend, state;

    beforeEach(function () {
        module("mflApp");
        module("mfl.users.wrapper");
        module("mfl.settings");

        inject(["$rootScope", "$controller", "$httpBackend", "$state",
            "SERVER_URL", "usersApi", "contact_typeApi", "rolesApi",
            "contactsApi", "user_contactsApi",
            function ($rootScope, $controller, $httpBackend, $state,
                url, usersApi, contact_typesApi, rolesApi, contactsApi,
                user_contactsApi) {
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
    it("should test $scope.test === 'Manage users'", function () {
        controller("mfl.users.controllers.home");
        var test = "Manage users";
        expect(scope.test).toEqual(test);
    });
    it("should test $scope.test === 'users'", function () {
        controller("mfl.users.controllers.users");
        var test = "Users";
        expect(scope.test).toEqual(test);
    });
    it("should test new_user controller: ", function () {
        controller("mfl.users.controllers.new_user");
        var arg = "Antony";
        var arg_two = "Antony";
        scope.confirm = false;
        scope.conifrmPassword(arg, arg_two);
        expect(scope.confirm).toBeFalsy();
        var arg_three = "Antony";
        var arg_four = "Owaga";
        scope.conifrmPassword(arg_three, arg_four);
        expect(scope.confirm).toBeTruthy();
    });
    it("should test adding contacts to user", function () {
        controller("mfl.users.controllers.new_user");
        var usr_cont = [
            {contact_type : "", contact : ""},
            {contact_type : "", contact : ""}
        ];
        scope.addContact();
        expect(scope.user_contacts).toEqual(usr_cont);
    });
    it("should test removing contacts from user", function () {
        controller("mfl.users.controllers.new_user");
        var cont_obj = {contact_type : "", contact : ""};
        var compr_obj = [cont_obj];
        scope.user_contacts = [
            {contact_type : "", contact : ""},
            cont_obj
        ];
        scope.removeContact(cont_obj);
        expect(scope.user_contacts).toEqual(compr_obj);
    });
    it("should test adding user function", inject(["$httpBackend", "$state",
        function ($httpBackend, $state) {
            controller("mfl.users.controllers.new_user");
            spyOn($state, "go");
            var user = {
                groups: [],
                email: "serikalindogo@mfltest.slade360.co.ke",
                first_name: "Serikali",
                last_name: "Ndogo",
                other_names: "",
                username: "serikalindogo",
                is_national: false,
                password : "password"
            };
            scope.user = user;
            scope.addUser(user);
            var cont_type = "";
            var roles_result = "";
            $httpBackend.expectGET(
                SERVER_URL + "api/common/contact_types/").respond(
                200, cont_type);
            $httpBackend.expectGET(SERVER_URL + "api/users/groups/").respond(200, roles_result);
            $httpBackend.expectPOST(SERVER_URL + "api/users/").respond(200, scope.user);
            scope.addUser({"name": "test"});
            var e = {
                "username": [
                    "This field is required."
                ],
                "password": [
                    "This field is required."
                ],
                "email": [
                    "This field is required."
                ]
            };
            $httpBackend.expectPOST(SERVER_URL + "api/users/").respond(400, e);
            $httpBackend.flush();
            // expect($state.go).toHaveBeenCalled();
        }
    ]));
    it("should tfetch users, contacts: fail", inject(["$httpBackend", "$state",
        function ($httpBackend, $state) {
            controller("mfl.users.controllers.new_user");
            spyOn($state, "go");
            var user = {
                groups: [],
                email: "serikalindogo@mfltest.slade360.co.ke",
                first_name: "Serikali",
                last_name: "Ndogo",
                other_names: "",
                username: "serikalindogo",
                is_national: false,
                password : "password"
            };
            scope.user = user;
            scope.addUser(user);
            var cont_type = "";
            var roles_result = "";
            $httpBackend.expectGET(
                SERVER_URL + "api/common/contact_types/").respond(
                400, cont_type);
            $httpBackend.expectGET(SERVER_URL + "api/users/groups/").respond(400, roles_result);
            $httpBackend.flush();
            // expect($state.go).toHaveBeenCalled();
        }
    ]));
    //test not working
    it("should add user contacts: succeed", inject(["$httpBackend", function ($httpBackend) {
        controller("mfl.users.controllers.new_user");
        scope.addUserContacts();
        state.params.user_id = 5;
        var contact = {
            contact : "+254722367009",
            contact_type : "26849c83-7d7b-49bb-bb91-16ff29def9c3"
        };
        scope.user_contact = [contact];

        $httpBackend.expectPOST(
            SERVER_URL + "api/common/contacts/").respond(
            200, scope.user_contact[0]);

        scope.user_contact = {
            user: 5,
            contact : "26849c83-7d7b-49bb-bb91-16ff29def9c3"
        };
        $httpBackend.expectPOST(
            SERVER_URL + "api/common/user_contacts/").respond(
            200, scope.user_contact);

        $httpBackend.flush();
    }]));
    it("should add user contacts: succeed", inject(["$httpBackend", function ($httpBackend) {
        controller("mfl.users.controllers.new_user");
        scope.addUserContacts();
        state.params.user_id = 5;
        var contact = {
            contact : "+254722367009",
            contact_type : "26849c83-7d7b-49bb-bb91-16ff29def9c3"
        };
        scope.user_contact = [contact];

        $httpBackend.expectPOST(
            SERVER_URL + "api/common/contacts/").respond(
            200, scope.user_contact[0]);

        scope.user_contact = {
            user: 5,
            contact : "26849c83-7d7b-49bb-bb91-16ff29def9c3"
        };
        $httpBackend.expectPOST(
            SERVER_URL + "api/common/user_contacts/").respond(
            400, {name: ""});
        $httpBackend.flush();
    }]));
    it("should add user_contact in through table: fail",
        inject(["$httpBackend",
        function ($httpBackend) {
            controller("mfl.users.controllers.new_user");
            scope.addUserContacts();
            state.params.user_id = 5;
            var contact = {
                contact : "+254722367009",
                contact_type : "26849c83-7d7b-49bb-bb91-16ff29def9c3"
            };
            scope.user_contact = {
                user: 5,
                contact : "26849c83-7d7b-49bb-bb91-16ff29def9c3"
            };
            scope.user_contact = [contact];
            $httpBackend.expectPOST(
                SERVER_URL + "api/common/contacts/").respond(
                400, {name : ""});
            $httpBackend.flush();
        }
    ]));
    it("should test clicked Role", function () {
        controller("mfl.users.controllers.new_user");
        var item = {selected : false};
        scope.clickedRole(item);
        expect(item.selected).toBeTruthy();
    });
    it("should test clicked Role", function () {
        controller("mfl.users.controllers.new_user");
        var item = {set_selected : false};
        scope.setRole(item);
        expect(item.set_selected).toBeTruthy();
    });
    it("should test add roles : setting roles", function () {
        controller("mfl.users.controllers.new_user");
        var role = {
            name : "",
            permissions : [
                {id : "1", name : "", code_name : ""}
            ],
            selected : true,
            set_selected : false
        };
        scope.roles = [
            {
                name : "",
                permissions : [
                    {id : "1", name : "", code_name : ""}
                ],
                selected : true
            }
        ];
        scope.set_roles = [];
        scope.addRoles();
        expect(scope.set_roles).toContain(role);
    });
    it("should test add roles : reverting roles", function () {
        controller("mfl.users.controllers.new_user");
        var role = {
            name : "",
            permissions : [
                {id : "1", name : "", code_name : ""}
            ],
            selected : false,
            set_selected : true
        };
        scope.set_roles = [
            {
                name : "",
                permissions : [
                    {id : "1", name : "", code_name : ""}
                ],
                set_selected : true
            }
        ];
        scope.roles = [];
        scope.revertRoles();
        expect(scope.roles).toContain(role);
    });
    it("should test add user role function ", inject(["$httpBackend", "$state",
        function ($httpBackend, $state) {
            controller("mfl.users.controllers.new_user");
            spyOn($state, "go");
            scope.set_roles = [
                {
                    name : "",
                    permissions : [
                        {id : "1", name : "", code_name : ""}
                    ],
                    selected : false,
                    set_selected : true
                }
            ];
            state.params.user_id = 5;
            scope.addUserRole();
            $httpBackend.expectPATCH(
                SERVER_URL + "api/users/5/").respond(
                200,{});
            $httpBackend.flush();
        }
    ]));
    it("should test add user call : fail", inject(["$httpBackend", "$state",
        function($httpBackend, $state) {
            controller("mfl.users.controllers.new_user");
            spyOn($state, "go");
            state.params.user_id = 5;
            scope.addUserRole();
            $httpBackend.expectPATCH(
                SERVER_URL + "api/users/5/").respond(
                400,{});
            $httpBackend.flush();
        }
    ]));
    it("should test edit user controller", function () {
        controller("mfl.users.controllers.edit_user");
        expect(scope.test).toEqual("Edit user");
    });
    it("should test view user controller", function () {
        controller("mfl.users.controllers.view_user");
        expect(scope.test).toEqual("View user");
    });
    //test not working viewing a user
    it("should test viewing one user : success", inject(["$httpBackend",
        function ($httpBackend) {
            controller("mfl.users.controllers.view_user");
            var data = "";
            $httpBackend.expectGET(
                SERVER_URL + "api/users/5/").respond(200, data);
            $httpBackend.flush();
        }
    ]));
    it("should test viewing one user: fail", inject(["$httpBackend",
        function ($httpBackend) {
            controller("mfl.users.controllers.view_user");
            var data = "";
            $httpBackend.expectGET(
                SERVER_URL + "api/users/5/").respond(400, data);
            $httpBackend.flush();
        }
    ]));
    //test to test query parameters not done
    it("should get user_contacts : filter contacts to obtain a users contacts",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.users.controllers.view_user");
            $httpBackend.expectGET(
                SERVER_URL + "api/common/user_contacts/?user=5").respond(
                200, {});
            $httpBackend.flush();
        }
    ]));
    it("should test permissions controller", function() {
        controller("mfl.users.controllers.permissions");
        expect(scope.test).toEqual("Permissions");
    });
});
