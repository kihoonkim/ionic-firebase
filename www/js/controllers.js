angular.module('starter.controllers', ['firebase'])
.controller("LoginCtrl", function($scope, $state, $ionicPopup, $timeout, FirebaseAuth) {
  $scope.loginGoogle = function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;

      var myPopup = $ionicPopup.show({
          template: '<div class="item item-avatar">'+
                      '<img ng-src="'+ user.photoURL +'">' +
                      '<h2>' + user.displayName + '</h2>'+
                      '<p>' + user.email + '</p>'+
                    '</div>',
          title: 'Login Success',
          subTitle: '',
          scope: $scope,
          buttons: []
        });
        $timeout(function() {
           myPopup.close(); //close the popup after 3 seconds for some reason
           $state.go("tab.schedule");
        }, 1500);
    }).catch(function(error) {
      console.log(error.message);
    });
  }
})
.controller("ScheduleCtrl", function($scope, FirebaseDB) {
  $scope.times = ['9 AM', '10', '11', '12', '1 PM', '2', '3', '4', '5', '6']
  // var provider = new FirebaseAuth.GoogleAuthProvider();
  // var dbRef = Database.ref("items/");
  // console.log(dbRef);
  //
  //
  // dbRef.on('value', function(snapshot) {
  //   $scope.items = snapshot.val();
  // });
  //
  // $scope.addItem = function() {
  //   var name = prompt("What do you need to buy?");
  //   if (name) {
  //     dbRef.push({"name": name})
  //
  //     dbRef.on('child_added', function(data) {
  //       $scope.items.$add({
  //         "name": data.val().name
  //       });
  //       //setCommentValues(postElement, data.key, data.val().text, data.val().author);
  //     });
  //   }
  // };
});
