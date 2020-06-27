import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import Dashboard from "../Screens/Dashboard"
import Login from "../Screens/Login";

const Stack = createStackNavigator();
const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false,}}>
            <Stack.Screen name="Login" component={Login}/> 
            <Stack.Screen name="Dashboard" component={Dashboard}/>
        </Stack.Navigator>  
    </NavigationContainer>
    
);

export default AppNavigator;