"use strict";

angular.module("mfl.chus.services", [])

.service("mfl.chus.services.chus", ["mfl.common.providers.requests",
        function (requests) {
        var url = {
            chus: "api/v1/chu"
        };

        this.getChusBackend = function () {
            return requests.callApi("GET", url.services);
        };

        this.getChus = function () {
            var chus = {
                results: [
                    {
                        id: "1",
                        code: "CHU001",
                        name: "Siakago East",
                        community: "Siakago",
                        facility: "Siakago Clinic",
                        status: "Available"
                    },
                    {
                        id: "2",
                        code: "CHU002",
                        name: "Runyenjes West",
                        community: "Runyenjes",
                        facility: "Embu Medical Training College",
                        status: "Available"
                    },
                    {
                        id: "3",
                        code: "CHU003",
                        name: "Gachoka",
                        community: "Gachoka",
                        facility: "Focused antenatal care",
                        status: "Available"
                    }
                ]
            };
            return chus;
        };
    }]);