angular.module('starter.services', [])

.factory("$firebase", function() {
  // Initialize Firebase
  var config = {
    apiKey: "",
    authDomain: "first-firebase-933f2.firebaseapp.com",
    databaseURL: "https://first-firebase-933f2.firebaseio.com",
    storageBucket: "first-firebase-933f2.appspot.com",
  };
  firebase.initializeApp(config);

  return firebase;
})
//localStorage사용을 위한 셋팅
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    remove: function(key) {
      return $window.localStorage.removeItem(key);
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
