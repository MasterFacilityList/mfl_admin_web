(function () {
    "use strict";

    describe("Home facilities tests: ", function () {
        var api_wrapper;

        beforeEach(function () {
            module("mflApp");
            module("mflAppConfig");
            module("sil.api.wrapper");
            module("mfl.home.services");
        });

        beforeEach(function () {
            inject(["api", function (api) {
                api_wrapper = api;
            }]);
        });

        it("Should have all functions defined",
            inject(["mfl.home.services.home", function (homeService) {
                expect(homeService.getLatestFacilities).toBeDefined();
                expect(
                    angular.isFunction(
                        homeService.getLatestFacilities)).toBeTruthy();
            }
        ]));

        it("should make a http call to api and get data", function () {
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
            var mock_api_wrapper = {
                filter: angular.noop
            };
            spyOn(api_wrapper, "setBaseUrl").andReturn(mock_api_wrapper);
            spyOn(mock_api_wrapper, "filter").andReturn(test_data);

            inject(["mfl.home.services.home", function (homeService) {
                var response = homeService.getLatestFacilities();
                expect(api_wrapper.setBaseUrl).toHaveBeenCalledWith("api/facilities/facilities/");
                expect(mock_api_wrapper.filter).toHaveBeenCalledWith({"page_size": 4});
                expect(response).toEqual(test_data);
            }]);
        });
    });
})();
