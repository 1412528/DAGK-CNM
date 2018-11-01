import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import {rootReducer} from './store/reducer/rootReducer';
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import thunk from 'redux-thunk';
import { firebase, googleAuthProvider } from './config/cfgFirebase';

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
    attachAuthIsReady : true
}

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore, googleAuthProvider})),
        reactReduxFirebase(firebase, rrfConfig),
        reduxFirestore(firebase)
    )
);

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render( 
        <Provider store={store}>
            <App />
        </Provider>,
         document.getElementById('root')
    );
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
