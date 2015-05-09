(function (angular) {
    "use strict";

    angular.module("mfl.service_mgmt.services", [
        "mfl.service_mgmt.forms",
        "sil.api.wrapper"
    ])

    .service("mfl.service_mgmt.wrappers", ["api", function (api) {
        this.services = api.setBaseUrl("api/facilities/services/");
        this.categories = api.setBaseUrl("api/facilities/service_categories/");
        this.options = api.setBaseUrl("api/facilities/options/");
        this.OPTION_TYPES = [
            "BOOLEAN", "INTEGER", "DECIMAL", "TEXT"
        ];
    }])

    .service("mfl.service_mgmt.services.services",
        ["mfl.common.providers.requests", function (rq) {
        var url = "api/facilities/services/";

        this.getServices = function () {
            return rq.callApi(
                "GET", url  + (get_all===true ? "?page_size=1000" : "")
            );
        };

        this.getService = function (service_id) {
            return rq.callApi("GET", url + service_id + "/");
        };

        this.createService = function (data) {
            return rq.callApi("POST", url, data);
        };

        this.updateService = function (service_id, data) {
            return rq.callApi("PATCH", url + service_id + "/", data);
        };

        this.deleteService = function (service_id) {
            return rq.callApi("DELETE", url + service_id + "/");
        };

        this.newService = function () {
            return {
                "name": "",
                "description": "",
                "abbreviation": "",
                "category": ""
            };
        };

    }])

    .service("mfl.service_mgmt.services.categories",
        ["mfl.common.providers.requests", function (rq) {

        var url = "api/facilities/service_categories/";

        this.getCategories = function (get_all) {
            return rq.callApi(
                "GET", url + (get_all===true ? "?page_size=1000" : "")
            );
        };

        this.getCategory = function (category_id) {
            return rq.callApi("GET", url + category_id + "/");
        };

        this.createCategory = function (data) {
            return rq.callApi("POST", url, data);
        };

        this.newCategory = function () {
            return {
                "name": "",
                "description": "",
                "abbreviation": ""
            };
        };

        this.updateCategory = function (category_id, data) {
            return rq.callApi("PATCH", url + category_id + "/", data);
        };

        this.deleteCategory = function (category_id) {
            return rq.callApi("DELETE", url + category_id + "/");
        };
    }])

    .service("mfl.service_mgmt.services.options",
        ["mfl.common.providers.requests", function (rq) {
            var url = "api/facilities/options/";

            this.OPTION_TYPES = [
                "BOOLEAN", "INTEGER", "DECIMAL", "TEXT"
            ];

            this.newOption = function () {
                return {
                    "value": "",
                    "display_text": "",
                    "is_exclusive_option": false,
                    "option_type": ""
                };
            };

            this.createOption = function (data) {
                return rq.callApi("POST", url, data);
            };

            this.getOptions = function (get_all) {
                return rq.callApi(
                    "GET", url + (get_all===true ? "?page_size=1000" : "")
                );
            };

            this.getOption = function (option_id) {
                return rq.callApi("GET", url + option_id + "/");
            };

            this.updateOption = function (option_id, data) {
                return rq.callApi("PATCH", url + option_id + "/", data);
            };

            this.deleteOption = function (option_id) {
                return rq.callApi("DELETE", url + option_id + "/");
            };
        }]);

})(angular);
