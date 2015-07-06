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
                    templateUrl: "facility_mgmt/tpls/facility_publish.tabheaders.tpl.html"
                },
                "publish@facilities.facility_edit": {
                    templateUrl: "facility_mgmt/tpls/facility_publish.tpl.html",
                    controller: "mfl.facility_mgmt.controllers.facility_publish"
                }
            },
            userFeature: "is_national",
            permission: "facilities.publish_facilities"
        });
    }]);

})(angular);
