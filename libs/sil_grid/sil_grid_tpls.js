(function(angular){
    var pagination_tpl = "sil.grid.pagination.tpl.html";
    var search_tpl = "sil.grid.search.tpl.html";
    angular.module(pagination_tpl, []).run(["$templateCache",
    function($templateCache){
        $templateCache.put("sil.grid.pagination.tpl.html",
            "<ul class=\"pager\" ng-if=\"pagination.active\">\n" +
            "<li ng-if=\"pagination.prev\" class=\"previous\">\n"+
            "<a  ng-click=paginate(pagination.prev_page)>\n" +
            "<span aria-hidden=\"true\">&larr;</span> Previous</a>\n" +
            "</li>\n" +
            "<li>Page {{pagination.current_page}} / {{pagination.page_count}}</li>"+
            " <li class=\"next\" ng-if=\"pagination.next\">\n"+
            "<a ng-click=paginate(pagination.next_page)>Next\n" +
                " <span aria-hidden=\"true\">&rarr;</span></a>\n" +
            "</li>\n" +
            "</ul>\n"
        );
        }
    ]);
    angular.module(search_tpl, []).run(["$templateCache", function($templateCache){
    $templateCache.put("sil.grid.search.tpl.html",
        "<div class=\"input-group \">\n" +
        "<input type=\"text\" class=\"search-input form-control \" \n"+
        "helper-inline ng-model=\"silGrid.searchQuery\" placeholder=\"Search anything...\">\n" +
        "<span class=\"search-addon input-group-addon ng-click=silGridSearch(false)\">\n" +
        "<i ng-show=\"silGrid.searchQuery\" class=\"fa fa-close text-danger\"\n" +
        "ng-click=\"silGridSearch(true)\">\n" +
        "</i>\n <i class=\"fa fa-search\"></i>" +
        "</span>\n" +
        "</div>\n"
        );
    }]);

    angular.module("sil.grid.tpls", [pagination_tpl, search_tpl]);
})(angular);
