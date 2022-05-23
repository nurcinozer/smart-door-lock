// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV4vpnO23eKOeL5Oiss6Cey-ksLXz1S40",
  authDomain: "smart-door-lock-d3110.firebaseapp.com",
  projectId: "smart-door-lock-d3110",
  storageBucket: "smart-door-lock-d3110.appspot.com",
  messagingSenderId: "602382194628",
  appId: "1:602382194628:web:032d9f402fac2d9d4cf691",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };
