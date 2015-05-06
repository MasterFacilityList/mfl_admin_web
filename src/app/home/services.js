"use strict";

angular.module("mfl.home.services", [])

    .service("mfl.home.services.home", ["mfl.common.providers.requests",
        function (requests) {
            var url = {
                facilities : "api/facilities/facilities/"
            };
            this.getLatestFacilities = function () {
                var param = [
                    {
                        name : "page_size",
                        value : 4
                    }
                ];
                return requests.callApi("GET", url.facilities, param);
            };
        }
    ]);
