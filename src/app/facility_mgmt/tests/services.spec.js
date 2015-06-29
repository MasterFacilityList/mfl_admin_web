(function () {
    "use strict";

    describe("Test facility_mgmt module services", function () {
        beforeEach(function(){
            module("mflAdminAppConfig");
            module("api.wrapper");
            module("mfl.facility_mgmt.services");
        });

        describe("Test api wrappers", function() {

            it("should have wrappers defined", function() {
                inject(["mfl.facility_mgmt.services.wrappers",function(wrappers){
                    expect(wrappers.facilities.apiBaseUrl)
                        .toEqual("api/facilities/facilities_list/");
                }]);
            });
            it("should have facility officers wrapper defined", function() {
                inject(["mfl.facility_mgmt.services.wrappers",function(wrappers){
                    expect(wrappers.officers.apiBaseUrl)
                        .toEqual("api/facilities/officers/");
                }]);
            });
        });
    });

})();
