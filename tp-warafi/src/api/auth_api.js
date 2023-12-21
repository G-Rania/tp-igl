import axios from 'axios';


async function handleLogin (username, password){
    try {
    const response = await axios.post('http://127.0.0.1:8000/users/auth/login/', {
        username: username,
        password: password,
    });
        console.log(response.data['username'])
        return true
    // Store access token in local storage or cookies for future requests
    // Example: localStorage.setItem('access_token', response.data.access_token);
    } catch (error) {
        return error.response.data['error']
    // Handle error states (e.g., show error message)
    }
}

export default handleLogin
