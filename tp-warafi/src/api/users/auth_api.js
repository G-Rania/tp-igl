import axios from 'axios';
import User from '../../models/user'

export async function handleSignup (email, username, password){
    try {
    const response = await axios.post('http://127.0.0.1:8000/users/auth/create_user/', {
        email: email,
        username: username,
        password: password,
    });
        localStorage.setItem('access_token',response.data['access_token'])
        localStorage.setItem('user_id',response.data['user_id'])
        return true
    // Store access token in local storage or cookies for future requests
    // Example: localStorage.setItem('access_token', response.data.access_token);
    } catch (error) {
        return error.response.data['error']
    // Handle error states (e.g., show error message)
    }
}

export async function handleLogin (username, password){
    try {
    const response = await axios.post('http://127.0.0.1:8000/users/auth/login/', {
        username: username,
        password: password,
    });
        localStorage.setItem('access_token',response.data['access_token'])
        localStorage.setItem('user_id',response.data['user_id'])
        return true
    // Store access token in local storage or cookies for future requests
    // Example: localStorage.setItem('access_token', response.data.access_token);
    } catch (error) {
        return error.response.data['error']
    // Handle error states (e.g., show error message)
    }
}

export async function getData (){
    try{
        const access_token = localStorage.getItem('access_token');
        const user_id = localStorage.getItem('user_id');
        const response = await axios.post('http://127.0.0.1:8000/users/auth/get_data/',{
            user_id: user_id
        },
        {
            headers:{
                'Authorization': 'Bearer '+access_token
            }
        }
        );
        console.log('hna jdida: '+response.data['username']);
        User.username = response.data['username']
        return true
        
    }catch(error){
        return error.response.data['error']
    }
}

export async function signOut(){
    try{
        const access_token = localStorage.getItem('access_token')
        const user_id = localStorage.getItem('user_id');
        const response = await axios.post('http://127.0.0.1:8000/users/auth/sign_out/',{
            user_id: user_id
        },
        {
            headers:{
                'Authorization': 'Bearer '+access_token
            }
        }
        );
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        return true
    }catch(error){
        console.log(error);
    }
}



