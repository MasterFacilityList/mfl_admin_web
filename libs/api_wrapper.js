(function(angular, _){
    "use strict";

    angular.module("api.wrapper", [])

    .provider("api", function(){
        function Helpers(){}
        Helpers.prototype.hasTrailingSlash = function(url){
            if(url[url.length-1]==="/"){
                return true;
            }
            return false;
        };
        Helpers.prototype.hasLeadingSlash = function(url){
            if(url[0]==="/"){
                return true;
            }
            return false;
        };
        Helpers.prototype.removeTrailingSlash = function(url){
            if (this.hasTrailingSlash(url)){
                return url.substring(0, url.length-1);
            }
            return url;
        };
        Helpers.prototype.removeLeadingSlash = function(url){
            // remove trailing slash from url
            if (this.hasLeadingSlash(url)){
                return url.substring(1, url.length);
            }
            return url;
        };
        Helpers.prototype.removeSlashes = function(url){
            return this.removeTrailingSlash(this.removeLeadingSlash(url));
        };
        Helpers.prototype.joinUrl = function(url_frags){
            /**
                Given a list of url fragments, return concatenated url fragment
            */
            var self = this;
            return _.reduce(url_frags, function(memo, url_frag){
                return self.removeSlashes(memo) +"/"+ self.removeSlashes(url_frag);
            }, "");
        };
        Helpers.prototype.makeParams = function(filters){
            var url_frags = [];
            _.each(_.keys(filters), function(key){
                url_frags.push(key+"="+filters[key]);
            });
            return url_frags.join("&");
        };

        Helpers.prototype.makeGetParam = function(url_param){
            return "?"+url_param;
        };
        this.helpers = new Helpers();
        this.$get = ["$http", "SERVER_URL", function($http, SERVER_URL){
            var self = this;
            self.SERVER_URL = SERVER_URL;
            function Api(){}
            Api.apiUrl = self.SERVER_URL;
            Api.apiBaseUrl = undefined;
            Api.prototype.setBaseUrl = function(url){
                this.apiBaseUrl = url;
                return this;
            };
            Api.prototype.callApi = function(method, url, data){
                /***
                    Calls backend api.
                    returns a promise
                **/
                var options = {
                    url: url,
                    method: method
                };
                if(!_.isUndefined(data)){
                    options.data = data;
                }
                return $http(options);
            };
            Api.prototype.makeUrl = function(url_fragment) {
                //createUrl
                var base_url = self.SERVER_URL;
                if(_.isUndefined(self.SERVER_URL)){
                    throw ("SERVER_URL not set");
                }
                var urls = [
                    self.helpers.removeTrailingSlash(base_url),
                    self.helpers.removeTrailingSlash(url_fragment)
                ];
                return urls.join("/")+"/";

            };
            Api.prototype.create = function(data){
                return this.callApi("POST", this.makeUrl(this.apiBaseUrl), data);
            };
            Api.prototype.update = function(id, data){
                var url_frag = self.helpers.joinUrl([this.apiBaseUrl, id]);
                return this.callApi("PATCH", this.makeUrl(url_frag), data);
            };
            Api.prototype.list = function(){
                return this.callApi("GET", this.makeUrl(this.apiBaseUrl));
            };
            Api.prototype.get = function(id, params){
                var params_url_frag = self.helpers.makeParams(params);
                var url = this.makeUrl(self.helpers.joinUrl([this.apiBaseUrl, id]));
                if (params_url_frag) {
                    url = self.helpers.joinUrl([
                        url,
                        self.helpers.makeGetParam(params_url_frag)]
                    );
                }
                return this.callApi("GET", url);
            };
            Api.prototype.remove = function(id){
                var url_frag = self.helpers.joinUrl([this.apiBaseUrl, id]);
                return this.callApi("DELETE", this.makeUrl(url_frag));
            };
            /**
                filter params in the format:
                {key: value, key2: value2}
            */
            Api.prototype.filter = function(filter_params){
                var params_url_frag = self.helpers.makeParams(filter_params);
                var url = self.helpers.joinUrl([
                    this.makeUrl(this.apiBaseUrl),
                    self.helpers.makeGetParam(params_url_frag)]);
                return this.callApi("GET", url);
            };

            return {
                apiHelpers: self.helpers,
                getApi: function () {
                    return new Api();
                },
                setBaseUrl: function(url){
                    var api = new Api();
                    if (url) {
                        api.setBaseUrl(url);
                    }
                    return api;
                }
            };
        }];
    });
})(window.angular, window._);
