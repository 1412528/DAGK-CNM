export const signIn = (credential) =>{
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        
        firebase.auth().signInWithEmailAndPassword(
            credential.email,
            credential.password
        ).then((res) => {
            firestore.collection('users').doc(res.user.uid).update({
                lastLoginAt: new Date(),
                isLogin : true
            });
        }).then(() => {
            dispatch({type : 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({type : 'LOGIN_ERROR', err })
        })
    }
}

export const signInWithGoogle = () =>{
    return (dispatch, getState, {getFirebase, getFirestore, googleAuthProvider}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().signInWithPopup(googleAuthProvider)
        .then(res => {
            // console.log(res);
            
            return firestore.collection('users').doc(res.user.uid).set({
                userName: res.user.displayName,
                initials: res.user.displayName[0].toUpperCase(),
                photoURL: res.user.photoURL,
                lastLoginAt: new Date(),
                isLogin : true
            })
        }).then(() => {
            dispatch({type : 'LOGIN_SUCCESS' })
        }).catch(err => {
            dispatch({type : 'LOGIN_ERROR', err })
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((res) => {            
            return firestore.collection('users').doc(res.user.uid).set({
                userName: newUser.userName,
                initials: newUser.userName[0].toUpperCase(),
                photoURL: "https://firebasestorage.googleapis.com/v0/b/dagk-gd2.appspot.com/o/user.png?alt=media&token=ce4023d4-f878-4846-aee3-62588d8fc569",
                lastLoginAt: new Date(),
                isLogin : true
            });
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err});
        });
    }
}

export const signOut = () =>{
    return (dispatch, getState, {getFirebase, getFirestore}) => {        
        const firebase = getFirebase();
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;

        firebase.auth().signOut().then(() => {
            firestore.collection('users').doc(uid).update({
                lastLoginAt: new Date(),
                isLogin : false
            });
        }).then(() => {
            dispatch({type : 'SIGNOUT_SUCCESS' })
        })
    }
}