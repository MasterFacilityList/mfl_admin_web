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
            var httpBackend, profileService, server_url, rootScope;

            beforeEach(function () {
                inject(["$httpBackend", "$rootScope", "mfl.users.services.profile", "SERVER_URL",
                    function ($httpBackend, $rootScope, profileservice, url) {
                        httpBackend = $httpBackend;
                        profileService = profileservice;
                        server_url = url;
                        rootScope = $rootScope;
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
                        "old_password": "b",
                        "new_password1": "a",
                        "new_password2": "a"
                    })
                    .respond(200, {});

                profileService.updatePassword("b", "a", "a")
                    .success(function (data) {
                        expect(data).toEqual({});
                    });

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
            });

            it("should reject password change request if they don't match", function () {
                profileService.updatePassword("c", "a", "b")
                    .then(null, function (data) {
                        expect(data).toEqual({
                            "detail": "The two passwords do not match"
                        });
                    });

                rootScope.$apply();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

            });

            it("should reject password change request if new and old passwords match", function () {
                profileService.updatePassword("a", "a", "a")
                    .then(null, function (data) {
                        expect(data).toEqual({
                            "detail": "The current password is the same as the old password"
                        });
                    });

                rootScope.$apply();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

            });
        });
    });

})();
