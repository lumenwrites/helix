import { combineReducers } from 'redux'

/* Vendor reducers */

/* My reducers */
import profileReducer from './profiles.reducers'
import habitsReducer from './habits.reducers'
import notesReducer from './notes.reducers'


/* Combine all reducers into one big state.
   The result is passed to the Provider in ../src/index.js */
export default combineReducers({
    profile: profileReducer,
    habits: habitsReducer,
    notes: notesReducer
})


