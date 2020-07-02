
// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import userDetailReducer from "./userDetailReducer"


const appReducer = combineReducers({
    /* your app’s top-level reducers */
    userDetailReducer:userDetailReducer,
})

// Redux: Root Reducer
const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        storage.removeItem('persist:root')

        state = undefined
    }
    return appReducer(state, action)
}

// Exports
export default rootReducer;