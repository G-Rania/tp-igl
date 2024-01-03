import React from 'react'

import axios from 'axios';

export async function addMod (props){
    try{
        const admin_id = "1"
        const response = await axios.post('http://127.0.0.1:8000/admin/mods/add_mod/',{
            admin_id:admin_id,
            username : props.username , 
            password: props.password , 
            email : props.email
        },
        {
            headers:{
                'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA1NjEyODY0LCJpYXQiOjE3MDQzMTY4NjQsImp0aSI6ImI0YzBlZGZmZDg4OTQ4M2NhYjdhNTA1OWEyNTc0MmMxIiwidXNlcl9pZCI6MX0.oWk1xzCSyiGnrAGEN6fCrEDpjfXEVebMkPK_DMl-akI"
            }
        }
        );

        return true
        
    }catch (error) {
        if (error.response) {
            // The request was made, but the server responded with an error status
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

