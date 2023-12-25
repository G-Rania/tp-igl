import axios from 'axios';

async function signOut(){
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
export default signOut