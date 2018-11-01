import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    // apiKey: "AIzaSyCgZRIl8jOuggwcQXhXLrURKLEFBRhEmEw",
    // authDomain: "dagk-80b7d.firebaseapp.com",
    // databaseURL: "https://dagk-80b7d.firebaseio.com",
    // projectId: "dagk-80b7d",
    // storageBucket: "dagk-80b7d.appspot.com",
    // messagingSenderId: "943996927402"
    apiKey: "AIzaSyCxKI011AFYO1cQuXDYyuzTFmkKP5UMi4I",
    authDomain: "dagk-gd1.firebaseapp.com",
    databaseURL: "https://dagk-gd1.firebaseio.com",
    projectId: "dagk-gd1",
    storageBucket: "dagk-gd1.appspot.com",
    messagingSenderId: "982332103060"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
    prompt: 'select_account'
 });

export { firebase, googleAuthProvider };