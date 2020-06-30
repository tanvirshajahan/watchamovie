const HOST = "https://api.themoviedb.org/3";
const APIKEY = "593ce6536648367e9493209e3565f2fd";

module.exports = {
    //Methods
    MOVIE:   HOST + '/discover/movie',
    LATEST_TVSHOW:   HOST +'/trending/tv/day',
    LATEST_MOVIE:   HOST +'/trending/movie/day',
    LATEST_PEOPLE:   HOST +'/trending/person/day',
    APIKEY:   'api_key='+APIKEY,
    IMAGE:   'https://image.tmdb.org/t/p/w500/',
    // https://api.themoviedb.org/3/trending/movie/day?api_key=593ce6536648367e9493209e3565f2fd
};