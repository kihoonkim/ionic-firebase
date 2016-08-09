# ionic, firebase 연동

## ionic doc
- http://ionicframework.com/docs/overview/
- CSS, Javascript 등 예제와 설명이 매우 잘되어 있음.

## firebase
![fig](https://lh3.googleusercontent.com/pmFdSCiNJf4foF41QJvWGKhkB_sn3Lneql4Vk5kos_nP7n3ieddBGnCKsxQxGjl2tl2A-OEd3_az1Yo8kU0tPnDLe2N2uQ=s888 "")
- https://firebase.google.com/docs/
- google에서 검색되는 sample 코드는 최신 버전(3.1)이 안맞음.
- firebase 사이트에 있는 API ref와 samples를 보고 하는 것이 좋음.

## install nodejs
```
https://nodejs.org/dist/v4.4.7/node-v4.4.7-x64.msi
```

## install ionic
```
$ npm install -g cordova ionic
```

## start ionic project
```
$ ionic start myApp blank
```  

## run on android
```
$ cd myApp
$ ionic platform add android
$ ionic build andorid
$ ionic emulate android
```

#### Setting ANDROID_HOME
```
https://developer.android.com/studio/install.html  
C:\Users\kihoonkim\AppData\Local\Android\sdk
```

## Firebase Hosting
- firebase cli 설치
```
$ npm install -g firebase-tools
```
- Google 로그인
```
$ firebase login
```
- 프로젝트 시작 (IONIC은 www 디렉토리를 배포하면 됨 )
```
$ firebase init
```
- 웹사이트 배포:
```
$ firebase deploy
```
