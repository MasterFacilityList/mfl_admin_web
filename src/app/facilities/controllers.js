"use strict";

angular.module("mfl.facilities.controllers", ["mfl.facilities.wrapper"])

    .controller("mfl.facilities.controllers.owners", ["$scope",
    "mfl.facilities.services.facilities",
    function ($scope, ownerService) {
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.test = "Owners";
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "Manage owners",
                route: "facilities.manage_owners"
            }
        ];
        $scope.title = [
            {
                icon: "fa-user-secret",
                name: "Manage Owner"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='facilities.new_owner' ",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "New Owner",
                icon: "fa-plus"
            },
            {
                func : "onclick=window.history.back()",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Go back",
                icon: "fa-arrow-left"
            }
        ];
        $scope.owners = ownerService.getOwners();
    }])

    .controller("mfl.facilities.controllers.services", ["$scope",  "mfl.services.services.services",
    function ($scope, serviceServices) {
        $scope.test = "Services";
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "Manage services",
                route: "facilities.manage_services"
            }
        ];
        $scope.title = [
            {
                icon: "fa-exchange",
                name: "Manage services"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='facilities.new_service' ",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "New Service",
                icon: "fa-plus"
            },
            {
                func : "onclick=window.history.back()",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Go back",
                icon: "fa-arrow-left"
            }
        ];
        $scope.services = serviceServices.getServices();
    }])
    //start of new and edit services
    .controller("mfl.facilities.controllers.new_service", ["$scope", function ($scope) {
        $scope.test = "New service";
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "Manage services",
                route: "facilities.manage_services"
            },
            {
                name: "New Service",
                route: "services.new_service"
            }
        ];
        $scope.title = [
            {
                icon: "fa-plus-circle",
                name: "New Service"
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
    }])
    .controller("mfl.facilities.controllers.edit_service", ["$scope", function ($scope) {
        $scope.test = "Edit service";
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "Manage services",
                route: "facilities.manage_services"
            },
            {
                name: "Edit Service",
                route: "services.edit_service"
            }
        ];
        $scope.title = [
            {
                icon: "fa-edit",
                name: "Edit Service"
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
    }])
    .controller("mfl.facilities.controllers.view_service", ["$scope",
    "mfl.services.services.services", "$stateParams",
    function ($scope, serviceServices, $stateParams) {
        $scope.test = "View service";
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "Manage services",
                route: "facilities.manage_services"
            },
            {
                name: "View Service",
                route: "services.view_service"
            }
        ];
        $scope.title = [
            {
                icon: "fa-eye",
                name: "View Service"
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

        $scope.services = serviceServices.getServices();
        console.log($scope.services);
        $scope.getOneService = function () {
            $scope.oneService = _.findWhere(
                $scope.services.results, {"id" : $stateParams.service_id});
            return $scope.oneService;
        };
    }])
    //end of new and edit services
    .controller("mfl.facilities.controllers.facilities", ["$scope",
    function ($scope) {
        $scope.test = "Facilities sub-menu";
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            }
        ];
        $scope.title = [
            {
                icon: "fa-building",
                name: "Facilities"
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
    }])

    .controller("mfl.facilities.controllers.manage_facilities", ["$scope",
    "mfl.facilities.services.facilities", function ($scope, facilityService) {
        $scope.test = "Facilities";
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "Manage facilities",
                route: "facilities.manage_facilities"
            }
        ];
        $scope.title = [
            {
                icon: "fa-building",
                name: "Manage facilities"
            }
        ];
        $scope.action = [
            {
                func : "ui-sref='facilities.new_facility.basic' ",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "New Facility",
                icon: "fa-plus"
            },
            {
                func : "onclick=window.history.back()",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Go back",
                icon: "fa-arrow-left"
            }
        ];
        $scope.facilities = facilityService.getFacilities();
    }])
    .controller("mfl.facilities.controllers.facilitiesaction",
        ["$scope", "$stateParams","facilitiesApi",
        function ($scope, $stateParams,facilitiesApi) {
        $scope.test = "Process Facilities";
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.oneFacility = "";
        facilitiesApi.api.get($stateParams.fac_id)
            .success(function (result) {
                $scope.oneFacility = result;
            })
            .error(function (e) {
                console.log(e);
            });
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "Manage facilities",
                route: "facilities.manage_facilities"
            },
            {
                name: "Process Facility",
                route: "facilities.facility_action"
            }
        ];
        $scope.title = [
            {
                icon: "fa-th",
                name: "Process Facility "
            }
        ];
        $scope.action = [
            {
                func : " ",
                class: "action-btn action-btn-md action-btn-success ",
                color: "blue",
                tipmsg: "Approve Facility",
                icon: "fa-check"
            },
            {
                func : " ",
                class: "action-btn action-btn-md action-btn-danger ",
                color: "blue",
                tipmsg: "Reject Facility",
                icon: "fa-close"
            },
            {
                func : " ",
                class: "action-btn action-btn-md action-btn-success ",
                color: "blue",
                tipmsg: "Upgrade Facility",
                icon: "fa-arrow-up"
            },
            {
                func : " ",
                class: "action-btn action-btn-md action-btn-danger ",
                color: "blue",
                tipmsg: "Downgrade Facility",
                icon: "fa-arrow-down"
            },
            {
                func : " ",
                class: "action-btn action-btn-md action-btn-warm ",
                color: "blue",
                tipmsg: "Publish facility",
                icon: "fa-tag"
            },
            {
                func : "onclick=window.history.back()",
                class: "action-btn action-btn-primary action-btn-md",
                color: "blue",
                tipmsg: "Go back",
                icon: "fa-arrow-left"
            }
        ];
    }])
    .controller("mfl.facilities.controllers.new_facility", ["$scope", function ($scope) {
        $scope.new_fac = true;
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.setter = false;
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "Manage facilities",
                route: "facilities.manage_facilities"
            },
            {
                name: "New Facility",
                route: "facilities.new_facility"
            }
        ];
        $scope.title = [
            {
                icon: "fa-plus-circle",
                name: "New facility"
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
        //facility contacts
        $scope.facility = {
            contacts : [
                {
                    contact_type: "",
                    contact: ""
                }
            ],
            services : [
                {
                    name: "",
                    type: "",
                    level: ""
                }
            ]
        };
        //adding contacts
        $scope.addContact = function () {
            $scope.facility.contacts.push({contact_type: "", contact: ""});
        };
        //removing contacts
        $scope.removeContact = function (obj) {
            $scope.facility.contacts = _.without($scope.facility.contacts, obj);
        };
         //adding services
        $scope.addService = function () {
            $scope.facility.services.push({type: "", name: ""});
        };
        //removing contacts
        $scope.removeService = function (obj) {
            $scope.facility.services = _.without($scope.facility.services, obj);
        };
    }])
    .controller("mfl.facilities.controllers.edit_facility", ["$scope", "$stateParams",
    "mfl.facilities.services.facilities", function ($scope, $stateParams, facilityService) {
        $scope.edit=true;
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.setter = true;
        $scope.facilities = facilityService.getFacilities();
        $scope.facility = _.findWhere($scope.facilities, {id : $stateParams.fac_id});
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "Manage facilities",
                route: "facilities.manage_facilities"
            },
            {
                name: "Edit Facility",
                route: "facilities.edit_facility.basic"
            }
        ];
        $scope.title = [
            {
                icon: "fa-edit",
                name: "Edit facility"
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
        //facility contacts
        $scope.facility = {
            contacts : [
                {
                    contact_type: "",
                    contact: ""
                }
            ],
            services : [
                {
                    name: "",
                    type: "",
                    level: ""
                }
            ]
        };
        //adding contacts
        $scope.addContact = function () {
            $scope.facility.contacts.push({contact_type: "", contact: ""});
        };
        //removing contacts
        $scope.removeContact = function (obj) {
            $scope.facility.contacts = _.without($scope.facility.contacts, obj);
        };
         //adding services
        $scope.addService = function () {
            $scope.facility.services.push({type: "", name: ""});
        };
        //removing contacts
        $scope.removeService = function (obj) {
            $scope.facility.services = _.without($scope.facility.services, obj);
        };
    }])
    .controller("mfl.facilities.controllers.new_owner", ["$scope", function ($scope) {
        $scope.test = "New owner";
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "Manage owners",
                route: "facilities.manage_owners"
            },
            {
                name: "New owner",
                route: "facilities.new_owner"
            }
        ];
        $scope.title = [
            {
                icon: "fa-user-secret",
                name: "New Owner"
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
    }])
    .controller("mfl.facilities.controllers.view_owner", ["$scope",
    "ownersApi", "$stateParams",
    function ($scope, ownerApi, $stateParams) {
        $scope.test = "View owner";
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "Manage owners",
                route: "facilities.manage_owners"
            },
            {
                name: "View owner",
                route: "facilities.view_owner"
            }
        ];
        $scope.title = [
            {
                icon: "fa-eye",
                name: "View Owner"
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
        ownerApi.api.get($stateParams.owner_id)
            .success(function (owner) {
                $scope.oneOwner = owner;
            })
            .error(function (e) {
                console.log(e);
            });
    }])
    .controller("mfl.facilities.controllers.edit_owner", ["$scope", "ownersApi", "$stateParams",
        function ($scope, ownerApi, $stateParams) {
        $scope.test = "Edit owner";
        $scope.tooltip = {
            "title": "",
            "checked": false
        };
        $scope.path = [
            {
                name: "Facilities",
                route: "facilities"
            },
            {
                name: "Manage owners",
                route: "facilities.manage_owners"
            },
            {
                name: "Edit owner",
                route: "facilities.edit_owner"
            }
        ];
        $scope.title = [
            {
                icon: "fa-edit",
                name: "Edit Owner"
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
        ownerApi.api.get($stateParams.owner_id)
            .success(function (owner) {
                $scope.owner = owner;
            })
            .error(function (e) {
                console.log(e);
            });
    }]);
