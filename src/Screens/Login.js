/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    ImageBackground
} from 'react-native';
import * as APIURL from '../API/API_URL';
import {apiCall} from '../API/ApiCall';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
//redux component
import {connect} from "react-redux"
import {saveUserDetails} from '../redux/Action/saveUserDetails'


class Login extends React.Component{

constructor(props){
    super(props)
    this.state ={
        loading: false,
        signedIn: false, 
        name: "", 
        photoUrl: "",
        genre:"",
    }
   
}

    render(){
        return(
        <ImageBackground  source={require('../image/background.jpg')} style={{width: '100%', height: '100%'}}  >
            <View style={styles.container}>
                <Image
                        style={styles.logo}
                        resizeMode = 'contain'
                            source={require('../image/profile.png')}
                    />
                <Text style={styles.header}>Welcome to WatchAMovie</Text>
            </View>
        </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop:30,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    header: {
        marginBottom:100,
        fontSize:30,
    },
    logo: {
        width:200,
        height:200,
        alignSelf: 'center'
    }
});


const mapStateToProps = (state) => 
{
    

    return{
        // userDetails:state.userDetailReducer.userDetails
    }
}

const mapDispatchToProps = (dispatch) => 
    {
        return{
        reduxeSaveUserDetail:(userDetails) => dispatch(saveUserDetails(userDetails))
        }
    }
    export default connect(
        mapStateToProps,
        mapDispatchToProps
    )(Login); 