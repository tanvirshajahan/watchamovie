
// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers

import employeeDetailReducer from "./employeeDetailReducer"
import userDetailReducer from "./userDetailReducer"

// Redux: Root Reducer
const rootReducer = combineReducers({
    employeeDetailReducer:employeeDetailReducer,
    userDetailReducer:userDetailReducer,
});

// Exports
export default rootReducer;