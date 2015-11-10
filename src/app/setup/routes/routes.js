(function(angular){
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.setup.routes
     *
     * @description
     * Contains the modules used for setup routes
     */
    angular.module("mfl.setup.routes",[
        "mfl.setup.routes.constituencies",
        "mfl.setup.routes.counties",
        "mfl.setup.routes.sub_counties",
        "mfl.setup.routes.dashboard",
        "mfl.setup.routes.keph",
        "mfl.setup.routes.towns",
        "mfl.setup.routes.wards",
        "mfl.setup.routes.contacts",
        "mfl.setup.routes.facilities",
        "mfl.setup.routes.chu",
        "mfl.setup.routes.gis",
        "mfl.setup.routes.documents"
    ]);
})(window.angular);
