(function(_){
    "use strict";
    describe("county controllers test suite", function(){
        var createController, $scope, $stateParams, $httpBackend, $state, reportsApi;
        var SERVER_URL;

        beforeEach(function(){
            module("mflAdminApp");
            inject(["$rootScope", "$controller", "$stateParams", "$httpBackend","$state",
                    "mfl.reports.services.wrappers","mfl.common.forms.changes",
                    "SERVER_URL",
                   function($rootScope, $controller,_$stateParams,
                    _$httpBackend, _$state, _reportsApi, frm, _SERVER_URL){
                $scope = $rootScope.$new();
                SERVER_URL = _SERVER_URL;
                $httpBackend = _$httpBackend;
                $stateParams = _$stateParams;
                $state = _$state;
                reportsApi = _reportsApi;
                var data = {
                    $scope: $scope
                };
                createController = function(name, params){
                    return $controller("mfl.reports.controller.updowngrade."+name,
                    _.extend(data, params));

                };
            }]);
        });

        afterEach(function(){
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("should have `mfl.reports.controller.updowngrade.list` defined",
           function(){
                var ctrl = createController("list", {});
                expect(ctrl).toBeDefined();
            });
        it("should have `mfl.reports.controller.updowngrade.view` defined",
           function(){
                var ctrl = createController("view", {});
                expect(ctrl).toBeDefined();
            });
        it("should have load list view of counties with success",
            inject(["$rootScope",function($rootScope){
                var data = {
                    "$scope": $rootScope.$new()
                };
                $httpBackend.expectGET(SERVER_URL+"api/reporting/upgrades_downgrades/")
                .respond(200);
                createController("list",data);
                $httpBackend.flush();
            }])
        );
        it("should have load list view of counties but fail",
            inject(["$rootScope",function($rootScope){
                var data = {
                    "$scope": $rootScope.$new()
                };
                $httpBackend.expectGET(SERVER_URL+"api/reporting/upgrades_downgrades/")
                .respond(500);
                createController("list",data);
                $httpBackend.flush();
            }])
        );
        it("should have load detailed view of county with success",
            inject(["$rootScope",function($rootScope){
                var data = {
                    "$scope": $rootScope.$new(),
                    "$stateParams":{county_id:1}
                };
                $httpBackend.expectGET(SERVER_URL+"api/reporting/upgrades_downgrades/?county=1")
                .respond(200);
                data.$scope.upgrades={upgrades:true};
                data.$scope.recent={last_week:true};
                createController("view",data);
                $httpBackend.flush();
            }])
        );
        it("should have load detailed view of county but fail",
            inject(["$rootScope",function($rootScope){
                var data = {
                    "$scope": $rootScope.$new(),
                    "$stateParams":{county_id:1}
                };
                $httpBackend.expectGET(SERVER_URL+"api/reporting/upgrades_downgrades/?county=1")
                .respond(500);
                createController("view",data);
                $httpBackend.flush();
            }])
        );
        it("should have called filter from ui and done a successful call",
            inject(["$rootScope",function($rootScope){
                var data = {
                    "$scope": $rootScope.$new()
                };
                $httpBackend.expectGET(SERVER_URL+"api/reporting/upgrades_downgrades/")
                .respond(200);
                createController("list",data);
                $httpBackend.flush();
                $httpBackend.expectGET(SERVER_URL+"api/reporting/upgrades_downgrades/"+
                "?fields=county,changes,county_id").respond(200);
                data.$scope.search_changes();
                $httpBackend.flush();
                
            }])
        );
        it("should have called filter from ui but did a call that failed",
            inject(["$rootScope",function($rootScope){
                var data = {
                    "$scope": $rootScope.$new(),
                    "$stateParams":{county_id:1}
                };
                $httpBackend.expectGET(SERVER_URL+"api/reporting/upgrades_downgrades/")
                .respond(200);
                createController("list",data);
                data.$scope.search_changes();
                $httpBackend.expectGET(SERVER_URL+"api/reporting/upgrades_downgrades/"+
                "?fields=county,changes,county_id").respond(500);
                $httpBackend.flush();
            }])
        );
    });
})(window._);
