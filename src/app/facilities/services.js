"use strict";

angular.module("mfl.facilities.services", [])

    .service("mfl.facilities.services.facilities", ["mfl.common.providers.requests",
        function (requests) {
            var url = {
                    facilities : "api/v1/facilities"
                };

            this.getFacilitiesBackend = function () {
                return requests.callApi("GET", url.facilities);
            };

            this.getFacilities = function () {
                var facilities = {
                    results : [
                        {
                            id: "1",
                            code : "MFL001",
                            name : "Antony's Labs & X-rays",
                            date : "31 March, 2013",
                            description : "Facilities specialized in offers xray &"+
                                            " radiology services",
                            location : "Kisumu",
                            coordinates : "81.0120, 97.3012",
                            status : "PENDING"
                        },
                        {
                            id: "2",
                            code : "MFL002",
                            name : "Dr Daniel's Physicians",
                            date : "31 July, 2011",
                            description : "Facility has physiotherapy equipment as well as "+
                                            " scanners & X-ray facilities",
                            location : "Machakos",
                            coordinates : "103.7732, 44.0987",
                            status : "DRAFT"
                        },
                        {
                            id: "3",
                            code : "MFL003",
                            name : "Miritini Facilities",
                            date : "31 December, 2012",
                            description : "Facilities specialized cat scans utlra-sounds and"+
                                            " the likes",
                            location : "Mombasa",
                            coordinates : "13.7732, 12.0987",
                            status : "APPROVED"
                        }
                    ]
                };
                return facilities;
            };
            this.getOwners = function () {
                var owners = {
                    results : [
                        {
                            id: "1",
                            code : "OWN001",
                            name : "Ministry of Health",
                            abbreviation: "MOH",
                            type: "Governmental",
                            date_created : "31 March, 2013",
                            description : "Body governing all matters health in"+
                                            " the republic of Kenya"
                        },
                        {
                            id: "2",
                            code : "OWN002",
                            name : "Red cross",
                            abbreviation: "RC",
                            type: "NGO",
                            date_created : "31 July, 2011",
                            description : "World reknown NGO that deals with"+
                                            " matters involving health and healthcare"
                        },
                        {
                            id: "3",
                            code : "OWN003",
                            name : "Yitch Medical Facilties",
                            abbreviation: "YITCH",
                            type: "Private organization",
                            date_created : "31 December, 2012",
                            description : "Private organization that is a lead"+
                                            " in providing health-care"
                        }
                    ]
                };
                return owners;
            };
        }]);
