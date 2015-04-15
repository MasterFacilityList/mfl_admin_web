"use strict";

angular.module("mfl.admin_units.services", [])

    .service("mfl.admin_units.service.admin_units", ["mfl.common.providers.requests",
        function (requests) {
            var url = {
                adminunits : "api/v1/admin_units"
            };
            this.getAdminUnitsBackend = function () {
                return requests.callApi("GET", url.admin_units);
            };
            this.getAdminUnits = function () {
                var admin_units = {
                    results : [
                        {
                            id: "1",
                            code : "FA001",
                            name : "Sio kimao",
                            coordinates : "81.00, 97.012",
                            date_created: "15/04/2015",
                            description : "It is located in Kiambu county"+
                                            " no idea subcounty"
                        },
                        {
                            id: "2",
                            code : "FA002",
                            name : "Kiambu county",
                            coordinates : "103.7732, 44.0987",
                            date_created: "15/04/2015",
                            description : "Its @central province"+
                                            " area 254 Kenya"
                        }
                    ]
                };
                return admin_units;
            };
        }]);
