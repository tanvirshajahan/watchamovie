import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator
} from 'react-native';
const Loader = props => {
    const {
        loading,
        ...attributes
    } = props;
return (
    
    <View style={styles.container}>
            <ActivityIndicator 
            animating={loading}
            size="large" color="#00ff00" />
    </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding:15
    },
});
export default Loader;