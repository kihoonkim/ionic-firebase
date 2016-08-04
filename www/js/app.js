// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])
.factory("Database", function($firebaseArray) {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBeVc0whj7PUA_dr5ODSDhvexPjIk2kBLY",
    authDomain: "first-firebase-933f2.firebaseapp.com",
    databaseURL: "https://first-firebase-933f2.firebaseio.com",
    storageBucket: "first-firebase-933f2.appspot.com",
  };
  firebase.initializeApp(config);
  return firebase.database();
})
.controller("ListCtrl", function($scope, Database) {
  var dbRef = Database.ref("items/");
  console.log(dbRef);

  dbRef.on('value', function(snapshot) {
    $scope.items = snapshot.val();
  });
  
  $scope.addItem = function() {
    var name = prompt("What do you need to buy?");
    if (name) {
      dbRef.push({"name": name})

      dbRef.on('child_added', function(data) {
        $scope.items.$add({
          "name": data.val().name
        });
        //setCommentValues(postElement, data.key, data.val().text, data.val().author);
      });
    }
  };
});
