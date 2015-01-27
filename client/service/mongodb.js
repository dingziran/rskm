var app=angular.module('mongodb',[]);
app.config(function($stateProvider,$httpProvider, $urlRouterProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;

    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

});
app.factory("MongodbService",function($http){
    var apiKey='apiKey=U0ILXvPGN6SC7otpblL5agQ2D7YQikuB';
    var database='https://api.mongolab.com/api/1/databases/goal/collections';
    var service={
        getApiKey:function(){
            return apiKey;
        },
        getDatabase:function(){
            return database;
        },
        get:function(url){
            return $http.get(url).then(function(body){
                return body.data;
            });
        },
        post:function(url,data,config){
            return $http.post(url,data).then(function(body){
                return body.data;
            });
        },
        delete:function(url){
            return $http.delete(url).then(function(body){
                return body.data;
            })
        }
    };
    return service;
});