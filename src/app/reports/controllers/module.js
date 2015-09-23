(function (angular) {
    "use strict";

    angular.module("mfl.reports.controllers", [
        "mfl.reports.controllers.base",
        "mfl.reports.controllers.facilities",
        "mfl.reports.controllers.facility_reporting",
        "mfl.reports.controllers.chu_reporting",
        "mfl.reports.updowngrades.controllers",
        "ui.bootstrap.buttons"
    ]);

})(window.angular);
