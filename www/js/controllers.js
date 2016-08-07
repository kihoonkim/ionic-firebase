angular.module('starter.controllers', ['firebase'])
.controller("LoginCtrl", function($scope, $state, $ionicPopup, $timeout, $firebase, $localstorage) {
  $scope.loginGoogle = function() {
    if($localstorage.get("user") != null) {
      $state.go("tab.schedule");
    }
    else {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      $firebase.auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;

        $localstorage.setObject("user", user);
        $firebase.database().ref('users').push({
          username: user.displayName,
          email: user.email,
          profile_picture : user.photoURL,
          loginTime: firebase.database.ServerValue.TIMESTAMP
        });

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
      })
      .catch(function(error) {
        console.log(error.message);
      });
    }
  }

  $scope.logoutGoogle = function() {
    $localstorage.remove("user");

    var myPopup = $ionicPopup.show({
        template: '<div class="item">'+
                    '<h2>Bye Bye!!</h2>'+
                  '</div>',
        title: 'Logout Success',
        subTitle: '',
        scope: $scope,
        buttons: []
      });
    $timeout(function() {
       myPopup.close(); //close the popup after 3 seconds for some reason
    }, 1500);
  }
})
.controller("ScheduleCtrl", function($scope, $ionicModal, $firebase, $localstorage) {
  var displaySchedule = function(reservedList) {
    var times = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18'];

    var map = {};
    for(var r in reservedList) {
      var reservation = reservedList[r];
      map[reservation.room + "_" + reservation.startTime] = '@';
    }

    var schedules = [];
    for(var i=0; i<times.length; i++) {
      schedules.push({
        'time': times[i],
        'room1': map[1+'_'+times[i]],
        'room2': map[2+'_'+times[i]],
        'room3': map[3+'_'+times[i]],
        'room4': map[4+'_'+times[i]]
      });
    }
    $scope.schedules = schedules;
  }
  $firebase.database().ref('reservations').once('value').then(function(snapshot) {
    displaySchedule(snapshot.val());
  });
  $firebase.database().ref('reservations').on('value', function(snapshot) {
    displaySchedule(snapshot.val());
  });
  $scope.doRefresh = function() {
    $scope.schedules.concat({});
  };
  $scope.openReservation = function(rowIndex, colIndex) {
    var user = $localstorage.getObject("user");
    $scope.meetingroom = {'room' : colIndex,
                          'name': user.displayName,
                          'email': user.email,
                          'startTime': rowIndex + 9,
                          'endTime': rowIndex + 9 + 1};
    $scope.modal.show();
  };
  $ionicModal.fromTemplateUrl('templates/reservation.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.reserve = function(meetingroom) {
    $firebase.database().ref('reservations').push(meetingroom);
    $scope.modal.hide();
  };
});
