import React from 'react';

class ApiCalls extends React.Component{
    constructor(props)
    {
        super(props)
        this.headers = null;
        this.status = null;
        this.state = {
            movie: '',
        }
    }

    async performCall(URL,body,method)
    {
        //Check Authorization
        // let Authorization = await storage.getItem('Authorization');
        // if(Authorization !== null)
        // {
        //     if(Authorization.includes("Bearer"))
        //     {
        //         //Check JWT validity
        //         if (Authorization && jwt_decode(Authorization)) {
        //             const expiry = jwt_decode(Authorization).exp;
        //             const now = new Date();
        //             let isExpired = now.getTime() > ((expiry - 120) * 1000); //calculate expiry 2 mins buffer
        //             if(isExpired)
        //             {
        //                 await this.refreshToken();
        //             }
        //         }
        //     }

        //     Authorization = await storage.getItem('Authorization')
            
            //Build Option
            let options = {
                method: method,
                headers: new Headers({
                    // 'Authorization': Authorization,
                    'Content-Type': 'application/json',
                }),
                body: body
            }

            console.log('url ', URL)
            
            //Perform Call
            return await fetch(URL, options);
    }
}

let apiCall = new ApiCalls();
export {apiCall};