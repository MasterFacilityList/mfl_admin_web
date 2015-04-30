"use strict";

angular.module("mfl.services.services", [])

    .service("mfl.services.services.services", [
        "mfl.common.providers.requests",
        function (requests) {

            var url = {
                services : "api/facilities/services/",
                categories : "api/facilities/service_categories/"
            };

            this.getServices = function () {
                return requests.callApi("GET", url.services);
            };
            this.getOneService = function (id) {
                return requests.callApi("GET", url.services + id + "/");
            };
            this.getServiceCategories = function () {
                return requests.callApi("GET", url.categories);
            };
            this.createService = function (service) {
                return requests.callApi("POST", url.services, service);
            };
        }
    ]);
