import React from "react";
import axios from "axios";

export async function removeArticle (articleID){
    try{
        const access_token = localStorage.getItem('admin_access_token');
        const admin_id = localStorage.getItem('admin_id');
        const response = await axios.post('http://127.0.0.1:8000/articles/delete_article/',{
           admin_id:admin_id,
           id:articleID
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
export async function addArticle ( data ){
    try{
        const admin_id= localStorage.getItem('admin_id')
        const access_token = localStorage.getItem('admin_access_token');
        const response = await axios.post('http://127.0.0.1:8000/article/create-article',{
            //body of the create article request
            admin_id:admin_id,
            access_token:access_token 
        },
        {
            headers:{
                //'Authorization': 'Bearer '+ access_token
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA1Njc0MzgwLCJpYXQiOjE3MDQzNzgzODAsImp0aSI6IjU1MGViOWNhMGRjMzQwNTFhMzc5MTg1NGU0Yjc5ZDZmIiwidXNlcl9pZCI6MX0.2hANNXAnATc0EnGxzXfovooLXW_iNTDU-SnzWuOw3Ec '
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
