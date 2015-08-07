(function () {

    "use strict";

    describe("Reports test for base controller", function () {
        var ctrl, rootScope, state, server_url, httpBackend;
        beforeEach(function () {
            module("mflAdminAppConfig");
            module("mfl.auth.services");
            module("mfl.reports.controllers");
            module("ui.router");
            inject(["$controller", "$rootScope", "$state", "$httpBackend", "SERVER_URL",
                function ($controller, $rootScope, $state, $httpBackend, SU) {
                    httpBackend = $httpBackend;
                    server_url = SU;
                    rootScope = $rootScope;
                    state = $state;
                    ctrl = function (name, data) {
                        return $controller("mfl.reports.controllers."+name, data);
                    };
                }]
            );
        });

        it("should test header controller", function () {
            inject([
                function () {
                    var tooltip = {
                        "title":"tooltip",
                        "checked":false
                    };
                    var data = {
                        "$scope": rootScope.$new()
                    };
                    httpBackend
                        .expectGET(server_url+"api/common/filtering_summaries/" +
                                   "?fields=county,facility_type,constituency," +
                                   "ward,operation_status,service_category," +
                                   "owner_type,owner,service,keph_level")
                        .respond(200, {});
                    ctrl("facilities", data);

                    httpBackend.flush();
                    httpBackend.verifyNoOutstandingRequest();
                    httpBackend.verifyNoOutstandingExpectation();
                    expect(data.$scope.tooltip).toEqual(tooltip);

                }
            ]);
        });

        it("should load filter summaries", function () {
            var data = {
                "$scope": rootScope.$new()
            };

            httpBackend
                .expectGET(server_url+"api/common/filtering_summaries/" +
                           "?fields=county,facility_type,constituency," +
                           "ward,operation_status,service_category," +
                           "owner_type,owner,service,keph_level")
                .respond(200, {});

            ctrl("facilities", data);

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            expect(data.$scope.filter_summaries).toEqual({});
        });

        it("should update filters from params", function () {
            var data = {
                "$scope": rootScope.$new(),
                "$state": state,
                "$stateParams": {
                    "name": "ASD",
                    "number_of_cots": "34",
                    "open_weekends": "true",
                    "open_whole_day": "false",
                    "open_public_holidays": "jksd",
                    "county": "1,2",
                    "constituency": "11,31,42",
                    "ward": "111,231"
                }
            };

            httpBackend
                .expectGET(server_url+"api/common/filtering_summaries/" +
                           "?fields=county,facility_type,constituency," +
                           "ward,operation_status,service_category," +
                           "owner_type,owner,service,keph_level")
                .respond(200, {
                    county: [{"id": "1"}, {"id": "2"}, {"id": "3"}],
                    constituency: [
                        {"id": "11", "county": "1"},
                        {"id": "12", "county": "1"},
                        {"id": "31", "county": "3"}
                    ],
                    ward: [
                        {"id": "111", "constituency": "11"},
                        {"id": "311", "constituency": "31"},
                        {"id": "231", "constituency": "23"}
                    ]
                });

            spyOn(state, "go");
            ctrl("facilities", data);

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            expect(data.$scope.filters.single.name).toEqual("ASD");
            expect(data.$scope.filters.single.number_of_cots).toEqual("34");
            expect(data.$scope.filters.single.open_weekends).toEqual("true");
            expect(data.$scope.filters.single.open_whole_day).toEqual("false");
            expect(data.$scope.filters.single.open_public_holidays).toEqual("jksd");

            expect(data.$scope.filters.multiple.county)
                .toEqual([{"id": "1"}, {"id": "2"}, {"id": "3"}]);
            expect(data.$scope.filters.multiple.constituency)
                .toEqual([{"id": "11","county": "1"}, {"id": "31","county": "3"}]);
            expect(data.$scope.filters.multiple.ward)
                .toEqual([{"id":"111","constituency":"11"}, {"id":"231","constituency":"23"}]);
        });

        it("should clear bool filters", function () {
            var data = {
                "$scope": rootScope.$new(),
                "$state": state
            };

            httpBackend
                .expectGET(server_url+"api/common/filtering_summaries/" +
                           "?fields=county,facility_type,constituency," +
                           "ward,operation_status,service_category," +
                           "owner_type,owner,service,keph_level")
                .respond(200, {});

            spyOn(state, "go");
            ctrl("facilities", data);

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            data.$scope.filters.single.open_public_holidays = "true";
            data.$scope.bool_clear();
            expect(data.$scope.filters.single.open_public_holidays).toEqual("");
        });

        it("should filter facilities", function () {
            var data = {
                "$scope": rootScope.$new(),
                "$state": state
            };

            httpBackend
                .expectGET(server_url+"api/common/filtering_summaries/" +
                           "?fields=county,facility_type,constituency," +
                           "ward,operation_status,service_category," +
                           "owner_type,owner,service,keph_level")
                .respond(200, {});

            spyOn(state, "go");
            ctrl("facilities", data);

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            data.$scope.filters.multiple.county = [
                {"id": "3"}
            ];
            data.$scope.filterFacilities();
            expect(state.go).toHaveBeenCalled();
            expect(state.go.calls[0].args[0]).toEqual("reports.list");
            expect(state.go.calls[0].args[1].county).toEqual("3");
        });

        it("should clear filter facilities", function () {
            var data = {
                "$scope": rootScope.$new(),
                "$state": state
            };

            httpBackend
                .expectGET(server_url+"api/common/filtering_summaries/" +
                           "?fields=county,facility_type,constituency," +
                           "ward,operation_status,service_category," +
                           "owner_type,owner,service,keph_level")
                .respond(200, {});

            spyOn(state, "go");
            ctrl("facilities", data);

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            data.$scope.filters.multiple.county = [
                {"id": "3"}
            ];
            data.$scope.clearFilters();
            expect(state.go).toHaveBeenCalledWith("reports.list", {});
        });
        it("should filter facilities", function () {
            var data = {
                "$scope": rootScope.$new(),
                "$state": state
            };

            httpBackend
                .expectGET(server_url+"api/common/filtering_summaries/" +
                           "?fields=county,facility_type,constituency," +
                           "ward,operation_status,service_category," +
                           "owner_type,owner,service,keph_level")
                .respond(200, {});

            spyOn(state, "go");
            ctrl("facilities", data);

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            data.$scope.filters.multiple.county = [
                {"id": "3"}
            ];
            data.$scope.filterFacilities();
            expect(state.go).toHaveBeenCalled();
            expect(state.go.calls[0].args[0]).toEqual("reports.list");
            expect(state.go.calls[0].args[1].county).toEqual("3");
        });

        it("should clear filter facilities", function () {
            var data = {
                "$scope": rootScope.$new(),
                "$state": state
            };

            httpBackend
                .expectGET(server_url+"api/common/filtering_summaries/" +
                           "?fields=county,facility_type,constituency," +
                           "ward,operation_status,service_category," +
                           "owner_type,owner,service,keph_level")
                .respond(200, {});

            spyOn(state, "go");
            ctrl("facilities", data);

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            data.$scope.filters.multiple.county = [
                {"id": "3"}
            ];
            data.$scope.clearFilters();
            expect(state.go).toHaveBeenCalledWith("reports.list", {});
        });

        it("should filter lists", function () {
            var data = {
                "$scope": rootScope.$new(),
                "$state": state
            };

            httpBackend
                .expectGET(server_url+"api/common/filtering_summaries/" +
                           "?fields=county,facility_type,constituency," +
                           "ward,operation_status,service_category," +
                           "owner_type,owner,service,keph_level")
                .respond(200, {});

            spyOn(state, "go");
            ctrl("facilities", data);

            httpBackend.flush();
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();

            data.$scope.filters.multiple.county = [
                {"id": "1"}, {"id": "2"}
            ];
            data.$scope.filters.multiple.constituency = [
                {"id": "1", "county": "1"}, {"id": "2", "county": "1"},
                {"id": "3", "county": "2"}, {"id": "4", "county": "3"}
            ];

            data.$scope.filters.multiple.ward = [
                {"id": "1", "constituency": "1"}, {"id": "2", "constituency": "1"},
                {"id": "3", "constituency": "2"}, {"id": "4", "constituency": "3"}
            ];

            expect(
                data.$scope.filterFxns.constFilter({"id": "1", "county": "1"})
            ).toBe(true);
            expect(
                data.$scope.filterFxns.constFilter({"id": "3", "county": "2"})
            ).toBe(true);
            expect(
                data.$scope.filterFxns.constFilter({"id": "4", "county": "3"})
            ).toBe(false);

            expect(
                data.$scope.filterFxns.wardFilter({"id": "1", "constituency": "1"})
            ).toBe(true);
            expect(
                data.$scope.filterFxns.wardFilter({"id": "3", "constituency": "2"})
            ).toBe(true);
            expect(
                data.$scope.filterFxns.wardFilter({"id": "4", "constituency": "5"})
            ).toBe(false);

            expect(
                data.$scope.filterFxns.ownerFilter({"id": "1", "owner_type": "1"})
            ).toBe(true);
            expect(
                data.$scope.filterFxns.ownerFilter({"id": "2", "owner_type": "2"})
            ).toBe(true);
            expect(
                data.$scope.filterFxns.ownerFilter({"id": "3", "owner_type": "3"})
            ).toBe(true);

            data.$scope.filters.multiple.owner_type = [
                {"id": "1"}, {"id": "2"}
            ];
            expect(
                data.$scope.filterFxns.ownerFilter({"id": "1", "owner_type": "1"})
            ).toBe(true);
            expect(
                data.$scope.filterFxns.ownerFilter({"id": "2", "owner_type": "2"})
            ).toBe(true);
            expect(
                data.$scope.filterFxns.ownerFilter({"id": "3", "owner_type": "3"})
            ).toBe(false);

            expect(
                data.$scope.filterFxns.serviceFilter({"id": "1", "category": "1"})
            ).toBe(true);
            expect(
                data.$scope.filterFxns.serviceFilter({"id": "2", "category": "2"})
            ).toBe(true);
            expect(
                data.$scope.filterFxns.serviceFilter({"id": "3", "category": "3"})
            ).toBe(true);

            data.$scope.filters.multiple.service_category = [
                {"id": "1"}, {"id": "2"}
            ];
            expect(
                data.$scope.filterFxns.serviceFilter({"id": "1", "category": "1"})
            ).toBe(true);
            expect(
                data.$scope.filterFxns.serviceFilter({"id": "2", "category": "2"})
            ).toBe(true);
            expect(
                data.$scope.filterFxns.serviceFilter({"id": "3", "category": "3"})
            ).toBe(false);
        });
    });
})();
