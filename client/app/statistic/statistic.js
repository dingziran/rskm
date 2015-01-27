var app=angular.module('statistic',[]);
app.config(function($stateProvider) {
    $stateProvider
        .state('statistic', {
            url: "/statistic",
            templateUrl: "app/statistic/statistic.html",
            resolve:{
                records:function(StatisticService){
                    return StatisticService.getRecords();
                },
                projects:function(ProjectService){
                    return ProjectService.getProjects();
                },
                purposes:function(PurposeService){
                    return PurposeService.getPurpose();
                },
                skills:function(SkillService){
                    return SkillService.getSkills();
                }
            },
            controller:function($scope,$state,$stateParams,records,projects,purposes,skills,StatisticService){
                $scope.records=records;
                $scope.projects=projects;
                $scope.purposes=purposes;
                $scope.skills=skills;
                $scope.newRecord={};
                $scope.add=function(record){
                    StatisticService.createRecord(record).then(function(){
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    });
                };
                $scope.delete=function(record){
                    StatisticService.deleteRecord(record._id.$oid).then(function(){
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

app.factory('StatisticService',function(MongodbService){
    var collection="/record";
    var service={
        getRecords:function(index,size){
            var url=MongodbService.getDatabase()+collection+"?"+MongodbService.getApiKey();
            return MongodbService.get(url);
        },
        createRecord:function(data){
            var url=MongodbService.getDatabase()+collection+"?"+MongodbService.getApiKey();
            return MongodbService.post(url,data);
        },
        deleteRecord:function(id){
            var url=MongodbService.getDatabase()+collection+"/"+id+"?"+MongodbService.getApiKey();
            return MongodbService.delete(url);
        }
    };
    return service;
});