(function(angular){
    "use strict";

    angular.module("mfl.notifications", [
        "mfl.notifications.controllers",
        "mfl.notifications.services",
        "mfl.notifications.states",
        "ui.select",
        "angular-toasty",
        "textAngular"
    ]);

})(window.angular);
