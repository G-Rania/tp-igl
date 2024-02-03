import axios from 'axios';
import Article from '../../models/Article'

export async function search (params){
    try {
    const access_token = localStorage.getItem('access_token');
    const user_id = localStorage.getItem('user_id');
    params.user_id = user_id
    const response = await axios.get('http://127.0.0.1:8000/search/', {
        params:params,
        
    },
    {
        
        headers:{
            'Authorization': 'Bearer '+access_token,
            'user_id':user_id
            
        }
    }
    );  
        const articles = []
        const results = response.data.data
        for (let i = 0; i < results.length; i++) {
            // Access each item in the 'results' list using results[i]
            const currentItem = results[i];
            

            const articleInstance = {
                "id":currentItem['id'],
                "title":currentItem["title"],
                "authors":currentItem["authors"],
                "keywords":currentItem["keywords"],
                "publication_date":currentItem["publication_date"],
                "url":currentItem["pdf_url"],
                "favorite":currentItem["favorite"],
                "full_text":currentItem["full_text"],
                "references": currentItem['references'],
                "institutions":currentItem['institutions'],
                "abstract": currentItem['abstract']
            }
            
            articles.push(articleInstance)
            // Do something with 'currentItem'
            // For example, you can log it to the console
            
            

        }
        console.log(articles);
        return articles
    // Store access token in local storage or cookies for future requests
    // Example: localStorage.setItem('access_token', response.data.access_token);
    } catch (error) {
        return false
    // Handle error states (e.g., show error message)
    }
}