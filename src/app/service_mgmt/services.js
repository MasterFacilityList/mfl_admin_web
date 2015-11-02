(function (angular) {
    "use strict";

    /*
     * @ngdoc module
     *
     * @name mfl.service_mgmt.services
     *
     * @description
     * Module containing services used in service management app
     */
    angular.module("mfl.service_mgmt.services", [
        "api.wrapper"
    ])

    /*
     * @ngdoc service
     *
     * @name mfl.service_mgmt.wrappers
     *
     * @description
     * Module containing api wrappers used in service management app
     */
    .service("mfl.service_mgmt.wrappers", ["api", function (api) {

        this.services = api.setBaseUrl("api/facilities/services/");

        this.categories = api.setBaseUrl("api/facilities/service_categories/");

        this.options = api.setBaseUrl("api/facilities/options/");

        this.option_groups = api.setBaseUrl("api/facilities/option_groups/");

        this.create_option_group = api.setBaseUrl("api/facilities/"+
            "option_group_with_options/");

        this.service_options = api.setBaseUrl("api/facilities/service_options/");

        this.OPTION_TYPES = [
            "BOOLEAN", "INTEGER", "DECIMAL", "TEXT"
        ];

        /*
         *
         * @name newCategory
         *
         * @description
         * Creates a new object representing a category
         *
         * @returns {Object} - Object representing a category
         */
        this.newCategory = function () {
            return {
                "name": "",
                "description": "",
                "abbreviation": ""
            };
        };

        /*
         *
         * @name newService
         *
         * @description
         * Creates a new object representing a service
         *
         * @returns {Object} - Object representing a service
         */
        this.newService = function () {
            return {
                "name": "",
                "description": "",
                "abbreviation": "",
                "category": ""
            };
        };

        /*
         *
         * @name newOption
         *
         * @description
         * Creates a new object representing an option
         *
         * @returns {Object} - Object representing an option
         */
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
