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
        this.facility_contacts = api.setBaseUrl("api/facilities/contacts/");
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
                        safeApply(scope);
                    }).error(function(error){
                        scope.alert = error.error_msg;
                    });
                },
                getError: function(error){
                    return error.error_msg.error;
                }
            };
        }();
    }]);

})(angular);
