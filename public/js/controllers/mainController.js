angular.module('overair')

    .controller('MainController',['$scope','$state' ,'$rootScope',function($scope ,$state ,$rootScope){
        $scope.$state = $state;
        console.log("main controller state is::", $scope.$state);

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
              console.log("to state value is:::", toState);
               /*if(toState.name == 'startsurvey' || toState.name == 'home'){
                   $scope.fotrHide = true;
                   $scope.hdrHide = true;
               }
               else{
                   $scope.fotrHide = false;
                   $scope.hdrHide = false;

               }*/
            }
        );

        
    }]);