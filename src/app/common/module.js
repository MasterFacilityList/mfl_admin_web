(function (angular) {

    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.common
     *
     * @description
     * Bundles up all the common modules
     */
    angular.module("mfl.common", [
        "mfl.common.forms",
        "mfl.common.directives",
        "mfl.common.filters",
        "mfl.common.controllers",
        "mfl.common.states",
        "mfl.common.services",
        "mfl.common.constants",
        "mfl.common.revision",
        "mfl.common.export",
        "mfl.common.errors"
    ]);

})(window.angular);
