import React from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Text,
    Image,
    TouchableOpacity,
    YellowBox,
    Dimensions,
    Button,
  } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Dashboard from "../Screens/Dashboard"
import Login from "../Screens/Login";
import {DrawerContent} from "../Screens/DrawerContent";
// import LoginWithGoogle from "../Screens/LoginWithGoogle";
import Profile from "../Screens/Profile";
import MovieDetailsScreen from "../Screens/MovieDetailsScreen";
import ActorDetailsScreen from "../Screens/PeopleDetailsScreen";
import MovieListScreen from "../Screens/MovieListScreen";
import TVListScreen from "../Screens/TVListScreen";



const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
        <Stack.Navigator screenOptions={{headerShown: false,}}>
            <Stack.Screen name="Dashboard" component={Dashboard}/>
            <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen}/>
            <Stack.Screen name="ActorDetailsScreen" component={ActorDetailsScreen}/>
            <Stack.Screen name="MovieListScreen" component={MovieListScreen}/>
            <Stack.Screen name="TVListScreen" component={TVListScreen}/>
        </Stack.Navigator>  
)

const Drawer = createDrawerNavigator();
const DrawerNav = () => (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/> } >
            <Drawer.Screen name="Home" component={Profile} />
        </Drawer.Navigator>
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