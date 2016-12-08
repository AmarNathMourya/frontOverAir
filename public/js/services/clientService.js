

angular.module('overair')
    .factory('clientApi',['$http','config', function($http, config) {
        var base_url = config.overAir.url;

        return {
            getConnection : function(customCookie) {
                return $http.post(base_url + '/assignconnection', customCookie);
            },

            saveUpdtClicks : function(criteria) {
                return $http.post(base_url + '/updateclicks', criteria);
            }
        }

    }]);

angular.module('overair').factory('TokenInterceptor',['$q','config','$window','$location','$cookies', function ($q, config, $window, $location, $cookies) {
    return {
        request: function (configHTTP) {
            configHTTP.headers = configHTTP.headers || {};
            var token =  $cookies.token;//$window.sessionStorage.token;
            var customCookie = $cookies.get('currentCookie');
            var bconCoki = $cookies.get('bconID');

            if(customCookie && bconCoki) {
            	configHTTP.headers['cookies'] = customCookie;
            	configHTTP.headers['bconCookies'] = bconCoki;
            }

            /*if(!token){
                var token= localStorageService.get('localStorageToken');
            }*/
            /*var str = $location.path();
            var res = str.substring(0, 11);*/

            /*if($location.path()!= '/login' && $location.path()!= '/ManualSurveyTrafficFixes') {
                if (token) {
                    configHTTP.headers['x-access-token'] = token;
                    configHTTP.headers['Content-Type'] = 'application/json; charset=UTF-8';
                }
            }*/
            /*if(configHTTP.url.indexOf('survey/uploadZipCode') > 0) {
                configHTTP.transformRequest = angular.identity;
                configHTTP.headers['Content-Type'] = undefined;
            }*/
            return configHTTP;
        },
        requestError: function(rejection) {
            return $q.reject(rejection);
        }

        /* Set Authentication.isAuthenticated to true if 200 received */
        /*response: function (response) {
            if (response != null && response.status == 200  && !authenticationService.isAuthenticated && ( $cookies.token || localStorageService.get('localStorageToken'))) {
                authenticationService.isAuthenticated = true;
            }
            return response || $q.when(response);
        },*/

        /* Revoke client authentication if 401 is received */
        /*responseError: function(rejection) {
            if (rejection != null && rejection.status === 401  ){
                authenticationService.isAuthenticated = false;
                //authenticationService.delAuthenticationFlags();
                localStorageService.clearAll();
                sessionStorage.removeItem("token");
                return $location.path("/login");
            }
            var arr=$location.path().split("/");
            var grpPath=arr[0]+"/"+arr[1]+"/"+arr[2]+"/"+arr[3];
            if (rejection != null && rejection.status === 403 && $location.path()!= '/login' && ($location.path()!= '/login' && grpPath != "/jobs/group/groupsettings")){
                $location.path("/access_denied");
            }
            return $q.reject(rejection);
        }*/
    };
}]);    
