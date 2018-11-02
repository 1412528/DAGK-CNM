export const signIn = (credential) =>{
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credential.email,
            credential.password
        ).then(() => {
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

        firebase.auth().signInWithPopup(googleAuthProvider).then(res => {
            console.log(res);
            
            return firestore.collection('users').doc(res.user.uid).set({
                userName: res.user.displayName,
                initials: res.user.displayName[0].toUpperCase()
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
                initials: newUser.userName[0].toUpperCase()
            });
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err});
        });
    }
}

export const signOut = () =>{
    return (dispatch, getState, {getFirebase}) => {        
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type : 'SIGNOUT_SUCCESS' })
        })
    }
}