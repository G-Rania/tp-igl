import React from 'react'

import axios from 'axios';

export async function addMod ( data ){
    try{
        const admin_id= localStorage.getItem('admin_id')
        const access_token = localStorage.getItem('admin_access_token');
        const response = await axios.post('http://127.0.0.1:8000/admin/mods/add_mod/',{
            admin_id:admin_id,
            username : data.username , 
            password: data.password , 
            email : data.email
        },
        {
            headers:{
                'Authorization': 'Bearer '+access_token
            }
        }
        );

        ////console.log(response.status)
        ////console.log('the mod id in server',response.data['mod_id']);
        return response
        
    }catch (error) {
        if (error.response) {
            // The request was made, but the server responded with an error status
            //console.error(error.response.data);
            return error.response.data['error'] || 'An unexpected error occurred';
        } else if (error.request) {
            // The request was made, but no response was received
            return 'No response received from the server';
        } else {
            // Something happened in setting up the request that triggered an Error
            //console.error('Error setting up the request', error.message);
            return 'Error setting up the request';
        }
    }
}
export async function removeModerator (modId){
    try{
        const access_token = localStorage.getItem('admin_access_token');
        const admin_id = localStorage.getItem('admin_id');
        const response = await axios.post('http://127.0.0.1:8000/admin/mods/remove_mod/',{
           admin_id:admin_id,
           mod_id:modId
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
            //console.error(error.response.data);
            return error.response.data['error'] || 'An unexpected error occurred';
        } else if (error.request) {
            // The request was made, but no response was received
            return 'No response received from the server';
        } else {
            // Something happened in setting up the request that triggered an Error
            //console.error('Error setting up the request', error.message);
            return 'Error setting up the request';
        }
    }
}

export async function getMods(){
    try {
        const token = localStorage.getItem("admin_access_token");
        const admin_id = localStorage.getItem("admin_id");
        const response = await axios.post('http://127.0.0.1:8000/admin/mods/get_mods/',
        {
            admin_id : admin_id
        },
       
        { headers:
            {
                'Authorization': 'Bearer '+token
            }  }
        )
        //console.log(response.data['mods'])
        return response.data['mods']

    } catch (error) {
        if (error.response) {
            // The request was made, but the server responded with an error status
            //console.error(error.response.data);
            return error.response.data['error'] || 'An unexpected error occurred';
        } else if (error.request) {
            // The request was made, but no response was received
            return 'No response received from the server';
        } else {
            // Something happened in setting up the request that triggered an Error
            //console.error('Error setting up the request', error.message);
            return 'Error setting up the request';
        }
    }

}

export async function updateMod(props){
    try {
        const token = localStorage.getItem("admin_access_token");
        const admin_id = localStorage.getItem("admin_id");
        console.log(props.id);
        const response = await axios.post('http://127.0.0.1:8000/admin/mods/update_mod/',
        {
            admin_id : admin_id,
            mod_id:props.id,
            username : props.username , 
            password: props.password , 
            email : props.email
        },
       
        { headers:
            {
                'Authorization': 'Bearer '+token
            }  }
        )
        //console.log(response)
        return response

    } catch (error) {
        if (error.response) {
            // The request was made, but the server responded with an error status
            //console.error(error.response.data);
            return error.response.data['error'] || 'An unexpected error occurred';
        } else if (error.request) {
            // The request was made, but no response was received
            return 'No response received from the server';
        } else {
            // Something happened in setting up the request that triggered an Error
            //console.error('Error setting up the request', error.message);
            return 'Error setting up the request';
        }
    }

}



