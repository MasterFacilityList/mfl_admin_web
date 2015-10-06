(function (angular) {
    "use strict";
    describe("Test chul controllers", function () {
        var rootScope, ctrl, httpBackend, server_url,
        controller, stateParams, state;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.chul.services");
            module("mfl.chul.controllers");
            inject(["$controller", "$rootScope", "$httpBackend", "SERVER_URL",
                "$stateParams", "$state",
                function (c, r, h, s, st, sp) {
                    ctrl = function (name, data) {
                        return c("mfl.chul.controllers"+name, data);
                    };
                    controller = c;
                    rootScope = r;
                    httpBackend = h;
                    server_url = s;
                    state = sp;
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
            it("should load chul pending approval list controller", function () {
                inject(["$controller", "$rootScope",
                    function ($controller, rootScope) {
                        var data = { "$scope": rootScope.$new() };
                        ctrl(".units_pending_approvals", data);
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

        describe("Test chul feedback list controllers", function () {

            it("should load chul feedback list controller", function () {
                inject(["$controller", "$rootScope",
                    function ($controller, rootScope) {
                        var data = { "$scope": rootScope.$new(), "$stateParams": {} };
                        ctrl(".chu_feedback", data);
                        expect(data.$scope.filters.facility).toBe(undefined);
                        expect(data.$scope.filters.chu).toBe(undefined);
                    }
                ]);
            });

            it("should load feedback filtered by facility", function () {
                inject(["$controller", "$rootScope",
                    function ($controller, rootScope) {
                        var data = {
                            "$scope": rootScope.$new(),
                            "$stateParams": {"facility_id": "123"}
                        };
                        ctrl(".chu_feedback", data);
                        expect(data.$scope.filters.facility).toEqual("123");
                        expect(data.$scope.filters.chu).toBe(undefined);
                    }
                ]);
            });

            it("should load feedback filtered by chu", function () {
                inject(["$controller", "$rootScope",
                    function ($controller, rootScope) {
                        var data = { "$scope": rootScope.$new(), "$stateParams": {"chu": "456"} };
                        ctrl(".chu_feedback", data);
                        expect(data.$scope.filters.facility).toBe(undefined);
                        expect(data.$scope.filters.chu).toEqual("456");
                    }
                ]);
            });

            it("should filter feedback by facility and chu", function () {
                inject(["$controller", "$rootScope",
                    function ($controller, rootScope) {
                        var data = {
                            "$scope": rootScope.$new(),
                            "$stateParams": {"chu": "456", "facility_id":"123" }
                        };
                        ctrl(".chu_feedback", data);
                        expect(data.$scope.filters.facility).toEqual("123");
                        expect(data.$scope.filters.chu).toEqual("456");
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
                var arg = true;
                data.$scope.setNxt(arg);
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
                inject(["mfl.common.forms.changes", function (formChanges){
                    var data = {
                        "$scope" : rootScope.$new(),
                        "$state" : state,
                        "mfl.common.forms.changes" : formChanges
                    };
                    spyOn(state, "go");
                    data.$scope.nxtState = true;
                    data.$scope.create = false;
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
                    data.$scope.unit_id = 1;

                    data.$scope.select_values = {
                        facility : {id : "1"}
                    };
                    data.$scope.facilities = [
                        {
                            id : "2",
                            county : "NAIROBI",
                            constituency : "MATHARE",
                            ward_name : "HOSPITAL"
                        }
                    ];
                    data.$scope.unit = {
                        facility : "2",
                        facility_county : "",
                        facility_subcounty : "",
                        facility_ward : "",
                        contacts : [
                            {
                                contact_type : "",
                                contact : ""
                            },
                            {
                                contact_type : "MOBILE",
                                contact : "999"
                            }
                        ]
                    };
                    var frm = {
                        "$dirty": true,
                        "name": {
                            "$modelValue": "Mathare 4B",
                            "$dirty": true
                        }
                    };
                    var changed = {
                        name : "Mathare 4B",
                        contacts : [
                            {
                                contact_type : "",
                                contact : ""
                            },
                            {
                                contact_type : "MOBILE",
                                contact : "999"
                            }
                        ]
                    };
                    httpBackend.expectPATCH(server_url +"api/chul/units/1/",
                        changed).respond(200);
                    data.$scope.save(frm);
                    data.$scope.unitLocation("2");
                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();
                }]);
            });
            it("should test chul contacts add and removal", function() {
                var data = {
                    "$scope" : rootScope.$new()
                };
                ctrl(".edit_chul.basic", data);
                var obj = {
                    contact_type : "MOBILE",
                    contact : "999"
                };
                data.$scope.unit = {
                    facility : "2",
                    facility_county : "",
                    facility_subcounty : "",
                    facility_ward : "",
                    contacts : [
                        {
                            contact_type : "",
                            contact : ""
                        },
                        {
                            contact_type : "MOBILE",
                            contact : "999"
                        }
                    ]
                };
                data.$scope.addContact();
                data.$scope.removeContact(obj);
            });
            it("should test chul backend-contact removal", function() {
                var data = {
                    "$scope" : rootScope.$new()
                };
                ctrl(".edit_chul.basic", data);
                var obj = {
                    id : "3",
                    contact_type : "MOBILE",
                    contact : "999",
                    contact_id : "1"
                };
                data.$scope.unit = {
                    facility : "2",
                    facility_county : "",
                    facility_subcounty : "",
                    facility_ward : "",
                    contacts : [
                        {
                            contact_type : "",
                            contact : ""
                        },
                        {
                            id : "3",
                            contact_type : "MOBILE",
                            contact : "999",
                            contact_id : "1"
                        }
                    ]
                };
                httpBackend.expectDELETE(server_url+
                    "api/chul/unit_contacts/3/").respond(204, {});
                httpBackend.expectDELETE(server_url+
                    "api/common/contacts/1/").respond(204, {});
                data.$scope.removeContact(obj);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test chul backend-contact removal: fail", function() {
                var data = {
                    "$scope" : rootScope.$new()
                };
                ctrl(".edit_chul.basic", data);
                var obj = {
                    id : "3",
                    contact_type : "MOBILE",
                    contact : "999",
                    contact_id : "1"
                };
                data.$scope.unit = {
                    facility : "2",
                    facility_county : "",
                    facility_subcounty : "",
                    facility_ward : "",
                    contacts : [
                        {
                            contact_type : "",
                            contact : ""
                        },
                        {
                            id : "3",
                            contact_type : "MOBILE",
                            contact : "999",
                            contact_id : "1"
                        }
                    ]
                };
                httpBackend.expectDELETE(server_url+
                    "api/chul/unit_contacts/3/").respond(204, {});
                httpBackend.expectDELETE(server_url+
                    "api/common/contacts/1/").respond(500);
                data.$scope.removeContact(obj);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test chul backend-contact removal: total fail",
                function() {
                var data = {
                    "$scope" : rootScope.$new()
                };
                ctrl(".edit_chul.basic", data);
                var obj = {
                    id : "3",
                    contact_type : "MOBILE",
                    contact : "999",
                    contact_id : "1"
                };
                data.$scope.unit = {
                    facility : "2",
                    facility_county : "",
                    facility_subcounty : "",
                    facility_ward : "",
                    contacts : [
                        {
                            contact_type : "",
                            contact : ""
                        },
                        {
                            id : "3",
                            contact_type : "MOBILE",
                            contact : "999",
                            contact_id : "1"
                        }
                    ]
                };
                httpBackend.expectDELETE(server_url+
                    "api/chul/unit_contacts/3/").respond(500);
                data.$scope.removeContact(obj);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test chul updates removed contacts", function () {
                var data = {
                    "$scope" : rootScope.$new()
                };
                data.$scope.nxtState = false;
                data.$scope.create = false;
                ctrl(".edit_chul.basic", data);
                httpBackend.expectGET(server_url+"api/chul/statuses/")
                    .respond(500, {});
                httpBackend.expectGET(server_url+"api/facilities/facilities/?page_size=100000")
                    .respond(500, {});
                httpBackend.expectGET(server_url+"api/common/contact_types/")
                    .respond(500, {});
                data.$scope.unit_id = 1;
                data.$scope.select_values = {
                    facility : {id : "1"}
                };
                data.$scope.unit = {
                    facility : "2",
                    contacts : []
                };
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$modelValue": "Mathare 4B",
                        "$dirty": true
                    }
                };
                data.$scope.save(frm);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test chul basic controller failing calls", function () {
                var data = {
                    "$scope" : rootScope.$new()
                };
                data.$scope.nxtState = false;
                data.$scope.create = false;
                ctrl(".edit_chul.basic", data);
                httpBackend.expectGET(server_url+"api/chul/statuses/")
                    .respond(500, {});
                httpBackend.expectGET(server_url+"api/facilities/facilities/?page_size=100000")
                    .respond(500, {});
                httpBackend.expectGET(server_url+"api/common/contact_types/")
                    .respond(500, {});
                data.$scope.unit_id = 1;
                data.$scope.select_values = {
                    facility : {id : "1"}
                };
                data.$scope.unit = {
                    facility : "2",
                    contacts : [
                        {
                            contact_type : "",
                            contact : ""
                        },
                        {
                            contact_type : "MOBILE",
                            contact : "999"
                        }
                    ]
                };
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$modelValue": "Mathare 4B",
                        "$dirty": true
                    }
                };
                var changed = {
                    name : "Mathare 4B",
                    contacts : [
                        {
                            contact_type : "",
                            contact : ""
                        },
                        {
                            contact_type : "MOBILE",
                            contact : "999"
                        }
                    ]
                };
                httpBackend.expectPATCH(server_url + "api/chul/units/1/",changed).respond(500);
                data.$scope.save(frm);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test chul basic controller create", function () {
                var data = {
                    "$scope" : rootScope.$new(),
                    "$state" : state
                };
                spyOn(state, "params");
                state.params = {
                    unit_id : "1"
                };
                data.$scope.nxtState = false;
                data.$scope.nextState = angular.noop;
                data.$scope.create = true;
                ctrl(".edit_chul.basic", data);
                httpBackend.expectGET(server_url+"api/chul/statuses/")
                    .respond(500, {});
                httpBackend.expectGET(server_url+"api/facilities/facilities/?page_size=100000")
                    .respond(500, {});
                httpBackend.expectGET(server_url+"api/common/contact_types/")
                    .respond(500, {});
                data.$scope.unit_id = 1;
                data.$scope.select_values = {
                    facility : {id : "1"}
                };
                data.$scope.unit = {
                    facility : "2",
                    contacts : []
                };
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$modelValue": "Mathare 4B",
                        "$dirty": true
                    }
                };
                var changed = {
                    name : "Mathare 4B"
                };
                httpBackend.expectPATCH(server_url + "api/chul/units/1/",changed).respond(200);
                data.$scope.save(frm);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test fail to update CU", function () {
                var data = {
                    "$scope" : rootScope.$new(),
                    "$state" : state
                };
                spyOn(state, "params");
                state.params = {
                    unit_id : "1"
                };
                data.$scope.nxtState = false;
                data.$scope.nextState = angular.noop;
                data.$scope.create = true;
                ctrl(".edit_chul.basic", data);
                httpBackend.expectGET(server_url+"api/chul/statuses/")
                    .respond(500, {});
                httpBackend.expectGET(server_url+"api/facilities/facilities/?page_size=100000")
                    .respond(500, {});
                httpBackend.expectGET(server_url+"api/common/contact_types/")
                    .respond(500, {});
                data.$scope.unit_id = 1;
                data.$scope.select_values = {
                    facility : {id : "1"}
                };
                data.$scope.unit = {facility : "2"};
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$modelValue": "Mathare 4B",
                        "$dirty": true
                    }
                };
                var changed = {
                    name : "Mathare 4B"
                };
                httpBackend.expectPATCH(server_url + "api/chul/units/1/",changed).respond(500);
                data.$scope.save(frm);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test creation of CU : successfully", function () {
                var data = {
                    "$scope" : rootScope.$new(),
                    "$state" : state
                };
                spyOn(state, "params");
                state.params = {
                    unit_id : ""
                };
                data.$scope.nxtState = false;
                data.$scope.nextState = angular.noop;
                data.$scope.create = true;
                ctrl(".edit_chul.basic", data);
                httpBackend.expectGET(server_url+"api/chul/statuses/")
                    .respond(500, {});
                httpBackend.expectGET(server_url+"api/facilities/facilities/?page_size=100000")
                    .respond(500, {});
                httpBackend.expectGET(server_url+"api/common/contact_types/")
                    .respond(500, {});
                data.$scope.unit_id = 1;
                data.$scope.select_values = {
                    facility : {id : "1"}
                };
                data.$scope.unit = {facility : "2"};
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$modelValue": "Mathare 4B",
                        "$dirty": true
                    }
                };
                var changed = {
                    name : "Mathare 4B"
                };
                httpBackend.expectPOST(server_url + "api/chul/units/")
                    .respond(200, changed);
                data.$scope.save(frm);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test creation of a CU: failure", function () {
                var data = {
                    "$scope" : rootScope.$new(),
                    "$state" : state
                };
                spyOn(state, "params");
                state.params = {
                    unit_id : ""
                };
                data.$scope.nxtState = false;
                data.$scope.nextState = angular.noop;
                data.$scope.create = true;
                ctrl(".edit_chul.basic", data);
                httpBackend.expectGET(server_url+"api/chul/statuses/")
                    .respond(500, {});
                httpBackend.expectGET(server_url+"api/facilities/facilities/?page_size=100000")
                    .respond(500, {});
                httpBackend.expectGET(server_url+"api/common/contact_types/")
                    .respond(500, {});
                data.$scope.unit_id = 1;
                data.$scope.select_values = {
                    facility : {id : "1"}
                };
                data.$scope.unit = {facility : "2"};
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$modelValue": "Mathare 4B",
                        "$dirty": true
                    }
                };
                var changed = {
                    name : "Mathare 4B"
                };
                httpBackend.expectPOST(server_url + "api/chul/units/")
                    .respond(500, changed);
                data.$scope.save(frm);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should test chew controller", function () {
                var data = {
                    "$scope" : rootScope.$new(),
                    "$state" : state
                };
                state.params = {unit_id : 1};
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                ctrl(".edit_chul.chews", data);
                data.$scope.unit_id = "";
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
                data.$scope.$apply();
                var obj = {
                    "first_name" : "anto",
                    "last_name" : "wag",
                    "id_number" : "254",
                    "is_incharge" : "true"
                };
                data.$scope.unitWorkers(data.$scope.unit);
                data.$scope.addChew();
                data.$scope.removeChew(obj);
            });
            it("should test chew controller deleting a chew", function () {
                var data = {
                    "$scope" : rootScope.$new(),
                    "$state" : state
                };
                spyOn(state, "go");
                data.$scope.create = false;
                ctrl(".edit_chul.chews", data);
                data.$scope.unit_id = 1;
                data.$scope.unit = {
                    health_unit_workers: [
                        {
                            "id" : "1",
                            "first_name" : "anto",
                            "last_name" : "wag",
                            "id_number" : "254",
                            "is_incharge" : true
                        },
                        {
                            "id" : "2",
                            "first_name" : "day",
                            "last_name" : "wag",
                            "id_number" : "+254",
                            "is_incharge" : false
                        }
                    ]
                };
                var obj = {
                    "id" : "1",
                    "first_name" : "anto",
                    "last_name" : "wag",
                    "id_number" : "254",
                    "is_incharge" : "true"
                };
                httpBackend.expectDELETE(server_url + "api/chul/workers/1/")
                    .respond(201);
                httpBackend.expectPATCH(server_url + "api/chul/units/1/")
                    .respond(200, data.$scope.unit);
                data.$scope.unitWorkers(data.$scope.unit);
                data.$scope.removeChew(obj);
                data.$scope.saveChews();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test creating chew : create mode", function () {
                var data = {
                    "$scope" : rootScope.$new(),
                    "$state" : state
                };
                spyOn(state, "go");
                data.$scope.create = true;
                data.$scope.nextState = angular.noop;
                ctrl(".edit_chul.chews", data);
                data.$scope.unit_id = 1;
                data.$scope.unit = {
                    health_unit_workers: [
                        {
                            "id" : "1",
                            "first_name" : "anto",
                            "last_name" : "wag",
                            "id_number" : "254",
                            "is_incharge" : true
                        },
                        {
                            "id" : "2",
                            "first_name" : "day",
                            "last_name" : "wag",
                            "id_number" : "+254",
                            "is_incharge" : false
                        }
                    ]
                };
                var obj = {
                    "id" : "1",
                    "first_name" : "anto",
                    "last_name" : "wag",
                    "id_number" : "254",
                    "is_incharge" : "true"
                };
                httpBackend.expectDELETE(server_url + "api/chul/workers/1/")
                    .respond(201);
                httpBackend.expectPATCH(server_url + "api/chul/units/1/")
                    .respond(200, data.$scope.unit);
                data.$scope.unitWorkers(data.$scope.unit);
                data.$scope.removeChew(obj);
                data.$scope.saveChews();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test failure to delete a chew", function () {
                var data = {
                    "$scope" : rootScope.$new()
                };
                data.$scope.create = false;
                ctrl(".edit_chul.chews", data);
                data.$scope.unit_id = 1;
                data.$scope.unit = {
                    health_unit_workers: [
                        {
                            "id" : "1",
                            "first_name" : "anto",
                            "last_name" : "wag",
                            "id_number" : "254",
                            "is_incharge" : "true"
                        },
                        {
                            "id" : "2",
                            "first_name" : "day",
                            "last_name" : "wag",
                            "id_number" : "+254",
                            "is_incharge" : false
                        }
                    ]
                };
                var obj = {
                    "id" : "1",
                    "first_name" : "anto",
                    "last_name" : "wag",
                    "id_number" : "254",
                    "is_incharge" : "true"
                };
                httpBackend.expectDELETE(server_url + "api/chul/workers/1/")
                    .respond(500);
                httpBackend.expectPATCH(server_url + "api/chul/units/1/")
                    .respond(500);
                data.$scope.unitWorkers(data.$scope.unit);
                data.$scope.removeChew(obj);
                data.$scope.saveChews();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test saving chew with no worker", function () {
                var data = {
                    "$scope" : rootScope.$new()
                };
                data.$scope.create = false;
                ctrl(".edit_chul.chews", data);
                data.$scope.unit = {
                    health_unit_workers: []
                };
                data.$scope.saveChews();
            });
            it("should test chew controller: edit mode", function () {
                var data = {
                    "$scope" : rootScope.$new()
                };
                data.$scope.create = false;
                ctrl(".edit_chul.chews", data);
                data.$scope.unit = {
                    health_unit_workers: []
                };
                data.$scope.unitWorkers(data.$scope.unit);
            });
            it("should test basic controller unit undefined", function () {
                var data = {
                    "$scope" : rootScope.$new()
                };
                data.$scope.create = false;
                ctrl(".edit_chul.basic", data);
                data.$scope.unit = undefined;
                data.$scope.$apply();
            });
            it("should test chew controller unit undefined", function () {
                var data = {
                    "$scope" : rootScope.$new()
                };
                data.$scope.create = false;
                ctrl(".edit_chul.chews", data);
                data.$scope.unit = undefined;
                data.$scope.$apply();
            });
            it("should test health_unit_workers not present", function () {
                var data = {
                    "$scope" : rootScope.$new()
                };
                data.$scope.create = false;
                ctrl(".edit_chul.chews", data);
                data.$scope.unit = {"id" : "3"};
                data.$scope.$apply();
            });
        });
    });
})(window.angular);
