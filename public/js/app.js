var app =angular.module('overair',['ui.router','ngCookies','ngStorage']);

/*app.constant('config', {  
  app: 'overAir-Dev',
    overAir : {
        url:'http://localhost:5000'
    }
});*/

app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
    //$httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('TokenInterceptor');
    $urlRouterProvider.otherwise('/');
    $stateProvider.
        state('client',{
            url:'/client',
            templateUrl:'client.html',
        })
        .state('/', {
            url: '/',
            controller: 'indexController'
        })
               
}]);


app.run(['$rootScope','$location','$state','$window','$cookies', function($rootScope, $location, $state, $window, $cookies) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {

           console.log("to state value is:::", toState)
        if (toState != null && toState.controller == "indexController") {
            event.preventDefault();
            $state.go("client");
        }
    });

}]);





