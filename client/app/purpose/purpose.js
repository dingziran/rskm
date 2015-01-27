var app=angular.module('purpose',[]);
app.config(function($stateProvider) {
    $stateProvider
        .state('purpose', {
            url: "/purpose",
            templateUrl: "app/purpose/purpose.html",
            resolve:{
                purposes:function(PurposeService){
                    return PurposeService.getPurpose();
                }
            },
            controller:function($scope,$state,$stateParams,PurposeService,purposes){
                $scope.purposes=purposes;
                $scope.newPurpose={};
                $scope.add=function(purpose){
                    PurposeService.createPurpose(purpose).then(function(){
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    });
                };
                $scope.delete=function(purpose){
                    PurposeService.deletePurpose(purpose._id.$oid).then(function(){
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    });
                }
            }
        });
});

app.factory('PurposeService',function(MongodbService){
    var collection="/purpose";
    var service={
        getPurpose:function(){
            var url=MongodbService.getDatabase()+collection+"?"+MongodbService.getApiKey();
            return MongodbService.get(url);
        },
        createPurpose:function(data){
            var url=MongodbService.getDatabase()+collection+"?"+MongodbService.getApiKey();
            return MongodbService.post(url,data);
        },
        deletePurpose:function(id){
            var url=MongodbService.getDatabase()+collection+"/"+id+"?"+MongodbService.getApiKey();
            return MongodbService.delete(url);
        }
    };
    return service;
});