(function () {

    "use strict";

    describe("Test setup admin api service", function () {
        var oauth2, upload;

        beforeEach(function () {
            module("mfl.setup.api");
            module("mflAdminAppConfig");

            inject(["Upload", "api.oauth2", function (u, o) {
                oauth2 = o;
                upload = u;
                spyOn(oauth2, "getToken").andReturn({
                    "access_token": "123",
                    "token_type": "Bearer"
                });
                spyOn(upload, "upload");
            }]);
        });

        it("should upload a file as a creation", function () {
            inject(["adminApi", function (adminApi) {
                adminApi.uploadFile("/test/url/", {}, "asd", {"A": "B"}, false);
                expect(upload.upload).toHaveBeenCalled();
            }]);
        });

        it("should upload a file as an update", function () {
            inject(["adminApi", function (adminApi) {
                adminApi.uploadFile("/test/url/", {}, "asd", undefined, true);
                expect(upload.upload).toHaveBeenCalled();
            }]);
        });
    });
})();
