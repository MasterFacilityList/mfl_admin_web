"use strict";
(function(){
    describe("Contacts tests suite", function(){
        var httpBackend, contactsApi, SERVER_URL;
        beforeEach(function(){
            module("mflApp");
            module("mflAppConfig");
            module("mfl.users.wrapper");
            inject(["contactsApi",function(_contactsApi){
                contactsApi = _contactsApi;
            }]);
            inject(["$httpBackend", "SERVER_URL", function($httpBackend, url){
                httpBackend = $httpBackend;
                SERVER_URL = url;
            }]);
        });

        it("should have userApi defined", function(){
            expect(contactsApi).toBeDefined();
        });

        it("should fetch contacts", function(){
            var data = {"name": "created"};
            httpBackend.expectGET(
                SERVER_URL+"api/common/contacts/").respond(200, data);
            var response = contactsApi.api.list();
            response.success(function(data){
                expect(data).toEqual(data);
            });
            httpBackend.flush();
        });
    });
})();
