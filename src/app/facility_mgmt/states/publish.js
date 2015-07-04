(function (angular) {
    "use strict";

    angular.module("mfl.facility_mgmt.states.publish", [
        "ui.router"
    ])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state("facilities.facility_edit.publish", {
            url: "publish/",
            views: {
                "tab-header@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/publish.tabheaders.tpl.html"
                },
                "publish@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/facility_publish.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_publish"
                }
            }
        });
    }]);

})(angular);
