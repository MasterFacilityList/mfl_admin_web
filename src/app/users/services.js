"use strict";

angular.module("mfl.users.services", [])

    .service("mfl.users.services.uses", ["mfl.common.providers.requests",
    function (requests) {
        var url = {
            users : "api/v1/users"
        };
        this.getUsersBackend = function () {
            return requests.callApi("GET", url.users);
        };
        this.getUsers = function () {
            var users = {
                results : [
                    {
                        id: "1",
                        code : "US001",
                        name : "Brian Marika",
                        role: "County Officer",
                        date_created: "15/04/2015"
                    },
                    {
                        id: "2",
                        code : "US002",
                        name : "Antony Sunday",
                        role: "Subcounty officer",
                        date_created: "15/04/2015"
                    }
                ]
            };
            return users;
        };
    }]);
