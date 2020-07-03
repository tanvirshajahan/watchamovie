import React from 'react';
import {
    View,
    Alert,
    StyleSheet,
    Image
} from 'react-native';
import {connect} from "react-redux";
import {logout} from '../redux/Action/saveUserDetails'
import { MyText } from '../UI/MyText';
import { Button } from 'native-base';



class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }

    }
    logout(){
        Alert.alert(
            "Watch a Movie",
            "Are you sure want to Logout?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "destructive"
    
                },
                { 
                    text: "Yes", 
                    onPress: () => {
                        this.props.reduxeLogout()
                        this.props.navigation.navigate('Auth')
                    },
                    style: "cancel"
                }
                ],
                { cancelable: false }
            );
    }

    render(){
        console.log(this.props.userDetails.profile_pic)
        return(
            <View style={styles.containerMain}>
                <Image
                    style={styles.logo}
                    resizeMode = 'contain'
                    source={{
                        uri:
                        this.props.userDetails.profile_pic,
                    }}
                />      
            <MyText style={{margin:20,fontSize: 20}}>{this.props.userDetails.name}</MyText>
                <Button  primary style={{alignSelf: 'center' }} title={'Logout'} onPress={()=>{
                    this.logout()
                    }}>
                    <MyText style={styles.Text} >Logout</MyText>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerMain:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:50,
        backgroundColor:'#202020',
        //alignItems: 'center',
        padding:10,
    },
    logo: {
        width:200,
        alignSelf: 'center',
        height:200,
        borderRadius:140,
        // margin:10,
        marginBottom:10,
    },
    Text: {
        alignSelf: 'center',
        textAlign: 'center',
        alignContent: 'center',
    },
    Button: {
        alignSelf: 'center',       
    }
})     

const mapDispatchToProps = (dispatch) => 
    {
        return{
            reduxeLogout:(userDetails) => dispatch(logout(userDetails))
        }
    }
const mapStateToProps = (state) => {
    return{
        userDetails:state.userDetailReducer.userDetails


    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps)(Profile)