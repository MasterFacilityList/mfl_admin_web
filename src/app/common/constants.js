(function (angular) {
    "use strict";

    angular.module("mfl.common.constants", [])

    .constant("mfl.error.messages", {
        errors : "Sorry a connection error occured, ",
        facility_details : "failed to load facility details",
        data : "failed to save updates",
        contacts : "failed to update contacts",
        fetch_contacts : "failed to fetch contacts",
        fetching_services : "failed to fetch services",
        services : "failed to update services",
        delete_services : "failed to delete service",
        fetch_units : "failed to fetch facility units",
        units : "failed to update units",
        delete_units : "failed to delete units",
        location : "failed to update facility location details",
        geolocation : "failed to update facility geolocation details",
        geocodes : "failed to fetch facility geocoordinates",
        ward : "failed to fetch facility's ward geocoordinates"
    });
})(window.angular);
