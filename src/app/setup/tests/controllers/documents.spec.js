(function () {
    "use strict";

    describe("Test documents controllers", function () {
        var rootScope, state, ctrl;

        beforeEach(function() {
            module("mfl.setup.controllers.documents");
            module("mflAdminAppConfig");
            inject(["$rootScope", "$state", "$controller",
                function ($rootScope, $state, $controller) {
                    rootScope = $rootScope;
                    state = $state;
                    ctrl = function (name, data) {
                        return $controller("mfl.setup.controllers.documents."+name, data);
                    };
                }
            ]);
        });

        describe("test list controller", function () {

            it("should define items", function () {
                var data = {
                    "$scope": rootScope.$new()
                };
                ctrl("list", data);
                expect(data.$scope.filters.fields).toBeDefined();
                expect(data.$scope.title).toBeDefined();
            });
        });

        describe("edit controller", function () {
            var httpBackend, server_url;

            beforeEach(function () {
                inject(["$httpBackend", "SERVER_URL", function ($httpBackend, SERVER_URL) {
                    httpBackend = $httpBackend;
                    server_url = SERVER_URL;
                }]);
            });

            afterEach(function (){
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.verifyNoOutstandingExpectation();
            });

            it("should not document load on create", function () {
                var data = {
                    "$scope": rootScope.$new()
                };
                ctrl("edit", data);
            });

            it("should load document on edit", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {"document_id": "3"}
                };

                httpBackend.expectGET(server_url+"api/common/documents/3/")
                .respond(200, {"id": 3, "name": "n", "description": "d"});

                ctrl("edit", data);
                httpBackend.flush();
                expect(data.$scope.document.id).toEqual(3);
                expect(data.$scope.document.name).toEqual("n");
                expect(data.$scope.document.description).toEqual("d");
            });

            it("should handle fail to load document on edit", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {"document_id": "3"}
                };
                ctrl("edit", data);

                httpBackend.expectGET(server_url+"api/common/documents/3/")
                .respond(500, {"a": ["b"]});
                httpBackend.flush();

                expect(data.$scope.errors).toEqual({"a": ["b"]});
            });

            it("should create a document", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$window": {
                        "$": jasmine.createSpy().andReturn([
                            {"files": [{"name":"test.txt", "size": 10240}]}
                        ])
                    },
                    "adminApi": {
                        "uploadFile": jasmine.createSpy().andReturn({
                            "then": function () {arguments[0]();}
                        }),
                        "documents": {
                            "makeUrl": jasmine.createSpy().andReturn("/test/url/")
                        }
                    },
                    "$state": {
                        "go": jasmine.createSpy()
                    }
                };
                ctrl("edit", data);
                data.$scope.document.name = "name";
                data.$scope.document.description = "description";
                var frm = {
                    "fyl": {
                        "$name": "fyl"
                    }
                };
                data.$scope.save(frm);

                expect(data.$state.go).toHaveBeenCalledWith("setup.documents");
                expect(data.adminApi.uploadFile).toHaveBeenCalledWith(
                    "/test/url/", {"name":"test.txt", "size": 10240}, "fyl",
                    {"name": "name", "description": "description"}, false
                );
            });

            it("should not create a document if file is not set", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$window": {
                        "$": jasmine.createSpy().andReturn([
                            {"files": []}
                        ])
                    },
                    "adminApi": {
                        "uploadFile": jasmine.createSpy().andReturn({
                            "then": window.angular.noop // function () {arguments[0]();}
                        }),
                        "documents": {
                            "makeUrl": jasmine.createSpy().andReturn("/test/url/")
                        }
                    },
                    "$state": {
                        "go": jasmine.createSpy()
                    }
                };
                ctrl("edit", data);
                data.$scope.document.name = "name";
                data.$scope.document.description = "description";
                var frm = {
                    "fyl": {
                        "$name": "fyl"
                    }
                };
                data.$scope.save(frm);
                expect(data.$state.go).not.toHaveBeenCalled();
                expect(data.adminApi.uploadFile).not.toHaveBeenCalled();
            });

            it("should update a document", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$window": {
                        "$": jasmine.createSpy().andReturn([
                            {"files": [{"name":"test.txt", "size": 10240}]}
                        ])
                    },
                    "adminApi": {
                        "uploadFile": jasmine.createSpy().andReturn({
                            "then": function () {arguments[0]();}
                        }),
                        "documents": {
                            "makeUrl": jasmine.createSpy().andReturn("/test/url/"),
                            "get": jasmine.createSpy().andReturn({
                                "then": function () {
                                    arguments[0]({
                                        "data": {"id": 3, "name": "a", "description": "d"}
                                    });
                                }
                            })
                        }
                    },
                    "$state": {
                        "go": jasmine.createSpy()
                    },
                    "$stateParams": {"document_id": 3}
                };
                ctrl("edit", data);
                data.$scope.document.name = "name";
                data.$scope.document.description = "description";
                var frm = {
                    "fyl": {
                        "$name": "fyl"
                    }
                };
                data.$scope.save(frm);

                expect(data.$state.go).toHaveBeenCalledWith("setup.documents");
                expect(data.adminApi.uploadFile).toHaveBeenCalledWith(
                    "/test/url/3/", {"name":"test.txt", "size": 10240}, "fyl",
                    {"name": "name", "description": "description"}, true
                );
            });

            it("should perform json update if file is not set", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$window": {
                        "$": jasmine.createSpy().andReturn([{"files": []}])
                    },
                    "adminApi": {
                        "uploadFile": jasmine.createSpy(),
                        "documents": {
                            "makeUrl": jasmine.createSpy().andReturn("/test/url/"),
                            "get": jasmine.createSpy().andReturn({
                                "then": function () {
                                    arguments[0]({"data":
                                        {"id": 3, "name": "a", "description": "d"}
                                    });
                                }
                            }),
                            "update": jasmine.createSpy().andReturn({
                                "then": function () { arguments[0](); }
                            })
                        }
                    },
                    "$state": {
                        "go": jasmine.createSpy()
                    },
                    "$stateParams": {"document_id": 3}
                };
                ctrl("edit", data);
                data.$scope.document.name = "name";
                data.$scope.document.description = "description";
                var frm = {
                    "fyl": {
                        "$name": "fyl"
                    }
                };
                data.$scope.save(frm);

                expect(data.adminApi.documents.update).toHaveBeenCalledWith(
                    3, {"name": "name", "description": "description"}
                );
                expect(data.$state.go).toHaveBeenCalledWith("setup.documents");
                expect(data.adminApi.uploadFile).not.toHaveBeenCalled();
            });

            it("should cancel deletion prompt", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$state": {"go": jasmine.createSpy()},
                    "$stateParams": {"document_id": 3}
                };

                httpBackend.expectGET(server_url+"api/common/documents/3/")
                .respond(200, {"id": 3, "name": "n", "description": "d"});

                ctrl("edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();

                expect(data.$scope.document.id).toEqual(3);
                data.$scope.cancel();

                expect(data.$state.go).toHaveBeenCalledWith(
                    "setup.documents.edit", {"document_id": 3}
                );
            });

            it("should delete a document", function () {
                var data = {
                    "$scope": rootScope.$new(),
                    "$stateParams": {"document_id": "3"},
                    "$state": {"go": jasmine.createSpy()}
                };

                httpBackend.expectGET(server_url+"api/common/documents/3/")
                .respond(200, {"id": 3, "name": "n", "description": "d"});

                ctrl("edit", data);

                httpBackend.flush();
                httpBackend.verifyNoOutstandingExpectation();
                httpBackend.verifyNoOutstandingRequest();
                httpBackend.resetExpectations();

                httpBackend.expectDELETE(server_url+"api/common/documents/3/")
                .respond(204);
                data.$scope.remove();
                httpBackend.flush();
                expect(data.$state.go).toHaveBeenCalledWith("setup.documents");
            });

            it("should validate file size", function () {
                var data = {
                    "$scope": rootScope.$new()
                };
                ctrl("edit", data);
                var el = {"$name": "ooo"};
                var f = {"size": 0};
                data.$scope.fileUpdated(el, f);
                expect(Array.isArray(data.$scope.errors.ooo)).toBe(true);

                f = {"size": 1024*1024*1024};
                data.$scope.fileUpdated(el, f);
                expect(Array.isArray(data.$scope.errors.ooo)).toBe(true);
            });

            it("should update document if file input is changed", function () {
                var data = {
                    "$scope": rootScope.$new()
                };
                ctrl("edit", data);
                var el = {};
                var f = {};
                data.$scope.fileUpdated(el, f);

                expect(data.$scope.document.file).toEqual(f);
            });
        });
    });
})(window.angular);
