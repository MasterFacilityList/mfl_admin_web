(function (angular) {
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
    }]);
})(angular);
