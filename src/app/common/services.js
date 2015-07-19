(function (angular, _) {
    "use strict";
    angular.module("mfl.common.services", [])

    .service("mfl.common.services.multistep", [function () {
        this.isActive = function (scope, steps, curr) {
            _.each(scope.steps, function (step) {
                step.active = (step.name === curr);
            });
        };
        this.setFurthest = function (stateParams, steps) {
            _.each(steps, function (step) {
                if(step.count === stateParams.furthest) {
                    step.furthest = true;
                    _.each(step.prev, function (prev_state) {
                        _.each(steps, function (a_step) {
                            if(a_step.name === prev_state) {
                                a_step.done = true;
                            }
                        });
                    });
                }
            });
        };
        this.nextState = function (scope, furthest, steps, curr) {
            this.isActive(scope, steps, curr);
            this.setFurthest(furthest, steps);
        };
        this.userMultistep = function () {
            var results   = [
                {
                    name : "basic",
                    prev : [],
                    count: "1"
                },
                {
                    name : "contacts",
                    prev : ["basic"],
                    count: "2"
                },
                {
                    name : "groups",
                    prev : ["basic", "contacts"],
                    count: "3"
                },
                {
                    name : "counties",
                    prev : ["basic", "contacts", "groups"],
                    count: "4"
                },
                {
                    name : "constituency",
                    prev : ["basic", "contacts", "groups"],
                    count: "4"
                },
                {
                    name : "regulatory_body",
                    prev : ["basic", "contacts", "groups"],
                    count: "4"
                }
            ];
            return results;
        };
        this.filterActive = function (scope, steps, obj) {
            _.each(scope.steps, function (step) {
                if(step.name === obj.name) {
                    step.active = true;
                }
                else {
                    step.active = false;
                }
            });
        };
    }]);
})(window.angular, window._);
