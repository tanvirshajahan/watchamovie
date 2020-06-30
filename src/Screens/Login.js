/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Button,
    Input
} from 'react-native';


import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

export default class Login extends React.Component{

constructor(props){
    super(props)
    this.state ={
        loading: false,
        signedIn: false, 
        name: "", 
        photoUrl: "",
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

  //android
  //169837504288-qep4q36hsjc509hlp1fs8i9nebg71kc5.apps.googleusercontent.com
  //ios
  // 11255052070-5o19jaikscia9hv7jokkpbdnvsfbn29m.apps.googleusercontent.com

signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const info = await GoogleSignin.signIn();
        // console.warn({userInfo: info});
        // setUserInfo(info);
        this.props.navigation.navigate("App")
        return info;
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('failed 1')
        // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('failed 2')

        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('failed 3')

        } else {
        console.log('failed 4', error)
        // some other error happened
        }
    }
};


async googleSignIn(){
    // const userInfo = await GoogleSignin.signIn();
    const userInfo = await this.signIn();
    // console.log('test',this)

    console.log(userInfo , ' success');

      // await GoogleSignin.logInAsync({
      //   androidClientId:
      //       "169837504288-qep4q36hsjc509hlp1fs8i9nebg71kc5.apps.googleusercontent.com",
      //   // androidStandaloneAppClientId:
      //   //     "357577265087-agprpvba7eoujgn5phbttjb5dfol0psh.apps.googleusercontent.com",
      //   iosClientId:
      //       "169837504288-oha8k991p0cuo1q2gdui5f1kfjplnmia.apps.googleusercontent.com",
      //   // iosStandaloneAppClientId:
      //   //     "357577265087-jipavt3d3jb9acmdkatt48oknq952lqb.apps.googleusercontent.com",
      //   scopes: ["profile", "email", "openid"]
      // })

    if (userInfo)
    {
        console.log(userInfo.idToken);
        //login to themovie db
        
    }
    else
    {
        this.state.loading = false
        this.forceUpdate();
    }
}
    render(){
        return(
        <View style={styles.container}>
            <Text style={styles.header}>Welcome to WatchAMovie</Text>
            <Button title="Login with Google" onPress={() => this.googleSignIn()}/>
        </View>
        
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
});