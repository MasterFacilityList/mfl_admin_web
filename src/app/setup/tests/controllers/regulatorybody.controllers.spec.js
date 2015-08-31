(function () {
    "use strict";

    describe("Regulatory body test suite", function () {
        var controller, data, root, scope, SERVER_URL, httpBackend, state;
        var formService;

        beforeEach(function () {
            module("mflAdminApp");
            module("mflAdminAppConfig");
            module("api.wrapper");
            module("ui.router");
            module("mfl.setup.api");
            module("mfl.setup.facilities.controllers");

            inject(["$rootScope", "$controller", "$httpBackend", "$state",
                "SERVER_URL", "adminApi", "mfl.common.forms.changes",
                function ($rootScope, $controller, $httpBackend, $state, url,
                    adminApi, frm) {
                    root = $rootScope;
                    scope = root.$new();
                    state = $state;
                    httpBackend = $httpBackend;
                    SERVER_URL = url;
                    scope.fakeStateParams = {
                        id : "1",
                        reg_cont_id : "1"
                    };
                    adminApi = adminApi;
                    formService = frm;
                    data = {
                        $scope : scope,
                        $state : $state,
                        SERVER_URL : url,
                        formService : frm,
                        $stateParams : scope.fakeStateParams,
                        adminApi : adminApi
                    };
                    controller = function (cntrl) {
                        return $controller(cntrl, data);
                    };
                }
            ]);
        });
        it("should test that regulatory body view is defined: success",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.edit");

            $httpBackend.expectGET(
                SERVER_URL + "api/common/contact_types/").respond(200, {});
            $httpBackend.expectGET(
                SERVER_URL +
                "api/facilities/regulating_body_contacts/?regulating_body=1")
                .respond(200, {"regulating_body" : 1});
            $httpBackend.flush();
        }]));
        it("should test that regulatory body view is defined: fail",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.edit");
            $httpBackend.expectGET(
                SERVER_URL + "api/common/contact_types/").respond(400, {});
            $httpBackend.expectGET(
                SERVER_URL +
                "api/facilities/regulating_body_contacts/?regulating_body=1")
                .respond(400, {"regulating_body" : 1});
            $httpBackend.flush();
        }]));
        it("should test filtering a regulatory body: success",
        inject(["$httpBackend", "$rootScope", "$stateParams", "$controller",
            "adminApi",
            function (
                $httpBackend, $rootScope, $stateParams, $controller,
                adminApi) {
            var dt = {
                adminApi : adminApi,
                $stateParams : { id : 1},
                $scope : $rootScope.$new()
            };
            var cntrl = function () {
                $controller(
                    "mfl.setup.controller.facilityRegulatoryBody.edit", dt);
            };
            cntrl();
            $httpBackend.expectGET(
                SERVER_URL +
                "api/facilities/regulating_body_contacts/?regulating_body=1")
                .respond(200, {"regulating_body" : 1});
            $httpBackend.flush();
        }]));
        //beginning of failing test
        it("should test that regulatory body view is defined: success",
        inject(["$httpBackend", "$state",function ($httpBackend, $state) {
            spyOn($state, "go");
            controller("mfl.setup.controller.facilityRegulatoryBody.edit");
            var reg_body = {
                name: "Antony"
            };
            scope.createFacilityRegulatoryBody(reg_body);
            $httpBackend.expectPOST(
                SERVER_URL + "api/facilities/regulating_bodies/").respond(
                200, reg_body);
            $httpBackend.flush();
        }]));
        it("should test that regulatory body view is defined: fail",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.edit");
            var reg_body = {
                name: "Antony"
            };
            scope.createFacilityRegulatoryBody(reg_body);
            $httpBackend.expectPOST(
                SERVER_URL + "api/facilities/regulating_bodies/").respond(
                400, reg_body);
            $httpBackend.flush();
        }]));
        it("should test that regulatory body with $stateParams.id = 'create'",
        inject(["$httpBackend", "$stateParams", "$rootScope","$controller",
            function ($httpBackend, $stateParams, $rootScope,$controller) {
            var dt = {
                $scope : $rootScope.$new(),
                $stateParams : {id : "create"}
            };
            var cntrl = function () {
                $controller(
                "mfl.setup.controller.facilityRegulatoryBody.edit", dt);
            };
            cntrl();
        }]));
        it("should test that regulatory body view is defined: both success",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.create");
            scope.contact = {
                contact : "0710110110",
                contact_type: "MOBILE"
            };
            scope.add();
            $httpBackend.expectPOST(
                SERVER_URL + "api/common/contacts/").respond(200, {
                    "contact_type" : scope.contact.contact_type,
                    "contact" : scope.contact.contact
                });
            $httpBackend.expectPOST(
                SERVER_URL + "api/facilities/regulating_body_contacts/")
                .respond(200, {
                    "regulatory_body" : 1,
                    "contact" : 1
                });
            $httpBackend.flush();
        }]));
        it("should test that regulatory body view is defined: one fail",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.create");
            scope.contact = {
                contact : "0710110110",
                contact_type: "MOBILE"
            };
            scope.add();
            $httpBackend.expectPOST(
                SERVER_URL + "api/common/contacts/").respond(200, {
                    "contact_type" : scope.contact.contact_type,
                    "contact" : scope.contact.contact
                });
            $httpBackend.expectPOST(
                SERVER_URL + "api/facilities/regulating_body_contacts/")
                .respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test that regulatory body view is defined: total failure",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.create");
            scope.contacts = {
                items : [
                    {
                        id : 1,
                        delete_spinner : true,
                        contact : 1
                    }
                ]
            };
            scope.contact = {
                contact_type : "POSTAL",
                contact : "Box 89 Githu"
            };
            scope.add_contact();
            scope.add();
            $httpBackend.expectPOST(
                SERVER_URL + "api/common/contacts/").respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test that regulatory body contact_list fetch: success",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.create");
            scope.contacts = {
                items : []
            };
            $httpBackend.expectGET(
                SERVER_URL + "api/common/contact_types/").respond(200, {});
            $httpBackend.flush();
        }]));
        it("should test that regulatory body contact_list fetch: fail",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.create");
            $httpBackend.expectGET(
                SERVER_URL + "api/common/contact_types/").respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test that regulatory body view is defined: both success",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.edit");
            scope.contact = {
                contact : "0710110110",
                contact_type: "MOBILE"
            };
            scope.add_contact();
            scope.add();
            $httpBackend.expectPOST(
                SERVER_URL + "api/common/contacts/").respond(200, {
                    "contact_type" : scope.contact.contact_type,
                    "contact" : scope.contact.contact
                });
            $httpBackend.expectPOST(
                SERVER_URL + "api/facilities/regulating_body_contacts/")
                .respond(200, {
                    "regulatory_body" : 1,
                    "contact" : 1
                });
            $httpBackend.flush();
        }]));
        it("should test that regulatory body view is defined: one fail",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.edit");
            scope.contact = {
                contact : "0710110110",
                contact_type: "MOBILE"
            };
            scope.add();
            $httpBackend.expectPOST(
                SERVER_URL + "api/common/contacts/").respond(200, {
                    "contact_type" : scope.contact.contact_type,
                    "contact" : scope.contact.contact
                });
            $httpBackend.expectPOST(
                SERVER_URL + "api/facilities/regulating_body_contacts/")
                .respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test that regulatory body view is defined: failure",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.edit");
            scope.contacts = {
                items : []
            };
            scope.add();
            var obj = {
                delete_spinner : true,
                contact : 1
            };
            scope.contacts = {
                items : []
            };
            scope.remove_contact(obj);
            $httpBackend.expectPOST(
                SERVER_URL + "api/common/contacts/").respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test deleting reg_body contact: total success",
        inject(["$httpBackend", function ($httpBackend) {
            $httpBackend.expectDELETE(
                SERVER_URL + "api/facilities/regulating_body_contacts/1/")
                .respond(200, {});
            $httpBackend.expectDELETE(
                SERVER_URL + "api/common/contacts/1/").respond(200, {});
            controller("mfl.setup.controller.facilityRegulatoryBody.edit");
            var obj = {
                id : 1,
                delete_spinner : true,
                contact : 1
            };
            scope.contacts = {
                items : []
            };
            scope.remove_contact(obj);
            $httpBackend.flush();
        }]));
        it("should test deleting reg_body contact: one failure",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.edit");
            scope.contacts = {
                items : [
                    {
                        id : 1,
                        delete_spinner : true,
                        contact : 1
                    }
                ]
            };
            var obj = {
                id : 1,
                delete_spinner : true,
                contact : 1
            };
            scope.remove_contact(obj);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/facilities/regulating_body_contacts/1/")
                .respond(200, {});
            $httpBackend.expectDELETE(
                SERVER_URL + "api/common/contacts/1/").respond(400, {});
            $httpBackend.flush();
        }]));
        it("should test deleting reg_body contact: total failure",
        inject(["$httpBackend", function ($httpBackend) {
            controller("mfl.setup.controller.facilityRegulatoryBody.edit");
            scope.contacts = {
                items : [
                    {
                        id : 1,
                        delete_spinner : true,
                        contact : 1
                    },
                    {
                        delete_spinner : false,
                        contact : 3
                    }
                ]
            };
            var obj = {
                id : 1,
                delete_spinner : true,
                contact : 1
            };
            scope.remove_contact(obj);
            $httpBackend.expectDELETE(
                SERVER_URL + "api/facilities/regulating_body_contacts/1/")
                .respond(400, {});
            $httpBackend.flush();
        }]));
    });
})();
