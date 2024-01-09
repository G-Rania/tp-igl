import axios from "axios";

export async function getNotApproved (){
    try{
        const access_token = localStorage.getItem('mod_access_token');
        const mod_id = localStorage.getItem('mod_id');
        const response = await axios.post('http://127.0.0.1:8000/articles/not_approved_articles/',{
            mod_id: mod_id,
        },
        {
            headers:{
                'Authorization': 'Bearer '+access_token
            }
        }
        );

        const articles = response.data['articles'];
        return articles
        
    }catch(error){
        return false
    }
}

export async function approve(article_id){
    try{
        const access_token = localStorage.getItem('mod_access_token');
        const mod_id = localStorage.getItem('mod_id');
        const response = await axios.post('http://127.0.0.1:8000/articles/approve_article/',{
            mod_id: mod_id,
            article_id:article_id,
        },
        {
            headers:{
                'Authorization': 'Bearer '+access_token
            }
        }
        );
        return true
        
    }catch(error){
        return false
    }
}

export async function desapprove(article_id){
    try{
        const access_token = localStorage.getItem('mod_access_token');
        const mod_id = localStorage.getItem('mod_id');
        const response = await axios.post('http://127.0.0.1:8000/articles/desapprove_article/',{
            mod_id: mod_id,
            article_id:article_id,
        },
        {
            headers:{
                'Authorization': 'Bearer '+access_token
            }
        }
        );
        return true
        
    }catch(error){
        return false
    }
}

