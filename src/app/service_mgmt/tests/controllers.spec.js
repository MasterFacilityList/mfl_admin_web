(function () {
    "use strict";

    describe("Test service listing controllers :", function () {
        var controller, scope, server_url;

        beforeEach(function () {
            module("mflApp");
            module("mfl.settings");
            module("mfl.common.providers.requests");
            module("mfl.service_mgmt.services");
            module("mfl.service_mgmt.controllers");

            inject(
                ["$rootScope", "$log", "$controller", "mfl.service_mgmt.services.services",
                function (rs, lg, cnt, svcs) {
                    server_url = "http://localhost:8061/";
                    scope = rs.$new();
                    var data = {
                        "scope": scope,
                        "$log": lg,
                        "mfl.service_mgmt.services.services": svcs
                    };
                    controller = function () {
                        return data; // cnt("mfl.service_mgmt.controllers.service_list", data);
                    };
                }
            ]);
        });

        it("should define services scope variable", function () {
            inject(["$httpBackend", function ($httpBackend) {
                var payload = {
                    count: 1,
                    next: null,
                    previous: null,
                    results: [
                        {
                            "id": "4686812f-10a9-45e4-9096-2b8fc5dfcf3e",
                            "created": "2015-05-07T10:14:09.580059Z",
                            "updated": "2015-05-07T10:14:09.580074Z",
                            "deleted": false,
                            "active": true,
                            "search": null,
                            "name": "Family Planning",
                            "description": null,
                            "abbreviation": null,
                            "created_by": 1,
                            "updated_by": 1
                        }
                    ]
                };
                $httpBackend
                    .expect("GET", server_url + "api/facilities/services/")
                    .respond(200, payload);
                controller();
                $httpBackend.flush();
                expect(scope.services).hasOwnProperty("services");
                expect(scope.services).toEqual(payload.results);
            }]);
        });

        it("should make me smile", function () {
            expect(true).toBe(true);
        });
    });

})();
