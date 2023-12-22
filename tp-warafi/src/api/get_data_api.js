import axios from 'axios';

async function getData (){
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
        return true
        
    }catch(error){
        return error.response.data['error']
    }
}
export default getData