var app=angular.module("goal",[
    'ui.router',
    'home',
    'project',
    'purpose',
    'skill',
    'mongodb',
    'statistic',
    'kendo.directives'
]);
app.config(function($stateProvider,$httpProvider, $urlRouterProvider) {
      //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;

      //Remove the header used to identify ajax call  that would prevent CORS from working
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      //
      // For any unmatched url, redirect to /dashboard
      $urlRouterProvider.otherwise("/home");
});
