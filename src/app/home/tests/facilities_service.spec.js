"use strict";
(function () {
    describe("Home facilities tests: ", function () {
        var url;
        beforeEach(function () {
            module("mflApp");
            module("mfl.common.providers");
            module("mfl.home.services");
        });
        beforeEach(inject(["mfl.common.providers.requests",
            function (requests) {
                url = requests.api_url;
            }
        ]));
        it("Home services should be defined", inject(["mfl.home.services.home",
            function (homeService) {
                expect(homeService).toBeDefined();
            }
        ]));
        it("Should have all functions defined",
            inject(["mfl.home.services.home", function (homeService) {
                expect(homeService.getLatestFacilities).toBeDefined();
                expect(
                    angular.isFunction(
                        homeService.getLatestFacilities)).toBeTruthy();
            }
        ]));
        it("should make a http call to api and get data",
            inject(["mfl.home.services.home", "$httpBackend",
            function (homeService, $httpBackend) {
                var test_data = [
                    {
                        "facility_type": "567430bf-097b-41dc-8d05-fbac2cdf3e",
                        "operation_status": "3a866ac1-a07c-4724-b32f-a87292799221",
                        "ward": "3972dcd1-91ab-4158-9828-6ab4440015eb",
                        "owner": "f2aa926c-2b9e-48de-903c-36652b78ed0c"
                    },
                    {
                        "facility_type": "567430bf-097b-41dc-8d05-fbac2cdf3e",
                        "operation_status": "3a866ac1-a07c-4724-b32f-a87292799221",
                        "ward": "3972dcd1-91ab-4158-9828-6ab4440015eb",
                        "owner": "f2aa926c-2b9e-48de-903c-36652b78ed0c"
                    },
                    {
                        "facility_type": "567430bf-097b-41dc-8d05-fbac2cdf3e",
                        "operation_status": "3a866ac1-a07c-4724-b32f-a87292799221",
                        "ward": "3972dcd1-91ab-4158-9828-6ab4440015eb",
                        "owner": "f2aa926c-2b9e-48de-903c-36652b78ed0c"
                    },
                    {
                        "facility_type": "567430bf-097b-41dc-8d05-fbac2cdf3e",
                        "operation_status": "3a866ac1-a07c-4724-b32f-a87292799221",
                        "ward": "3972dcd1-91ab-4158-9828-6ab4440015eb",
                        "owner": "f2aa926c-2b9e-48de-903c-36652b78ed0c"
                    }
                ];
                var test_response = JSON.stringify(test_data);
                $httpBackend.expect(
                    "GET",
                    url +
                    "api/facilities/facilities/?page_size=4").respond(
                    200, test_response);
                var response = homeService.getLatestFacilities();
                response.then(function (data) {
                    expect(data.data).toEqual(test_data);
                });
                $httpBackend.flush();
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            }
        ]));
    });
})();
