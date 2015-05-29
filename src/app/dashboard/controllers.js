(function (angular) {

    "use strict";

    angular.module("mfl.dashboard.controllers", ["mfl.dashboard.wrapper"])

    .controller("mfl.dashboard.home", ["$scope",
        function ($scope) {
            $scope.user = "Antony";
            $scope.test = "Manage dashboard";
            $scope.path = [
                {
                    name: "Dashboard",
                    route: "dashboard"
                }
            ];
            $scope.title = [
                {
                    icon: "fa-desktop",
                    name: "dashboard"
                }
            ];
        }
    ])
    .controller("mfl.dashboard.content", ["$scope", "dashboardApi", 
        function ($scope, dashboardApi) {
            $scope.chart = null;
            $scope.test = "bnooo";

            dashboardApi.api.list()
                .success(function (data) {
                    console.log(data);
                })
                .error(function () {
                    console.log("cool");
                });

            $scope.showGraph = function() {
                $scope.chart = c3.generate({
                    bindto: "#chart",
                    data: {
                        columns: [
                            ["data1", 30],
                            ["data2", 120]
                        ],
                        type : "pie"
                    }
                });     
            };
            $scope.showGraph();

        }
    ]);

})(angular);