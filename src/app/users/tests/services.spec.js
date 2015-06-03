(function () {
    "use strict";

    describe("Test user module services", function () {
        beforeEach(function(){
            module("mflAdminAppConfig");
            module("sil.api.wrapper");
            module("mfl.users.services");
        });

        describe("Test api wrappers", function() {

            it("should have wrappers defined", function() {
                inject(["mfl.users.services.wrappers",function(wrappers){
                    expect(wrappers.groups.apiBaseUrl).toEqual("api/users/groups/");
                    expect(wrappers.users.apiBaseUrl).toEqual("api/users/");
                    expect(wrappers.permissions.apiBaseUrl).toEqual("api/users/permissions/");
                    expect(wrappers.groups.apiBaseUrl).toEqual("api/users/groups/");
                    expect(wrappers.contact_types.apiBaseUrl).toEqual("api/common/contact_types/");
                    expect(wrappers.user_contacts.apiBaseUrl).toEqual("api/common/user_contacts/");
                    expect(wrappers.contacts.apiBaseUrl).toEqual("api/common/contacts/");
                }]);

            });
        });

        describe("Test profile service", function () {
            var httpBackend, profileService, server_url;

            beforeEach(function () {
                inject(["$httpBackend", "mfl.users.services.profile", "SERVER_URL",
                    function ($httpBackend, profileservice, url) {
                        httpBackend = $httpBackend;
                        profileService = profileservice;
                        server_url = url;
                    }
                ]);
            });

            it("should fetch current user information", function () {
                httpBackend
                    .expectGET(server_url+"api/rest-auth/user/")
                    .respond(200, {});

                profileService.getProfile()
                    .success(function (data) {
                        expect(data).toEqual({});
                    });

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

            });

            it("should update current user information", function () {
                httpBackend
                    .expectPATCH(server_url+"api/rest-auth/user/", "ASD")
                    .respond(200, {});

                profileService.updateProfile("ASD")
                    .success(function (data) {
                        expect(data).toEqual({});
                    });

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

            });

            it("should update current user's password", function () {
                httpBackend
                    .expectPOST(server_url+"api/rest-auth/password/change/", {
                        "new_password1": "a",
                        "new_password2": "b"
                    })
                    .respond(200, {});

                profileService.updatePassword("a", "b")
                    .success(function (data) {
                        expect(data).toEqual({});
                    });

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

            });
        });
    });

})();
