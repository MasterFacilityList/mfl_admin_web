(function(angular, _){
    "use strict";

    angular.module("mfl.notifications.controllers",[
        "mfl.notifications.services",
        "angular-toasty",
        "mfl.common.filters"
    ])

    .controller("mfl.notifications.controllers.list",
        ["$scope", function ($scope) {
            $scope.title = {
                "name": "All Notifications",
                "icon": "fa fa-comment-o"
            };
            $scope.filters = {
                "fields": "id,message,group,group_name,summary,title,created"
            };
        }]
    )
    .controller("mfl.notifications.controllers.view",
        ["$scope", "$stateParams","mfl.notifications.services.wrappers",
        function($scope, $stateParams, wrapper){
           var notification_id = $stateParams.notification_id;
            wrapper.notifications.get(notification_id)
            .success(function(data){
                $scope.notification = data;
            }).
            error(function(data){
                $scope.error = data;
            });

        }]
    )

    .controller("mfl.notifications.controllers.create",
        ["$scope", "mfl.notifications.services.wrappers","toasty", "$state",
        "$stateParams",
        function($scope, wrapper, toasty, $state, $stateParams){
            var notification_id = $stateParams.notification_id;
            $scope.text_angular_default =  [
                ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                ['bold', 'italics', 'underline', 'ol', 'redo', 'undo', 'clear'],
                ['indent','outdent'],
                ['insertLink']
            ];
            $scope.group_filters = {
                    "page_size": 100,
                    "fields": "id,name"
            };

            $scope.clearUiSelect = function($event, $select) {
                  $event.stopPropagation();
                  $select.selected = '';
                  $select.search = null;
            };

            wrapper.groups.filter($scope.group_filters)
            .success(function(data){
                $scope.grps = data.results;
            })
            .error(function(data){
                $scope.error = data;
            });
            $scope.notification = {};

            if(!_.isUndefined(notification_id)){
                wrapper.notifications.get(notification_id)
                .success(function(data){
                    $scope.notification = data;
                })
                .error(function(data){
                    $scope.error = data;
                });
            }


            $scope.$watch("notification", function (newVal) {
                if(!_.isUndefined(newVal)){
                    $scope.select_values = {
                            grp: {
                                "id": $scope.notification.group || null,
                                "name": $scope.notification.group_name || null
                            }
                        }
                    };
            });

            $scope.select_values ={
                grp: {
                    "id": null,
                    "name":null
                }
            };

            $scope.save_notification = function(){
                if(!_.isUndefined($scope.select_values.grp.id)){
                  $scope.notification.group = $scope.select_values.grp.id;
                }
                else{
                    $scope.notification.group = null;
                }
                if(!_.isUndefined(notification_id)){
                    wrapper.notifications.update(notification_id, $scope.notification)
                    .success(function(data){
                        toasty.success({
                                title: "Notification",
                                msg: "Notification successfully updated"
                            });
                            $state.go("notifications");
                    })
                    .error(function(data){

                    });
                }
                else{
                    wrapper.notifications.create($scope.notification)
                    .success(function(data){
                        toasty.success({
                                title: "Notification",
                                msg: "Notification successfully created"
                            });
                            $state.go("notifications");
                    })
                    .error(function(data){

                    });
                }
            };
        }]
    )
    .controller("mfl.notifications.controllers.delete",
        ["$scope", "$stateParams","mfl.notifications.services.wrappers",
         "$state", "toasty",
            function($scope, $stateParams, wrapper, $state, toasty){
            var notification_id = $stateParams.notification_id;

            wrapper.notifications.get(notification_id)
            .success(function(data){
                $scope.notification = data;
            }).
            error(function(data){
                $scope.error = data;
            });

            $scope.remove = function(){

                wrapper.notifications.remove(notification_id)
                .success(function(data){
                    toasty.error({
                        title: "Notification",
                        msg: "Notification successfully deleted"
                    });
                    $state.go('notifications');
                })
                .error(function(data){
                     $state.go("notifications");
                });
            };
        }]
    );

})(window.angular, window._);
