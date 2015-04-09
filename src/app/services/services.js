"use strict";

angular.module("mfl.services.services", [])

.service("mfl.services.services.services", ["mfl.common.providers.requests",
        function (requests) {
        var url = {
            services: "api/v1/services"
        };

        this.getServicesBackend = function () {
            return requests.callApi("GET", url.services);
        };

        this.getServices = function () {
            var services = {
                results: [
                    {
                        id: "1",
                        code: "MFL001",
                        name: "HIV Prevention Services",
                        category: "HIV/AIDS Treatment",
                        description: "Provider Initiated Counselling and Testing",
                        status: "Available"
                    },
                    {
                        id: "2",
                        code: "MFL002",
                        name: "Immunization",
                        category: "Immunization",
                        description: "Basic immunization",
                        status: "Available"
                    },
                    {
                        id: "3",
                        code: "MFL003",
                        name: "Antinatal Care",
                        category: "Antenatal",
                        description: "Focused antenatal care",
                        status: "Available"
                    }
                ]
            };
            return services;
        };
    }]);