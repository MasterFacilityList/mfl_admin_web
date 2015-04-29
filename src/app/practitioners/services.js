"use strict";

angular.module("mfl.practitioners.services", [])

.service("mfl.practitioners.services.practitioners", ["mfl.common.providers.requests",
        function (requests) {
        var url = {
            practitioners: "api/facilities/practitioners/"
        };

        this.getPractitioners = function () {
            return requests.callApi("GET", url.practitioners);
        };
    }]);