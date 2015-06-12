(function (angular) {
    "use strict";

    angular.module("mfl.facilities.services", [
        "sil.api.wrapper"
    ])

    .service("mfl.facilities.wrappers", ["api", function (api) {
        this.facilities = api.setBaseUrl("api/facilities/facilities/");
        this.filterOptions = api.setBaseUrl("api/common/filtering_summaries/");
        this.constituencies = api.setBaseUrl("api/common/constituencies");
        this.facilitiesList = api.setBaseUrl("api/facilities/facilities_list");
        this.constituencies = api.setBaseUrl("api/common/constituencies");
        this.wards = api.setBaseUrl("api/common/wards");
        this.counties = api.setBaseUrl("api/common/counties");
        this.towns = api.setBaseUrl("api/common/towns");
        this.contact_types = api.setBaseUrl("api/common/contact_types/");
        this.contacts = api.setBaseUrl("api/common/contacts/");
        this.physical_address = api.setBaseUrl("api/common/address/");
        this.facility_contacts = api.setBaseUrl("api/facilities/contacts/");
        this.services = api.setBaseUrl("api/facilities/services/");
        this.option = api.setBaseUrl("api/facilities/options/");
        this.service_option = api.setBaseUrl("api/facilities/service_options/");
        this.facility_service = api.setBaseUrl("api/facilities/facility_services/");
        this.regulating_body = api.setBaseUrl("api/facilities/regulating_bodies/");
        this.regulation_status = api.setBaseUrl("api/facilities/regulation_status/");
        this.facility_unit = api.setBaseUrl("api/facilities/facility_units/");
        this.facility_upgrade = api.setBaseUrl("api/facilities/facility_upgrade/");
        this.facility_approval = api.setBaseUrl("api/facilities/facilitiy_approvals/");
        this.facility_operation_status = api.setBaseUrl("api/facilities/facility_operation_state/");
        this.facility_type = api.setBaseUrl("api/facilities/facility_types/");
        this.facility_status = api.setBaseUrl("api/facilities/facility_status/");
        this.officers = api.setBaseUrl("api/facilities/officers/");
        var getError =  function(error){
            return error.error_msg.error;
        };
        this.utils = function(){
            return {
                cleanFormData : function(data){
                    _.each(data, function(val, key){
                        if(_.isObject(val)){
                            data[key] = val.id;
                        }
                    });
                    return data;
                },
                createLock: function(stateParams, state){
                    if(_.isEmpty(stateParams.facilityId)){
                        state.go("facilities.create.basic");
                    }
                },
                resolvePromise: function(scope,scopeObj, key, promise){
                    promise.success(function(data){
                        scopeObj[key] = data.results||data;
                    }).error(function(error){
                        scope.alert = error.error_msg;
                    });
                },
                getError: getError,
                setActions: function(scope, stateParams, api, titles, actions){
                    if(!_.isUndefined(stateParams.id) && stateParams.id !== "create"){
                        scope.title = titles.create;
                        scope.action = _.union(actions.defaults,actions.edit);
                        api.get(stateParams.id).success(function(data){
                            scope.data = data;
                        }).error(function(error){
                            scope.alert = getError(error);
                        });
                    }
                    else if(!_.isUndefined(stateParams.id) &&stateParams.id === "create") {
                        scope.title = titles.create;
                        scope.actions = _.union(actions.defaults, actions.create);
                    }
                },
                create: function(data, api, scope, state, redirect_url){
                    api.create(data).success(function(){
                        state.go(redirect_url);
                    }).error(function(error){
                        scope.alert = getError(error);
                    });
                },
                update: function(id, frm, api, scope, state, redirect_url, formService){
                    var changes= formService.whatChanged(frm);
                    if(!_.isEmpty(changes)){
                        api.update(id, changes).success(function(){
                            state.go(redirect_url);
                        }).error(function(error){
                            scope.alert = this.getError(error);
                        });
                    }
                }
            };
        }();
    }]);

})(angular);
