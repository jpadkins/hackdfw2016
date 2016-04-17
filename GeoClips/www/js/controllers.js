angular.module('GeoClips.controllers', [])

.controller('DiscoveryCtrl', function($scope) {})

.controller('RecordCtrl', function($scope, $cordovaCapture) {
    
      $scope.captureVideo = function() {
          console.log("In capture video fxn")
    var options = { limit: 1, duration: 15 };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      // Success! Video data is here
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  }
    
})

.controller('VideoListCtrl', function($scope) {});
