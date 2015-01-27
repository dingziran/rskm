var app=angular.module('skill',[]);
app.config(function($stateProvider) {
    $stateProvider
        .state('skill', {
            url: "/skill",
            templateUrl: "app/skill/skill.html",
            resolve:{
                skills:function(SkillService){
                    return SkillService.getSkills();
                }
            },
            controller:function($scope,$state,$stateParams,skills,SkillService){
                $scope.skills=skills;
                $scope.newSkill={};
                $scope.add=function(skill){
                    SkillService.createSkill(skill).then(function(){
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    });
                };
                $scope.delete=function(skill){
                    SkillService.deleteSkill(skill._id.$oid).then(function(){
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

app.factory('SkillService',function(MongodbService){
    var collection="/skill";
    var service={
        getSkills:function(){
            var url=MongodbService.getDatabase()+collection+"?"+MongodbService.getApiKey();
            return MongodbService.get(url);
        },
        createSkill:function(data){
            var url=MongodbService.getDatabase()+collection+"?"+MongodbService.getApiKey();
            return MongodbService.post(url,data);
        },
        deleteSkill:function(id){
            var url=MongodbService.getDatabase()+collection+"/"+id+"?"+MongodbService.getApiKey();
            return MongodbService.delete(url);
        }
    };
    return service;
});