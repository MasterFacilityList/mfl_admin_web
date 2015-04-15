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
                            name : "Opongi's Xrays",
                            date : "31 March, 2013",
                            description : "Facilities specialized in offers xray &"+
                                            " radiology services",
                            location : "United Kisumu",
                            status : "PENDING"
                        },
                        {
                            id: "2",
                            code : "MFL002",
                            name : "Tanny's Physicians",
                            date : "31 July, 2011",
                            description : "Facility has physiotherapy equipment as well as "+
                                            " scanners & X-ray facilities",
                            location : "Mayakos",
                            status : "DRAFT"
                        },
                        {
                            id: "3",
                            code : "MFL003",
                            name : "Kuzaa Facilities",
                            date : "31 December, 2012",
                            description : "Facilities specialized cat scans utlra-sounds and"+
                                            " the likes",
                            location : "Mombasa",
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
                            description : "Facilities specialized in offers xray &"+
                                            " radiology services"
                        },
                        {
                            id: "2",
                            code : "OWN002",
                            name : "Red cross",
                            abbreviation: "RC",
                            type: "NGO",
                            date_created : "31 July, 2011",
                            description : "Facility has physiotherapy equipment as well as "+
                                            " scanners & X-ray facilities"
                        },
                        {
                            id: "3",
                            code : "OWN003",
                            name : "Yitch Medical Facilties",
                            abbreviation: "YTCH",
                            type: "Private organization",
                            date_created : "31 December, 2012",
                            description : "Facilities specialized cat scans utlra-sounds and"+
                                            " the likes"
                        }
                    ]
                };
                return owners;
            };
        }]);
