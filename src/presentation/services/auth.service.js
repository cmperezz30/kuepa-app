import axios from 'axios';
import { envs } from '../../envs';


class AuthService {

    constructor() { }

    async register(data) {

        try {
            
            const response = await axios.post(`${envs.HOST_URL}/auth/register`, {
                name: data.name,
                username: data.username,
                password: data.password
            })

            return response.data

        } catch (error) {
            
            return error

        }
        
        
    }

}

export { AuthService }