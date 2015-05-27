"use strict";

describe("Test facilities controller :", function () {
    var controller, data, root, scope, SERVER_URL, httpBackend, state;

    beforeEach(function () {
        module("mflApp");
        module("mflAppConfig");
        module("mfl.facilities.wrapper");

        inject(["$rootScope", "$controller", "$httpBackend", "$state",
            "SERVER_URL", "facilitiesApi", "officersApi",
            function ($rootScope, $controller, $httpBackend, $state,
                url, facilitiesApi, officersApi) {
                root = $rootScope;
                scope = root.$new();
                state = $state;
                httpBackend = $httpBackend;
                facilitiesApi = facilitiesApi;
                officersApi = officersApi;
                SERVER_URL = url;
                scope.fakeStateParams = {
                    fac_id : 1
                };
                data = {
                    $scope : scope,
                    $state : $state,
                    facilitiesApi : facilitiesApi,
                    officersApi : officersApi,
                    SERVER_URL : url,
                    $stateParams : scope.fakeStateParams
                };
                controller = function (cntrl) {
                    return $controller(cntrl, data);
                };
            }
        ]);
    });
    it("should test owners controller", function () {
        controller("mfl.facilities.controllers.owners");
        expect(scope.test).toEqual("Owners");
    });
    it("should test services in facilities", function () {
        controller("mfl.facilities.controllers.services");
        expect(scope.test).toEqual("Services");
    });
    it("should test officers in facilities", function () {
        controller("mfl.facilities.controllers.officers");
        expect(scope.test).toEqual("Services");
    });
    it("should call backend and get list of officers",
    inject(["$httpBackend", function ($httpBackend) {
        controller("mfl.facilities.controllers.officers");
        var data = "";
        $httpBackend.expectGET(
            SERVER_URL + "api/facilities/officers/").respond(200, data);
        $httpBackend.flush();
    }]));
    it("should test adding new services", function () {
        controller("mfl.facilities.controllers.new_service");
        expect(scope.test).toEqual("New service");
    });
    it("should test editing service", function () {
        controller("mfl.facilities.controllers.edit_service");
        expect(scope.test).toEqual("Edit service");
    });
    it("should test viewing services", function () {
        controller("mfl.facilities.controllers.view_service");
        expect(scope.test).toEqual("View service");
    });
    it("should test the facility controller", function () {
        controller("mfl.facilities.controllers.facilities");
        expect(scope.test).toEqual("Facilities sub-menu");
    });
    it("should test the manage_facilities controller", function () {
        controller("mfl.facilities.controllers.manage_facilities");
        expect(scope.test).toEqual("Facilities");
    });
    it("should test facilitiesaction controller", function () {
        controller("mfl.facilities.controllers.facilitiesaction");
        expect(scope.test).toEqual("Process Facilities");
    });
    it("should call backend and retrieve a facility: success",
        inject(["$httpBackend",
        function ($httpBackend) {
            controller("mfl.facilities.controllers.facilitiesaction");
            var result = "";
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/facilities/1/").respond(
                200, result);
            $httpBackend.flush();
        }
    ]));
    it("should call backend and retrieve a facility: success",
        inject(["$httpBackend",
        function ($httpBackend) {
            controller("mfl.facilities.controllers.facilitiesaction");
            $httpBackend.expectGET(
                SERVER_URL + "api/facilities/facilities/1/").respond(
                400, {name : ""});
            $httpBackend.flush();
        }
    ]));
    it("should test new facilities controller", function () {
        controller("mfl.facilities.controllers.new_facility");
        var cont = {contact_type: "", contact: ""};
        var cont_obj = [cont, cont];
        scope.facility.contacts = [{contact_type: "", contact: ""}];
        scope.addContact();
        expect(scope.facility.contacts).toEqual(cont_obj);
        expect(scope.setter).toEqual(false);
    });
    it("should test removing contact from facility", function () {
        controller("mfl.facilities.controllers.new_facility");
        var cont = {contact_type: "1", contact: ""};
        scope.facility.contacts = [{contact_type: "", contact: ""}, cont];
        scope.removeContact(cont);
        expect(scope.facility.contacts).not.toContain(cont);
    });
    it("should test new facilities controller services", function () {
        controller("mfl.facilities.controllers.new_facility");
        var cont = {name: "", type: "", level: ""};
        var cont_obj = [cont, cont];
        scope.facility.services = [{name: "", type: "", level: ""}];
        scope.addService();
        expect(scope.facility.services).toEqual(cont_obj);
    });
    it("should test removing services from facility", function () {
        controller("mfl.facilities.controllers.new_facility");
        var cont = {name: "1", type: "", level: ""};
        scope.facility.contacts = [{contact_type: "", contact: ""}, cont];
        scope.removeService(cont);
        expect(scope.facility.services).not.toContain(cont);
    });
    it("should test editing a facility details", function () {
        controller("mfl.facilities.controllers.edit_facility");
        expect(scope.edit).toEqual(true);
    });
    //for facilities edit controller
    it("should test new facilities controller", function () {
        controller("mfl.facilities.controllers.edit_facility");
        var cont = {contact_type: "", contact: ""};
        var cont_obj = [cont, cont];
        scope.facility.contacts = [{contact_type: "", contact: ""}];
        scope.addContact();
        expect(scope.facility.contacts).toEqual(cont_obj);
    });
    it("should test removing contact from facility", function () {
        controller("mfl.facilities.controllers.edit_facility");
        var cont = {contact_type: "1", contact: ""};
        scope.facility.contacts = [{contact_type: "", contact: ""}, cont];
        scope.removeContact(cont);
        expect(scope.facility.contacts).not.toContain(cont);
    });
    it("should test new facilities controller services", function () {
        controller("mfl.facilities.controllers.edit_facility");
        var cont = {name: "", type: "", level: ""};
        var cont_obj = [cont, cont];
        scope.facility.services = [{name: "", type: "", level: ""}];
        scope.addService();
        expect(scope.facility.services).toEqual(cont_obj);
    });
    it("should test removing services from facility", function () {
        controller("mfl.facilities.controllers.edit_facility");
        var cont = {name: "1", type: "", level: ""};
        scope.facility.contacts = [{contact_type: "", contact: ""}, cont];
        scope.removeService(cont);
        expect(scope.facility.services).not.toContain(cont);
    });
});
