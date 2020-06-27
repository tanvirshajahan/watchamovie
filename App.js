import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux';

import AppNavigator from "./src/Screens/Navigation";

// Imports: Screens


// Imports: Redux Persist Persister
import { store, persistor } from './src/redux/Store/store';


// React Native: App
export default App = () => {
  return (
    // Redux: Global Store
    <Provider store={store}>
      <PersistGate 
        loading={null}
        persistor={persistor}
      >
        <AppNavigator/>
        
      </PersistGate>
    </Provider>
  );
};