import React from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Platform
} from 'react-native';
import {MyText} from '../UI/MyText'
import Loading from '../UI/Loading';
import {apiCall} from '../API/ApiCall';
import * as APIURL from '../API/API_URL';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            discoverMovies: '',
            discoverTvShow: '',
            discoverPeople: '',

        }

        this.moviesAPI()
    }

    async moviesAPI(){

        let URLMOVIE = APIURL.LATEST_MOVIE+'?'+APIURL.APIKEY;
        let URLTVSHOW = APIURL.LATEST_TVSHOW+'?'+APIURL.APIKEY;
        let URLPEOPLE = APIURL.LATEST_PEOPLE+'?'+APIURL.APIKEY;

        let responseMovie = await apiCall.performCall(URLMOVIE,null);
        let responseTV = await apiCall.performCall(URLTVSHOW,null);
        let responsePeople = await apiCall.performCall(URLPEOPLE,null);
        let headers = await responseMovie.headers;
        let dataMovie;
        let dataTV;
        let dataPeople;
        let statusMovie = await responseMovie.status;
        let statusTV = await responseTV.status;
        let statusPeople = await responsePeople.status;

        // console.log(status, 'headers')
        if(statusMovie == 200 && statusTV == 200 && statusPeople == 200 )
        {
            try{
                this.setState({loading:false})
                dataMovie = await responseMovie.json();
                dataTV = await responseTV.json();
                dataPeople = await responsePeople.json();
                dataMovie =dataMovie.results
                dataTV =dataTV.results
                dataPeople =dataPeople.results
                this.setState({
                    discoverMovies:dataMovie,
                    discoverTvShow:dataTV,
                    discoverPeople:dataPeople
                })

                this.forceUpdate()
            }catch{}        
        }
        
    }
    render(){
        return(
            <View style={Platform.OS=='android'? styles.containerMain2:styles.containerMain}>
                {this.state.loading?(
                    <Loading />
                ):(
                    <ScrollView style={{flex:1}}>
                        <View style={styles.discoverContainer}>
                            <View style={styles.HeaderContainer}>
                                <Text style={styles.Header}>Discover Movies</Text>
                                <Text style={{color:'#fff'}} onPress={() =>this.props.navigation.navigate('MovieListScreen')}>See All</Text>
                            </View>
                            <FlatList
                                keyExtractor={(item, index) => index.toString()}
                                data={this.state.discoverMovies.slice(0,10)}
                                horizontal
                                renderItem={({ item }) => 
                                    <ListContent props={this.props} item = {item} type={'movie'}  /> }
                                keyExtractor={item => item.id}
                            />
                        </View>
                        <View  style={{marginVertical:10}}/>
                        <View style={styles.discoverContainer}>
                            <View style={styles.HeaderContainer}>
                                <Text style={styles.Header}>Discover TV Show</Text>
                                <Text style={{color:'#fff'}} onPress={() =>this.props.navigation.navigate('TVListScreen')}>See All</Text>
                            </View>
                            <FlatList
                                keyExtractor={(item, index) => index.toString()}
                                data={this.state.discoverTvShow.slice(0,10)}
                                horizontal
                                renderItem={({ item }) => 
                                    <ListContent props={this.props} item = {item} type={'tv'} /> }
                                keyExtractor={item => item.id}
                            />
                        </View>
                        <View  style={{marginVertical:10}}/>
                        <View style={styles.discoverContainer}>
                            <View style={styles.HeaderContainer}>
                                <Text style={styles.Header}>Discover People</Text>
                                {/* <Text style={{color:'#fff'}} onPress={() =>this.props.navigation.navigate('')}>See All</Text> */}
                            </View>
                            <FlatList
                                keyExtractor={(item, index) => index.toString()}
                                data={this.state.discoverPeople.slice(0,5)}
                                horizontal
                                renderItem={({ item }) => 
                                    <ListContent props={this.props} item = {item} type={'people'} /> }
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </ScrollView>
                )}
                
            </View>
        )
    }
}


const ListContent = (item) => {
    let image ='';
    let title ='';
    let release_date ='';
    let rating ='';
    let id ='';

    switch(item.type){
        case "tv": 
            id = item.item.id;
            rating = item.item.vote_average;
            release_date = item.item.first_air_date.slice(0,4);
            title = item.item.original_name;
            image =APIURL.IMAGE+item.item.poster_path;

        break;
        case "movie": 
            id = item.item.id;
            rating = item.item.vote_average;
            release_date = item.item.release_date.slice(0,4);
            title = item.item.original_title;
            image =APIURL.IMAGE+item.item.poster_path;

        break;
        case "people": 
            id = item.item.id;
            title = item.item.name;
            rating = item.item.known_for_department;
            release_date = item.item.gender==2?'Male':'Female';
            image =APIURL.IMAGE+item.item.profile_path;
        break;
    }

    return(
        <TouchableOpacity onPress={()=> {
            const params = [
                {"id": id,
                "pic": image,}
            ]
            if(item.type === 'tv'){
                item.props.navigation.navigate('MovieDetailsScreen', {
                    otherParam: params,
                });
            }else if (item.type === 'people'){
                item.props.navigation.navigate('ActorDetailsScreen', {
                    otherParam: params,
                });

            }else if (item.type === 'movie'){
                item.props.navigation.navigate('MovieDetailsScreen', {
                    otherParam: params,
                });

            }

        }}>
            <View style={styles.discoverItem}>
                {item.type =='people' && item.item.profile_path == null?
                (<Image
                    style={styles.logo}
                    resizeMode ='stretch'
                    source={require('../image/profile_icon.png')}
                />):
                (<Image
                    style={styles.logo}
                    resizeMode ='stretch'
                    source={{
                        uri:
                        image,
                    }}
                />)}
                
                {/* <Icon name='star'/> */}
                
                <MyText style={styles.text2} uppercase>{title}</MyText>
                <View style={{flexDirection:'row',justifyContent: 'center'}}>
                {item.type !='people'? (<Image 
                    source ={{
                        uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Golden_star.svg/1200px-Golden_star.svg.png'}} 
                    resizeMode ='stretch'
                    style={{height:20,width:20, marginRight:5}}
                />): null}
                <MyText>{rating}</MyText>

                </View>
                <MyText style={styles.text2}>{release_date}</MyText>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerMain:{
        flex:1,
        paddingTop:50,
        backgroundColor:'#202020',
        //alignItems: 'center',
        padding:10,
    },
    containerMain2:{
        flex:1,
        paddingTop:20,
        backgroundColor:'#202020',
        //alignItems: 'center',
        padding:10,
    },
    logo: {
        flex:1,
        // margin:10,
        marginBottom:10,
    },
    discoverItem: {
        backgroundColor:'#696969',
        height: 250, 
        width: 180, 
        marginLeft: 5, 
        borderBottomStartRadius:Math.round(10),
        borderBottomEndRadius:Math.round(10),
    },
    discoverContainer: {
        // margin:20,
    },
    Header: {
        fontSize:20,
        marginLeft:20,
        color:'#fff',
        marginBottom:10,
    },
    text2: {
        justifyContent:'center',
        alignSelf: 'center'
    },
    HeaderContainer: {
        flexDirection:'row',
        justifyContent: 'space-between'
    }
    
})           