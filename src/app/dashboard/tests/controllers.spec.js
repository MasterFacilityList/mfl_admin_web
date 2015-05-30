(function () {

    describe("Test dashboard controllers ", function () {

        beforeEach(function () {
            module("mfl.dashboard.controllers");
        });

        describe("Test dashboard home controller", function () {

            it("should assign title and breadcrumbs", function () {
                inject(["$controller", "$rootScope", function ($controller, $rootScope) {
                    var data =  {
                        "$scope": $rootScope.$new()
                    };
                    $controller("mfl.dashboard.home", data);
                    expect(angular.isObject(data.$scope.path)).toBe(true);
                    expect(angular.isObject(data.$scope.title)).toBe(true);
                }]);
            });
        });

        describe("Test dashboard content controller", function () {

            beforeEach(function () {
                module("mflAdminAppConfig");
                module("mfl.dashboard.wrapper");
            });

            it("should fetch dashboard info from backend", function () {
                inject(["$controller", "$rootScope", "$httpBackend", "SERVER_URL",
                    function ($controller, $rootScope, $httpBackend, SERVER_URL) {
                        var data = {
                            "$scope": $rootScope.$new()
                        };
                        var payload = {
                            "constituencies_summary": [],
                            "county_summary": [
                                {
                                    "count": 784,
                                    "name": "NAIROBI"
                                }
                            ],
                            "owner_types": [
                                {
                                    "count": 0,
                                    "name": "Other"
                                }
                            ],
                            "owners_summary": [
                                {
                                    "count": 5,
                                    "name": "State Coorporation"
                                }
                            ],
                            "recently_created": 8361,
                            "status_summary": [
                                {
                                    "count": 0,
                                    "name": "Facility_Gazette_By_ID"
                                }
                            ],
                            "total_facilities": 8361,
                            "types_summary": [
                                {
                                    "count": 119,
                                    "name": "District Hospital"
                                }
                            ]
                        };
                        $httpBackend
                            .expectGET(SERVER_URL + "api/facilities/dashboard/")
                            .respond(200, payload);

                        $controller("mfl.dashboard.content", data);

                        $httpBackend.flush();
                        $httpBackend.verifyNoOutstandingRequest();
                        $httpBackend.verifyNoOutstandingExpectation();

                        expect(data.$scope.summary).toEqual(payload);
                        expect(data.$scope.loading).toBe(false);
                    }
                ]);
            });

            it("should show error on fail to fetch dashboard info from backend", function () {
                inject(["$controller", "$rootScope", "$httpBackend", "SERVER_URL",
                    function ($controller, $rootScope, $httpBackend, SERVER_URL) {
                        var data = {
                            "$scope": $rootScope.$new()
                        };
                        $httpBackend
                            .expectGET(SERVER_URL + "api/facilities/dashboard/")
                            .respond(500, {"error": "a"});

                        $controller("mfl.dashboard.content", data);

                        $httpBackend.flush();
                        $httpBackend.verifyNoOutstandingRequest();
                        $httpBackend.verifyNoOutstandingExpectation();

                        expect(angular.isUndefined(data.$scope.summary)).toEqual(true);
                        expect(data.$scope.loading).toBe(false);
                        expect(data.$scope.chart_err).toEqual("a");
                    }
                ]);
            });
        });
    });

})();
