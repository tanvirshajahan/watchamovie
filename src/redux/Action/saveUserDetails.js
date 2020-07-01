export const saveUserDetails = (userDetails) =>(
    {
        type:"SAVE_USER_DETAIL",
        userDetails:{
            name:userDetails.name,
            token:userDetails.token,
            profile_pic:userDetails.profile_pic
        }
    });