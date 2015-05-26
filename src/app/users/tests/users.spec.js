"use strict";
(function(){
    describe("Users tests", function(){
        var httpBackend, userService;
        beforeEach(function(){
            module("mflApp");
            module("mfl.users.wrapper");
            inject(["usersApi",function(_userService){
                userService = _userService;
            }]);
            inject(["$httpBackend", function($httpBackend){
                httpBackend = $httpBackend;
            }]);
        });

        it("should have userApi defined", function(){
            expect(userService).toBeDefined();
        });
    });
})();

