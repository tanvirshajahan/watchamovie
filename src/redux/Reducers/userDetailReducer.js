const initialState = 
{
    userDetails: {
        name:"",
        token:"",
        profile_pic:"",
        genre: "",
    }
};

const userDetailReducer = (state = initialState , action) => {
switch(action.type){
    case "SAVE_USER_DETAIL" :{
        return{
            ...state,
            userDetails : action.userDetails
        }
    }
    default:{
        return state;
    }
}
}
export default userDetailReducer;
