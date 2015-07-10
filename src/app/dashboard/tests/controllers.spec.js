(function (angular) {

    "use strict";

    describe("Test dashboard controllers ", function () {

        beforeEach(function () {
            module("mfl.dashboard.controllers");
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
                                    "name": "OTHER"
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
                                    "name": "FACILITY GAZETTE BY ID"
                                }
                            ],
                            "total_facilities": 8361,
                            "types_summary": [
                                {
                                    "count": 119,
                                    "name": "DISTRICT HOSPITAL"
                                }
                            ]
                        };
                        $httpBackend
                            .expectGET(SERVER_URL + "api/facilities/dashboard/")
                            .respond(200, payload);

                        $controller("mfl.dashboard.content", data);

                        //testing calling

                        $httpBackend.flush();
                        $httpBackend.verifyNoOutstandingRequest();
                        $httpBackend.verifyNoOutstandingExpectation();

                        expect(data.$scope.summary).toEqual(payload);
                        expect(data.$scope.loading).toBe(false);
                    }
                ]);
            });

            it("should fetch dashboard info with constituency data", function () {
                inject(["$controller", "$rootScope", "$httpBackend", "SERVER_URL",
                    function ($controller, $rootScope, $httpBackend, SERVER_URL) {
                        var data = {
                            "$scope": $rootScope.$new()
                        };
                        var payload = {
                            "constituencies_summary": [
                                {
                                    "count" : 256,
                                    "name" : "MOMBASA"
                                }
                            ],
                            "county_summary": [],
                            "owner_types": [
                                {
                                    "count": 0,
                                    "name": "OTHER"
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
                                    "name": "FACILITY GAZETTE BY ID"
                                }
                            ],
                            "total_facilities": 8361,
                            "types_summary": [
                                {
                                    "count": 119,
                                    "name": "DISTRICT HOSPITAL"
                                }
                            ]
                        };
                        $httpBackend
                            .expectGET(SERVER_URL + "api/facilities/dashboard/")
                            .respond(200, payload);

                        $controller("mfl.dashboard.content", data);

                        //testing calling

                        $httpBackend.flush();
                        $httpBackend.verifyNoOutstandingRequest();
                        $httpBackend.verifyNoOutstandingExpectation();

                        expect(data.$scope.summary).toEqual(payload);
                        expect(data.$scope.loading).toBe(false);
                    }
                ]);
            });

            it("should fetch dashboard info with ward data", function () {
                inject(["$controller", "$rootScope", "$httpBackend", "SERVER_URL",
                    function ($controller, $rootScope, $httpBackend, SERVER_URL) {
                        var data = {
                            "$scope": $rootScope.$new()
                        };
                        var payload = {
                            "wards_summary" : [],
                            "constituencies_summary": [],
                            "county_summary": [],
                            "owner_types": [
                                {
                                    "count": 0,
                                    "name": "OTHER"
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
                                    "name": "FACILITY GAZETTE BY ID"
                                }
                            ],
                            "total_facilities": 8361,
                            "types_summary": [
                                {
                                    "count": 119,
                                    "name": "DISTRICT HOSPITAL"
                                }
                            ]
                        };
                        $httpBackend
                            .expectGET(SERVER_URL + "api/facilities/dashboard/")
                            .respond(200, payload);

                        $controller("mfl.dashboard.content", data);

                        //testing calling

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
})(angular);
