(function (angular) {
    "use strict";

    angular.module("mfl.service_mgmt.services", [
        "api.wrapper"
    ])

    .service("mfl.service_mgmt.wrappers", ["api", function (api) {
        this.services = api.setBaseUrl("api/facilities/services/");

        this.categories = api.setBaseUrl("api/facilities/service_categories/");

        this.options = api.setBaseUrl("api/facilities/options/");

        this.option_groups = api.setBaseUrl("api/facilities/option_groups/");

        this.service_options = api.setBaseUrl("api/facilities/service_options/");

        this.OPTION_TYPES = [
            "BOOLEAN", "INTEGER", "DECIMAL", "TEXT"
        ];

        this.newCategory = function () {
            return {
                "name": "",
                "description": "",
                "abbreviation": ""
            };
        };

        this.newService = function () {
            return {
                "name": "",
                "description": "",
                "abbreviation": "",
                "category": ""
            };
        };

        this.newOption = function () {
            return {
                "value": "",
                "display_text": "",
                "is_exclusive_option": false,
                "option_type": ""
            };
        };
    }]);

})(window.angular, window._);
