import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from "../Screens/Dashboard"
import Login from "../Screens/Login";
import Profile from "../Screens/Profile";
import MovieDetailsScreen from "../Screens/MovieDetailsScreen";



const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
        <Stack.Navigator screenOptions={{headerShown: false,}}>
            <Stack.Screen name="Dashboard" component={Dashboard}/>
            <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen}/>
        </Stack.Navigator>  
)


const Tab = createBottomTabNavigator();
const bottoNav = () => (
    // <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    // </NavigationContainer>
)

const Stack = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false,}}>
            <Stack.Screen name="App" component={bottoNav}/> 
            <Stack.Screen name="Auth" component={Login}/> 
        </Stack.Navigator>  
    </NavigationContainer>
);

export default AppNavigator;