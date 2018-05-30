
import firebase from 'react-native-firebase';
  // Initialize Firebase


 const firebaseConfig = {
  apiKey: "AIzaSyDhoXKIAp2FlFmucvZmpj3NItKenhRzhVw",
  authDomain: "flattest-2ccf5.firebaseapp.com",
  databaseURL: "https://flattest-2ccf5.firebaseio.com",
  projectId: "flattest-2ccf5",
  storageBucket: "",
  messagingSenderId: "459698225572"
}



firebase.initializeApp(firebaseConfig);

export default firebase;