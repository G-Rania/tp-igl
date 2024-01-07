import React from 'react'

import axios from 'axios';

export async function addMod (props){
    try{
        const admin_id= localStorage.getItem('admin_id')
        const access_token = localStorage.getItem('admin_access_token');
        const response = await axios.post('http://127.0.0.1:8000/admin/mods/add_mod/',{
            admin_id: admin_id,
            username : props.username , 
            password: props.password , 
            email : props.email
        },
        {
            headers:{
                'Authorization': 'Bearer '+access_token
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
            return 'No response received from the server';
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request', error.message);
            return 'Error setting up the request';
        }
    }
}
export async function removeModerator (){
    try{
        const access_token = localStorage.getItem('admin_access_token');
        const admin_id = localStorage.getItem('admin_id');
        const response = await axios.post('http://127.0.0.1:8000/admin/mods/remove_mod/',{
           admin_id:admin_id,
           mod_id:1
        },
        {
            headers:{
                'Authorization': 'Bearer '+access_token
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
            return 'No response received from the server';
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request', error.message);
            return 'Error setting up the request';
        }
    }
}


