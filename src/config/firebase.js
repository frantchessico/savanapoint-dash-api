const firebase = require('firebase');
const admin = require('firebase-admin');
const serviceAccountKey = require('./newarticles.json');
const firebaseConfig = {
    apiKey: 'AIzaSyCEZzNw-yPSdySjPsX-RcCB6gk8zcie5bg',
    authDomain: 'narticless.firebaseapp.com',
    databaseURL: 'https://narticless.firebaseio.com',
    projectId: 'narticless',
    storageBucket: 'narticless.appspot.com',
    messagingSenderId: '876965399508',
    appId: '1:876965399508:web:7330e0ae402d62d83de441',
    measurementId: 'G-S8Z7BTZ9QS'
  };
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    storageBucket: firebaseConfig.storageBucket,
    databaseURL: firebaseConfig.databaseURL,
    
});

firebase.initializeApp(firebaseConfig);

 

  


  module.exports = {
     DATABASE : firebase.firestore(),
     AUTHENTICATION : firebase.auth(),
     REALTIME: firebase.database() ,
     
     firebase,
     provider : new firebase.auth.GoogleAuthProvider(),
     oAuth : admin.auth(),
  }

 