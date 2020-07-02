import React from 'react';
import {
    View,
    StyleSheet,
    Image,
} from 'react-native';
import * as APIURL from '../API/API_URL';
import {apiCall} from '../API/ApiCall';
import {MyText} from '../UI/MyText'
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import Loading from '../UI/Loading';



class PeopleDetailsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            ActorId : this.props.route.params.otherParam[0].id,
            ActorPic : this.props.route.params.otherParam[0].pic,
            ActorDetails: '',
        }
        this.getActorDetails = this.getActorDetails.bind(this);

    }

    async componentDidMount() {
        await this.getActorDetails()
        this.forceUpdate();

    }
    
    async getActorDetails(){
        let URLPEOPLE = APIURL.PERSON_DETAILS+this.state.ActorId+'?'+APIURL.APIKEY;

        let responseMovie = await apiCall.performCall(URLPEOPLE,null);
        let dataActor;
        let statusMovie = await responseMovie.status;
        if(statusMovie == 200)
        {
            try{
                this.setState({loading:false})
                dataActor = await responseMovie.json();
                dataActor = dataActor
                this.state.ActorDetails = dataActor;
                console.log('result', this.state.ActorDetails)
            }catch{}
        }
    }

    timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + " h " + rminutes + " m";
        }

    render(){

        console.log('test',this.state.ActorDetails)
        const pic = this.state.ActorPic
        const {biography,name,known_for_department,place_of_birth,popularity,profile_path,birthday} = this.state.ActorDetails
        const date = birthday+'';
        var year = new Date().getFullYear(); //To get the Current Year

        const age = year- date.slice(0,4);

        return(

            <View style={styles.containerMain}>
                {this.state.loading?(
                    <Loading />
                ):( 
                        <ScrollView >
                            <View>
                                <MyText numberOfLines={2} style={styles.Header}>{name}</MyText>
                                    <Image
                                        style={styles.logo}
                                        resizeMode ='stretch'
                                        source={{
                                            uri:
                                            pic,
                                        }}
                                    />
                                    <MyText style={{textAlign: 'center'}}>{birthday?date.slice(0,4):null} {birthday?" | ":null}{birthday?age:null}{birthday?" | ":null}{place_of_birth?place_of_birth:null}</MyText>
                                    <MyText style={{textAlign: 'center'}}>{known_for_department}</MyText>
                                    <MyText uppercase style={{marginLeft:10,flex:1,paddingLeft:10,fontSize:20}}>biography</MyText>
                                    <MyText numberOfLines={50} style={{margin:10,flex:1,padding:10}}>{biography}</MyText>
                            </View>
                        </ScrollView>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerMain:{
        flex:1,
        paddingTop:10,
        backgroundColor:'#202020',
        //alignItems: 'center',
        padding:10,
    },
    logo: {
        width:250,
        alignSelf: 'center',
        height:250,
        // margin:10,
        marginBottom:10,
    },
    Header: {
        fontSize:30,
        alignSelf: 'center',
        fontWeight: "bold",
        color:'#fff',
        textAlign: 'center',
        marginBottom:10,
    },
})     

export default PeopleDetailsScreen