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
                        name : "Cobra Mweusi",
                        role: "County Officer"
                    },
                    {
                        id: "2",
                        code : "US002",
                        name : "Jolly Giant",
                        role: "Subcounty officer"
                    }
                ]
            };
            return users;
        };
    }]);
