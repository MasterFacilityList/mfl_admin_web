(function (angular) {
    "use strict";

    describe("Test facility edit controllers", function () {
        var rootScope, ctrl, httpBackend, server_url, loginService, log, yusa, controller;

        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.facility_mgmt.controllers");
            inject(["$controller", "$rootScope", "$httpBackend", "SERVER_URL",
                "mfl.auth.services.login", "$log",
                function (c, r, h, s, ls, lg) {
                    ctrl = function (name, data) {
                        return c("mfl.facility_mgmt.controllers.facility_edit"+name, data);
                    };
                    controller = c;
                    rootScope = r;
                    httpBackend = h;
                    server_url = s;
                    loginService = ls;
                    yusa = {
                        county: "123"
                    };
                    spyOn(loginService, "getUser").andReturn();
                    log = lg;
                }
            ]);
        });

        describe("Test facility edit controller", function () {

            it("should load facility details", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/facilities/3/")
                    .respond(200, {});

                ctrl("", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.facility).toEqual({});
            });

            it("should show error on fail to load facility details", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/facilities/3/")
                    .respond(400, {});

                spyOn(log, "error");
                ctrl("", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.facility).toBe(undefined);
                expect(log.error).toHaveBeenCalled();
            });
        });

        describe("Test facility edit basic controller", function () {

            it("should load required data", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.facility = {};
                data.$scope.login_user = yusa;
                httpBackend
                    .expectGET(server_url+"api/facilities/owners/?page_size=100&ordering=name")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/facility_types/?page_size=100&ordering=name")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/common/wards/?page_size=500&ordering=name&county=123")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/common/towns/?page_size=50000&ordering=name")
                    .respond(200, {results: []});
                ctrl(".basic", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.facility_owners).toEqual([]);
                expect(data.$scope.facility_types).toEqual([]);
                expect(data.$scope.wards).toEqual([]);
                expect(data.$scope.towns).toEqual([]);
            });

            it("should show errors on load", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    },
                    "$log": log
                };
                spyOn(log, "error");
                data.$scope.facility = {};
                data.$scope.login_user = yusa;
                httpBackend
                    .expectGET(server_url+"api/facilities/owners/?page_size=100&ordering=name")
                    .respond(500, {});
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/facility_types/?page_size=100&ordering=name")
                    .respond(500, {});
                httpBackend
                    .expectGET(
                        server_url+"api/common/wards/?page_size=500&ordering=name&county=123")
                    .respond(500, {});
                httpBackend
                    .expectGET(
                        server_url+"api/common/towns/?page_size=50000&ordering=name")
                    .respond(500, {});

                ctrl(".basic", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.facility_owners).toEqual(undefined);
                expect(data.$scope.facility_types).toEqual(undefined);
                expect(data.$scope.wards).toEqual(undefined);
                expect(data.$scope.towns).toEqual(undefined);
                expect(log.error).toHaveBeenCalled();
            });

            it("should save facility basic details", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.facility = {};
                data.$scope.login_user = yusa;
                httpBackend
                    .expectGET(server_url+"api/facilities/owners/?page_size=100&ordering=name")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/facilities/facility_types/?page_size=100&ordering=name")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/common/wards/?page_size=500&ordering=name&county=123")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(
                        server_url+"api/common/towns/?page_size=50000&ordering=name")
                    .respond(200, {results: []});

                ctrl(".basic", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                data.$scope.save();
            });
        });

        describe("Test facility edit contact controller", function () {
            it("should load the required data", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                httpBackend
                    .expectGET(server_url+"api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/contacts/?facility=3")
                    .respond(200, {results: []});
                ctrl(".contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should fail to load the required data", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                httpBackend
                    .expectGET(server_url+"api/common/contact_types/")
                    .respond(500, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/contacts/?facility=3")
                    .respond(500, {results: []});
                ctrl(".contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should succeed to add facility contact", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/facilities/contacts/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;

                ctrl(".contacts", data);

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
                    .expectPOST(server_url + "api/facilities/contacts/", {"facility": 3,
                      "contact": 3})
                    .respond(201, {"id": 4});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                expect(data.$scope.fac_contacts).toEqual([{"id": 4}]);
            });

            it("should show error if add a new contact fails", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$log":log,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                spyOn(log, "error");
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/facilities/contacts/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;

                ctrl(".contacts", data);

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

                expect(data.$scope.fac_contacts).toEqual([]);
                expect(log.error).toHaveBeenCalled();
            });

            it("should show error if add a new contact fails", function () {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/facilities/contacts/?facility=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.user_id = 3;

                ctrl(".contacts", data);

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
                    .expectPOST(server_url + "api/facilities/contacts/", {"facility": 3,
                                                              "contact": 3})
                    .respond(400, {"error_code": 4});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.contacts).toEqual([]);
                expect(log.error).toHaveBeenCalled();
            });

            it("should show error if associate new contact to facility fails", function () {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/facilities/contacts/?facility=3")
                    .respond(200, {results: []});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.user_id = 3;

                ctrl(".contacts", data);

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
                    .expectPOST(server_url + "api/facilities/contacts/", {"facility": 3,
                        "contact": 3})
                    .respond(400, {"error_code": 4});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_contacts).toEqual([]);
                expect(data.$scope.fac_contacts).toEqual([]);
                expect(log.error).toHaveBeenCalled();
            });

            it("should remove a contact from the current facility", function () {
                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/facilities/contacts/?facility=3")
                    .respond(200, {results: [{"contact": "123", "id": "456"}]});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.user_id = 3;

                ctrl(".contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/contacts/456/")
                    .respond(204);
                httpBackend
                    .expectDELETE(server_url + "api/common/contacts/123/")
                    .respond(204);

                data.$scope.contacts = [{"contact": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.fac_contacts[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_contacts).toEqual([]);
            });

            it("should show an error if delete facility_contact failed", function () {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/facilities/contacts/?facility=3")
                    .respond(
                        200, {results: [{"contact": "123","id": "456"}]});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.user_id = 3;

                ctrl(".contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/contacts/456/")
                    .respond(500);

                data.$scope.contacts = [{"contact": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.fac_contacts[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_contacts)
                .toEqual([{"contact": "123", "id": "456", "delete_spinner" :false}]);
            });

            it("should show an error if delete contact failed", function () {
                spyOn(log, "error");

                httpBackend
                    .expectGET(server_url + "api/common/contact_types/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url + "api/facilities/contacts/?facility=3")
                    .respond(200, {results: [{"contact": "123", "id": "456"}]});

                var data = {
                    "$scope": rootScope.$new(),
                    "$log": log,
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.user_id = 3;

                ctrl(".contacts", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/contacts/456/")
                    .respond(204);
                httpBackend
                    .expectDELETE(server_url + "api/common/contacts/123/")
                    .respond(500);

                data.$scope.fac_contacts = [{"contact": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.fac_contacts[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_contacts)
                .toEqual([{"contact": "123", "id": "456", "delete_spinner" : false}]);
            });
        });

        describe("Test facility edit officers controller", function () {
            it("should load data from facility officers edit controller", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/officers/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_officers/?facility=3")
                    .respond(200, {results: []});
                ctrl(".officers", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should fail to load data from facility officers edit controller", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/officers/")
                    .respond(500, {results: []});
                ctrl(".officers", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should successfully add an officer to a facility", function () {

                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/officers/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_officers/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;

                ctrl(".officers", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                data.$scope.officer = {
                    "id": "3"
                };
                data.$scope.facility_id = "3";

                httpBackend
                    .expectPOST(server_url + "api/facilities/facility_officers/", {"facility": "3",
                      "officer": "3"})
                    .respond(201, {"id": 5});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                expect(data.$scope.fac_officers).toEqual([{"id": 5}]);
            });
            it("should fail to add an officer to a facility", function () {

                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/officers/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_officers/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;

                ctrl(".officers", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                data.$scope.officer = {
                    "id": "3"
                };
                data.$scope.facility_id = "3";

                httpBackend
                    .expectPOST(server_url + "api/facilities/facility_officers/", {"facility": "3",
                      "officer": "3"})
                    .respond(500, {"id": 5});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                expect(data.$scope.fac_officers).toEqual([]);
            });
            it("should remove an officer from the current facility", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/officers/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_officers/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;

                ctrl(".officers", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/facility_officers/456/")
                    .respond(204);

                data.$scope.fac_officers = [{"facility": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.fac_officers[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_officers).toEqual([]);
            });
            it("should fail to remove an officer from the current facility", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/officers/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_officers/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;

                ctrl(".officers", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/facility_officers/456/")
                    .respond(500);

                data.$scope.fac_officers = [{"facility": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.fac_officers[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_officers).toEqual([{"facility":"123",
                   "id":"456",delete_spinner:false}]);
            });
        });

        describe("Test facility edit facility units controller", function () {
            it("should load data from facility units edit controller", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 4
                    }
                };
                data.$scope.facility_id = 4;

                httpBackend
                    .expectGET(server_url+"api/facilities/regulating_bodies/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_units/?facility=4")
                    .respond(200, {results: []});
                ctrl(".units", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should fail to load data from facility units edit controller", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.facility_id = 3;
                httpBackend
                    .expectGET(server_url+"api/facilities/regulating_bodies/")
                    .respond(500, {results: []});
                ctrl(".units", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should successfully add a facility unit to the current facility", function () {

                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.facility_id = 3;
                httpBackend
                    .expectGET(server_url+"api/facilities/regulating_bodies/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_units/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;

                ctrl(".units", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                data.$scope.facility_unit = {
                    "regulating_body": "3",
                    "name": "name",
                    "description": "description"
                };
                data.$scope.facility_id = "3";

                httpBackend
                    .expectPOST(server_url + "api/facilities/facility_units/", {"facility": "3",
                      "regulating_body": "3","name":"name","description":"description"})
                    .respond(201, {"id": 5});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                expect(data.$scope.fac_units).toEqual([{"id": 5}]);
            });
            it("should fail to add facility unit to the current facility", function () {

                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.facility_id = 3;
                httpBackend
                    .expectGET(server_url+"api/facilities/regulating_bodies/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_units/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;

                ctrl(".units", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                data.$scope.facility_unit = {
                    "regulating_body": "3",
                    "name": "name",
                    "description": "description"
                };
                data.$scope.facility_id = "3";

                httpBackend
                    .expectPOST(server_url + "api/facilities/facility_units/", {"facility": "3",
                      "regulating_body": "3","name":"name","description":"description"})
                    .respond(500, {"id": 5});

                data.$scope.add();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
                expect(data.$scope.fac_units).toEqual([]);
            });
            it("should remove a facility unit from the current facility", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.facility_id = 3;
                httpBackend
                    .expectGET(server_url+"api/facilities/regulating_bodies/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_units/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;

                ctrl(".units", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/facility_units/456/")
                    .respond(204);

                data.$scope.fac_units = [{"facility": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.fac_units[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_units).toEqual([]);
            });
            it("should fail to remove a facility unit from the current facility", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 3
                    }
                };
                data.$scope.facility_id = 3;
                httpBackend
                    .expectGET(server_url+"api/facilities/regulating_bodies/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/facilities/facility_units/?facility=3")
                    .respond(200, {results: []});

                data.$scope.user_id = 3;

                ctrl(".units", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url + "api/facilities/facility_units/456/")
                    .respond(500);

                data.$scope.fac_units = [{"facility": "123", "id": "456"}];
                data.$scope.removeChild(data.$scope.fac_units[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(data.$scope.fac_units).toEqual([{"facility":"123",
                   "id":"456",delete_spinner:false}]);
            });
        });

        describe("Test facility edit services controller", function () {
            it("should bootstrap from helper controller", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$controller": null
                };
                var helper = {"bootstrap": angular.noop};
                spyOn(data, "$controller").andReturn(helper);
                spyOn(helper, "bootstrap");
                ctrl(".services", data);
                expect(helper.bootstrap).toHaveBeenCalledWith(data.$scope);
            });
        });

        describe("Test facility services helper controller", function () {

            beforeEach(function () {
                ctrl = function (data) {
                    return controller("mfl.facility_mgmt.controllers.services_helper", data);
                };
            });

            it("should expose bootstrap method", function () {
                var c = ctrl();
                expect(angular.isFunction(c.bootstrap)).toBe(true);
            });

            it("should load services", function () {
                httpBackend
                    .expectGET(server_url+"api/facilities/services/?page_size=100&ordering=name")
                    .respond(200, {results: [{"id": 3}]});

                var c = ctrl();
                var scope = rootScope.$new();
                c.bootstrap(scope);

                expect(scope.new_service.service).toEqual("");
                expect(scope.new_service.option).toEqual("");
                expect(scope.services).toEqual([]);
                expect(scope.service_options).toEqual([]);
                expect(angular.isFunction(scope.addServiceOption)).toBe(true);
                expect(angular.isFunction(scope.removeChild)).toBe(true);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.services).toEqual([{"id": 3}]);
            });

            it("should show error on fail to load services", function () {
                httpBackend
                    .expectGET(server_url+"api/facilities/services/?page_size=100&ordering=name")
                    .respond(500, {"error": "e"});

                spyOn(log, "error");
                var c = ctrl({"$log": log});
                var scope = rootScope.$new();
                c.bootstrap(scope);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.services).toEqual([]);
                expect(log.error).toHaveBeenCalled();
            });

            it("should add a facility service", function () {
                var payload = {results: [{"id": 3}]};
                httpBackend
                    .expectGET(server_url+"api/facilities/services/?page_size=100&ordering=name")
                    .respond(200, payload);

                var c = ctrl();
                var scope = rootScope.$new();
                c.bootstrap(scope);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(server_url+"api/facilities/facility_services/")
                    .respond(201, {"id": 4});

                scope.facility = {
                    facility_services: []
                };
                scope.addServiceOption(payload.results[0]);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                expect(scope.facility.facility_services[0]).toEqual({"id": 4});
            });

            it("should show error on fail to add a facility service", function () {
                var payload = {results: [{"id": 3}]};
                httpBackend
                    .expectGET(server_url+"api/facilities/services/?page_size=100&ordering=name")
                    .respond(200, payload);

                spyOn(log, "error");
                var c = ctrl({"$log": log});
                var scope = rootScope.$new();
                c.bootstrap(scope);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectPOST(server_url+"api/facilities/facility_services/")
                    .respond(500);

                scope.facility = {
                    facility_services: []
                };
                scope.addServiceOption(payload.results[0]);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(scope.facility.facility_services).toEqual([]);
                expect(log.error).toHaveBeenCalled();
            });

            it("should remove a facility service", function () {
                httpBackend
                    .expectGET(server_url+"api/facilities/services/?page_size=100&ordering=name")
                    .respond(200, {results: [{"id": 3}]});

                var c = ctrl();
                var scope = rootScope.$new();
                c.bootstrap(scope);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url+"api/facilities/facility_services/4/")
                    .respond(204);

                scope.facility = {
                    facility_services: [{"id": 4}]
                };
                scope.removeChild(scope.facility.facility_services[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(scope.facility.facility_services).toEqual([]);
            });

            it("should show an error on fail to remove a facility service", function () {
                httpBackend
                    .expectGET(server_url+"api/facilities/services/?page_size=100&ordering=name")
                    .respond(200, {results: [{"id": 3}]});

                spyOn(log, "error");
                var c = ctrl({"$log": log});
                var scope = rootScope.$new();
                c.bootstrap(scope);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                httpBackend.resetExpectations();

                httpBackend
                    .expectDELETE(server_url+"api/facilities/facility_services/4/")
                    .respond(404);

                scope.facility = {
                    facility_services: [{"id": 4}]
                };
                scope.removeChild(scope.facility.facility_services[0]);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(scope.facility.facility_services).toEqual([{"id": 4}]);
            });

            it("should update service_options on change service", function () {
                var payload = {
                    results: [
                        {
                            "id": "1",
                            "service_options": [
                                {"name": "YES"}
                            ]
                        },
                        {
                            "id": "2",
                            "service_options": [
                                {"name": "NO"}
                            ]
                        },
                        {
                            "id": "3"
                        },
                        {
                            "id": "4",
                            "service_options": []
                        }
                    ]
                };
                httpBackend
                    .expectGET(server_url+"api/facilities/services/?page_size=100&ordering=name")
                    .respond(200, payload);

                var c = ctrl();
                var scope = rootScope.$new();

                c.bootstrap(scope);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.services).toEqual(payload.results);

                scope.new_service.service = "2";
                scope.$apply();
                expect(scope.service_options).toEqual(payload.results[1].service_options);

                scope.new_service.service = "1";
                scope.$apply();
                expect(scope.service_options).toEqual(payload.results[0].service_options);

                scope.new_service.service = "3";
                scope.$apply();
                expect(scope.service_options).toEqual([]);

                scope.new_service.service = "4";
                scope.$apply();
                expect(scope.service_options).toEqual([]);

                scope.new_service.service = "5";
                scope.$apply();
                expect(scope.service_options).toEqual([]);
            });
        });

        describe("Test facility edit facility setup controller", function () {

            it("should load the data required by the setup controler", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 4
                    }
                };
                data.$scope.facility_id = 4;

                httpBackend
                    .expectGET(server_url+"api/gis/geo_code_sources/")
                    .respond(200, {results: []});
                httpBackend
                    .expectGET(server_url+"api/gis/geo_code_methods/")
                    .respond(200, {results: []});
                ctrl(".setup", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should fail to load the data required by the setup controler", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {
                        facility_id: 4
                    }
                };
                data.$scope.facility_id = 4;

                httpBackend
                    .expectGET(server_url+"api/gis/geo_code_sources/")
                    .respond(500, {results: []});
                httpBackend
                    .expectGET(server_url+"api/gis/geo_code_methods/")
                    .respond(500, {results: []});
                ctrl(".setup", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

        });
    });
})(angular);
