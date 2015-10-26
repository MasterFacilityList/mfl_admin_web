(function (angular, _) {
    "use strict";

    /*
     * @ngdoc module
     *
     * @name mfl.auth.services
     *
     * @description
     * Module containing common auth services
     */

    angular.module("mfl.auth.services", [
        "api.wrapper",
        "mfl.auth.oauth2",
        "mfl.auth.permissions",
        "ui.router"
    ])

    /**
     * @ngdoc service
     *
     * @name mfl.auth.services.login
     *
     * @description
     * Auth login service
     * Handles logins, logouts, fetching current user
     */
    .service("mfl.auth.services.login", ["api", "$window", "$q", "api.oauth2",
        function (API, $window, $q, oauth2) {
            var url = {
                curr_user : "api/rest-auth/user/"
            };
            var store_keys = {
                "user": "auth.user",
                "state": "state.dump"
            };

            var api = API.getApi();
            var storage = $window.localStorage;

            /**
             * @name login
             *
             * @description
             * Authenticate user details
             *
             * @param {Object} user - user details containing username & password
             * @returns {Promise}
             */
            this.login = function (user) {
                return oauth2.fetchToken(user.username, user.password);
            };

            /**
             * @name currentUser
             *
             * @description
             * Fetches details of the current user from server
             *
             * @returns {Promise}
             */
            this.currentUser = function () {
                return api.callApi("GET", api.makeUrl(url.curr_user))
                    .success(function (data) {
                        storage.setItem(store_keys.user, JSON.stringify(data));
                    });
            };

            /**
             * @name getUser
             *
             * @description
             * Retrieve user details from localStorage
             *
             * @returns {Object|null} If user details are present, an object else null
             */
            this.getUser = function() {
                return JSON.parse(storage.getItem(store_keys.user));
            };


            /**
             * @name isLoggedIn
             *
             * @description
             * Checks if there is a loggedin user and the session is still valid
             *
             * @returns {boolean}
             */
            this.isLoggedIn = function () {
                var user = this.getUser();
                var has_token = oauth2.getToken();
                return (! _.isNull(user)) && (! _.isNull(has_token));
            };

            /**
             *
             * @name logout
             *
             * @description
             * Logout current user by removing user details and revoking user's token
             *
             * @returns {Promise} Token revocation promise
             */
            this.logout = function () {
                storage.removeItem(store_keys.user);
                return oauth2.revokeToken(oauth2.getToken());
            };

            /**
             * @name clearState
             *
             * @description
             * A helper function to clear any saved states
             */
            this.clearState = function () {
                return storage.removeItem(store_keys.state);
            };

            /**
             * @name loadState
             *
             * @description
             * Load the state information before timeout.
             * The state is returned only if the user timedout is the same user that
             * loggedin
             *
             * @returns {Object|null} The (state + params) before timeout or null
             */
            this.loadState = function () {
                var user = this.getUser();
                if (user) {
                    var dump = JSON.parse(storage.getItem(store_keys.state));
                    if (dump.user === user.id) {
                        return {
                            "name": dump.name,
                            "params": dump.params
                        };
                    }
                }
                return null;
            };

            /**
             *
             * @name dumpState
             *
             * @description
             * Dump the current state to localstorage just before timeout, if a user exists.
             *
             * @param {string} state - The state before timeout
             * @param {string} params - The params of the state before timeout
             */
            this.dumpState = function (state, params) {
                var user = this.getUser();
                if (user) {
                    var state_dump = {
                        "name": state.name,
                        "params": params,
                        "user": user.id
                    };
                    storage.setItem(store_keys.state, JSON.stringify(state_dump));
                }
            };
        }
    ])

    /**
     * @ngdoc service
     *
     * @name mfl.auth.services.statecheck
     *
     * @description
     * Handles various state management issues e.g. authorization, redirection
     */
    .service("mfl.auth.services.statecheck",
        ["$rootScope", "$injector", "mfl.auth.services.login",
        "mfl.auth.permissions.checker", "HOME_PAGE_NAME",
        function ($rootScope, $injector, loginService, permChecker, HOME_PAGE_NAME) {
            var cancel_listen;

            /**
             * @name change_state
             *
             * @description
             * Helper function to change state
             */
            var change_state = function (evt, name, args) {
                var $state = $injector.get("$state");
                evt.preventDefault();
                return $state.go(name, args);
            };

            /**
             * @name page_check
             *
             * @description
             * Workhorse of the statecheck service. It does the following checks
             * authentication, authorization and redirection.
             */
            var page_check = function (evt, toState, toParams) {
                if (toState.name === "logout") {
                    return;
                }
                if (loginService.isLoggedIn()) {
                    if (toState.redirectTo) {
                        change_state(evt, toState.redirectTo, toParams);
                    } else if (toState.requireUser === false) {
                        change_state(evt, HOME_PAGE_NAME);
                    } else if (toState.permission &&
                              (! permChecker.hasPermission(toState.permission))
                            ) {
                        change_state(evt, "common_403");
                    } else if (toState.userFeature &&
                              (! permChecker.hasUserFeature(toState.userFeature))
                            ) {
                        change_state(evt, "common_403");
                    } else if (loginService.getUser().requires_password_change &&
                               toState.name !== "profile.password") {
                        change_state(evt, "profile.password", {"required": true});
                    }
                    return;
                }

                if (toState.requireUser === false) {
                    return;
                }

                loginService.dumpState(toState, toParams);
                change_state(evt, "login");
            };

            /**
             * @name start
             *
             * @description
             * Start listening to state change events
             */
            var start = function () {
                cancel_listen = $rootScope.$on("$stateChangeStart", page_check);
            };

            /**
             * @name stop
             *
             * @description
             * Stop listening to state change events
             */
            var stop = function () {
                try {
                    cancel_listen();
                } catch (e) {
                }
            };

            return {
                "startListening": start,
                "stopListening":  stop
            };
        }
    ])


    /**
     * @ngdoc service
     *
     * @name mfl.auth.services.profile
     *
     * @description
     * Handles current user's profile
     */
    .service("mfl.auth.services.profile", ["$q", "api", function ($q, API) {
        var urls = {
            user_profile: "api/rest-auth/user/",
            password_change: "api/rest-auth/password/change/",
            reset_password: "api/rest-auth/password/reset/",
            reset_password_confirm: "api/rest-auth/password/reset/confirm/"
        };
        var api = API.getApi();

        /**
         * @name getProfile
         *
         * @description
         * Retrieves profile of the loggedin user
         *
         * @returns {Promise}
         */
        var getProfile = function () {
            return api.callApi("GET", api.makeUrl(urls.user_profile));
        };

        /**
         * @name updateProfile
         *
         * @description
         * Update profile of the loggedin user
         *
         * @param {Object} data - What to change in the user's profile
         * @returns {Promise}
         */
        var updateProfile = function (data) {
            return api.callApi("PATCH", api.makeUrl(urls.user_profile), data);
        };

        /**
         * @name updatePassword
         *
         * @description
         * Update current user's password
         *
         * @param {String} old - The user's current password
         * @param {String} pwd1 - The new password
         * @param {String} pwd2 - Confirmation of the new password
         *
         * @returns {Promise}
         */
        var updatePassword = function (old, pwd1, pwd2) {
            if (pwd1 !== pwd2) {
                return $q.reject({
                    "new_password1": ["The two passwords do not match"],
                    "new_password2": ["The two passwords do not match"]
                });
            }
            if (old === pwd1) {
                return $q.reject({
                    "new_password1": ["The new password is the same as the old password"]
                });
            }
            return api.callApi("POST", api.makeUrl(urls.password_change), {
                "old_password": old,
                "new_password1": pwd1,
                "new_password2": pwd2
            });
        };

        /**
         * @name resetPassword
         *
         * @description
         * Request a password reset given a user's email. This is the first
         * step in the password reset flow.
         *
         * @param {String} email - The user's email
         *
         * @returns {Promise}
         */
        var resetPassword = function (email) {
            var data = {"email": email};
            return api.callApi("POST", api.makeUrl(urls.reset_password), data);
        };

        /**
         * @name resetPasswordConfirm
         *
         * @description
         * Request a password reset given a user's email. This is the second
         * step in the pssword reset flow.
         *
         * @param {String} uid - Unique ID given to the user for the reset
         * @param {String} token - Token given to the user for the reset
         * @param {String} pwd1 - The user's new password
         * @param {String} pwd2 - Confirmation of the user's new password
         *
         * @returns {Promise}
         */
        var resetPasswordConfirm = function (uid, token, pwd1, pwd2) {
            if (pwd1 !== pwd2) {
                return $q.reject({
                    "new_password1": ["The two passwords do not match"],
                    "new_password2": ["The two passwords do not match"]
                });
            }
            var data = {
                "uid": uid,
                "token": token,
                "new_password1": pwd1,
                "new_password2": pwd2
            };
            return api.callApi("POST", api.makeUrl(urls.reset_password_confirm), data);
        };

        return {
            "getProfile": getProfile,
            "updateProfile": updateProfile,
            "updatePassword": updatePassword,
            "resetPassword": resetPassword,
            "resetPasswordConfirm": resetPasswordConfirm
        };
    }]);

})(window.angular, window._);
