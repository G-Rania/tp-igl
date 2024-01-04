import axios from "axios";
import Admin from  '../../models/admin';


export async function handleLogin (username, password){
    try {
    const response = await axios.post('http://127.0.0.1:8000/admin/auth/login/', {
        username: username,
        password: password,
    });
        localStorage.setItem('access_token',response.data['access_token'])
        localStorage.setItem('admin_id',response.data['admin_id'])
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
        const access_token = localStorage.getItem('access_token')
        const admin_id = localStorage.getItem('admin_id');
        const response = await axios.post('http://127.0.0.1:8000/admin/auth/sign_out/',{
            admin_id: admin_id
        },
        {
            headers:{
                'Authorization': 'Bearer '+access_token
            }
        }
        );
        localStorage.removeItem('access_token');
        localStorage.removeItem('admin_id');
        return true
    }catch(error){
        console.log(error);
    }
}



