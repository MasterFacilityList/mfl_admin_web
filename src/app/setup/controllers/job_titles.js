angular.module("mfl.setup.jobTitles.controllers",[
    "mfl.setup.jobTitles.wrapper"
])
    .controller("mfl.setup.controller.jobTitles.list", ["$scope",
        function ($scope) {
            $scope.title = [
                {
                    icon: "fa-phone",
                    name: "Manage Job Titles"
                }
            ];
            $scope.action = [
                {
                    func : "onclick=window.history.back()",
                    class: "action-btn action-btn-primary action-btn-md",
                    color: "blue",
                    tipmsg: "Go back",
                    icon: "fa-arrow-left"
                }
            ];
        }]
    );
