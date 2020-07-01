
// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import userDetailReducer from "./userDetailReducer"

// Redux: Root Reducer
const rootReducer = combineReducers({
    userDetailReducer:userDetailReducer,
});

// Exports
export default rootReducer;