import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';
import * as APIURL from '../API/API_URL';
import {apiCall} from '../API/ApiCall';
import {MyText} from '../UI/MyText'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../UI/Loading';
import {connect} from "react-redux";
import {getGenre} from '../helper/helper';




class TVListScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            fetching_from_server: false,
            movieList: [],
            movieListNew: [],
            incremental: 1,

        }
        this.onEndReachedCalledDuringMomentum = true;
    }

    onEndReached = ({ distanceFromEnd }) => {
        if(!this.onEndReachedCalledDuringMomentum){
            this.loadMoreData()
            this.onEndReachedCalledDuringMomentum = true;
        }
    }       

    loadMoreData = async() => {
        
        this.state.fetching_from_server = true;
        this.state.incremental = this.state.incremental +1;
        this.getMovieList()
    }

    async componentDidMount() {
        await this.getMovieList()        
        
        this.forceUpdate();
    }
    
    async getMovieList(){
        let URLMOVIE = APIURL.TV+'?'+APIURL.APIKEY+'&sort_by=popularity.desc'+'&page='+this.state.incremental;
        let responseMovie = await apiCall.performCall(URLMOVIE,null);       
        let dataMovie;
        let statusMovie = await responseMovie.status;
        if(statusMovie == 200)
        {
            try{
                this.setState({loading:false})
                dataMovie = await responseMovie.json();
                dataMovie = dataMovie.results
                this.state.movieList = this.state.movieList.concat(dataMovie);
            }catch{}
        }
    }

    renderFooter() {
        return (
        <View style={styles.footer}>
            {this.state.fetching_from_server ? (
                <Loading color="white" style={{ marginLeft: 8 }} />
            ) : null}
        </View>
        );
    }

    render(){
        const {height} = Dimensions.get('window');

        return(
            <View style={styles.containerMain}>
                {this.state.loading?(
                    <Loading />
                ):(
                            <View style={{flex:1, height:height}}>
                                <MyText numberOfLines={2} style={styles.Header}>TV Collection</MyText>
                                <FlatList
                                    style={{ width: '100%',height:10}}
                                    data={this.state.movieList}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item,index }) => 
                                        <ListItem props={this.props} item = {item} index= {index} reRender={this.reRender}/> }
                                    ListFooterComponent={this.renderFooter.bind(this)}
                                    onEndReached={this.onEndReached.bind(this)}
                                    onEndReachedThreshold={0.05}
                                    onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                                    />
                        </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerMain:{
        flex:1,
        paddingTop:50,
        backgroundColor:'#202020',
        //alignItems: 'center',
        padding:10,
    },
    logo: {
        width:100,
        alignSelf: 'center',
        height:100,
        // margin:10,
        marginRight:10,
        
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

const ListItem = (value) => {
    const { item,index ,props} = value;
    const {name,poster_path,genre_ids,id} = item
    const pic =  APIURL.IMAGE+poster_path;
    
    let listGenre = getGenre(genre_ids,props.userDetails.genre)
    return(
        <TouchableOpacity onPress={() => {
            const params = [
                {"id": id,
                "pic": pic,}
            ]
                props.navigation.navigate('MovieDetailsScreen', {
                    otherParam: params,
                });
        }}>
            <View style={{margin:10, borderRadius:10, borderWidth:2, borderColor: '#5B5B5B',flex:1, paddingHorizontal:10}}>
                <View style={{flex:1,flexDirection:'row', margin:10}}>
                    <Image
                        style={styles.logo}
                        resizeMode ='stretch'
                        source={{
                            uri:
                            pic,
                        }}
                    />        
                    <View style={{flex:1,flexDirection:'column'}}> 
                        <MyText numberOfLines={2} style={{flex:1}}>{name}</MyText>
                        <FlatList
                            // style={{alignSelf: 'center'}}
                            keyExtractor={(item, index) => index.toString()}
                            data={listGenre}
                            horizontal
                            renderItem={({ item,index }) => 
                                <Genre props={props} item = {item} /> }
                            keyExtractor={item => item.id}
                        />
                    </View>    
                </View>
            </View>   
        </TouchableOpacity>
    )
}

const Genre = (value) => {
    const { item } = value;
    console.log(item)
    return(
        <View style={{ borderRadius:10, borderWidth:2, padding:2, borderColor: '#5B5B5B', height:30, paddingHorizontal:10}}>
            <MyText>{item}</MyText>
        </View>   
    )
}

const mapStateToProps = (state) => {
    return{
        userDetails:state.userDetailReducer.userDetails,
    }
}

export default connect(
    mapStateToProps,
    null)(TVListScreen)
