import React from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Button
} from 'react-native';

export default class Profile extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }

    }

    render(){
        return(
            <View style={styles.containerMain}>
                <Button title={'Logout'} onPress={()=>{this.props.navigation.navigate('Auth')}}></Button>
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