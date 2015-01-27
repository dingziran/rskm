var app=angular.module('project',[]);
app.config(function($stateProvider,$httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $stateProvider
        .state('project', {
            url: "/project",
            templateUrl: "app/project/project.html",
            resolve:{
                projects:function(ProjectService){
                    return ProjectService.getProjects();
                }
            },
            controller:function($scope,$state,$stateParams,projects,ProjectService){
                $scope.projects=projects;
                $scope.newProject={};
                $scope.add=function(project){
                    ProjectService.createProject(project).then(function(){
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    });
                };
                $scope.delete=function(project){
                    ProjectService.deleteProject(project._id.$oid).then(function(){
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

app.factory('ProjectService',function(MongodbService){
    var collection="/project";
    var service={
        getProjects:function(){
            var url=MongodbService.getDatabase()+collection+"?"+MongodbService.getApiKey();
            return MongodbService.get(url);
        },
        createProject:function(data){
            var url=MongodbService.getDatabase()+collection+"?"+MongodbService.getApiKey();
            return MongodbService.post(url,data);
        },
        deleteProject:function(id){
            var url=MongodbService.getDatabase()+collection+"/"+id+"?"+MongodbService.getApiKey();
            return MongodbService.delete(url);
        }
    };
    return service;
});