import firebase from 'firebase/app' ;
import 'firebase/auth';
// import 'firebase/firestore';

 var firebaseConfig = {
    apiKey: "AIzaSyBlGjcyO66kapK2tFoLhgsWxCIa4EunVyM",
    authDomain: "simple-notes-firebase-a4f00.firebaseapp.com",
    databaseURL: "https://simple-notes-firebase-a4f00.firebaseio.com",
    projectId: "simple-notes-firebase-a4f00",
    storageBucket: "",
    messagingSenderId: "376001095207",
    appId: "1:376001095207:web:94c00d3b0adc4236"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;