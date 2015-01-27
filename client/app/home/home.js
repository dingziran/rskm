var app=angular.module('home',[]);
app.config(function($stateProvider) {
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "app/home/home.html"
        });
});