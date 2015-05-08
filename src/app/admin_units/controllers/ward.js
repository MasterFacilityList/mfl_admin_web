angular.module("mfl.admin_units.ward_controllers",[
    "mfl.constituencies.wrapper",
    "mfl.wards.wrapper"
])
    .controller("mfl.admin_units.controllers.wards", ["$scope",
        function ($scope) {
            $scope.test = "View administrative area";
            $scope.path = [
                {
                    name: "Adminstrative area",
                    route: "admin_units"
                },
                {
                    name: "Wards",
                    route: "admin_unit.wards"
                }
            ];
            $scope.title = [
                {
                    icon: "fa-map-marker",
                    name: "View Wards"
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
