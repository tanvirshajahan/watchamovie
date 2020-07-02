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


class MovieDetailsScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            MovieId : this.props.route.params.otherParam[0].id,
            moviePic : this.props.route.params.otherParam[0].pic,
            movieDetails: '',
        }
        this.getMovieDetails = this.getMovieDetails.bind(this);

    }

    async componentDidMount() {
        await this.getMovieDetails()
        this.forceUpdate();

    }
    
    async getMovieDetails(){
        let URLPEOPLE = APIURL.MOVIE_DETAILS+this.state.MovieId+'?'+APIURL.APIKEY;

        let responseMovie = await apiCall.performCall(URLPEOPLE,null);
        let dataMovie;
        let statusMovie = await responseMovie.status;
        if(statusMovie == 200)
        {
            try{
                this.setState({loading:false})
                dataMovie = await responseMovie.json();
                dataMovie = dataMovie
                this.state.movieDetails = dataMovie;
                console.log('result', this.state.movieDetails)
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

        console.log('test',this.state.moviePic)
        const pic = this.state.moviePic
        const {backdrop_path ,genres,original_title,popularity,production_companies,release_date,title,vote_average,vote_count,overview,adult,runtime} = this.state.movieDetails
        const date = release_date+'';

        return(

            <View style={styles.containerMain}>
                {this.state.loading?(
                    <Loading />
                ):(
                    <ScrollView style={{flex:1}}>
                        <View>
                            <MyText numberOfLines={2} style={styles.Header}>{original_title}</MyText>
                                <Image
                                    style={styles.logo}
                                    resizeMode ='stretch'
                                    source={{
                                        uri:
                                        pic,
                                    }}
                                />
                                    <FlatList
                                    style={{alignSelf: 'center'}}
                                        keyExtractor={(item, index) => index.toString()}
                                        data={genres}
                                        horizontal
                                        renderItem={({ item }) => 
                                            <Genre props={this.props} item = {item} /> }
                                        keyExtractor={item => item.id}
                                    />
                                    {/* adult,  duration date */}
                                    <MyText style={{margin:10,flex:1,padding:10}}>{date.slice(0,4)} {" | "}{adult?"18":"PG13"}{" | "}{runtime?this.timeConvert(runtime):null}</MyText>
                                    <MyText numberOfLines= {6} style={{margin:10,flex:1,padding:10}}>{overview}</MyText>
                                    {/* ratings section */}
                                    {vote_average && vote_count? (
                                        <View style={{flexDirection: 'row',justifyContent: 'space-evenly'}}>
                                        <View style={{flexDirection: 'column',}}>
                                            <Image 
                                                source ={{
                                                    uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Golden_star.svg/1200px-Golden_star.svg.png'}} 
                                                resizeMode ='stretch'
                                                style={{height:20,width:20, alignSelf: 'center'}}
                                            />
                                            <MyText>{vote_average}{ ' / 10'}</MyText>
                                        </View>
                                        <View style={{borderWidth:2, borderColor:'#5B5B5B'}}/>
                                        <View style={{flexDirection: 'column'}}>
                                            <Image 
                                                source ={{
                                                    uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Golden_star.svg/1200px-Golden_star.svg.png'}} 
                                                resizeMode ='stretch'
                                                style={{height:20,width:20, alignSelf: 'center'}}
                                            />
                                            <MyText style={{textAlign: 'center'}}>Vote Count</MyText>
                                            <MyText style={{textAlign: 'center'}}>{vote_count}</MyText>
                                        </View>
                                    </View>
                                    ):null}
                                    
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
        paddingTop:50,
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

const Genre = (item) => {
    let image ='';
    let title ='';
    let release_date ='';
    let rating ='';
    let id ='';

    return(
        <View style={{margin:10, borderRadius:10, borderWidth:2, borderColor: '#5B5B5B', height:30, paddingHorizontal:10}}>
            <MyText>test</MyText>
        </View>   
    )
}
export default MovieDetailsScreen