import axios from "axios";



export async function extract (folder_path){
    try{
        const access_token = localStorage.getItem('admin_access_token');
        const admin_id = localStorage.getItem('admin_id');
        const response = await axios.post('http://127.0.0.1:8000/admin/extract/',{
            admin_id: admin_id,
            file_path: folder_path
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