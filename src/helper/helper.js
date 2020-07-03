
import { connect } from 'react-redux'

export function getGenre(id,genre) {
    let genresList = genre.genres
    let finalGenre = [];

    for(let z = 0; z < id.length; z++){
        for(let i = 0; i < genresList.length; i++){
            // console.log('a =',genresList[i]+ 'b = ',id[z])
            if(genresList[i].id == id[z] )
            {
                // console.log(genresList[i], 'found')
                finalGenre.push(genresList[i].name)
            }
        }
    }

    // console.log('final value'+ finalGenre)
    return finalGenre;
}