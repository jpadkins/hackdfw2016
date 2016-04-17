// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('GeoClips', ['ionic', 'GeoClips.controllers', 'ionic-material', 'ngCordova', "GeoClips.services" ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  
    // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("record");
  
  // Now set up the states
  $stateProvider
    .state('discovery', {
      url: "/discovery",
      templateUrl: "templates/discovery.html",
      controller: 'DiscoveryCtrl'
    });
    
      $stateProvider
    .state('record', {
      url: "/record",
      templateUrl: "templates/record.html",
      controller: 'RecordCtrl'
    });
    
      $stateProvider
    .state('videolist', {
      url: "/videolist",
      templateUrl: "templates/videolist.html",
     controller: 'VideoListCtrl'
      });   
});