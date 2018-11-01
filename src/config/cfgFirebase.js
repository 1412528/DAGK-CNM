import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCgZRIl8jOuggwcQXhXLrURKLEFBRhEmEw",
    authDomain: "dagk-80b7d.firebaseapp.com",
    databaseURL: "https://dagk-80b7d.firebaseio.com",
    projectId: "dagk-80b7d",
    storageBucket: "dagk-80b7d.appspot.com",
    messagingSenderId: "943996927402"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
    prompt: 'select_account'
 });

export { firebase, googleAuthProvider };
// export default firebase 