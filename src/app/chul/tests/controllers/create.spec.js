(function () {
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

            it("should test create controller", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state
                };
                state.params = {unit_id : "1"};
                ctrl(".create_chul", data);
                data.$scope.unit = {
                    facility : "2",
                    facility_name : "Antony",
                    facility_county : "",
                    facility_subcounty : "",
                    facility_ward : ""
                };
                data.$scope.select_values = {
                    facility : {id : "", name : ""}
                };
                var rslt = data.$scope.unit;
                httpBackend
                    .expectGET(server_url+"api/chul/units/1/")
                    .respond(200, rslt);
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test failure to get CU", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state
                };
                state.params = {unit_id : "1"};
                ctrl(".create_chul", data);
                httpBackend
                    .expectGET(server_url+"api/chul/units/1/")
                    .respond(500, {});
                httpBackend.flush();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });
            it("should test functions of create controller", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state
                };
                spyOn(state, "go");
                state.params = {unit_id : ""};
                ctrl(".create_chul", data);
                data.$scope.nextState();
                var obj = {name : "basic",active : false,furthest : true};
                data.$scope.tabState(obj);
            });
            it("should test tabState function else part ", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": state
                };
                spyOn(state, "go");
                state.params = {unit_id : ""};
                ctrl(".create_chul", data);
                data.$scope.nextState();
                var obj = {name : "basic",active : false,furthest : false,
                    done: false};
                data.$scope.tabState(obj);
            });
        });
    });
})();
