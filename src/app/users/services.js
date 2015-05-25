"use strict";

angular.module("mfl.users.wrapper", ["sil.api.wrapper"])

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

    .provider("usersApi", function(){
        var self = this;
        self.baseUrl = "api/users/";
        this.$get = ["api","rolesApi", "permissionsApi",  function(api,rolesApi, permissionsApi){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl),
                roles: rolesApi.api,
                permissions: permissionsApi.api
            };
        }];
    })

    .provider("contact_typeApi", function () {
        var self = this;
        self.baseUrl = "api/common/contact_types/";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    })

    .provider("user_contactsApi", function () {
        var self = this;
        self.baseUrl = "api/common/user_contacts/";
        this.$get = ["api", function(api){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl)
            };
        }];
    })

    .provider("contactsApi", function () {
        var self = this;
        self.baseUrl = "api/common/contacts/";
        this.$get = ["api", "contact_typeApi","user_contactsApi",
        function(api, contactTypeApi, userContactsApi){
            return {
                baseUrl: self.baseUrl,
                api: api.setBaseUrl(this.baseUrl),
                contactType: contactTypeApi.api,
                userContacts: userContactsApi.api
            };
        }];
    });
