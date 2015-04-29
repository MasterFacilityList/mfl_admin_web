"use strict";

angular.module("mfl.practitioners.services", [])

.service("mfl.practitioners.services.practitioners", ["mfl.common.providers.requests",
        function (requests) {
        var url = {
            practitioners: "api/v1/practitioners"
        };

        this.getPractitionersBackend = function () {
            return requests.callApi("GET", url.pracitioners);
        };

        this.getPractitioners = function () {
            var practitioners = {
                results: [
                    {
                        registration_number: "A3421",
                        name: "Jason Wanjohi",
                        practice_type: "Dentistry",
                        speciality: "Oral and Maxillofacial Surgery",
                        ward: ""
                    },
                    {
                        registration_number: "A7438",
                        name: "Antony Owaga",
                        practice_type: "Dentistry",
                        speciality: "Periodontology",
                        ward: ""
                    },
                    {
                        registration_number: "A9233",
                        name: "Somboriot Kipchilat",
                        practice_type: "Medicine",
                        speciality: "Anaesthesia",
                        ward: ""
                    }
                ]
            };
            return practitioners;
        };
    }]);