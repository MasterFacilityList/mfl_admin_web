(function(angular, _){
    "use strict";

    angular.module("mfl.facility_mgmt.controllers.edit", [
        "mfl.facility_mgmt.services",
        "mfl.auth.services",
        "datePicker",
        "ui.bootstrap.tpls",
        "mfl.common.forms",
        "leaflet-directive"
    ])

    .controller("mfl.facility_mgmt.controllers.services_helper",
        ["$log", "mfl.facility_mgmt.services.wrappers",
        function ($log, wrappers) {
            var loadData = function ($scope) {
                wrappers.services.filter({page_size: 100, ordering: "name"})
                .success(function (data) {
                    $scope.services = data.results;
                })
                .error(function (data) {
                    $log.error(data);
                });
            };

            var addServiceOption = function ($scope, so) {
                var payload = {
                    facility: $scope.facility_id,
                    selected_option: so
                };
                wrappers.facility_services.create(payload)
                .success(function(data) {
                    $scope.facility.facility_services.push(data);
                })
                .error(function (data) {
                    $log.error(data);
                });
            };

            var removeServiceOption = function ($scope, fs) {
                wrappers.facility_services.remove(fs.id)
                .success(function () {
                    $scope.facility.facility_services = _.without(
                        $scope.facility.facility_services, fs
                    );
                })
                .error(function(data){
                    $log.error(data);
                });
            };

            this.bootstrap = function($scope) {
                loadData($scope);
                $scope.new_service = {
                    service: "",
                    option: ""
                };
                $scope.services = [];
                $scope.service_options = [];

                $scope.addServiceOption = function (a) {
                    addServiceOption($scope, a);
                };
                $scope.removeChild = function (a) {
                    removeServiceOption($scope, a);
                };
                $scope.$watch("new_service.service", function (newVal) {
                    var s = _.findWhere($scope.services, {"id": newVal});
                    if (angular.isDefined(s) && _.isArray(s.service_options)) {
                        $scope.service_options = s.service_options;
                    } else {
                        $scope.service_options = [];
                    }
                });
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_edit",
        ["$scope", "$q", "$log", "$stateParams", "mfl.facility_mgmt.services.wrappers",
        "mfl.auth.services.login","mfl.facility.multistep.service", "$state",
        function ($scope, $q, $log, $stateParams, wrappers, loginService,
            facilityMultistepService, $state) {
            $scope.facility_id = $stateParams.facility_id;
            $scope.create = false;
            $scope.spinner = true;
            $scope.steps = facilityMultistepService.facilityObject();
            $scope.tabState = function(obj) {
                _.each($scope.steps, function (step) {
                    if(step.name === obj.name) {
                        step.active = true;
                    }
                    else {
                        step.active = false;
                    }
                });
                $state.go(
                        "facilities.facility_edit."+ obj.name,
                        {facility_id : $scope.facility_id});
            };
            wrappers.facility_detail.get($scope.facility_id)
                .success(function(data){
                    $scope.spinner = false;
                    $scope.facility = data;
                    $scope.select_values = {
                        ward: {
                            "id": $scope.facility.ward,
                            "name": $scope.facility.ward_name
                        },
                        facility_type: {
                            "id": $scope.facility.facility_type,
                            "name": $scope.facility.facility_type_name
                        },
                        owner: {
                            "id": $scope.facility.owner,
                            "name": $scope.facility.owner_name
                        },
                        operation_status: {
                            "id": $scope.facility.operation_status,
                            "name": $scope.facility.operation_status_name
                        }
                    };
                })
                .error(function (data) {
                    $log.error(data);
                });
            $scope.login_user = loginService.getUser();
            $scope.selectReload = function (wrapper, order_field, search_term, scope_var) {
                if (_.isEmpty(search_term) || (! _.isString(search_term))) {
                    return $q.reject();
                }
                return wrapper.filter(
                    {page_size: 20, "ordering": order_field, "search_auto": search_term}
                )
                .success(function (data) {
                    $scope[scope_var] = data.results;
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_edit.basic",
        ["$scope", "$log", "$state", "$stateParams",
        "mfl.facility_mgmt.services.wrappers", "mfl.common.forms.changes",
        "mfl.common.services.multistep",
        function ($scope, $log, $state, $stateParams, wrappers, formChanges,
            multistepService) {
            multistepService.filterActive(
                $scope, $scope.steps, $scope.steps[0]);
            $scope.reloadOwners = function (s) {
                return $scope.selectReload(wrappers.facility_owners, "name", s, "owners");
            };

            $scope.reloadFacilityTypes = function (s) {
                return $scope.selectReload(wrappers.facility_types, "name", s, "facility_types");
            };

            $scope.reloadOperationStatus = function (s) {
                return $scope.selectReload(
                    wrappers.operation_status, "name", s, "operation_status"
                );
            };

            $scope.reloadWards = function (s) {
                return $scope.selectReload(wrappers.wards, "name", s, "wards");
            };

            $scope.save = function (frm) {
                var changes = formChanges.whatChanged(frm);
                if (_.isEmpty(changes)) {
                    $state.go("facilities.facility_edit.contacts");
                }
                else {
                    wrappers.facility_detail.update($scope.facility_id, changes)
                    .success(function () {
                        $state.go("facilities.facility_edit.contacts");
                    })
                    .error(function (data) {
                        $log.error(data);
                    });
                }
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_edit.contacts",
        ["$scope", "$log", "$stateParams",
        "mfl.facility_mgmt.services.wrappers", "mfl.common.services.multistep",
        function($scope,$log,$stateParams,wrappers, multistepService){
            multistepService.filterActive(
                $scope, $scope.steps, $scope.steps[1]);
            $scope.contacts = [];
            $scope.contact = {
                contact_type: "",
                contact: ""
            };

            /*contact types*/
            wrappers.contact_types.list()
            .success(function(data){
                $scope.contact_types = data.results;
            })
            .error(function(error){
                $log.error(error);
            });

            /*facility contacts*/
            wrappers.facility_contacts.filter({facility:$stateParams.facility_id})
            .success(function(data){
                $scope.fac_contacts = data.results;
            })
            .error(function(error){
                $log.error(error);
            });

            /*remove contact*/
            $scope.removeChild = function (obj) {
                obj.delete_spinner = true;
                wrappers.facility_contacts.remove(obj.id)
                .success(function () {
                    wrappers.contacts.remove(obj.contact)
                    .success(function () {
                        $scope.fac_contacts = _.without($scope.fac_contacts, obj);
                        obj.delete_spinner = false;
                    })
                    .error(function (data) {
                        $log.error(data);
                        obj.delete_spinner = false;
                    });
                })
                .error(function (data) {
                    $log.error(data);
                    obj.delete_spinner = false;
                });
            };

            /*add contact*/
            $scope.add = function () {
                $scope.spinner = true;
                wrappers.contacts.create({
                    "contact_type": $scope.contact.contact_type,
                    "contact": $scope.contact.contact
                })
                .success(function (data) {
                    wrappers.facility_contacts.create({
                        "facility": $stateParams.facility_id,
                        "contact": data.id
                    })
                    .success(function (data) {
                        $scope.fac_contacts.push(data);
                        $scope.contact = {
                            contact_type: "",
                            contact: ""
                        };
                        $scope.spinner = false;
                    })
                    .error(function (data) {
                        $log.error(data);
                        $scope.spinner = false;
                    });
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.spinner = false;
                });
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_edit.officers",
        ["$scope", "$log", "$stateParams",
        "mfl.facility_mgmt.services.wrappers", "mfl.common.services.multistep",
        function($scope, $log, $stateParams, wrappers, multistepService){
            multistepService.filterActive(
                $scope, $scope.steps, $scope.steps[4]);
            $scope.fac_officers = [];

            /*officers*/
            wrappers.officers.list()
            .success(function(data){
                $scope.officers = data.results;
            })
            .error(function(error){
                $log.error(error);
            });
            /*facility officers*/
            wrappers.facility_officers.filter({facility:$stateParams.facility_id})
            .success(function(data){
                $scope.fac_officers = data.results;
            })
            .error(function(error){
                $log.error(error);
            });
            /*add existing officer to facility*/
            $scope.add = function () {
                $scope.spinner = true;
                wrappers.facility_officers.create({
                        "facility": $scope.facility_id,
                        "officer": $scope.officer.id
                    })
                    .success(function (data) {
                        $scope.fac_officers.push(data);
                        $scope.spinner = false;
                    })
                    .error(function (data) {
                        $log.error(data);
                        $scope.spinner = false;
                    });
            };
            /*remove officer*/
            $scope.removeChild = function (obj) {
                obj.delete_spinner = true;
                wrappers.facility_officers.remove(obj.id)
                .success(function () {
                    $scope.fac_officers = _.without($scope.fac_officers, obj);
                    obj.delete_spinner = false;
                })
                .error(function (data) {
                    $log.error(data);
                    obj.delete_spinner = false;
                });
            };
        }])

    .controller("mfl.facility_mgmt.controllers.facility_edit.services",
        ["$scope", "$controller", "mfl.common.services.multistep",
        function ($scope, $controller, multistepService) {
            var helper = $controller("mfl.facility_mgmt.controllers.services_helper");
            helper.bootstrap($scope);
            multistepService.filterActive(
                $scope, $scope.steps, $scope.steps[2]);
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_edit.units",
        ["$scope", "$log", "$stateParams",
        "mfl.facility_mgmt.services.wrappers", "mfl.common.services.multistep",
        function ($scope, $log, $stateParams, wrappers, multistepService) {
            multistepService.filterActive(
                $scope, $scope.steps, $scope.steps[5]);
            /*regulating bodies*/
            wrappers.regulating_bodies.list()
            .success(function(data){
                $scope.regbodies = data.results;
            })
            .error(function(error){
                $log.error(error);
            });

            /*facility units*/
            wrappers.facility_units.filter({facility:$scope.facility_id})
            .success(function(data){
                $scope.fac_units = data.results;
            })
            .error(function(error){
                $log.error(error);
            });

            /*add existing regulatory to facility*/
            $scope.add = function () {
                $scope.spinner = true;
                wrappers.facility_units.create({
                        "facility": $scope.facility_id,
                        "regulating_body": $scope.facility_unit.regulating_body,
                        "name": $scope.facility_unit.name,
                        "description": $scope.facility_unit.description
                    })
                    .success(function (data) {
                        $scope.fac_units.push(data);
                        $scope.spinner = false;
                    })
                    .error(function (data) {
                        $log.error(data);
                        $scope.spinner = false;
                    });
            };

            /*remove facility unit*/
            $scope.removeChild = function (obj) {
                obj.delete_spinner = true;
                wrappers.facility_units.remove(obj.id)
                .success(function () {
                    $scope.fac_units = _.without($scope.fac_units, obj);
                    obj.delete_spinner = false;
                })
                .error(function (data) {
                    $log.error(data);
                    obj.delete_spinner = false;
                });
            };
        }
    ])

    .controller("mfl.facility_mgmt.controllers.facility_edit.setup",
        ["$scope","mfl.facility_mgmt.services.wrappers","$log",
        "mfl.common.forms.changes","$state", "mfl.common.services.multistep",
        function ($scope, wrappers, $log, formChanges, $state,
            multistepService) {
            /*Update operation setup details*/
            multistepService.filterActive(
                $scope, $scope.steps, $scope.steps[3]);
            $scope.updateOp = function (opFrm) {
                var changed = formChanges.whatChanged(opFrm);
                opFrm.facility = $scope.facility_id;
                $scope.spinner1 = true; //show spinner
                if (! _.isEmpty(changed)) {
                    wrappers.facility_detail.update($scope.facility_id, changed)
                        .success(function (data) {
                            $scope.spinner1 = false;
                            $scope.geo = data.results;
                        })
                        .error(function (error) {
                            $scope.spinner1 = false;
                            $log.error(error);
                        });
                }
                else {
                    $state.go("facilities.facility_edit.officers",
                        {"facility_id": $scope.facility_id}, {reload: true});
                }
            };
        }])

    .controller("mfl.facility_mgmt.controllers.facility_edit.location",
        ["$scope", "mfl.facility_mgmt.services.wrappers", "$log","leafletData",
        "mfl.common.services.multistep", "mfl.common.forms.changes",
        function ($scope,wrappers,$log, leafletData,multistepService,formChanges) {
            multistepService.filterActive(
                $scope, $scope.steps, $scope.steps[6]);
            $scope.spinner = true;
            $scope.categoryForm = {};
            /*Setup for map data*/
            angular.extend($scope, {
                defaults: {
                    scrollWheelZoom: false
                },
                layers:{},
                tiles:{
                    openstreetmap: {
                        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                        options: {
                            opacity: 0.7,
                            attribution: "&copy; <a href='http://www.openstreetmap.org/"+
                            "copyright'>OpenStreetMap</a> contributors"
                        }
                    }
                }
            });

            /*Fetch towns*/
            wrappers.towns.list()
                .success(function (data) {
                    $scope.towns = data.results;
                })
                .error(function(error){
                    $log.error(error);
                });

            /*Fetch geo code methods*/
            wrappers.geo_code_methods.list()
                .success(function (data) {
                    $scope.geo_methods = data.results;
                })
                .error(function(error){
                    $log.error(error);
                });

            /*Fetch geo code sources*/
            wrappers.geo_code_sources.list()
                .success(function (data) {
                    $scope.geo_sources = data.results;
                })
                .error(function(error){
                    $log.error(error);
                });

            /*Wait for facility to be defined*/
            $scope.$watch("facility", function (f) {
                if (_.isUndefined(f)){
                    return;
                }
                /*facility's coordinates*/
                wrappers.facility_coordinates.get(f.coordinates)
                .success(function(data){
                    $scope.spinner = false;
                    $scope.geo = data;
                    $scope.select_values = {
                        source: {
                            "id": $scope.geo.source,
                            "name": $scope.geo.source_name
                        },
                        method: {
                            "id": $scope.geo.method,
                            "name": $scope.geo.method_name
                        },
                        town:{
                            "name": $scope.facility.facility_physical_address.town
                        }
                    };
                    angular.extend($scope,{
                        markers: {
                            mainMarker: {
                                layer:"facility",
                                lat: data.coordinates.coordinates[1],
                                lng: data.coordinates.coordinates[0],
                                message: "Facility location"
                            }
                        }
                    });
                })
                .error(function(error){
                    $scope.spinner = false;
                    $log.error(error);
                });

                /*ward coordinates*/
                wrappers.wards.get(f.ward)
                .success(function(data){
                    $scope.spinner = false;
                    $scope.ward_gis = data.ward_boundary;
                    leafletData.getMap("wardmap")
                        .then(function (map) {
                            var coords = data.ward_boundary.properties.bound.coordinates[0];
                            var bounds = _.map(coords, function(c) {
                                return [c[1], c[0]];
                            });
                            map.fitBounds(bounds);
                        });
                    /*Save physical location details*/
                    $scope.savePhy = function (frm) {
                        var changes = formChanges.whatChanged(frm);
                        if(!_.isEmpty(changes)){
                            wrappers.physical_addresses
                                .update(f.facility_physical_address.id, changes)
                                .success(function (data) {
                                    console.log(data);
                                    $scope.$parent.facility.facility_physical_address = data;
                                })
                                .error(function (error) {
                                    $log.error(error);
                                });
                        }
                    };
                    var gis = data.ward_boundary;
                    angular.extend($scope, {
                        geojson: {
                            data: gis,
                            style: {
                                fillColor: "rgb(255, 135, 32)",
                                weight: 2,
                                opacity: 1,
                                color: "rgba(0, 0, 0, 0.52)",
                                dashArray: "3",
                                fillOpacity: 0.8
                            }
                        },
                        layers:{
                            baselayers:{
                                Constituency: {
                                    name: "Constituency",
                                    url: "/assets/img/transparent.png",
                                    type:"xyz"
                                }
                            },
                            overlays:{
                                facility:{
                                    name:"Facility Location",
                                    type:"group",
                                    visible: true
                                }
                            }
                        }
                    });
                })
                .error(function(error){
                    $scope.spinner = false;
                    $log.error(error);
                });

                /*Save geolocation details*/
                $scope.saveGeo = function (frm) {
                    var changes = formChanges.whatChanged(frm);
                    if(!_.isEmpty(changes)){
                        wrappers.facility_coordinates
                            .update($scope.facility.coordinates,changes)
                            .success(function (data) {
                                $scope.geo = data;
                            })
                            .error(function (error) {
                                $log.error(error);
                            });
                    }
                };

                /*update marker position*/
                $scope.checkLocation = function  (coords) {
                    angular.extend($scope,{
                        markers : {
                            mainMarker : {
                                layer:"facility",
                                lat:coords.coordinates[1],
                                lng:coords.coordinates[0],
                                message:"facility location"
                            }
                        }
                    });
                };
            });
        }]);

})(angular, _);
