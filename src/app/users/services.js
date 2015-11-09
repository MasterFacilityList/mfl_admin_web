(function (angular, _) {
    "use strict";

    angular.module("mfl.users.services", ["api.wrapper"])

    .service("mfl.users.services.wrappers", ["api", function (api) {
        this.groups = api.setBaseUrl("api/users/groups/");
        this.permissions = api.setBaseUrl("api/users/permissions/");
        this.users = api.setBaseUrl("api/users/");
        this.contact_types = api.setBaseUrl("api/common/contact_types/");
        this.user_contacts = api.setBaseUrl("api/common/user_contacts/");
        this.user_counties = api.setBaseUrl("api/common/user_counties/");
        this.counties = api.setBaseUrl("api/common/counties/");
        this.constituencies = api.setBaseUrl("api/common/constituencies/");
        this.user_constituencies = api.setBaseUrl("api/common/user_constituencies/");
        this.contacts = api.setBaseUrl("api/common/contacts/");
        this.regulatory_bodies = api.setBaseUrl("api/facilities/regulating_bodies/");
        this.regulatory_body_users = api.setBaseUrl("api/facilities/regulatory_body_users/");
        this.job_titles = api.setBaseUrl("api/facilities/job_titles/");
    }])
    .service("mfl.users.services.groups",[function () {
            this.filterGroups = function (user,grps) {
                // gets national admin permissions
                if(user === true){
                    grps = _.filter(grps,function (group) {
                        if (group.is_county_level === false){
                            return group;
                        }
                    });
                // gets county admin permissions
                } else {
                    grps = _.filter(grps,function (group) {
                        if (group.is_county_level === true){
                            return group;
                        }else if(group.is_sub_county_level === true){
                            return group;
                        }
                    });
                }
                return grps;
            };
            this.checkWhichGroup = function(usr_grps){
                var grp =_.pluck(usr_grps, "name");
                var grp_name = grp[0];
                if(_.isUndefined(grp[0])){
                    return null;
                }
                else if (grp_name.indexOf("County") > -1 ||
                grp_name.indexOf("Regulator") > -1) {
                    return grp_name;
                }
                else {
                    return "others";
                }
            };
        }
    ]);
})(window.angular, window._);
