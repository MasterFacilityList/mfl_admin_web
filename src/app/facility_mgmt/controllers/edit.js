(function(angular, _){
    "use strict";

    /**
     * @ngdoc module
     *
     * @name mfl.facility_mgmt.controllers.edit
     *
     * @description
     * Contains all the controllers used to manage the users
     */
    angular.module("mfl.facility_mgmt.controllers.edit", [
        "mfl.facility_mgmt.services",
        "mfl.auth.services",
        "720kb.datepicker",
        "angular-toasty",
        "ui.bootstrap.tpls",
        "mfl.common.forms",
        "leaflet-directive",
        "nemLogging",
        "mfl.common.constants"
    ])


    /**
     * @ngdoc controller
     *
     * @name mfl.facility_mgmt.controllers.service_helper
     *
     * @description
     * The helper controller to manage services in add/edit a facility
     */
    .controller("mfl.facility_mgmt.controllers.services_helper",
        ["$log", "mfl.facility_mgmt.services.wrappers", "mfl.error.messages",
        "$state", "toasty",
        function ($log, wrappers, errorMessages, $state, toasty) {
            var loadData = function ($scope) {
                wrappers.services.filter({page_size: 100, ordering: "name"})
                .success(function (data) {
                    $scope.services = data.results;
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.service_error = errorMessages.errors +
                    errorMessages.fetching_services;
                });

                wrappers.categories.filter({"fields": "id,name"})
                .success(function (data) {
                    $scope.categories = data.results;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });

                wrappers.options.list()
                .success(function (data) {
                    $scope.options = data.results;
                })
                .error(function (err) {
                    $scope.alert = err.error;
                });
            };

            var addServiceOption = function ($scope, so) {
                var payload = {
                    facility: $scope.facility_id,
                    selected_option: so
                };
                return wrappers.facility_services.create(payload)
                .success(function(data) {
                    $scope.facility.facility_services.push(data);
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.service_error = errorMessages.errors +
                    errorMessages.services;
                });
            };

            var removeServiceOption = function ($scope, fs) {
                return wrappers.facility_services.remove(fs.id)
                .success(function () {
                    $scope.facility.facility_services = _.without(
                        $scope.facility.facility_services, fs
                    );
                })
                .error(function(data){
                    $log.error(data);
                    $scope.service_error =  errorMessages.errors +
                        errorMessages.delete_services;
                });
            };

            this.bootstrap = function($scope) {
                loadData($scope);
                $scope.new_service = {
                    service: "",
                    option: ""
                };
                $scope.changeView = function (name) {
                    if($scope.create) {
                        $state.go("facilities.facility_create.services."+
                            name,{furthest: $scope.furthest,
                            facility_id : $scope.new_facility});
                    }else{
                        $state.go("facilities.facility_edit.services." + name);
                    }
                };
                $scope.optionNumber = function (services) {
                    _.each(services, function(serv_obj) {
                        serv_obj.serv_options = [];
                        serv_obj.serv_options = _.where(
                            $scope.options, {"group" : serv_obj.group});
                        serv_obj.option_no = serv_obj.serv_options.length;
                        if($scope.facility.facility_services.length > 0) {
                            _.each($scope.facility.facility_services,
                                function (fac_service) {
                                    if(fac_service.service_id === serv_obj.id)
                                    {
                                        serv_obj.fac_serv = fac_service.id;
                                        serv_obj.option = fac_service.option;
                                        serv_obj.option = serv_obj.option ?
                                        serv_obj.option :
                                        serv_obj.serv_options[1].id;
                                    }
                                });
                        }
                    });
                };
                $scope.showServices = function (cat) {
                    if(cat.selected === false) {
                        cat.selected = true;
                    }
                    else{
                        cat.selected = true;
                    }
                    _.each($scope.categories, function (one_cat) {
                        if(one_cat.selected === true &&
                            one_cat.id !== cat.id) {
                            one_cat.selected = !one_cat.selected;
                        }
                    });
                    $scope.cat_services = _.where(
                        $scope.services, {"category" : cat.id});
                    $scope.optionNumber($scope.cat_services);
                };
                $scope.services = [];
                $scope.service_options = [];

                $scope.addServiceOption = function (a) {
                    addServiceOption($scope, a).then(function () {
                        $scope.new_service.service = "";
                        $scope.new_service.option = "";
                    });
                };
                $scope.removeChild = function (a) {
                    removeServiceOption($scope, a);
                };
                $scope.fac_serv = {
                    services : []
                };
                $scope.service_display = [];
                $scope.removeOption = function (serv_obj) {
                    if(_.isUndefined(serv_obj.fac_serv)){
                        serv_obj.option = "";
                        $scope.service_display = _.without($scope.service_display, serv_obj);
                    }else{
                        wrappers.facility_services.remove(serv_obj.fac_serv)
                        .success(function () {
                            toasty.success({
                                title: "Facility Services",
                                msg: "Service successfully deleted"
                            });
                            serv_obj.option = "";
                        })
                        .error(function (data) {
                            $scope.errors = data;
                        });
                    }
                };
                $scope.servicesDisplay = function (obj) {
                    if(_.where($scope.service_display, obj).length > 0) {
                        if(_.isEmpty(obj.option) || _.isUndefined(obj.option)){
                            $scope.service_display = _.without($scope.service_display, obj);
                        }
                    }else{
                        if(!_.isEmpty(obj.option) || obj.option === true){
                            $scope.service_display.push(obj);
                        }
                    }
                };
                $scope.facilityServices = function () {
                    _.each($scope.services, function (service_obj) {
                        if(!_.isUndefined(service_obj.option) &&
                            !_.isEmpty(service_obj.option)) {
                            $scope.fac_serv.services.push({
                                service : service_obj.id,
                                option : service_obj.option
                            });
                        }
                        if(!_.isUndefined(service_obj.option) &&
                            service_obj.option === true){
                            $scope.fac_serv.services.push({
                                service : service_obj.id
                            });
                        }
                    });
                    _.each($scope.facility.facility_services,
                        function (facility_service) {
                            var obj = _.findWhere($scope.fac_serv.services,
                                {"service" : facility_service.service_id});
                            $scope.fac_serv.services =
                                _.without($scope.fac_serv.services, obj);
                        });
                    wrappers.facilities.update($scope.facility_id,
                        $scope.fac_serv)
                        .success(function () {
                            if(!$scope.create){
                                $scope.prompt_msg = true;
                            }else{
                                $state.go("facilities.facility_create."+
                                    "facility_cover_letter", {facility_id :
                                    $scope.new_facility}, {reload : true});
                            }
                        })
                        .error(function (err) {
                            $scope.errors = err.error;
                        });
                };
                $scope.upgradePrompt = function () {
                    var update_msg = {
                        title : "Facility Updated",
                        msg : "Facility successfully updated"
                    };
                    toasty.success(update_msg);
                    $state.go("facilities");
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

    /**
     * @ngdoc controller
     *
     * @name mfl.facility_mgmt.controllers.facility_edit
     *
     * @description
     * Parent controller used throughout the editing steps of a facility
     */
    .controller("mfl.facility_mgmt.controllers.facility_edit",
        ["$scope", "$q", "$log", "$stateParams", "mfl.facility_mgmt.services.wrappers",
        "mfl.facility.multistep.service", "$state", "mfl.error.messages",
        function ($scope, $q, $log, $stateParams, wrappers,
            facilityMultistepService, $state, errorMessages) {
            $scope.facility_id = $stateParams.facility_id;
            $scope.create = false;
            $scope.spinner = true;
            $scope.updown = false;
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
                        {facility_id : $scope.facility_id}, {reload: true});
            };
            wrappers.facilities.get($scope.facility_id)
                .success(function(data){
                    $scope.spinner = false;
                    $scope.facility = data;
                    $scope.owner_typeid = $scope.facility.owner_type;
                    $scope.select_values = {
                        ward: {
                            "id": $scope.facility.ward,
                            "name": $scope.facility.ward_name
                        },
                        facility_type: {
                            "id": $scope.facility.facility_type,
                            "name": $scope.facility.facility_type_name
                        },
                        facility_type_details: {
                            "id": $scope.facility.facility_type,
                            "name": $scope.facility.facility_type_name
                        },
                        owner: {
                            "id": $scope.facility.owner,
                            "name": $scope.facility.owner_name
                        },
                        owner_type: {
                            "id" : $scope.facility.owner_type,
                            "name" : $scope.facility.owner_type_name
                        },
                        operation_status: {
                            "id": $scope.facility.operation_status,
                            "name": $scope.facility.operation_status_name
                        },
                        regulatory_body: {
                            "id": $scope.facility.regulatory_body,
                            "name": $scope.facility.regulatory_body_name
                        },
                        keph_level: {
                            "id": $scope.facility.keph_level,
                            "name": $scope.facility.keph_level_name
                        },
                        sub_county: {
                            "id": $scope.facility.sub_county,
                            "name": $scope.facility.sub_county_name
                        },
                        town: {
                            "id": $scope.facility.town,
                            "name": $scope.facility.town_name
                        }
                    };
                    if($scope.facility.hasOwnProperty
                        ("officer_in_charge") && !_.isNull($scope.facility.officer_in_charge)){
                        $scope.off_contacts =
                            $scope.facility.officer_in_charge.contacts;
                    }
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.spinner = false;
                    $scope.error = errorMessages.errors +
                    errorMessages.facility_details;
                });

            $scope.selectReload = function (wrapper, search_term, scope_var, extra_filters) {
                if (! _.isString(search_term)) {
                    return $q.reject();
                }
                var filters = _.isEmpty(search_term) ? {} : {"search_auto": search_term};
                return wrapper.filter(_.extend(filters, extra_filters))
                .success(function (data) {
                    $scope[scope_var] = data.results;
                })
                .error(function (data) {
                    $log.error(data);
                });
            };
            $scope.remove = function () {
                wrappers.facilities.update($scope.facility_id, {"is_active": false})
                .success(function () {
                    $state.go("facilities");
                })
                .error(function (error) {
                    $log.error(error);
                    $scope.error = errorMessages.errors +
                    errorMessages.facility_details;
                });
            };
            $scope.cancel = function () {
                $state.go("facilities.facility_edit",{facility_id:$scope.facility_id});
            };
            $scope.printFacility = wrappers.printFacility;
            $scope.nxtState = true;
            $scope.setNxt = function (arg) {
                $scope.nxtState = arg;
            };
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.facility_mgmt.controllers.facility_edit.close
     *
     * @description
     * Controller used to close a facility
     */
    .controller("mfl.facility_mgmt.controllers.facility_edit.close",
            ["$scope","mfl.facility_mgmt.services.wrappers","$stateParams",
             "mfl.common.forms.changes","$state", "toasty",
            function ($scope,wrappers,$stateParams,formChanges,$state,toasty) {
            var value = new Date();
            $scope.maxDate = value.getFullYear() + "/" + (value.getMonth()+1) +
            "/" + value.getDate();
            $scope.close = function (frm) {
                var changes = formChanges.whatChanged(frm);
                wrappers.facilities.update($stateParams.facility_id,changes)
                .success(function (data) {
                    $scope.facility = data;
                    toasty.success({
                        title: "Facility",
                        msg: "Facility successfully closed"
                    });
                    $state.go("facilities");
                })
                .error(function (err) {
                    $scope.errors = err;
                });
            };
        }])

    .controller("mfl.facility_mgmt.controllers.facility_edit.basic",
        ["$scope", "$log", "$state", "$stateParams",
        "mfl.facility_mgmt.services.wrappers", "mfl.common.forms.changes",
        "mfl.common.services.multistep", "mfl.auth.services.login",
        "mfl.error.messages", "toasty","MFL_GUIDE_URL",
        function ($scope, $log, $state, $stateParams, wrappers, formChanges,
            multistepService, loginService, errorMessages, toasty,MFL_GUIDE_URL) {
            /*Set up facility officer*/
            $scope.facilityOfficers = function (f) {
                if(_.isUndefined(f.officer_in_charge) || _.isNull(f.officer_in_charge)) {
                    $scope.facility.officer_in_charge = {
                        name : "",
                        reg_no : "",
                        contacts : [
                            {
                                type : "",
                                contact : ""
                            }
                        ]
                    };
                }
            };
            $scope.MFL_GUIDE_URL = MFL_GUIDE_URL;
            if(!$scope.create) {
                multistepService.filterActive(
                    $scope, $scope.steps, $scope.steps[0]);
            } else {
                $scope.$parent.print = false;
                $scope.nextState();
                $scope.facilityOfficers($scope.facility);
            }
            $scope.initUniqueName = function(frm) {
                if(_.isUndefined($scope.facility.name)) {
                    $scope.facility.name = $scope.facility.official_name;
                    frm.name.$setViewValue($scope.facility.name);
                    frm.name.$render();
                }
            };
            $scope.contacts = [{type: "", contact : ""}];
            $scope.login_user = loginService.getUser();
            $scope.selectReload(wrappers.facility_owners, "", "owners");
            $scope.selectReload(wrappers.facility_owner_types, "",
                "owner_types");
            $scope.selectReload(wrappers.operation_status, "", "operation_status");
            $scope.selectReload(wrappers.keph_levels, "", "keph_levels");
            $scope.selectReload(
                wrappers.wards, "", "wards", {"constituency": $scope.login_user.constituency}
            );
            $scope.selectReload(wrappers.regulating_bodies, "", "regulating_bodies");
            $scope.selectReload(wrappers.facility_types, "", "facility_types");
            $scope.selectReload(wrappers.towns, "", "towns");
            $scope.selectReload(wrappers.sub_counties, "", "sub_counties");
            $scope.save = function (frm) {
                $scope.finish = ($scope.nxtState ? "facilities" :
                    "facilities.facility_edit.geolocation");
                var changes = formChanges.whatChanged(frm);
                $scope.facility.ward = $scope.select_values.ward;
                $scope.facility.keph_level = $scope.select_values.keph_level;
                $scope.facility.facility_type = $scope.select_values.facility_type;
                $scope.facility.owner = $scope.select_values.owner;
                $scope.facility.operation_status = $scope.select_values.operation_status;
                $scope.facility.regulatory_body = $scope.select_values.regulatory_body;
                $scope.facility.town = $scope.select_values.town;
                $scope.facility.sub_county = $scope.select_values.sub_county;
                if($scope.create) {
                    $scope.setFurthest(2);
                    if(_.isEmpty($state.params.facility_id)) {
                        wrappers.facilities.create($scope.facility)
                        .success(function (data) {
                            $state.go("facilities.facility_create.geolocation",
                            {facility_id : data.id,
                            furthest : $scope.furthest}, {reload : true});
                        })
                        .error(function (data) {
                            $log.error(data);
                            $scope.errors = data;
                            $scope.basic_error = errorMessages.errors+ errorMessages.data;
                        });
                    }
                    else {
                        wrappers.facilities.update(
                            $state.params.facility_id, changes)
                        .success(function () {
                            $state.go(
                                "facilities.facility_create.geolocation",
                                {facility_id : $state.params.facility_id,
                                    furthest : $scope.furthest},
                                    {reload : true});
                        })
                        .error(function (data) {
                            $log.error(data);
                            $scope.errors = data;
                            $scope.basic_error = errorMessages.errors+errorMessages.data;
                        });
                    }
                } else {
                    changes.officer_in_charge = $scope.facility.officer_in_charge;
                    wrappers.facilities.update($scope.facility_id, changes)
                    .success(function () {
                        if($scope.nxtState){
                            toasty.success({
                                title: "Facility",
                                msg: "Facility successfully updated"
                            });
                        }
                        $state.go($scope.finish,
                        {facility_id:$scope.facility_id}, {reload : true});
                    })
                    .error(function (data) {
                        $log.error(data);
                        $scope.errors = data;
                        $scope.basic_error = errorMessages.errors+ errorMessages.data;
                    });
                }
            };
            /*Job Titles*/
            wrappers.job_titles.filter({"fields":"id,name"})
            .success(function (data) {
                $scope.job_titles = data.results;
            })
            .error(function (error) {
                $log.error(error);
            });
            /*contact types*/
            wrappers.contact_types.filter({"fields":"id,name"})
            .success(function(data){
                $scope.contact_types = data.results;
            })
            .error(function(error){
                $log.error(error);
            });
            $scope.addOfficerContact = function () {
                $scope.facility.officer_in_charge.contacts.push({
                    type : "",
                    contact : ""
                });
            };
            $scope.removeOfficerContact = function (obj) {
                if(_.isUndefined(obj.officer_contact_id)){
                    $scope.facility.officer_in_charge.contacts =
                        _.without($scope.facility.officer_in_charge.contacts, obj);
                }else{
                    wrappers.officer_contacts.remove(obj.officer_contact_id)
                    .success(function (){
                        wrappers.contacts.remove(obj.contact_id)
                        .success(function () {
                            $scope.facility.officer_in_charge.contacts =
                            _.without(
                            $scope.facility.officer_in_charge.contacts, obj);
                        })
                        .error(function (data) {
                            $scope.errors = data;
                        });
                    })
                    .error(function (data) {
                        $scope.errors = data;
                    });
                }
            };
            $scope.$watch("facility", function (f) {
                if (_.isUndefined(f)){
                    return;
                }
                $scope.facilityOfficers(f);
            });
        }]
    )

    /**
     * @ngdoc controller
     *
     * @name mfl.facility_mgmt.controllers.facility_edit.contacts
     *
     * @description
     * Controller used to add/edit contacts of a facility
     */
    .controller("mfl.facility_mgmt.controllers.facility_edit.contacts",
        ["$scope", "$log", "$stateParams",
        "mfl.facility_mgmt.services.wrappers",  "mfl.error.messages", "$state",
        "toasty",
        function($scope,$log,$stateParams,wrappers, errorMessages, $state, toasty){
            if($scope.create) {
                $scope.nextState();
                $scope.$parent.print = false;
            }
            $scope.contacts = [];
            $scope.contact = {
                contact_type: "",
                contact: ""
            };
            $scope.detailed_contacts = [];
            /*Set up facility contacts*/
            $scope.facilityContacts = function (f) {
                if(f.contacts.length < 1) {
                    $scope.detailed_contacts.push({
                        contact_type : "",
                        contact : ""
                    });
                }
            };
            $scope.addContact = function () {
                $scope.detailed_contacts.push({
                    contact_type : "",
                    contact : ""
                });
            };
            $scope.removeContact = function (obj) {
                if(_.isUndefined(obj.id)){
                    $scope.detailed_contacts =
                        _.without($scope.detailed_contacts, obj);
                }
                else {
                    var fac_delcont = _.findWhere($scope.fac_contacts, {"contact" : obj.id});
                    $scope.removeChild(fac_delcont);
                }
            };
            $scope.createContact = function () {
                $scope.finish = ($scope.nxtState ? "facilities" :
                    "facilities.facility_edit.units");
                if(!_.isEmpty($scope.fac_contobj.contacts)){
                    wrappers.facilities.update($scope.facility_id, $scope.fac_contobj)
                    .success(function () {
                        if(!$scope.create){
                            toasty.success({
                                title: "Facility",
                                msg: "Facility contacts successfully updated"
                            });
                            $state.go($scope.finish, {reload : true});
                        }else{
                            $scope.goToNext(4, "units");
                        }
                    })
                    .error(function (err) {
                        $scope.alert = err.error;
                        $scope.errors = err;
                    });
                } else {
                    if(!$scope.create){
                        $state.go($scope.finish, {reload : true});
                    }else{
                        $scope.goToNext(4, "units");
                    }
                }
            };
            $scope.saveContacts = function () {
                $scope.fac_contobj = {contacts : []};
                _.each($scope.detailed_contacts, function (a_contact) {
                    if(_.isUndefined(a_contact.id)){
                        $scope.fac_contobj.contacts.push(a_contact);
                    }
                });
                $scope.createContact();
            };
            $scope.$watch("facility", function (f) {
                if (_.isUndefined(f)){
                    return;
                }
                if(f.hasOwnProperty("contacts")){
                    $scope.facilityContacts(f);
                }
            });
            /*contact types*/
            wrappers.contact_types.filter({"fields":"id,name"})
            .success(function(data){
                $scope.contact_types = data.results;
            })
            .error(function(error){
                $scope.errors = error;
            });

            /*facility contacts*/
            wrappers.facility_contacts.filter({facility:$stateParams.facility_id})
            .success(function(data){
                $scope.fac_contacts = data.results;
                _.each($scope.fac_contacts, function (cont) {
                    wrappers.contacts.get(cont.contact)
                        .success(function (data) {
                            $scope.detailed_contacts.push(data);
                        })
                        .error(function (err) {
                            $scope.errors = err;
                        });
                });
            })
            .error(function(error){
                $scope.errors = error;
                $scope.cont_error = errorMessages.errors +
                    errorMessages.fetch_contacts;
            });

            /*remove contact*/
            $scope.removeChild = function (obj) {
                obj.delete_spinner = true;
                wrappers.facility_contacts.remove(obj.id)
                .success(function () {
                    wrappers.contacts.remove(obj.contact)
                    .success(function () {
                        var delcont = _.findWhere($scope.detailed_contacts,
                            {"id" : obj.contact});
                        $scope.detailed_contacts =
                        _.without($scope.detailed_contacts, delcont);
                        $scope.fac_contacts =
                        _.without($scope.fac_contacts, obj);
                        toasty.success({
                                title: "Facility Contacts",
                                msg: "Contact successfully deleted"
                            });
                        obj.delete_spinner = false;
                    })
                    .error(function (data) {
                        $scope.errors = data;
                        obj.delete_spinner = false;
                        $scope.cont_error = errorMessages.errors +
                            errorMessages.contacts;
                    });
                })
                .error(function (data) {
                    $scope.errors = data;
                    obj.delete_spinner = false;
                    $scope.cont_error = errorMessages.errors +
                        errorMessages.contacts;
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
                        $scope.errors = data;
                        $scope.cont_error = errorMessages.errors +
                            errorMessages.contacts;
                    });
                })
                .error(function (data) {
                    $log.error(data);
                    $scope.spinner = false;
                    $scope.errors = data;
                    $scope.cont_error = errorMessages.errors +
                        errorMessages.contacts;
                });
            };
        }]
    )

    .controller("mfl.facility_mgmt.controllers.facility_edit.services",
        ["$scope", "$controller",
        function ($scope, $controller) {
            var helper = $controller("mfl.facility_mgmt.controllers.services_helper");
            helper.bootstrap($scope);
            if($scope.create) {
                $scope.nextState();
                $scope.$parent.print = false;
            }
            $scope.filters = {facility : $scope.facility_id};
        }]
    )

        /**
         * @ngdoc controller
         *
         * @name mfl.facility_mgmt.controllers.facility_edit.units
         *
         * @description
         * Controller used to add/edit departments/units of a facility
    */
    .controller("mfl.facility_mgmt.controllers.facility_edit.units",
        ["$scope", "$log", "$stateParams",
        "mfl.facility_mgmt.services.wrappers", "mfl.common.services.multistep",
        "mfl.error.messages", "$state", "toasty",
        function ($scope, $log, $stateParams, wrappers, multistepService,
            errorMessages, $state, toasty) {
            if(!$scope.create) {
                multistepService.filterActive(
                    $scope, $scope.steps, $scope.steps[4]);
            }else{
                $scope.nextState();
                $scope.$parent.print = false;
            }
            $scope.fac_depts = [];
            $scope.fac_units = [];
            /*Facility departments*/
            wrappers.facility_depts.filter({fields: "id,name,regulatory_body,regulatory_body_name"
            }).success(function (data) {
                $scope.facility_depts = data.results;
            }).error(function (data) {
                $scope.errors = data;
            });
            /*regulating bodies*/
            wrappers.regulating_bodies.filter({fields:"id,name"})
            .success(function(data){
                $scope.regbodies = data.results;
            })
            .error(function(error){
                $scope.errors = error;
            });
            /*facility units*/
            wrappers.facility_units.filter({
                facility: $scope.facility_id,
                fields:"id,name,regulating_body,regulating_body_name"
            })
            .success(function(data){
                $scope.facility_departments = data.results;
            })
            .error(function(error){
                $log.error(error);
                $scope.errors = error;
                $scope.units_error = errorMessages.errors +
                    errorMessages.fetch_units;
            });
            $scope.autoFillRegBody = function (fac_dept) {
                var result = _.findWhere($scope.facility_depts, {"id" : fac_dept.unit});
                fac_dept.regulating_body_name = result.regulatory_body_name;
            };
            $scope.dept_spinner = true;
            $scope.facilityUnits = function (f) {
                if(f.facility_units.length === 0) {
                    $scope.dept_spinner = false;
                    $scope.fac_depts.push({
                        unit : "",
                        regulating_body_name : ""
                    });
                }
                else{
                    $scope.dept_spinner = false;
                    $scope.fac_depts = f.facility_units;
                }
            };
            $scope.addUnit = function () {
                $scope.fac_depts.push({
                    unit : "",
                    regulating_body_name : ""
                });
            };
            $scope.removeUnit = function (obj) {
                if(_.isUndefined(obj.id)) {
                    $scope.fac_depts = _.without($scope.fac_depts, obj);
                }
            };
            $scope.createUnit = function (arg) {
                $scope.nxtState = arg;
                $scope.finish = ($scope.nxtState ? "facilities" :
                    "facilities.facility_edit.services");
                if(!_.isEmpty($scope.fac_unitobj.units)){
                    wrappers.facilities.update($scope.facility_id, $scope.fac_unitobj)
                    .success(function () {
                        if(!$scope.create){
                            toasty.success({
                                title: "Facility",
                                msg: "Facility regulation successfully updated"
                            });
                            $state.go($scope.finish);
                        }else{
                            $scope.goToNext(5, "services");
                        }
                    })
                    .error(function (err) {
                        $scope.alert = err.error;
                        $scope.errors = err;
                    });
                } else {
                    if(!$scope.create){
                        $state.go($scope.finish);
                    }else{
                        $scope.goToNext(5, "services");
                    }
                }
            };
            $scope.saveUnits = function (arg) {
                $scope.fac_unitobj = {units : []};
                _.each($scope.fac_depts, function (a_unit) {
                    if(_.isUndefined(a_unit.id)){
                        $scope.fac_unitobj.units.push(a_unit);
                    }
                });
                $scope.createUnit(arg);
            };
            $scope.$watch("facility", function (f) {
                if (_.isUndefined(f)){
                    return;
                }
                if(f.hasOwnProperty("facility_units")){
                    $scope.facilityUnits(f);
                }
            });
            /*add existing regulatory to facility*/
            $scope.add = function () {
                $scope.spinner = true;
                wrappers.facility_units.create({
                        "facility": $scope.facility_id,
                        "regulating_body": $scope.facility_unit.regulating_body,
                        "name": $scope.facility_unit.name,
                        "description": $scope.facility_unit.name
                    })
                    .success(function (data) {
                        $scope.fac_units.push(data);
                        $scope.spinner = false;
                    })
                    .error(function (data) {
                        $log.error(data);
                        $scope.spinner = false;
                        $scope.errors = data;
                        $scope.units_error = errorMessages.errors +
                            errorMessages.units;
                    });
            };

            /*remove facility unit*/
            $scope.removeChild = function (obj) {
                if(_.isUndefined(obj.id)) {
                    $scope.fac_depts = _.without($scope.fac_depts, obj);
                }else {
                    obj.delete_spinner = true;
                    wrappers.facility_units.remove(obj.id)
                    .success(function () {
                        $scope.fac_depts = _.without($scope.fac_depts, obj);
                        toasty.success({
                            title: "Facility Regulation",
                            msg: "Regulation successfully deleted"
                        });
                        obj.delete_spinner = false;
                    })
                    .error(function (data) {
                        $log.error(data);
                        obj.delete_spinner = false;
                        $scope.units_error = errorMessages.errors +
                            errorMessages.delete_units;
                    });
                }
            };
        }
    ])

    /**
         * @ngdoc controller
         *
         * @name mfl.facility_mgmt.controllers.facility_edit.setup
         *
         * @description
         * Controller used to add/edit setup of a facility
    */
    .controller("mfl.facility_mgmt.controllers.facility_edit.setup",
        ["$scope","mfl.facility_mgmt.services.wrappers","$log",
        "mfl.common.forms.changes","$state", "mfl.common.services.multistep",
        function ($scope, wrappers, $log, formChanges, $state,
            multistepService) {
            /*Update operation setup details*/
            if(!$scope.create){
                multistepService.filterActive(
                    $scope, $scope.steps, $scope.steps[3]);
            }
            else {
                $scope.nextState();
            }
            $scope.updateOp = function (opFrm) {
                var changed = formChanges.whatChanged(opFrm);
                opFrm.facility = $scope.facility_id;
                $scope.spinner1 = true; //show spinner
                if (! _.isEmpty(changed)) {
                    wrappers.facilities.update($scope.facility_id, changed)
                        .success(function (data) {
                            $scope.spinner1 = false;
                            $scope.geo = data;

                            if(!$scope.create){
                                $state.go("facilities.facility_edit.officers",
                                {"facility_id": $scope.facility_id}, {reload: true});
                            }else{
                                $scope.goToNext(5, "officers");
                            }
                        })
                        .error(function (error) {
                            $scope.spinner1 = false;
                            $log.error(error);
                        });
                }
                else {
                    if(!$scope.create){
                        $state.go("facilities.facility_edit.officers",
                        {"facility_id": $scope.facility_id}, {reload: true});
                    }else{
                        $scope.goToNext(5, "officers");
                    }
                }
            };
        }])

        /**
         * @ngdoc controller
         *
         * @name mfl.facility_mgmt.controllers.facility_edit.geolocation
         *
         * @description
         * Controller used to add/edit geolation details of a facility
    */
    .controller("mfl.facility_mgmt.controllers.facility_edit.geolocation",
        ["$scope", "mfl.facility_mgmt.services.wrappers", "$log","leafletData",
        "mfl.common.services.multistep", "mfl.common.forms.changes", "$state",
        "mfl.error.messages", "toasty",
        function ($scope,wrappers,$log, leafletData, multistepService,
            formChanges, $state, errorMessages, toasty) {
            var value = new Date();
            $scope.maxDate = value.getFullYear() + "/" + (value.getMonth()+1) +
            "/" + value.getDate();
            if(!$scope.create) {
                multistepService.filterActive(
                    $scope, $scope.steps, $scope.steps[1]);
            }else{
                $scope.nextState();
                $scope.$parent.print = false;
            }
            $scope.geo = {
                coordinates : {
                    coordinates : []
                }
            };
            angular.extend($scope, {
                defaults: {
                    scrollWheelZoom: false
                },
                layers:{},
                tiles:{
                    openstreetmap: {
                        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                        options: {
                            opacity: 0.2
                        }
                    }
                }
            });
            //gets facility coordinates
            $scope.getFacilityCoordinates = function (f) {
                //facility's coordinates
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
                            "id": f.town,
                            "name": f.town_name
                        }
                    };
                    angular.extend($scope,{
                        markers: {
                            mainMarker: {
                                layer:"facility",
                                lat: data.coordinates.coordinates[1],
                                lng: data.coordinates.coordinates[0],
                                message: f.name,
                                draggable: true
                            }
                        }
                    });
                })
                .error(function(error){
                    $scope.spinner = false;
                    $scope.errors = error;
                    $log.error(error);
                    $scope.geocodes_error = errorMessages.errors +
                                        errorMessages.geocodes;
                });
            };
            //get facility ward and draw its map
            $scope.facilityWard = function (f) {
                //ward coordinates
                wrappers.wards.get(f.ward)
                .success(function(data){
                    $scope.spinner = false;
                    $scope.ward_gis = data.ward_boundary;
                    leafletData.getMap("wardmap")
                        .then(function (map) {
                            var coords = data.ward_boundary.properties.bound.coordinates[0];
                            $scope.center = data.ward_boundary.properties.center;
                            var bounds = _.map(coords, function(c) {
                                return [c[1], c[0]];
                            });
                            map.fitBounds(bounds);
                            //has to be there for marker to appear
                            if(!_.isNull(f.coordinates)) {
                                $scope.getFacilityCoordinates(f);
                            }else{
                                $scope.geo.coordinates =
                                $scope.center;
                                angular.extend($scope,{
                                    markers: {
                                        mainMarker: {
                                            layer:"facility",
                                            lat: $scope.geo.coordinates.coordinates[1],
                                            lng: $scope.geo.coordinates.coordinates[0],
                                            message: f.name,
                                            draggable: true
                                        }
                                    }
                                });
                            }
                        });
                    var gis = data.ward_boundary;
                    // setup data for the map
                    angular.extend($scope, {
                        geojson: {
                            data: gis,
                            style: {
                                fillColor: "rgba(255, 135, 32, 0.76)",
                                weight: 2,
                                opacity: 1,
                                color: "rgba(0, 0, 0, 0.52)",
                                dashArray: "5",
                                fillOpacity: 0.5
                            }
                        },
                        layers:{
                            baselayers:{
                                googleRoadmap: {
                                    name: "Google Streets",
                                    layerType: "ROADMAP",
                                    type: "google"
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
                    $scope.errors = error;
                    $scope.wards_error = errorMessages.errors +
                        errorMessages.ward;
                });
            };
            /*Fetch geo code methods*/
            wrappers.geo_code_methods.filter({"fields":"id,name"})
                .success(function (data) {
                    $scope.geo_methods = data.results;
                })
                .error(function(error){
                    $log.error(error);
                    $scope.errors = error;
                });
            //if create go to create or edit state
            $scope.toState = function (arg) {
                if($scope.create){
                    $scope.goToNext(3, "contacts");
                }else{
                    $scope.nxtState = arg;
                    $scope.finish = ($scope.nxtState ? "facilities" :
                    "facilities.facility_edit.contacts");
                    if($scope.nxtState) {
                        toasty.info({
                            title: "Facility",
                            msg: "Facility geolocation successfully updated"
                        });
                    }
                    $state.go($scope.finish,
                        {"facility_id": $scope.facility_id},
                        {reload: true});
                }
            };
            /*Fetch geo code sources*/
            wrappers.geo_code_sources.filter({"fields":"id,name"})
                .success(function (data) {
                    $scope.geo_sources = data.results;
                })
                .error(function(error){
                    $log.error(error);
                    $scope.errors = error;
                });
            //Save geolocation details
            $scope.saveGeo = function (frm, arg) {
                var spinner1 = true;
                var changes = formChanges.whatChanged(frm);
                /*if(!_.isEmpty(changes)){*/
                var fac_id = $scope.facility_id || $state.params.facility_id;
                /*changes.coordinates = [];*/
                changes.facility = fac_id;
                changes.coordinates = {
                    type : "Point",
                    coordinates : [$scope.geo.coordinates.coordinates[0],
                    $scope.geo.coordinates.coordinates[1]]
                };
                if(!_.isNull($scope.facility.coordinates)) {
                    wrappers.facility_coordinates
                        .update($scope.facility.coordinates,changes)
                        .success(function (data) {
                            spinner1 =false;
                            $scope.geo = data;
                            $scope.toState(arg);
                        })
                        .error(function (error) {
                            spinner1 =false;
                            $log.error(error);
                            $scope.errors = error;
                            $scope.geoloc_error = error[0] ||
                                errorMessages.errors +
                                errorMessages.geolocation;
                        });
                } else {
                    wrappers.facility_coordinates.create(changes)
                    .success(function (data) {
                        wrappers.facilities.update(
                            fac_id, {"coordinates" : data.id})
                            .success(function () {
                                $scope.toState(arg);
                            })
                            .error(function (error) {
                                $log.error(error);
                                $scope.errors = error;
                                $scope.geoloc_error = errorMessages.errors +
                                    errorMessages.geolocation;
                            });
                    })
                    .error(function (error) {
                        $log.error(error);
                        $scope.errors = error;
                        $scope.geoloc_error = errorMessages.errors +
                            errorMessages.geolocation;
                    });
                }
            };
            //update marker position
            $scope.checkLocation = function  () {
                angular.extend($scope,{
                    markers : {
                        mainMarker : {
                            layer:"facility",
                            lat:$scope.geo.coordinates.coordinates[1],
                            lng:$scope.geo.coordinates.coordinates[0],
                            message:"facility location"
                        }
                    }
                });
            };
            // update coordinates after dragging marker
            $scope.$on("leafletDirectiveMarker.wardmap.dragend", function (e, args) {
                $scope.geo.coordinates.coordinates = [args.model.lng,args.model.lat];
            });
            /*Wait for facility to be defined*/
            $scope.$watch("facility", function (f) {
                if (_.isUndefined(f)){
                    return;
                }
                //draw facility on the map
                if(f.hasOwnProperty("ward")){
                    $scope.facilityWard(f);
                }
            });
        }]);

})(window.angular, window._);
