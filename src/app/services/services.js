"use strict";

angular.module("mfl.services.services", [])

    .service("mfl.services.services.services",  ["mfl.common.providers.requests",
        function (requests) {

            var url = {
                services : "api/v1/services"
            };

            this.getServicesBackend = function () {
                return requests.callApi("GET", url.services);
            };
            this.getServices = function () {
                var services = {
                    results : [
                        {
                            id: "1",
                            code : "FS001",
                            name : "Scanning",
                            category : "MEDICAL",
                            description : "Facilities specialized in offers xray &"+
                                            " radiology services"
                        },
                        {
                            id: "2",
                            code : "FS002",
                            name : "Physiotherapy",
                            category : "MEDICAL",
                            description : "Facilities physical therapy to"+
                                            " injured individuals"
                        }
                    ]
                };
                return services;
            };
        }]);
