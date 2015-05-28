(function () {
    "use strict";

    xdescribe("Test category controllers", function () {

        beforeEach(function () {
            module("mflApp");
        });

        it("should show category a category", function () {
            inject(["$controller", "mfl.service_mgmt.wrappers", "$httpBackend", "SERVER_URL",
                function ($controller, wrappers, $httpBackend, server_url) {
                    var data = {
                        "$scope": {},
                        "$stateParams": {"category_id": 3},
                        "$log": {},
                        "mfl.service_mgmt.wrappers": wrappers
                    };
                    $httpBackend.expectGET(server_url).respond(200, {"results": {"data": 2}});

                    $controller("mfl.service_mgmt.controllers.category_view", data);

                    $httpBackend.flush();
                    $httpBackend.verifyNoOutstandingRequest();
                    $httpBackend.verifyNoOutstandingExpectation();

                    expect(data.scope).toEqual({"data": 2});

                }
            ]);
        });

        xit("should show error on category list fetch fail", function () {
            inject(["mfl.service_mgmt.wrappers", "$httpBackend",
                function (wrappers, $httpBackend) {
                    var data = {
                        "$scope": {},
                        "$log": {},
                        "mfl.service_mgmt.wrappers": wrappers
                    };
                    $httpBackend.expect("GET", "http://").respond(500, {"error": "server down"});
                    controller("mfl.service_mgmt.controllers.category_list", data);
                    $httpBackend.flush();
                    expect(data.error).toEqual({"error": "server down"});
                }
            ]);
        });
    });

})();
