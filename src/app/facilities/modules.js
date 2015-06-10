(function(angular){
        "use strict";
        angular.module("mfl.facilities", [
            "mfl.facilities.services",
            "mfl.facilities.routes",
            "mfl.facilities.controllers"
        ]).run(["acuteSelectService", function(acuteSelectService){
            acuteSelectService.updateSetting(
                "templatePath", "/assets/tpls/");
            acuteSelectService.updateSetting("comboMode",true);
            acuteSelectService.updateSetting("loadOnOpen", true);
            acuteSelectService.updateSetting("minWidth", "300px");

        }]);
    })(angular);

