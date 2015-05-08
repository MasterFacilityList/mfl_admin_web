angular.module("mfl.setup.contacts.controllers",[
    "mfl.setup.constituencies.wrapper",
    "mfl.setup.wards.wrapper"
])
    .controller("mfl.setup.controller.contacts.list", ["$scope",
        function ($scope) {
            $scope.title = [
                {
                    icon: "fa-phone",
                    name: "Manage Contact Types"
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
