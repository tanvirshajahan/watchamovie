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
    GoogleSignin.configure({
        webClientId: '858627221119-ha1530qbtjkcvreq5ricmn1m5vlq4246.apps.googleusercontent.com', // client ID of type WEB for your server(needed to verify user ID and offline access)
        // androidClientId: '169837504288-igg97idpkqmg896v2t4gdnql689uj12i.apps.googleusercontent.com', // client ID of type WEB for your server(needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        accountName: '', // [Android] specifies an account name on the device that should be used
        iosClientId: '858627221119-801jgun8nju3aa9tane0llp3k5kiiail.apps.googleusercontent.com',
    });
}

signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const info = await GoogleSignin.signIn();
        // console.warn({userInfo: info});
        // setUserInfo(info);
        return info;
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already

        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated

        } else {
        // some other error happened
        }
    }
};

async googleSignIn(){
    // const userInfo = await GoogleSignin.signIn();
    const userInfo = await this.signIn();
    // console.log('test',this)

    if (userInfo)
    {
        console.log(userInfo, ' test here mann');
        let URLGENRE = APIURL.GETGENRE+'?'+APIURL.APIKEY;
        const getGenre = await apiCall.performCall(URLGENRE,null); 
        let dataGenre;
        let statusMovie = await getGenre.status;
        if(statusMovie == 200)
        {
            try{
                this.setState({loading:false})
                dataGenre = await getGenre.json();
                dataGenre = dataGenre
                this.state.genre = dataGenre;
                console.log('result genre', this.state.genre)
            }catch{}
        }

        //login to themovie db
        var userDetails = {};
        userDetails.name = userInfo.user.name;
        userDetails.token = userInfo.idToken;
        userDetails.profile_pic = userInfo.user.photo;
        userDetails.genre = this.state.genre;

        this.props.reduxeSaveUserDetail(userDetails)

        this.props.navigation.navigate("App")
    }
    else
    {
        this.state.loading = false
        this.forceUpdate();
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
                <GoogleSigninButton style={{alignSelf: 'center'}} onPress={() => this.googleSignIn()}/>
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