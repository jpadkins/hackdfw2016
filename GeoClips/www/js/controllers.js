angular.module('GeoClips.controllers', [])

.controller('DiscoveryCtrl', function($scope) {})

.controller('RecordCtrl', function($scope, $cordovaCapture, VideoService) {
    
$scope.clip = '';
    
      $scope.captureVideo = function() {
          console.log("In capture video fxn")
    var options = { limit: 1, duration: 15 };
console.log("after var options")
    $cordovaCapture.captureVideo(options).then(function(videoData) {
      console.log("Success! Video data is here")
      $scope.clip = videoData;
        $scope.$apply();
    
    }, function(err) {
      // An error occurred. Show a message to the user
        console.log("ERROR: " + videoData);
    });
  }
    
})

.controller('VideoListCtrl', function($scope) {});
