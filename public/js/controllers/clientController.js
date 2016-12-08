var app = angular.module('overair');

app.controller('clientController', ['$scope','$http','$state', '$rootScope', '$cookies', 'config', 'clientApi', 'socket', function($scope, $http, $state, $rootScope, $cookies, config, clientApi, socket){
	console.log("client controller is called")
	
	function assignConnection() {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
	    var customCookie = '';
	    for(var i=0; i<10; i++){
	      var x = Math.floor(Math.random() * chars.length);
	      customCookie += chars[x];
	    }

	    $scope.custCookie = {customCookie: customCookie};

		$cookies.put('currentCookie', customCookie);
		clientApi.getConnection($scope.custCookie).then(
			function(response) {
				console.log("response is success", response);
				//$scope.bconCoki = response.data.result.bcon_id
				/*$cookies.put('bconID', $scope.bconCoki);
				console.log("bconCoki is::", $scope.bconCoki);*/
				var favoriteCookie = $cookies.get('currentCookie');
				console.log("favoriteCookie is::", $cookies)

			},
			function(error) {
				console.log("error is::")
			}
	    );
	}
    if($cookies.get('currentCookie') && $cookies.get('bconID')) {
    	$scope.showBcon = $cookies.get('bconID');
    	socket.emit('channel2', $scope.showBcon);
    	console.log("cookie already exist", $scope.showBcon)
    	//return;
    }
    else {
    	assignConnection();//
    	console.log("no cookie exist")
    }

    socket.on('connectedUserData', function(message) {
		console.log("hello", message)
		$scope.setFilterBcon = $cookies.get('bconID');
		if(!$scope.setFilterBcon) {
			var bconData = message.pop();
			$cookies.put('bconID', bconData.bcon_id);
			console.log("bconCoki is::", bconData.bcon_id);
		}
		$scope.filterBcon = $cookies.get('bconID');
		$scope.filterGrp1Data = [];
		$scope.filterGrp2Data = [];
		$scope.assignGroupFlg = true;
		if($scope.filterBcon) {
			for(var i in message) {
				if(message[i].bcon_id === $scope.filterBcon) {
					if($scope.assignGroupFlg) {
						$scope.filterGrp1Data.push(message[i]);
						$scope.assignGroupFlg = false;
					}
					else {
						$scope.filterGrp2Data.push(message[i]);
						$scope.assignGroupFlg = true;
					}
				}
			}
			console.log("filter data1 is:::", $scope.filterGrp1Data);
			console.log("filter data2 is:::", $scope.filterGrp2Data);
		}
	});

    //*************************Update click counts***********************//

    $scope.updateClicks = function() {
    	$scope.cokiCondtion = $cookies.get('currentCookie');
    	$scope.bconCondtion = $cookies.get('bconID');
    	$scope.criteria = {updtCookie: $scope.cokiCondtion, updtBcon: $scope.bconCondtion};
    	clientApi.saveUpdtClicks($scope.criteria).then(
    		function(response) {
    			console.log("click updte response is:::", response)
    		},
    		function(error) {
    			console.log("error in update click counrt");
    		}
    	);
    }
	

}]);