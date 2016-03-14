(function (angular, _) {

    "use strict";

    angular.module("mfl.reports.controllers.facilities", [
        "mfl.reports.states",
        "mfl.reports.services",
        "mfl.auth.oauth2"
    ])

    .controller("mfl.reports.controllers.facilities", ["$scope","$stateParams",
        "mfl.reports.services.wrappers","$state","URL_SEARCH_PARAMS","$window","api.oauth2",
        function($scope,filterParams,wrappers,$state, URL_SEARCH_PARAMS,$window,auth){
        var filter_keys = _.keys(filterParams);
        var params = _.reduce(filter_keys, function (memo, b) {
            if (filterParams[b]) {
                memo[b] = filterParams[b];
            }
            return memo;
        }, {
            "fields": "id,code,official_name,regulatory_status_name,updated," +
                      "facility_type_name,owner_name,county,sub_county_name,"+
                      "ward_name,keph_level"
        });
        $scope.tooltip = {
            "title": "tooltip",
            "checked": false
        };
        $scope.hide = true;
        $scope.filters_grid = params;
        $scope.toggle = false;
        $scope.filters = {
            single: {
                name: "",
                code: "",
                search: "",
                number_of_beds: "",
                number_of_cots: "",
                open_public_holidays: "",
                open_weekends: "",
                open_whole_day: ""
            },
            multiple: {
                county: [],
                facility_type: [],
                constituency: [],
                ward: [],
                operation_status: [],
                service_category: [],
                owner_type: [],
                owner: [],
                service: [],
                keph_level: []
            }
        };

        $scope.bool_clear = function () {
            $scope.filters.single.open_weekends = "";
            $scope.filters.single.open_whole_day = "";
            $scope.filters.single.open_public_holidays = "";
        };

        var updateSingleFilters = function (params) {
            // update single inputs
            _.each(_.keys($scope.filters.single), function (a) {
                $scope.filters.single[a] = params[a] || "";
            });
        };
        updateSingleFilters(filterParams);

        var updateMultipleFilters = function (params, filter_summaries) {
            // update ui-select inputs
            _.each(_.keys($scope.filters.multiple),function (a) {
                var val = params[a];
                if (val) {
                    $scope.filters.multiple[a] = _.filter(
                        filter_summaries[a],
                        function (b) {
                            return val.indexOf(b.id) !== -1;
                        }
                    );
                }
            });

            // update ui-select with relationships
            var relationships = [
                {child: "ward", parent: "constituency"},
                {child: "constituency", parent: "county"}
            ];
            _.each(relationships, function (r) {
                _.each($scope.filters.multiple[r.child], function (w) {
                    var x = _.findWhere(filter_summaries[r.parent], {"id": w[r.parent]});
                    if (!_.isUndefined(x)) {
                        $scope.filters.multiple[r.parent].push(x);
                    }
                });
            });

            // remove duplicates in ui-select repeat sources
            _.each(_.keys($scope.filters.multiple), function (a) {
                $scope.filters.multiple[a] = _.uniq($scope.filters.multiple[a]);
            });
        };
        $scope.excelExport = function () {
            var download_params = {
                "format": "excel",
                "access_token": auth.getToken().access_token,
                "page_size": 10000
            };
            _.extend(download_params, _.omit(params, "page"));

            var helpers = wrappers.helpers;
            var url = helpers.joinUrl([
                wrappers.facilities.makeUrl(wrappers.facilities.apiBaseUrl),
                helpers.makeGetParam(helpers.makeParams(download_params))
            ]);

            $window.location.href = url;
        };
        $scope.filterFxns = {
            constFilter: function (a) {
                var county_ids = _.pluck($scope.filters.multiple.county, "id");
                return _.contains(county_ids, a.county);
            },
            wardFilter: function (a) {
                var const_ids = _.pluck($scope.filters.multiple.constituency, "id");
                return _.contains(const_ids, a.constituency);
            },
            ownerFilter: function (a) {
                var owner_types = _.pluck($scope.filters.multiple.owner_type, "id");
                return (_.isEmpty(owner_types)) ?
                    true :
                    _.contains(owner_types, a.owner_type);
            },
            serviceFilter: function (a) {
                var categories = _.pluck($scope.filters.multiple.service_category, "id");
                return (_.isEmpty(categories)) ?
                    true :
                    _.contains(categories, a.category);
            }
        };

        wrappers.filters.filter({"fields": ["county", "facility_type",
            "constituency", "ward", "operation_status", "service_category",
            "owner_type", "owner", "service", "keph_level"
        ]})
        .success(function (data) {
            $scope.filter_summaries = data;
            updateMultipleFilters(filterParams, data);
        });

        var dumpMultipleFilters = function (src) {
            return _.reduce(_.keys(src), function (memo, b) {
                memo[b] = _.pluck(src[b], "id").join(",");
                return memo;
            }, {});
        };

        var dumpSingleFilters = function (src) {
            var k = _.keys(src);
            return _.reduce(k, function (memo, b) {
                memo[b] = src[b];
                return memo;
            }, {});
        };

        $scope.filterFacilities = function () {
            var multiple = dumpMultipleFilters($scope.filters.multiple);
            var single = dumpSingleFilters($scope.filters.single);
            var params = _.extend(single, multiple);
            params.page = undefined;
            params.page_size = undefined;
            $state.go($state.current.name, params);
        };

        $scope.clearFilters = function () {
            var params = {};
            _.each(URL_SEARCH_PARAMS, function (a) {
                params[a] = undefined;
            });
            $state.go($state.current.name, params);
        };

    }]);
})(window.angular, window._);
