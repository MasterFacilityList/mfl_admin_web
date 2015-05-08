"use strict";
(function(angular){
    angular.module("mfl.setup.routes.jobTitles", ["mfl.setup.routes.dashboard"])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
        .state("setup.job_titles", {
                url: "/job_titles",
                views: {
                    "main-content@setup": {
                        controller: "mfl.setup.controller.jobTitles.list",
                        templateUrl: "setup/tpls/job_titles/job-titles-list.tpl.html"
                    }
                }
            });
    }]);
})(angular);

