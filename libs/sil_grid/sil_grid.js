(function(angular, _){
    "use strict";

    var PAGINATION_TPL = "sil.grid.pagination.tpl.html";
    var SEARCH_TPL = "sil.grid.search.tpl.html";

    angular.module("sil.grid",[
            PAGINATION_TPL,
            SEARCH_TPL,
            "ui.bootstrap.modal"
        ]
    )
    .provider("silGridConfig", function() {
        this.apiMaps = {};
        this.appConfig = "mflAdminAppConfig";
        this.itemsPerPage = 30;
        this.$get = [function(){
            return {
                apiMaps: this.apiMaps,
                appConfig: this.appConfig,
                bp: this.bp,
                itemsPerPage: this.itemsPerPage
            };
        }];
    })
    .directive("silGridPagination", [function(){
        return {
            require: "^silGrid",
            restrict: "EA",
            templateUrl: PAGINATION_TPL
        };
    }])
    .directive("silGrid",["$parse","$rootScope","$modal", "$injector", "silGridConfig",
               function($parse, $rootScope, $modal, $injector, silGridConfig){
        return {
            restrict: "EA",
            scope: {
                filters:"=?filters",
                gridFor: "@",
                data: "@",
                error: "=?error",
                actions: "=?actions",
                apiKey: "@",
                showLoader: "@"
            },
            replace: false,
            templateUrl:function(elem, attrs){
                return attrs.template;
            },
            controller: ["$scope", function($scope) {
                var self = this;
                $scope.pagination = {};
                var apiMaps = silGridConfig.apiMaps;
                if(!_.has(apiMaps, $scope.gridFor)){
                    throw "Must specify the grid for";
                }
                var api_conf = apiMaps[$scope.gridFor];
                var api = $injector.get(api_conf[1]);

                if(!_.isUndefined($scope.apiKey)) {
                        self.api = api[$scope.apiKey];
                }else{
                    self.api = api.api;
                }
                self.setLoading = function(start){
                    if(start){
                        $scope.$emit("silGrid.loader.start");
                    }else{
                        $scope.$emit("silGrid.loader.stop");
                    }
                };
                self.getData = function() {
                    self.setLoading(true);
                    var promise;
                    if(_.isEmpty($scope.filters)) {
                        promise = self.api.list();
                    } else {
                        var raw_filters = $scope.filters;
                        //transform search param into a query DSL
                        if(self.api.apiBaseUrl === "api/facilities/facilities/" && !_.isEmpty($scope.filters.search)){
                            var dsl = {
                                "query": { }
                            };
                            if(_.isNaN(parseInt($scope.filters.search, 10))){
                                dsl.query.query_string = {
                                    "default_field": "name",
                                    "query": $scope.filters.search
                                };
                            } else {
                                dsl.query.term = {
                                    "code": $scope.filters.search
                                };
                            }
                            raw_filters.search = JSON.stringify(dsl);
                        }

                        promise = self.api.filter(raw_filters);
                    }
                    promise.success(self.setData).error(self.setError);
                };

                self.setData = function(data) {
                    self.setLoading(false);
                    if(_.has(data, "results")) {
                        $scope[$scope.data] = data.results;
                        $scope.pagination.active = true;
                        $scope.pagination.page_count = data.total_pages;
                        $scope.pagination.next_page = data.next ? data.current_page + 1 : null;
                        $scope.pagination.prev_page = data.previous ? data.current_page - 1 : null;
                        $scope.pagination.current_page = data.current_page;
                        $scope.pagination.start_index = data.start_index;
                        $scope.pagination.end_index = data.end_index;
                        $scope.pagination.count = data.count;
                    } else {
                        $scope[$scope.data] = data;
                        $scope.pagination.active = false;
                    }
                };

                self.showError = function(error) {
                    return {
                        title: "Error",
                        type:"danger",
                        msg: error.error
                    };
                };
                self.setError = function(error){
                    self.setLoading(false);
                    $scope.error = self.showError(error);
                };

                var initFilters = function(){
                    if(_.isUndefined($scope.filters)){
                        $scope.filters = {};
                    }
                };
                self.addFilter = function(name, value){
                    initFilters();
                    $scope.filters[name] = value;
                    if(_.has($scope.filters, "page")){
                        $scope.dump = {page: $scope.filters.page};
                        $scope["q_dump"+name] = {page: $scope.filters.page};
                        delete $scope.filters.page;
                    }
                };
                self.removeFilter = function(name){
                    if(_.has($scope.filters, name)){
                        delete $scope.filters[name];
                        if(_.has($scope.dump, "page")){
                            if(name === "q_dump"+name){
                                $scope.filters.page = $scope["q_dump"+name].page;
                            }else{
                                $scope.filters.page = $scope.dump.page;
                            }

                        }
                    }
                };
                $scope.getData = self.getData;
                $scope.setLoading = self.setLoading;
                $scope.paginate = function(page_count){
                    if(_.isUndefined($scope.filters)){
                        $scope.filters = {};
                    }
                    $scope.filters.page = page_count;

                    $scope.getData();
                };
                if(_.isUndefined($scope.filters)){
                    $scope.filters = {};
                }
            }],
            link: function(scope){
                scope.$watch("filters", function(){
                    scope.getData();
                });
                $rootScope.$on("silGrid.data.refresh", function(event){
                    event.stopPropagation();
                    scope.getData();
                });
                _.each(scope.actions, function(action){
                    scope[action.name] = $parse(action.actionFunction);
                });
                var modal;
                $rootScope.$on("silGrid.loader.start", function(event){
                    if(_.isUndefined(scope.showLoader)){
                        modal = $modal.open(
                        {
                            template:"<div>"+
                                    "<div class='modal-body'>Loading "+
                                    "<span><i class='fa fa-spinner fa-spin'></i></span>"+
                                    "<div class='panel-loader'>"+
                                    "<div class='loader-container'>"+
                                        "<div class='loader-spinner'></div>"+
                                    "</div>"+
                                    "</div>"+
                            "</div></div>",
                            backdrop: "static",
                            keyboard: false,
                            size: "sm",
                            windowClass: "sil-grid-loader"
                        });
                    }
                    event.stopPropagation();
                });

                $rootScope.$on("silGrid.loader.stop", function(event){
                    try{
                        modal.close();
                    }catch(err){}
                    event.stopPropagation();
                });
            }
        };
    }])

    .directive("silGridSearch", function(){
        return {
            restrict: "EA",
            require: "^silGrid",
            templateUrl: SEARCH_TPL,
            controller: function(){},
            link: function(scope, elem, attrs, gridCtrl){
                scope.silGrid = {searchQuery:""};
                // var search_term = scope.silGrid.searchQuery;

                scope.silGridSearch = function(clear){

                    if(clear){
                        scope.silGrid.searchQuery = "";
                        gridCtrl.removeFilter("search");
                        gridCtrl.getData();

                    } else {
                           // transform search param into a query DSL
                        // if(gridCtrl.api.apiBaseUrl === "api/facilities/facilities/"){
                        //     var dsl = {
                        //         "query": { }
                        //     };
                        //     if (_.isNaN(parseInt(scope.silGrid.searchQuery, 10))) {
                        //         dsl.query.query_string = {
                        //             "default_field": "name",
                        //             "query": scope.silGrid.searchQuery
                        //         };
                        //     } else {
                        //         dsl.query.term = {
                        //             "code": scope.silGrid.searchQuery
                        //         };
                        //     }

                        //     scope.silGrid.searchQuery = JSON.stringify(dsl);
                        // }

                        gridCtrl.addFilter("search", scope.silGrid.searchQuery);
                        gridCtrl.getData();
                        // scope.silGrid.searchQuery = search_term;
                    }

                };
            }
        };
    })

    .directive("silGridKeyPress", function () {
        return {
            restrict: "A",
            require: "^silGridSearch",
            link: function(scope, element){
                element.bind("keydown keypress", function (event) {
                //enter key press
                if(event.which === 13) {
                    if((scope.silGrid.searchQuery.length) < 3){
                        scope.$apply(function (){
                        });
                    } else {
                        scope.$apply(function (){
                            scope.silGridSearch();
                        });
                    }
                    event.preventDefault();
                }
                //esc key press
                if(event.which === 27) {
                    scope.$apply(function (){
                        scope.silGridSearch(true);
                    });
                    event.preventDefault();
                }
                //backspace
                if(event.which === 8){
                    if((scope.silGrid.searchQuery.length) === 1){
                        scope.$apply(function (){
                            scope.silGridSearch(true);
                        });
                    }
                }
            });
            }
        };
    })

    .directive("silGridSort",["$rootScope", function($rootScope){
        return {
            restrict : "A",
            require: "^silGrid",
            scope: {
                field: "@"
            },
            link: function($scope, elem, attrs, gridCtrl){
                elem.addClass("sil-orderable");
                if(_.isUndefined($scope.sil_orderings)){
                    $scope.sil_orderings  = [];
                }
                var addOrdering = function(item, order){
                    order = order==="asc"?"":"-";
                    $scope.sil_orderings = _.without($rootScope.sil_orderings, item);
                    $scope.sil_orderings = _.without($rootScope.sil_orderings, order+item);
                    $scope.sil_orderings.unshift(order+item);
                };
                elem.on("click", function(){
                    if(elem.hasClass("sil-orderable")){
                        // assume default ordering is ascending
                        elem.removeClass("sil-orderable");
                        elem.addClass("sil-orderable-desc");
                        //order desc
                        addOrdering($scope.field, "desc");
                    }else{
                        //if ordered asc, order desc
                        if(elem.hasClass("sil-orderable-desc")){
                            elem.removeClass("sil-orderable-desc");
                            elem.addClass("sil-orderable-asc");
                            // order asc
                            addOrdering($scope.field, "asc");
                        }else{
                            elem.removeClass("sil-orderable-asc");
                            elem.addClass("sil-orderable-desc");
                            //order desc
                            addOrdering($scope.field, "desc");
                        }
                    }
                    gridCtrl.addFilter("ordering", $scope.sil_orderings.join(","));
                    gridCtrl.getData();
                });
            }
        };
    }]);

})(window.angular, window._);
