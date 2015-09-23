(function () {
    "use strict";
    describe("Test chul controllers", function () {
        var rootScope, ctrl, httpBackend, server_url,
        controller, stateParams;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.chul.services");
            module("mfl.chul.controllers");
            inject(["$controller", "$rootScope", "$httpBackend", "SERVER_URL", "$stateParams",
                function (c, r, h, s, st) {
                    ctrl = function (name, data) {
                        return c("mfl.chul.controllers"+name, data);
                    };
                    controller = c;
                    rootScope = r;
                    httpBackend = h;
                    server_url = s;
                    stateParams = st;
                }
            ]);
        });

        describe("Test chul list controllers", function () {

            it("should load chul list controller", function () {
                inject(["$controller", "$rootScope",
                    function ($controller, rootScope) {
                        var data = { "$scope": rootScope.$new() };
                        $controller("mfl.chul.controllers.units_list", data);
                    }
                ]);
            });
            it("should load chul approved list controller", function () {
                inject(["$controller", "$rootScope",
                    function ($controller, rootScope) {
                        var data = { "$scope": rootScope.$new() };
                        ctrl(".units_approved_list", data);
                    }
                ]);
            });
            it("should load chul rejected list controller", function () {
                inject(["$controller", "$rootScope",
                    function ($controller, rootScope) {
                        var data = { "$scope": rootScope.$new() };
                        ctrl(".units_rejected_list", data);
                    }
                ]);
            });
        });

        describe("Test chul view controller", function () {

            it("should test viewing one chul", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        unit_id: 1
                    }
                };
                ctrl(".view_chul", data);
                httpBackend
                    .expectGET(server_url+"api/chul/units/1/")
                    .respond(200, {});
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test failing to view one chul", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        unit_id: 1
                    }
                };
                ctrl(".view_chul", data);
                httpBackend
                    .expectGET(server_url+"api/chul/units/1/")
                    .respond(500, {});
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
        });

        describe("Test chul view controller", function () {
            it("should test chul edit controller", function () {
                var data = {
                    "$scope" : rootScope.$new(),
                    "$stateParams": {
                        unit_id: 1
                    }
                };
                ctrl(".edit_chul", data);
                var chul = {
                    facility : "5",
                    facility_name : "name"
                };
                httpBackend.expectGET(server_url+"api/chul/units/1/")
                    .respond(200, chul);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should fail to get one chul", function () {
                var data = {
                    "$scope" : rootScope.$new(),
                    "$stateParams": {
                        unit_id: 1
                    }
                };
                ctrl(".edit_chul", data);
                httpBackend.expectGET(server_url+"api/chul/units/1/")
                    .respond(500, {});
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test chul basic controller", function () {
                var data = {
                    "$scope" : rootScope.$new()
                };
                ctrl(".edit_chul.basic", data);
                httpBackend.expectGET(server_url+"api/chul/statuses/")
                    .respond(200, {results: []});
                httpBackend.expectGET(server_url+"api/facilities/facilities/?page_size=100000")
                    .respond(200, {results: []});
                httpBackend.expectGET(server_url+"api/common/contact_types/")
                    .respond(200, {results: []});
                data.$scope.unit_contacts = [
                    {
                        contact_type : "",
                        contact : ""
                    },
                    {
                        contact_type : "MOBILE",
                        contact : "999"
                    }
                ];
                var obj = {
                    contact_type : "MOBILE",
                    contact : "999"
                };
                data.$scope.addContact();
                data.$scope.removeContact(obj);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test chul basic controller failing calls", function () {
                var data = {
                    "$scope" : rootScope.$new()
                };
                ctrl(".edit_chul.basic", data);
                httpBackend.expectGET(server_url+"api/chul/statuses/")
                    .respond(500, {});
                httpBackend.expectGET(server_url+"api/facilities/facilities/?page_size=100000")
                    .respond(500, {});
                httpBackend.expectGET(server_url+"api/common/contact_types/")
                    .respond(500, {});
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should fail to get one chul", function () {
                var data = {
                    "$scope" : rootScope.$new()
                };
                ctrl(".edit_chul.chews", data);
                data.$scope.unit = {
                    health_unit_workers: [
                        {
                            "first_name" : "",
                            "last_name" : "",
                            "id_number" : "",
                            "is_incharge" : ""
                        },
                        {
                            "first_name" : "anto",
                            "last_name" : "wag",
                            "id_number" : "254",
                            "is_incharge" : "true"
                        }
                    ]
                };
                var obj = {
                    "first_name" : "anto",
                    "last_name" : "wag",
                    "id_number" : "254",
                    "is_incharge" : "true"
                };
                data.$scope.addChew();
                data.$scope.removeChew(obj);
            });
        });
    });
})();
