import axios from 'axios';

export async function addFavorite (article_id){
    try{
        const access_token = localStorage.getItem('access_token');
        const user_id = localStorage.getItem('user_id');
        const response = await axios.post('http://127.0.0.1:8000/users/favorites/add/',{
            user_id: user_id,
            article_id : article_id
        },
        {
            headers:{
                'Authorization': 'Bearer '+access_token
            }
        }
        );

        return true
        
    }catch(error){
        return error.response.data['error']
    }
}

export async function removeFavorite (article_id){
    try{
        const access_token = localStorage.getItem('access_token');
        const user_id = localStorage.getItem('user_id');
        const response = await axios.post('http://127.0.0.1:8000/users/favorites/remove/',{
            user_id: user_id,
            article_id : article_id
        },
        {
            headers:{
                'Authorization': 'Bearer '+access_token
            }
        }
        );

        return true
        
    }catch(error){
        return error.response.data['error']
    }
}
