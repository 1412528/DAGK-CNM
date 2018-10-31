import { combineReducers} from 'redux'
import { firestoreReducer } from 'redux-firestore';

import authReducer from './authReducer';

// Add firebase to reducers
export const rootReducer = combineReducers({
  firestore: firestoreReducer,
  auth : authReducer
})

export default rootReducer;