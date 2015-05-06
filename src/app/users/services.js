"use strict";

angular.module("mfl.users.wrapper", ["sil.api.wrapper"])

    .provider("usersApi", function(){
        var self = this;
        self.baseUrl = "api/users/";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    })

    .provider("rolesApi", function () {
        var self = this;
        self.baseUrl = "api/users/groups/";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    })

    .provider("permissionsApi", function () {
        var self = this;
        self.baseUrl = "api/users/permissions/";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    })

    .service("mfl.users.services.uses", ["mfl.common.providers.requests",
    function (requests) {
        var url = {
            users : "api/v1/users"
        };
        this.getUsersBackend = function () {
            return requests.callApi("GET", url.users);
        };
    }]);
