import React from 'react';
import {crmAPIRequest} from "../../API/CRMAPIRequest"
import * as APIURL from '../../constant/APIURL';

class MovieData extends React.Component{
    constructor(props)
    {
        super(props)
        this.headers = null;
        this.status = null;
        this.state = {
            
        }
    }

    async getMovieData (state) {
    }
}


let movieData = new MovieData();
export {movieData};