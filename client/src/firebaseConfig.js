// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

   // Your web app's Firebase configuration
   var firebaseConfig = {
    apiKey: "AIzaSyDhQWDxXoufMpm2IibRVA773RSt8EMLW_g",
    authDomain: "ecommerce-c8bb3.firebaseapp.com",
    projectId: "ecommerce-c8bb3",
    storageBucket: "ecommerce-c8bb3.appspot.com",
    messagingSenderId: "907312444013",
    appId: "1:907312444013:web:eafba6a61fedd6f3acc564"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth=firebase.auth();
  export const googleAuthProvider =new firebase.auth.GoogleAuthProvider();
//  export default firebase;