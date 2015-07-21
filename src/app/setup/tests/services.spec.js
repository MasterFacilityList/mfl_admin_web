(function () {
    "use strict";

    describe("Test user module services", function () {
        beforeEach(function(){
            module("mflAdminAppConfig");
            module("api.wrapper");
            module("mfl.setup.api");
            module("mfl.auth.services");
        });

        describe("Test setup api wrappers", function() {
            it("should test 'which state service'", function () {
                inject(["currentStateOpen",function (stateSrv) {
                    expect(stateSrv.whichTab).toBeDefined();
                }]);
            });
            it("should expect counties branch to be used as a state",
            function () {
                inject(["currentStateOpen","$state",
                function (stateSrv,$state) {
                    $state.current.name = "counties";
                    expect(stateSrv.whichTab).toBeDefined();
                    stateSrv.whichTab();
                }]);
            });
            it("should expect chul branch to be used as a state",
            function () {
                inject(["currentStateOpen","$state",
                function (stateSrv,$state) {
                    $state.current.name = "chu_";
                    expect(stateSrv.whichTab).toBeDefined();
                    stateSrv.whichTab();
                }]);
            });
            it("should expect chul branch to be used as a state",
            function () {
                inject(["currentStateOpen","$state",
                function (stateSrv,$state) {
                    $state.current.name = "chu_";
                    expect(stateSrv.whichTab).toBeDefined();
                    stateSrv.whichTab();
                }]);
            });
            it("should expect facility branch to be used as a state",
            function () {
                inject(["currentStateOpen","$state",
                function (stateSrv,$state) {
                    $state.current.name = "facility_";
                    expect(stateSrv.whichTab).toBeDefined();
                    stateSrv.whichTab();
                }]);
            });
            it("should expect contact branch to be used as a state",
            function () {
                inject(["currentStateOpen","$state",
                function (stateSrv,$state) {
                    $state.current.name = "contact";
                    expect(stateSrv.whichTab).toBeDefined();
                    stateSrv.whichTab();
                }]);
            });
            it("should expect geocode branch to be used as a state",
            function () {
                inject(["currentStateOpen","$state",
                function (stateSrv,$state) {
                    $state.current.name = "geocode_";
                    expect(stateSrv.whichTab).toBeDefined();
                    stateSrv.whichTab();
                }]);
            });
            it("should expect service branch to be used as a state",
            function () {
                inject(["currentStateOpen","$state",
                function (stateSrv,$state) {
                    $state.current.name = "service_mgmt";
                    expect(stateSrv.whichTab).toBeDefined();
                    stateSrv.whichTab();
                }]);
            });
        });
    });

})();
