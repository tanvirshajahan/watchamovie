import React from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import {connect} from "react-redux";

class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }

    }

    render(){
        return(
            <View style={styles.containerMain}>
                <Button title={'Logout'} onPress={()=>{this.props.navigation.navigate('Auth')}}></Button>
        <Text>{this.props.userDetails.name}</Text>
        <Text>{this.props.userDetails.token}</Text>
        <Text>{this.props.userDetails.profile_pic}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerMain:{
        flex:1,
        paddingTop:50,
        backgroundColor:'#fff',
        //alignItems: 'center',
        padding:10,
    },
})     

const mapStateToProps = (state) => {
    return{
        userDetails: state.userDetailReducer.userDetails
    }
}
export default connect(mapStateToProps,null)(Profile)