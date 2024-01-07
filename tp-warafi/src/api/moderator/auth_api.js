import axios from "axios";
import Mod from  '../../models/moderator';


export async function getData (){
    try{
        const access_token = localStorage.getItem('mod_access_token');
        const mod_id = localStorage.getItem('mod_id');
        const response = await axios.post('http://127.0.0.1:8000/moderator/auth/get_mod_data/',{
            mod_id: mod_id,
        },
        {
            headers:{
                'Authorization': 'Bearer '+access_token
            }
        }
        );
        console.log('hna jdida: '+response.data['username']);
        return true
        
    }catch(error){
        return error.response.data['error']
    }
}

export async function handleLogin (username, password){
    try {
    const response = await axios.post('http://127.0.0.1:8000/moderator/auth/login/', {
        username: username,
        password: password,
    });
        localStorage.setItem('mod_access_token',response.data['access_token'])
        localStorage.setItem('mod_id',response.data['mod_id'])
        return true
    // Store access token in local storage or cookies for future requests
    // Example: localStorage.setItem('access_token', response.data.access_token);
    } catch (error) {
        return error.response.data['error']
    // Handle error states (e.g., show error message)
    }
}


export async function signOut(){
    try{
        const access_token = localStorage.getItem('mod_access_token')
        const mod_id = localStorage.getItem('mod_id');
        const response = await axios.post('http://127.0.0.1:8000/moderator/auth/sign_out/',{
            mod_id: mod_id
        },
        {
            headers:{
                'Authorization': 'Bearer '+access_token
            }
        }
        );
        localStorage.removeItem('mod_access_token');
        localStorage.removeItem('mod_id');
        return true
    }catch(error){
        console.log(error);
    }
}



