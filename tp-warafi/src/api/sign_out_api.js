
async function signOut(){
    try{
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id')
    }catch(error){
        console.log(error);
    }
}
export default signOut