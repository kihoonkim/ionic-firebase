// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'firebase'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  .state('tab.login', {
      url: '/login',
      views: {
        'tab-login': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    })

  .state('tab.schedule', {
    url: '/schedule',
    views: {
      'tab-schedule': {
        templateUrl: 'templates/schedule.html',
        controller: 'ScheduleCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');
})

.factory("FirebaseAuth", function($firebaseArray) {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBeVc0whj7PUA_dr5ODSDhvexPjIk2kBLY",
    authDomain: "first-firebase-933f2.firebaseapp.com",
    databaseURL: "https://first-firebase-933f2.firebaseio.com",
    storageBucket: "first-firebase-933f2.appspot.com",
  };
  firebase.initializeApp(config);

  console.log(firebase);
  return firebase.auth();
})
.factory("FirebaseDB", function($firebaseArray) {
  return firebase.database();
})
;
