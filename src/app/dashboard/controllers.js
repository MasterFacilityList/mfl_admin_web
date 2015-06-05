(function (angular) {

    "use strict";

    angular.module("mfl.dashboard.controllers", ["mfl.dashboard.wrapper"])

    .controller("mfl.dashboard.home", ["$scope",
        function ($scope) {
            $scope.title = [
                {
                    icon: "fa-dashboard",
                    name: "Dashboard"
                }
            ];
        }
    ])
    .controller("mfl.dashboard.content", ["$scope", "dashboardApi",
        function ($scope, dashboardApi) {
            $scope.chart = null;
            $scope.spinner = true;
            var c3_generate = function (_payload){
                c3.generate(_payload);
                $scope.loading = false;
            };
            $scope.showGraph = function(_data) {
                //owner chart
                var owners_chart = function (_dt) {
                    var _list = [];

                    angular.forEach(_dt.owner_types, function (item) {
                        var _item = [item.name, item.count];
                        _list[_list.length] = _item;
                    });

                    var obj = {
                        bindto: "#chartowners",
                        data: {
                            columns: _list,
                            type : "pie"
                        }
                    };
                    return obj;
                };

                var facility_chart = function(_dt) {
                    var _list = [];

                    angular.forEach(_dt.status_summary, function (item) {
                        var _item = [item.name, item.count];
                        _list[_list.length] = _item;
                    });

                    var obj = {
                        bindto: "#chartfacility",
                        data: {
                            columns: _list,
                            type : "pie"
                        }
                    };
                    return obj;
                };
                var top_ten = function (_dt) {
                    var _list = [];
                    if(!_.isEmpty(_dt.county_summary)) {
                        angular.forEach(_dt.county_summary, function (item) {
                            var _item = [item.name, item.count];
                            _list[_list.length] = _item;
                        });
                    }
                    if(!_.isEmpty(_dt.constituencies_summary)) {
                        angular.forEach(_dt.constituencies_summary, function (item) {
                            var _item = [item.name, item.count];
                            _list[_list.length] = _item;
                        });
                    }

                    var obj = {
                        bindto: "#facilitybar",
                        data: {
                            columns: _list,
                            bar: {
                                width: 10
                            },
                            type : "bar"
                        },
                        axis: {
                            x: {
                                padding: {
                                    left: 5,
                                    right: 5
                                }
                            }
                        }
                    };
                    return obj;
                };

                c3_generate(owners_chart(_data));
                c3_generate(facility_chart(_data));
                c3_generate(top_ten(_data));
            };

            //dashboardApi
            dashboardApi.api.list()
                .success(function (data) {
                    $scope.spinner = false;
                    $scope.summary = data;
                    $scope.loading = true;
                    $scope.showGraph(data);
                })
                .error(function (err) {
                    $scope.spinner = false;
                    $scope.loading = false;
                    $scope.chart_err = err.error;
                });
        }
    ]);

})(angular);
