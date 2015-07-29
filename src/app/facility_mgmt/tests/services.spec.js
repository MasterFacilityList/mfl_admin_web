(function () {
    "use strict";

    describe("Test facility_mgmt module services", function () {
        beforeEach(function(){
            module("mflAdminAppConfig");
            module("api.wrapper");
            module("mfl.facility_mgmt.services");
            module("mfl.auth.oauth2");
        });

        describe("Test api wrappers", function() {
            var $window;

            beforeEach(module(["$provide", function($provide){
                $window = { location: {href: ""}, localStorage: window.localStorage };
                $provide.value("$window", $window);
            }]));

            beforeEach(inject(["api.oauth2", function(oauth2){
                spyOn(oauth2, "getToken").andReturn({access_token: "123"});
            }]));

            it("should have wrappers defined", function() {
                inject(["mfl.facility_mgmt.services.wrappers",function(wrappers){
                    expect(wrappers.facilities.apiBaseUrl)
                        .toEqual("api/facilities/facilities/");
                }]);
            });
            it("should have facility officers wrapper defined", function() {
                inject(["mfl.facility_mgmt.services.wrappers",function(wrappers){
                    expect(wrappers.officers.apiBaseUrl)
                        .toEqual("api/facilities/officers/");
                }]);
            });
            it("should print cover report", function () {
                inject(["mfl.facility_mgmt.services.wrappers", "SERVER_URL",
                    function(wrappers, server_url){
                        wrappers.printFacility("456");
                        expect($window.location.href).toEqual(
                            server_url+"api/facilities/facility_cover_report/456/?access_token=123"
                        );
                    }
                ]);
            });
        });
    });

})();
