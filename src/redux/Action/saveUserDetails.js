
export const LOGOUT = 'LOGOUT';
export const SAVE_DETAILS = 'SAVE_USER_DETAIL';
export const saveUserDetails = (userDetails) =>(
    {
        type:SAVE_DETAILS,
        userDetails:{
            name:userDetails.name,
            token:userDetails.token,
            profile_pic:userDetails.profile_pic,
            genre:userDetails.genre
        }
    });
    
export const logout = (userDetails) =>(
    {
        type: LOGOUT,
        userDetails
    });