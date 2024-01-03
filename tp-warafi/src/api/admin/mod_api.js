import React from 'react'

import axios from 'axios';

export async function addMod (props){
    try{
        const access_token = localStorage.getItem('access_token');
        const response = await axios.post('http://127.0.0.1:8000/admin/mods/add_mod/',{
            username : props.username , 
            password: props.password , 
            email : props.email
        },
        {
            headers:{
                'Authorization': 'Bearer '+ access_token
            }
        }
        );

        return true
        
    }catch (error) {
        if (error.response) {
            // The request was made, but the server responded with an error status
            console.error(error.response.data);
            return error.response.data['error'] || 'An unexpected error occurred';
        } else if (error.request) {
            // The request was made, but no response was received
            console.error('No response received from the server');
            return 'No response received from the server';
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request', error.message);
            return 'Error setting up the request';
        }
    }
}

