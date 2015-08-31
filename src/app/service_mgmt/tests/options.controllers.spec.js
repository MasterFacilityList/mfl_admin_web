(function () {
    "use strict";

    describe("Test options controllers", function () {
        var ctrl, server_url, httpBackend, rootScope, state, log;

        beforeEach(function () {
            module("ui.router");
            module("angular-toasty");
            module("mflAdminAppConfig");
            module("mfl.common.forms");
            module("mfl.service_mgmt.services");
            module("mfl.service_mgmt.controllers.options");

            inject(["$controller", "SERVER_URL", "$httpBackend", "$rootScope", "$state", "$log",
                function ($controller, SERVER_URL, $httpBackend, $rootScope, $state, $log) {
                    httpBackend = $httpBackend;
                    server_url = SERVER_URL;
                    rootScope = $rootScope;
                    state = $state;
                    log = $log;
                    ctrl = function (name, data) {
                        return $controller("mfl.service_mgmt.controllers."+name, data);
                    };
                }
            ]);
        });
        describe("Test option group list controller", function () {
            it("should load option groups controller", function () {
                ctrl("option_group_list", {
                    "$scope": rootScope.$new()
                });
            });
        });

        describe("Test option group edit controller", function () {
            it("should get one option group", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        option_group_id: 1
                    },
                    "$scope": scope,
                    "$state" : state
                };
                spyOn(state, "go");
                httpBackend
                    .expectGET(server_url + "api/facilities/option_groups/1/")
                    .respond(200, {});
                scope.option_group_id = "1";
                scope.option_group = {
                    "id" : "1",
                    "options" : [
                        {
                            "id" : "5",
                            "value" : "5",
                            "display_text" : "Level 5",
                            "option_type": "INTEGER"
                        },
                        {
                            "value" : "4",
                            "display_text" : "Level 4",
                            "option_type" : "INTEGER"
                        }
                    ]
                };
                scope.edit_view = true;
                ctrl("option_group_create", data);
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$dirty": true,
                        "$$modelValue": "New Option Group"
                    }
                };
                var obj = {
                    "value" : "4",
                    "display_text" : "Level 4",
                    "option_type" : "INTEGER"
                };
                scope.cancel();
                scope.save(frm);
                scope.addOption();
                scope.removeOption(obj);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.option_group).toEqual({});
            });
            it("should fail to edit option group", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        option_group_id: 1
                    },
                    "$scope": scope,
                    "$state" : state
                };
                spyOn(state, "go");
                httpBackend
                    .expectGET(server_url + "api/facilities/option_groups/1/")
                    .respond(200, {});
                scope.option_group_id = "1";
                scope.edit_view = false;
                ctrl("option_group_create", data);
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$dirty": true,
                        "$$modelValue": "New Option Group"
                    }
                };
                scope.option_group = {
                    "id" : "1",
                    "options" : [
                        {
                            "id" : "5",
                            "value" : "5",
                            "display_text" : "Level 5",
                            "option_type": "INTEGER"
                        },
                        {
                            "id" : "5",
                            "value" : "4",
                            "display_text" : "Level 4",
                            "option_type" : "INTEGER"
                        }
                    ]
                };
                var obj = {
                    "id" : "4",
                    "value" : "4",
                    "display_text" : "Level 4",
                    "option_type" : "INTEGER"
                };
                scope.cancel();
                scope.save(frm);
                scope.removeOption(obj);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.option_group).toEqual({});
            });
            it("should not patch with empty form", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        option_group_id: 1
                    },
                    "$scope": scope,
                    "$state" : state
                };
                spyOn(state, "go");
                httpBackend
                    .expectGET(server_url + "api/facilities/option_groups/1/")
                    .respond(200, {});
                scope.option_group_id = "1";
                scope.edit_view = true;
                scope.option_group = {
                    "id" : "1",
                    "options" : [
                        {
                            "id" : "5",
                            "value" : "5",
                            "display_text" : "Level 5",
                            "option_type": "INTEGER"
                        },
                        {
                            "id" : "4",
                            "value" : "4",
                            "display_text" : "Level 4",
                            "option_type" : "INTEGER"
                        }
                    ]
                };
                ctrl("option_group_create", data);
                var frm = {
                    "$dirty": false,
                    "name": {
                        "$dirty": false,
                        "$$modelValue": "New Option Group"
                    }
                };
                httpBackend
                    .expectDELETE(server_url +
                        "api/facilities/options/4/").respond(204);
                var obj = {
                    "id" : "4",
                    "value" : "4",
                    "display_text" : "Level 4",
                    "option_type" : "INTEGER"
                };
                scope.cancel();
                scope.save(frm);
                scope.removeOption(obj);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.option_group).toEqual({options: []});
            });
            it("should save a new option group", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope,
                    "$state" : state,
                    "$stateParams" : {
                        option_group_id : "3"
                    }
                };
                spyOn(state, "go");
                scope.option_group_id = "3";
                scope.edit_view = true;
                ctrl("option_group_create", data);
                scope.option_group = {name : "New Option Group"};
                httpBackend
                    .expectPOST(server_url +
                        "api/facilities/option_group_with_options/")
                        .respond(201, {name : "New Option Group"});
                scope.save();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.option_group).toEqual({name : "New Option Group"});
            });
            it("should update an existing option group", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope,
                    "$state" : state
                };
                spyOn(state, "go");
                ctrl("option_group_create", data);
                scope.option_group = {name : "New Option Group"};
                scope.edit_view = false;
                httpBackend
                    .expectPOST(server_url +
                        "api/facilities/option_group_with_options/")
                        .respond(201, {name : "New Option Group"});
                scope.save();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.option_group).toEqual({name : "New Option Group"});
            });
            it("should fail to save a new option group", function () {
                var scope = rootScope.$new();
                var data = {
                    "$scope": scope,
                    "$state" : state
                };
                spyOn(state, "go");
                scope.edit_view = false;
                ctrl("option_group_create", data);
                var frm = {
                    "$dirty": true,
                    "name": {
                        "$dirty": true,
                        "$$modelValue": "New Option Group"
                    }
                };
                scope.option_group = {name : "New Option Group"};
                httpBackend
                    .expectPOST(server_url +
                        "api/facilities/option_group_with_options/")
                        .respond(500);
                scope.save(frm);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should delete an option group", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        option_group_id: 1
                    },
                    "$scope": scope,
                    "$state" : state
                };
                spyOn(state, "go");
                httpBackend
                    .expectGET(server_url + "api/facilities/option_groups/1/")
                    .respond(200, {});
                scope.option_group_id = "1";
                scope.edit_view = true;
                ctrl("option_group_create", data);
                httpBackend
                    .expectDELETE(server_url +
                        "api/facilities/option_groups/1/").respond(204);
                scope.remove();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should fail to delete an option group", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        option_group_id: 1
                    },
                    "$scope": scope,
                    "$state" : state
                };
                spyOn(state, "go");
                httpBackend
                    .expectGET(server_url + "api/facilities/option_groups/1/")
                    .respond(200, {});
                scope.option_group_id = "1";
                scope.edit_view = true;
                ctrl("option_group_create", data);
                httpBackend
                    .expectDELETE(server_url +
                        "api/facilities/option_groups/1/").respond(500);
                scope.remove();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should get one option", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        option_group_id: 1
                    },
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/option_groups/1/")
                    .respond(500, {});
                scope.option_group_id = "1";
                scope.edit_view = true;
                ctrl("option_group_create", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
        });

        describe("Test option list controller", function () {
            it("should load", function () {
                ctrl("option_list", {
                    "$scope": rootScope.$new()
                });
            });
        });

        describe("Test option edit controller", function () {
            it("should get one option", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        option_id: 1
                    },
                    "$scope": scope
                };
                httpBackend.expectGET(server_url +
                    "api/facilities/option_groups/?page_size=1000")
                    .respond(200, {});
                httpBackend
                    .expectGET(server_url + "api/facilities/options/1/")
                    .respond(200, {});

                ctrl("option_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.option).toEqual({});
            });

            it("should log errors on get one option failure", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        option_id: 1
                    },
                    "$scope": scope,
                    "$log": log
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/options/1/")
                    .respond(500, {"error": "a"});

                spyOn(log, "warn");
                ctrl("option_edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(scope.option).toBe(undefined);
                expect(log.warn).toHaveBeenCalled();
            });

            it("should save updated option", function () {
                inject(["mfl.common.forms.changes",
                    function (formChanges) {
                        var scope = rootScope.$new();
                        var data = {
                            "$stateParams": {
                                option_id: 1
                            },
                            "$state": state,
                            "$scope": scope,
                            "mfl.common.forms.changes": formChanges
                        };
                        httpBackend
                            .expectGET(server_url + "api/facilities/options/1/")
                            .respond(200, {});

                        spyOn(formChanges, "whatChanged").andReturn({"name": "get"});
                        spyOn(state, "go");
                        ctrl("option_edit", data);

                        httpBackend.flush();
                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();

                        httpBackend.resetExpectations();

                        httpBackend
                            .expectPATCH(
                                server_url + "api/facilities/options/1/",
                                {"name": "get"})
                            .respond(200, {});
                        scope.save();

                        httpBackend.flush();
                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();
                        expect(formChanges.whatChanged).toHaveBeenCalled();
                        expect(state.go).toHaveBeenCalled();
                    }
                ]);
            });

            it("should not save if option is not updated", function () {
                inject(["mfl.common.forms.changes",
                    function (formChanges) {
                        var scope = rootScope.$new();
                        var data = {
                            "$stateParams": {
                                option_id: 1
                            },
                            "$state": state,
                            "$scope": scope,
                            "mfl.common.forms.changes": formChanges
                        };
                        httpBackend
                            .expectGET(server_url + "api/facilities/options/1/")
                            .respond(200, {});

                        spyOn(formChanges, "whatChanged").andReturn({});
                        spyOn(state, "go");
                        ctrl("option_edit", data);

                        httpBackend.flush();
                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();

                        httpBackend.resetExpectations();

                        scope.save();

                        httpBackend.verifyNoOutstandingRequest();
                        httpBackend.verifyNoOutstandingExpectation();
                        expect(formChanges.whatChanged).toHaveBeenCalled();
                        expect(state.go).not.toHaveBeenCalled();
                    }
                ]);
            });
        });

        describe("Test option edit controller delete function", function () {
            it("should delete the option", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        option_id: 1
                    },
                    "$state": state,
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/options/1/")
                    .respond(200, {});

                spyOn(state, "go");
                ctrl("option_edit", data);

                httpBackend
                    .expectDELETE(server_url + "api/facilities/options/1/")
                    .respond(204, {});
                scope.remove();
                scope.cancel();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalledWith("service_mgmt.option_list.option_edit");
            });
            it("should show error when deleting the option", function () {
                var scope = rootScope.$new();
                var data = {
                    "$stateParams": {
                        option_id: 1
                    },
                    "$state": state,
                    "$scope": scope
                };
                httpBackend
                    .expectGET(server_url + "api/facilities/options/1/")
                    .respond(200, {});
                spyOn(state, "go");
                spyOn(log, "warn");
                ctrl("option_edit", data);

                httpBackend
                    .expectDELETE(server_url + "api/facilities/options/1/")
                    .respond(404, {});
                scope.remove();
                scope.cancel();
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalledWith("service_mgmt.option_list.option_edit");
            });
        });

        describe("Test option create controller", function () {

            it("should create the option", function () {
                var scope = rootScope.$new();
                var data = {
                    "$state": state,
                    "$scope": scope
                };

                spyOn(state, "go");
                ctrl("option_create", data);

                scope.option = {
                    "name": "get"
                };
                httpBackend.expectGET(server_url +
                    "api/facilities/option_groups/?page_size=1000")
                    .respond(200, {});
                httpBackend
                    .expectPOST(server_url + "api/facilities/options/", {"name": "get"})
                    .respond(200, {});

                scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalled();
            });
            it("should create the option and fail to load groups",function () {
                var scope = rootScope.$new();
                var data = {
                    "$state": state,
                    "$scope": scope
                };

                spyOn(state, "go");
                ctrl("option_create", data);

                scope.option = {
                    "name": "get"
                };
                httpBackend.expectGET(server_url +
                    "api/facilities/option_groups/?page_size=1000")
                    .respond(500, {});
                httpBackend
                    .expectPOST(server_url + "api/facilities/options/", {"name": "get"})
                    .respond(200, {});

                scope.save();

                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();

                expect(state.go).toHaveBeenCalled();
            });
        });
    });

})();
