(function (angular) {
    "use strict";

    angular.module("mfl.service_mgmt.services", [
        "mfl.service_mgmt.forms"
    ])

    .service("mfl.service_mgmt.services.services",
        ["mfl.common.providers.requests", function (rq) {
        var url = "api/facilities/services/";

        this.getServices = function () {
            return rq.callApi("GET", url);
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
    }])

    .service("mfl.service_mgmt.services.categories",
        ["mfl.common.providers.requests", function (rq) {

        var url = "api/facilities/service_categories/";

        this.getCategories = function () {
            return rq.callApi("GET", url);
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
    }]);

})(angular);
